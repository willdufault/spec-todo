# Agent Guidelines

## Core Principles

- Be concise without sacrificing clarity
- Prioritize clear communication over brevity
- Never assume or hallucinate information not explicitly provided

## Coding Standards

- Apply SOLID principles appropriately
- Avoid repetition (DRY)
- Use clear, meaningful names
- Keep code structure simple
- Write readable, maintainable code
- Use intermediate variables for clarity
- Only comment complex code or non-obvious context
- Comments should be complete sentences
- Prefer positive boolean conditions over negative ones
- Follow consistent code style and conventions
- Follow best coding practices
- Prefer simple algorithms to complex ones
- Use common design patterns where appropriate
- Don't add unnecessary abstractions unless the added complexity increases clarity
- Prefer guard statements over nesting
- Always start log messages with a single emoji
- Logs should be complete sentences

## Project Specification (SPEC.md)

- SPEC.md is the detailed project specification containing all design decisions
- Should be treated as the authoritative source of truth for the project
- All architectural and feature decisions should reference SPEC.md
- Updated whenever significant design decisions are made
- Designed to be executed by an LLM, so focus on technical implementation details rather than project management artifacts like deadlines, timelines, or human resource allocations

### Required SPEC.md Sections

- **Overview**: Project purpose, scope, and intended users. Include the problem being solved and the solution approach.
- **Goals**: Specific objectives and success criteria. Include purpose, intended outcomes, and acceptance conditions.
- **Tech Stack**: All technologies used with versions and justifications. Include programming languages, frameworks, databases, tools, and dependencies.
- **Core Features**: Essential functionality with descriptions. Include user stories, main capabilities, and key workflows supported.
- **Project Structure**: Directory organization and file conventions. Include key directories, their purposes, and important naming patterns.
