---
name: requirements-analyzer
description: Analyze a user request, feature description, or project brief and extract structured requirements. Produces a concise problem statement, functional requirements, non-functional requirements, assumptions, and open questions. Use when the user asks to "analyze requirements," "break down this request," "what are the requirements for," "extract requirements," or provides a feature/project description that needs structured analysis before implementation.
---

# Requirements Analyzer

Read the user's request and produce a structured requirements analysis. Follow this process:

## Process

1. Read the full request without jumping to solutions
2. Identify the core problem being solved
3. Extract what the system must do (functional) vs. how well it must do it (non-functional)
4. Surface what's assumed but not stated
5. Flag anything ambiguous or missing

## Output Format

Use this exact structure:

```
## Problem Statement
[1-3 sentences. What problem is being solved and for whom.]

## Functional Requirements
- FR-1: [Specific, testable behavior the system must exhibit]
- FR-2: ...

## Non-Functional Requirements
- NFR-1: [Performance, security, scalability, accessibility, or other quality attribute]
- NFR-2: ...

## Constraints
- [Technical, business, regulatory, or timeline constraints explicitly or implicitly stated]

## Assumptions
- [Things taken as true but not explicitly confirmed — flag these for validation]

## Risks
- [What could go wrong, what's underspecified, what has high complexity or uncertainty]

## Open Questions
- [Ambiguities, missing information, or decisions that need stakeholder input before proceeding]
```

## Guidelines

- **Be specific.** "Users can log in" is weak. "Users authenticate via email/password and receive a JWT valid for 24h" is testable.
- **Separate what from how.** Requirements describe outcomes, not implementation. Avoid prescribing technology unless the request explicitly constrains it.
- **Number everything.** FR-1, NFR-1, etc. makes referencing easy in follow-up discussion.
- **Don't invent requirements.** Only extract what the request states or strongly implies. Put inferences in Assumptions.
- **Prioritize open questions.** The most valuable output is often what's missing from the request. Lead with questions that would change the design.
- **Scale to scope.** A one-line request gets a brief analysis. A multi-page brief gets thorough coverage. Match depth to input.

## Example

**Input:** "We need a way for teachers to upload quiz files and have them auto-graded."

```
## Problem Statement
Teachers need to upload quiz files and receive automated grading results, reducing manual grading effort.

## Functional Requirements
- FR-1: Teachers upload quiz files through a web interface
- FR-2: System parses uploaded quiz files and extracts questions and answers
- FR-3: System grades quizzes automatically against an answer key
- FR-4: Teachers view grading results per student and per question

## Non-Functional Requirements
- NFR-1: File upload supports files up to a reasonable size limit
- NFR-2: Grading completes within a time frame acceptable for classroom use

## Constraints
- Input is file-based (not a form builder or live quiz)

## Assumptions
- Quiz files follow a consistent, parseable format (e.g., CSV, DOCX with structure)
- An answer key exists or is provided alongside the quiz
- Only teachers upload; students do not interact with this system directly

## Risks
- Ambiguous file formats could cause parsing failures
- Auto-grading may not handle subjective/open-ended questions

## Open Questions
- What file formats are supported?
- How is the answer key provided — embedded in the file, separate upload, or pre-configured?
- Are results shared with students, or only visible to teachers?
- Should partial credit be supported for any question types?
- Is there an existing LMS this integrates with?
```

After presenting the analysis, ask the user if they want to clarify any open questions or adjust requirements before proceeding.
