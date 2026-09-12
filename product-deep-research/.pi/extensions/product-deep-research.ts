/**
 * Pi adapter for Product Deep Research.
 * Skills are discovered through package.json `pi.skills`.
 */
export default function (pi: any) {
  pi.registerCommand?.("product-research", {
    description: "Show Product Deep Research usage",
    handler: async (_args: string, ctx: any) => {
      const msg = "Load /skill:product-deep-research, then ask for a scan, competitor teardown, trend research, idea challenge, weekly review, or monthly strategy review.";
      if (ctx?.ui?.notify) ctx.ui.notify(msg, "info");
    },
  });
}
