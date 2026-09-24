---
name: workgo-edge-cluster
description: WorkGo hybrid cloud + homelab cluster (sg-cloud, edge-cloud-lg, edge-cloud-sm). Use when deploying, SSH-ing, placing workloads, touching Headscale/Tailscale, Temporal, K3s, registry.workgo.space, zrouter.workgo.space, Docker context, or anything on workgo.space. Do not use for Contabo-only zworks.space apps except as a documented fallback.
---

# WorkGo edge cluster

Hybrid: **sg-cloud** is the public edge and system of record. Homelab is the compute plane. **K3s never crosses the WAN.** Temporal and registry traffic cross via Headscale/WireGuard. Plan: `/Users/niko/founder/edge-cluster/setup.md`. Infra git copy: `/Users/niko/founder/edge-cluster/infra/`.

Load this before proposing hosts, ports, DNS, or deploys on `workgo.space`.

## Nodes

| SSH alias | Hostname | Role | Spec | LAN | Tailscale |
|---|---|---|---|---|---|
| `sg-cloud` | `sg-cloud` | Public edge, compose, Headscale, Nginx/TLS | Ubuntu 24.04, 2 vCPU, 3.7 GiB, public `51.79.221.193` | — | `100.64.0.1` |
| `edge-cloud-lg` | `edge-cloud-lg` (OS was `zworks-node-01`) | **K3s server / control-plane + compute** | Ubuntu 24.04, Ryzen 5 3500X 6c, 32 GiB, ~40 GiB free on `/` | `192.168.2.29` wired | `100.64.0.2` |
| `edge-cloud-sm` | `edge-cloud-sm` | **K3s agent + async + registry blobs** | Ubuntu 22.04, 6c/12t, 16 GiB, ~682 GiB free | `192.168.2.199` Wi-Fi `wlp2s0` | `100.64.0.3` |

SSH config aliases already exist. Do not invent hostnames.

**Deviation from `setup.md` §4:** plan wanted sm=K3s server, lg=agent. Reality (signed off 24/09/2026): **lg is the server** (existing 20-day cluster + Bound PVCs). Labels: lg `role=control` `secondary-role=compute`; sm `role=agent` `secondary-role=async`. K3s `v1.36.4+k3s1`. API: `https://192.168.2.29:6443` on LAN only.

**Placement:** latency-sensitive / sync → **lg** (~43 ms RTT to SG, ~85 Mbit/s). Async / queues / registry blobs → **sm** (~65 ms, Wi-Fi accepted). Do not default to “fix sm Wi-Fi”.

Contabo `vmi3129591` (`ssh contabo`, `62.171.178.19`) is **legacy** zworks.space k3s, not this cluster.

## Overlay

Headscale on sg-cloud (`https://hs.workgo.space` → `127.0.0.1:8080`). Clients: `tailscale up --login-server=https://hs.workgo.space`. User `workgo`. Home ↔ SG is **direct** WireGuard (~40–50 ms), not DERP. Homelab ↔ homelab stays on LAN, not Tailscale.

Public on sg-cloud: `80/tcp`, `443/tcp`, `41641/udp`, `22/tcp` (bootstrap). **Never public:** `5432`, `7233`, `8080` (Headscale), `6443`, `8472`, registry `:5000`.

## DNS / TLS (`workgo.space`, Namecheap → `51.79.221.193`)

| Host | Service |
|---|---|
| `@`, `www` | landing (placeholder) |
| `api` | compose `api` → `127.0.0.1:3000` |
| `hs` | Headscale |
| `zrouter` | zrouter app → `127.0.0.1:20128` |
| `registry` | Docker registry proxy → `100.64.0.3:5000` |

Certbot + Nginx on sg-cloud. HTTP/2 on all TLS vhosts (`listen 443 ssl http2`). Namecheap Host field is the **short** name (`zrouter`, not `zrouter.workgo.space`).

No public DNS for Temporal or Postgres.

## sg-cloud compose (`/opt/workgo-cloud`)

