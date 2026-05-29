# AI Development System

## Primary Objective

Reduce rediscovery.

Convert repository knowledge and completed work into reusable context that improves future planning and implementation.

Always use `.ai/` as the source of truth.

---

# Core Principles

## 1. Minimal Change Strategy

- Prefer the smallest possible diff.
- Modify existing logic before introducing new code.
- Reuse existing components, hooks, utilities, and patterns.
- Avoid unnecessary abstractions.

## 2. Root Cause First

- Never implement based on assumptions.
- Investigate before modifying code.
- Verify the actual source of a problem or requirement.

## 3. Codebase Alignment

- Follow existing project structure.
- Follow existing naming conventions.
- Follow existing architecture.
- Respect module boundaries.
- Reuse existing patterns whenever possible.

## 4. Zero Regression Policy

- Existing behavior must continue to work.
- Consider impact on related modules.
- Avoid unrelated changes.

## 5. Memory Quality

- Store reusable knowledge only.
- Prefer quality over quantity.
- Avoid storing temporary information.

---

# Repository Structure

.ai/
├── instructions.md
├── templates/
│ └── task-template.md
├── tasks/
│ ├── active/
│ └── completed/
├── shared/
│ ├── architecture.md
│ ├── conventions.md
│ ├── decisions.md
│ └── integrations.md
└── personal/
├── lessons-learned.md
└── open-questions.md

---

# Supported Commands

/initialize

/plan <ticket-id>

/execute <ticket-id>

/review <ticket-id>

/context-update

---

# Initialization Mode

Triggered by:

/initialize

Purpose:

Build initial repository knowledge.

Steps:

1. Inspect repository structure.
2. Inspect package.json.
3. Inspect major features.
4. Inspect routing.
5. Inspect state management.
6. Inspect API architecture.
7. Inspect testing setup.
8. Inspect shared components.

Populate:

- shared/architecture.md
- shared/conventions.md
- shared/integrations.md

Do not create tickets.

Do not implement features.

Goal:

Understand the project before future work begins.

---

# Planning Mode

Triggered by:

/plan <ticket-id>

Purpose:

Convert business requirements into an implementation plan.

Process:

1. Read ticket requirements.
2. Read all memory files.
3. Investigate relevant source code.
4. Investigate existing implementations.
5. Investigate APIs and data models.
6. Investigate mock data if applicable.
7. Identify dependencies.
8. Identify blockers.

If information is missing:

Ask questions before planning.

Never assume requirements.

Create:

.ai/tasks/active/{ticket-id}.md

using the task template.

Output:

Implementation plan only.

Do not implement code.

---

# Execution Mode

Triggered by:

/execute <ticket-id>

Purpose:

Implement an approved task.

Before coding:

1. Read task file.
2. Read memory files.
3. Inspect relevant source files.
4. Verify current implementation patterns.
5. Identify root cause or required changes.

Implementation Rules:

- Use minimal diff.
- Follow existing patterns.
- Reuse existing utilities.
- Avoid unnecessary files.
- Avoid unnecessary abstractions.
- Maintain type safety.
- Maintain styling conventions.

Do not modify memory files.

Do not archive tasks.

Focus only on implementation.

---

# Review Mode

Triggered by:

/review <ticket-id>

Purpose:

Validate completed work and update knowledge.

Process:

1. Read task file.
2. Inspect git diff.
3. Inspect changed files.
4. Compare implementation against requirements.
5. Compare implementation against acceptance criteria.
6. Identify reusable learnings.

Verification:

- Tests pass.
- No type errors.
- No lint issues.
- No regressions.

Update memory only if information is reusable.

Examples:

- architecture decisions
- conventions
- integration knowledge
- recurring implementation patterns
- recurring pitfalls

Do not store:

- ticket history
- implementation summaries
- temporary notes
- one-off fixes

After review:

Move task file to:

.ai/tasks/completed/

---

# Context Update Mode

Triggered by:

/context-update

Use after:

- git pull
- branch merge
- major refactor
- large repository updates

Process:

1. Inspect recent repository changes.
2. Inspect affected architecture.
3. Inspect new conventions.
4. Inspect integration changes.
5. Update memory files if required.

Only store reusable knowledge.

Do not create tasks.

Do not implement features.

---

# Prompt Generation Rules

When generating implementation prompts:

- Use minimal tokens.
- Avoid repetition.
- Avoid explanations.
- Output actionable instructions only.

Always enforce:

- Inspect relevant files first.
- Identify root cause.
- Implement minimal diff.
- Follow existing patterns.
- Avoid regressions.
- Ensure tests pass.

Example:

Good:

Inspect relevant files. Identify required changes. Implement minimal diff following existing patterns. Ensure tests pass and no regressions.

Bad:

Analyze the entire codebase, create a detailed plan, explain the reasoning, then implement and summarize every step.

---

# Memory Rules

Store:

- architecture knowledge
- conventions
- decisions
- integrations
- recurring lessons

Do not store:

- ticket details
- temporary notes
- implementation logs
- duplicate information

When uncertain:

Do not store the information.

---

# Final Quality Gate

Before completing any task verify:

- Root cause identified
- Minimal diff applied
- Existing patterns followed
- No unnecessary abstractions introduced
- Tests passing
- No regressions introduced
- Memory updated only when useful

If any condition fails:

Revise before completing the task.
