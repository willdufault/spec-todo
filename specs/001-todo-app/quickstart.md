# Quickstart Guide: SpecTodo Web Application

**Purpose**: Get started with SpecTodo development environment setup  
**Created**: 2026-01-31  
**Feature**: SpecTodo Web Application

## Prerequisites

Before starting development, ensure you have:

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (comes with Node.js)
- **Modern web browser**: Chrome 90+, Firefox 88+, or Safari 14+
- **Code editor**: VS Code recommended with extensions below

## Quick Setup (5 minutes)

### 1. Create Project Directory

```bash
mkdir spectodo-app
cd spectodo-app
```

### 2. Initialize Vite + React + TypeScript

```bash
npm create vite@latest . -- --template react-ts
npm install
```

### 3. Install Required Dependencies

```bash
# Tailwind CSS v4 with Vite plugin
npm install -D tailwindcss@next @tailwindcss/vite@next

# UUID generation
npm install uuid @types/uuid

# State management and utilities
npm install immer

# Testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### 4. Configure Tailwind CSS

**Create `vite.config.ts`:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ]
})
```

**Update `src/index.css`:**
```css
@import "tailwindcss";

/* Additional custom styles */
body {
  font-family: system-ui, -apple-system, sans-serif;
}

/* Custom focus styles for accessibility */
.task-checkbox:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

### 5. Configure Testing

**Create `vitest.config.ts`:**
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true
  }
})
```

**Create `src/test/setup.ts`:**
```typescript
import '@testing-library/jest-dom'
```

### 6. Configure TypeScript

**Update `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/types/*": ["./src/types/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 7. Update package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "type-check": "tsc --noEmit"
  }
}
```

## Project Structure

After setup, your project should have this structure:

```
spectodo-app/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── MainPanel.tsx
│   │   │   └── DetailPanel.tsx
│   │   ├── todo/
│   │   │   ├── TodoList.tsx
│   │   │   ├── TodoItem.tsx
│   │   │   └── TodoForm.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── Input.tsx
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── useTodoLists.ts
│   │   └── useDebounce.ts
│   ├── types/
│   │   └── todo.ts
│   ├── utils/
│   │   ├── storage.ts
│   │   ├── validation.ts
│   │   └── idGeneration.ts
│   ├── storage/
│   │   └── localStorage.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tests/
│   ├── unit/
│   ├── integration/
│   └── __mocks__/
├── public/
│   └── index.html
├── package.json
├── vite.config.ts
├── vitest.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Development Workflow

### Start Development Server

```bash
npm run dev
```

This starts the Vite development server at `http://localhost:5173`

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Key Development Patterns

### Component Development

**Example TodoItem Component:**
```typescript
// src/components/todo/TodoItem.tsx
import React from 'react'
import { Task, TaskStatus } from '@/types/todo'
import { useTodoLists } from '@/hooks/useTodoLists'

interface TodoItemProps {
  task: Task
  isSelected: boolean
}

export const TodoItem: React.FC<TodoItemProps> = ({ task, isSelected }) => {
  const { toggleTaskStatus, selectTask } = useTodoLists()
  
  const handleToggle = () => {
    toggleTaskStatus(task.id)
  }
  
  const handleSelect = () => {
    selectTask(task.id)
  }
  
  return (
    <div 
      className={`
        flex items-center p-3 border-b border-gray-200 cursor-pointer
        hover:bg-gray-50 transition-colors duration-150
        ${isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}
        ${task.status === TaskStatus.Completed ? 'opacity-60' : ''}
      `}
      onClick={handleSelect}
    >
      <input
        type="checkbox"
        checked={task.status === TaskStatus.Completed}
        onChange={handleToggle}
        className="mr-3 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
      />
      <span className={`
        flex-1 text-gray-800
        ${task.status === TaskStatus.Completed ? 'line-through' : ''}
      `}>
        {task.title}
      </span>
    </div>
  )
}
```