| Service | Image / notes | Bind |
|---|---|---|
| `postgres` | `postgres:16.4-alpine` Temporal/workgo/auth DBs | docker net only |
| `temporal` | `temporalio/server:1.31.2` | `100.64.0.1:7233` only |
| `api` / `auth` | nginx placeholders | `127.0.0.1:3000` / `3010` |
| `zrouter-postgres` | `postgres:17-alpine` db `zrouter` user `zworks` | docker net only |
| `zrouter` | `registry.workgo.space/zrouter:<sha>` | `127.0.0.1:20128` |

Env: `.env` (Temporal/Postgres), `zrouter.env` (app). Secrets `chmod 600`. Backup key `/opt/workgo-cloud/secrets/backup.key`. Nightly `workgo-backup.timer`.

Rollout zrouter: **`--no-deps zrouter` only**. Never recreate `zrouter-postgres` on a code deploy. Skill: `niko0xdev/zrouter` `.claude/skills/zrouter-deploy` (PR targeting workgo; do not follow Contabo `ctr import` as the default).

## Registry

`https://registry.workgo.space` — Nginx TLS on sg-cloud, registry:2.8.3 on **sm** (`hostNetwork`, PVC 100 Gi `local-path`, ns `registry`). Auth **htpasswd user `workgo` for pull and push**. Password: `ssh sg-cloud 'sudo cat /opt/workgo-cloud/secrets/registry.pass'`. LAN `:5000` UFW-denied; only `tailscale0`.

```bash
docker login registry.workgo.space -u workgo
# images: registry.workgo.space/<repo>:<tag>
```

Do not bind the registry on the public Internet. Do not store blobs on lg.

## zrouter

Hot path on **sg-cloud**. Repo: `/Users/niko/founder/niko0xdev/zrouter`. Production: `https://zrouter.workgo.space`. Contabo `zrouter.zworks.space` is fallback until cutover.

Deploy: fetch `origin/main`, tag `git rev-parse --short origin/main`, `docker build --platform linux/amd64` **on this machine** (Mac default context must be Docker Desktop — see below), push workgo registry, compose pull/up `--no-deps zrouter`. Smoke: `/` 307 `/select`, `/api/health` 200 HTTP/2, `/login` 200.

OAuth callback that must exist on the Google client: `https://zrouter.workgo.space/api/auth/google/callback`. Session cookies are `.workgo.space`; Contabo login does not carry over.

## Homelab K3s

`kubectl` via `ssh edge-cloud-lg -- sudo k3s kubectl …`. Traefik already owns 80/443 on lg — do not bind those on sm. Trusted Temporal workers may use `hostNetwork: true` to reach `100.64.0.1:7233`. Untrusted sandboxes must not.

Registry pod is pinned `kubernetes.io/hostname=edge-cloud-sm`.

## Docker on the Mac

Default context **must** be Docker Desktop:

- `~/.zshrc`: `DOCKER_CONTEXT=desktop-linux`, `BUILDX_BUILDER=desktop-linux`
- `docker context use desktop-linux`

Do **not** use context `zworks-linux` / `ssh://zworks-build` unless the user asked and `Host zworks-build` exists. Bare `docker` against `zworks-build` fails (`Could not resolve hostname zworks-build`). Prune Desktop with:

```bash
docker --context=desktop-linux system prune -af   # or, after sourcing zshrc, docker system prune
```

`docker build` on Apple Silicon for this cluster needs `--platform linux/amd64`; inspect must report `amd64` before push.

## Hard rules

- No K3s on sg-cloud. No stretching K3s over the WAN.
- No public Temporal/Postgres/Headscale-backend/K3s API.
- British English in git/docs; no AI attribution on commits/PRs.
- Worktrees under `~/.worktrees/<repo>/<task>` for code changes.
- Do not dual-write Contabo in a workgo deploy unless the user asks.

## Quick checks

```bash
ssh sg-cloud 'cd /opt/workgo-cloud && docker compose ps'
ssh edge-cloud-lg 'sudo k3s kubectl get nodes -o wide'
curl -sS -o /dev/null -w "%{http_code} %{http_version}\n" https://zrouter.workgo.space/api/health
curl -sS -o /dev/null -w "%{http_code}\n" https://registry.workgo.space/v2/
ssh sg-cloud 'sudo tailscale status'
```
