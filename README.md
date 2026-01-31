# Spec-Driven Development (SDD) Testing Repository

A research repository for testing and comparing **Spec-Driven Development (SDD)** methodologies - where detailed specifications guide AI-assisted software development.

## What is Spec-Driven Development?

Spec-Driven Development (SDD) is a methodology where **detailed technical specifications serve as the source of truth** that guide AI agents through structured implementation. Instead of jumping straight into code, SDD emphasizes:

- **Specifications first** - Comprehensive, implementable specs before any coding
- **AI-guided implementation** - AI agents execute tasks based on detailed requirements  
- **Living documentation** - Specs evolve as the single source of truth

**GitHub Spec Kit** is the open-source toolkit that enables this workflow. Learn more: [github/spec-kit](https://github.com/github/spec-kit)

## Repository Structure

This repo demonstrates **different SDD approaches** across separate branches:

### 🏁 `main` - Starting Point
Empty branch with just initial commit - serves as a clean slate for testing SDD workflows.

### 🛠️ `diy` - Custom SDD Implementation  
**Hand-crafted SDD methodology** using custom documentation structure:
- `SPEC.md` - Detailed technical specifications  
- `TASKS.md` - Step-by-step implementation tasks
- `AGENTS.md` - AI coding guidelines and standards
- Working todo app implementation

### ⚡ `speckit` - GitHub Spec Kit Integration
**Official GitHub Spec Kit** implementation with structured workflow:
- `.specify/` - Speckit configuration and templates
- `specs/001-todo-app/` - Formal specification documents
- Automated task generation and workflow management
- Complete React todo app with comprehensive testing

## How to Run Each Branch

### Prerequisites
```bash
git clone <repository-url>
cd spec-todo
```

### `diy` Branch
```bash
git checkout diy
npm install
npm run dev
```
Opens at http://localhost:5173 - Custom SDD workflow with hand-written specifications.

### `speckit` Branch  
```bash
git checkout speckit
npm install
npm run dev
```
Opens at http://localhost:5173 - GitHub Spec Kit workflow with automated task management.

### Available Scripts (both branches)
- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run test` - Run tests
- `npm run lint` - Code linting
- `npm run type-check` - TypeScript type checking

## Tech Stack

- **React 18** + TypeScript
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **localStorage** - Data persistence
- **Vitest** - Testing framework

## Project Goal

This repository serves as a **living comparison** of SDD methodologies, exploring how different approaches to specification-driven development impact:
- Development workflow efficiency
- Code quality and maintainability  
- AI agent performance
- Documentation consistency

---

**Note**: This is a research project testing AI-driven development methodologies. The todo applications serve as proof-of-concept implementations for comparing different SDD approaches.