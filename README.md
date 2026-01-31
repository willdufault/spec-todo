spec-todo - Spec Coding Test

A simple todo list application built with React + TypeScript, testing an AI-driven "spec coding" development methodology.

## What is Spec Coding?

This project tests an innovative development approach where detailed technical specifications (SPEC.md) guide AI agents through structured implementation (TASKS.md), following strict coding guidelines (AGENTS.md). The methodology focuses on precise, implementable specifications rather than traditional agile planning.

## Current Status

- **Working v1** with basic todo functionality
- **Three-panel desktop layout** (left sidebar, main view, right sidebar)
- **Local storage persistence** for tasks and lists
- **Some known bugs** exist in current implementation

## Tech Stack

- **React 19** + TypeScript + Vite
- **TailwindCSS** for styling
- **localStorage** for data persistence
- **UUID** for unique identifiers

## Features

- Create, read, update, delete tasks
- Multiple task lists
- Task completion tracking
- Task detail view (right sidebar)
- Automatic data persistence

## Project Structure

- `SPEC.md` - Detailed technical specifications
- `TASKS.md` - Step-by-step implementation tasks  
- `AGENTS.md` - AI coding guidelines and standards
- `src/` - Standard React application structure

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173 to view the application.

## Build

```bash
npm run build
```

---

**Note**: This is a research project testing AI-driven development methodologies. The application itself serves as a proof of concept for the spec coding approach.
