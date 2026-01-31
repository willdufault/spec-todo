# Agent Guidelines

## Core Principles

- Be concise without sacrificing clarity
- Prioritize clear communication over brevity
- Never assume or hallucinate information not explicitly provided

## Coding Standards

- Always follow best coding practices
- Always follow consistent code style and conventions
- Apply SOLID principles appropriately
- Use dependency injection (DI) for easier testing and maintainability
- Avoid repeating code (DRY)
- Keep code as simple as possible until added complexity is required (KISS)
- Always prefer simple algorithms to complex ones
- Always use clear, meaningful variable and function names
- Always write clean, readable, maintainable code
- Use intermediate variables for clarity when necessary
- Use comments sparingly to clarify complex code or non-obvious context
- Never add comments when the context is obvious
- Prefer positive boolean conditions over negative ones for readability
- Use common design patterns where appropriate
- Don't add unnecessary abstractions unless the added complexity increases clarity
- Always prefer guard statements over deep nesting
- Always start log messages with a single emoji

## Project Specification (SPEC.md)

- SPEC.md is the detailed project specification containing all design decisions
- Should be treated as the authoritative source of truth for the project
- All architectural and feature decisions should reference SPEC.md
- Updated whenever significant design decisions are made
- Designed to be executed by an LLM, so focus on technical implementation details rather than project management artifacts like deadlines and human resource allocations
- SPEC.md is not designed to be implemented directly; it must be converted to TASKS.md for execution

### Required SPEC.md Sections

- **Overview**: Project purpose, scope, and intended users. Include the problem being solved and the solution approach.
- **Goals**: Specific objectives and success criteria. Include purpose, intended outcomes, and acceptance conditions.
- **Tech Stack**: All technologies used with versions and justifications. Include programming languages, frameworks, databases, tools, and dependencies.
- **Core Features**: Essential functionality with descriptions. Include user stories, main capabilities, and key workflows supported.
- **Project Structure**: Directory organization and file conventions. Include key directories, their purposes, and important naming patterns.
- **CLI Commands**: All command-line interface commands planned to be run during the project lifecycle. Include development commands, build scripts, deployment commands, and any automation commands.
- **External Resources**: Documentation, forums, references, and any external materials needed for implementation. Include API docs, tutorials, community resources, and relevant external dependencies.

## Task Execution (TASKS.md)

- TASKS.md is the direct implementation breakdown of SPEC.md containing exact step-by-step execution instructions
- Should be treated as the actionable execution plan that transforms SPEC.md specifications into concrete implementation
- All tasks are executed linearly in sequential order - one task at a time
- Designed to be executed by an LLM with precise commands, file paths, and code examples
- Updated when SPEC.md changes or when implementation steps are refined

### Required TASKS.md Format

TASKS.md must contain a numbered sequence of tasks where each task includes:

**Task Template:**

```
## Task [Number]: [Descriptive Name]
**Brief Description**: [What this task accomplishes]

- **Commands**: `exact bash commands to run`
- **Files**: `specific file paths to create/edit`
- **Code**: `exact code snippets to implement`
- **Validation**: `how to verify task completion`
```

### TASKS.md Requirements

- **Linear Sequence**: Tasks must be numbered sequentially (Task 1, Task 2, Task 3, etc.)
- **One-at-a-Time**: Each task must be fully completed before proceeding to the next
- **Exact Commands**: Include specific bash commands with all flags and arguments
- **Specific Paths**: Use absolute or relative paths to exact files
- **Code Examples**: Provide complete, copy-paste ready code snippets
- **Validation Steps**: Include clear verification methods to confirm task success
- **Prerequisites**: List any requirements or dependencies for each task