### State Management Hook

**Example useTodoLists Hook:**
```typescript
// src/hooks/useTodoLists.ts
import { useReducer, useEffect } from 'react'
import { produce } from 'immer'
import { TodoList, Task, TaskStatus } from '@/types/todo'
import { useLocalStorage } from './useLocalStorage'

type Action = 
  | { type: 'CREATE_LIST'; payload: { name: string } }
  | { type: 'CREATE_TASK'; payload: { listId: string; title: string } }
  | { type: 'TOGGLE_TASK'; payload: { taskId: string } }
  | { type: 'SELECT_LIST'; payload: { listId: string } }

export function useTodoLists() {
  const [lists, setLists] = useLocalStorage<TodoList[]>('spectodo_lists', [])
  const [selectedListId, setSelectedListId] = useState<string | null>(null)
  
  const [state, dispatch] = useReducer(todoReducer, {
    lists,
    selectedListId
  })
  
  useEffect(() => {
    setLists(state.lists)
  }, [state.lists, setLists])
  
  const createTask = (listId: string, title: string) => {
    dispatch({ type: 'CREATE_TASK', payload: { listId, title } })
  }
  
  const toggleTaskStatus = (taskId: string) => {
    dispatch({ type: 'TOGGLE_TASK', payload: { taskId } })
  }
  
  return {
    lists: state.lists,
    selectedListId: state.selectedListId,
    createTask,
    toggleTaskStatus
  }
}
```

### localStorage Wrapper

**Example useLocalStorage Hook:**
```typescript
// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
      return initialValue
    }
  })
  
  const setValue = (value: T): boolean => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
      return false
    }
  }
  
  return [storedValue, setValue] as const
}
```

## Testing Strategies

### Component Testing

```typescript
// src/components/todo/TodoItem.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { TodoItem } from './TodoItem'
import { Task, TaskStatus } from '@/types/todo'

describe('TodoItem', () => {
  const mockTask: Task = {
    id: 'test-task-1',
    title: 'Test task',
    status: TaskStatus.ToDo,
    createdAt: Date.now(),
    position: 0
  }
  
  it('renders task title correctly', () => {
    render(<TodoItem task={mockTask} isSelected={false} />)
    expect(screen.getByText('Test task')).toBeInTheDocument()
  })
  
  it('shows completed status with strikethrough', () => {
    const completedTask = { ...mockTask, status: TaskStatus.Completed }
    render(<TodoItem task={completedTask} isSelected={false} />)
    
    const taskTitle = screen.getByText('Test task')
    expect(taskTitle).toHaveClass('line-through')
  })
  
  it('toggles task status when checkbox clicked', () => {
    const { container } = render(<TodoItem task={mockTask} isSelected={false} />)
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement
    
    expect(checkbox.checked).toBe(false)
    
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(true)
  })
})
```

## Common Issues & Solutions

### Tailwind CSS Not Working

**Issue**: Tailwind classes not applying  
**Solution**: Ensure `@import "tailwindcss";` is at the top of `src/index.css`

### localStorage Not Working

**Issue**: localStorage undefined errors  
**Solution**: Add null check:
```typescript
if (typeof window !== 'undefined') {
  // localStorage operations here
}
```

### TypeScript Path Aliases

**Issue**: Import paths not resolving  
**Solution**: Restart VS Code and ensure `baseUrl` and `paths` are configured in `tsconfig.json`

## Next Steps

1. **Implement core components**: Header, Sidebar, MainPanel, DetailPanel
2. **Create state management hooks**: useTodoLists, useLocalStorage
3. **Build todo components**: TodoItem, TodoList, TodoForm
4. **Add comprehensive tests**: Unit tests for hooks, component tests
5. **Implement error handling**: Validation, error boundaries, user feedback
6. **Performance optimization**: Virtual scrolling for large lists, debounced saves

This quickstart provides everything needed to begin productive SpecTodo development immediately.