# TASKS.md - Todo List App Implementation

## Task 1: Initialize Vite Project with React 19 and TypeScript using SWC
**Brief Description**: Initialize Vite project using React TypeScript template with SWC for faster development

- **Commands**: 
  ```bash
  npm create vite@latest . -- --template react-swc-ts
  npm install react@19 react-dom@19
  npm install
  ```
- **Files**: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`
- **Code**: No code changes - project initialization only
- **Validation**: `npm run dev` starts successfully with SWC, shows faster compilation, default React app loads at http://localhost:5173

## Task 2: Install and Configure TailwindCSS with Vite Plugin
**Brief Description**: Install TailwindCSS as Vite plugin using official documentation for seamless integration

- **Commands**: 
  ```bash
  npm install tailwindcss @tailwindcss/vite
  ```
- **Files**: `vite.config.ts`, `src/index.css`
- **Code**: 
  ```typescript
  // vite.config.ts (complete replacement)
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react-swc'
  import tailwindcss from '@tailwindcss/vite'

  export default defineConfig({
    plugins: [
      react(),
      tailwindcss(),
    ],
  })

  // src/index.css (complete replacement)
  @import "tailwindcss";
  ```
- **Validation**: TailwindCSS classes work in browser dev tools, Vite plugin loads correctly, no console errors, test with `className="text-blue-500"` in App.tsx

## Task 3: Install UUID Dependencies
**Brief Description**: Install UUID generation library and TypeScript types

- **Commands**: 
  ```bash
  npm install uuid @types/uuid
  ```
- **Files**: `package.json` (updated dependencies)
- **Code**: No code changes - dependency installation only
- **Validation**: `npx tsc --noEmit` runs without errors, test import with `import { v4 as uuidv4 } from 'uuid'` in App.tsx

## Task 4: Create Project Directory Structure
**Brief Description**: Create directory structure matching SPEC.md Project Structure section

- **Commands**: 
  ```bash
  mkdir -p src/components src/types
  ```
- **Files**: 
  - `src/components/TopBar.tsx`
  - `src/components/LeftSidebar.tsx`
  - `src/components/ListView.tsx`
  - `src/components/TaskItem.tsx`
  - `src/components/RightSidebar.tsx`
  - `src/components/AddTaskForm.tsx`
  - `src/types/task.ts`
  - `src/types/status.ts`
- **Code**: Empty component shells with basic React structure:
  ```typescript
  // Each component file
  import React from 'react';

  const ComponentName = () => {
    return <div>ComponentName</div>;
  };

  export default ComponentName;
  ```
- **Validation**: All files exist, `npx tsc --noEmit` succeeds, `npm run dev` runs without errors

## Task 5: Create TypeScript Type Definitions
**Brief Description**: Implement exact TypeScript types from SPEC.md Data Structure section using type syntax

- **Commands**: `npm run dev` (check for TypeScript errors)
- **Files**: `src/types/status.ts`, `src/types/task.ts`
- **Code**:
  ```typescript
  // src/types/status.ts
  export const Status = {
    ToDo: "todo",
    Completed: "completed",
  } as const;

  export type Status = (typeof Status)[keyof typeof Status];

  // src/types/task.ts
  import { Status } from "./status";

  export type TaskItem = {
    id: string;
    text: string;
    status: Status.Completed | Status.ToDo;
  }

  export type TaskList = {
    id: string;
    tasks: TaskItem[];
  }

  export type ListsState = Record<string, TaskList>;
  ```
- **Validation**: TypeScript compiles without type errors, types export correctly, can import in components

## Task 6: Create TopBar Component
**Brief Description**: Implement static header component per SPEC.md UI Components section

- **Commands**: `npm run dev`
- **Files**: `src/components/TopBar.tsx`
- **Code**:
  ```typescript
  const TopBar = () => {
    return (
      <header className="w-full h-16 bg-gray-100 border-b border-gray-300 flex items-center justify-center">
        <h1 className="text-xl font-bold text-gray-800">OpenTodo</h1>
      </header>
    );
  };

  export default TopBar;
  ```
- **Validation**: Header displays correctly at top of page, matches SPEC.md specifications, no TypeScript errors

## Task 7: Create TaskItem Component
**Brief Description**: Implement task component with checkbox and strikethrough functionality

- **Commands**: `npm run dev`
- **Files**: `src/components/TaskItem.tsx`
- **Code**:
  ```typescript
  import type { TaskItem as TaskItemType } from '../types/task';

  export type TaskItemProps = {
    task: TaskItemType;
    onUpdate: (updatedTask: TaskItemType) => void;
    onSelect: (task: TaskItemType) => void;
    isSelected: boolean;
  }

  const TaskItem = ({ task, onUpdate, onSelect, isSelected }: TaskItemProps) => {
    const handleToggle = () => {
      onUpdate({
        ...task,
        status: task.status === Status.ToDo ? Status.Completed : Status.ToDo
      });
    };

    const handleClick = () => {
      onSelect(task);
    };

    return (
      <div
        className={`p-3 border border-gray-200 rounded-md mb-2 cursor-pointer transition-colors ${
          isSelected ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
        }`}
        onClick={handleClick}
      >
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={task.status === Status.Completed}
            onChange={handleToggle}
            onClick={(e) => e.stopPropagation()}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <span
            className={`flex-1 ${
              task.status === Status.Completed 
                ? 'line-through text-gray-500' 
                : 'text-gray-800'
            }`}
          >
            {task.text}
          </span>
        </div>
      </div>
    );
  };

  export default TaskItem;
  ```
- **Validation**: Checkbox toggles completion status, strikethrough appears for completed tasks, selection styling works, TypeScript compiles

## Task 8: Create RightSidebar Component
**Brief Description**: Implement collapsible task details panel per SPEC.md

- **Commands**: `npm run dev`
- **Files**: `src/components/RightSidebar.tsx`
- **Code**:
  ```typescript
  import type { TaskItem } from '../types/task';

  export type RightSidebarProps = {
    task: TaskItem;
  }

  const RightSidebar = ({ task }: RightSidebarProps) => {
    return (
      <aside className="w-64 bg-gray-50 border-l border-gray-300 p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Task Details</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-1">Task Name</h4>
            <p className="text-gray-800">{task.text}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-1">Status</h4>
            <p className="text-gray-800 capitalize">{task.status}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-1">Future Enhancements</h4>
            <p className="text-sm text-gray-500">Categories, due dates, priorities coming soon...</p>
          </div>
        </div>
      </aside>
    );
  };

  export default RightSidebar;
  ```
- **Validation**: Task details display correctly, matches SPEC.md specifications, no TypeScript errors

## Task 9: Create AddTaskForm Component
**Brief Description**: Implement form for adding new tasks to current list

- **Commands**: `npm run dev`
- **Files**: `src/components/AddTaskForm.tsx`
- **Code**:
  ```typescript
  import { useState } from 'react';
  import { v4 as uuidv4 } from 'uuid';
  import type { TaskItem, Status, TaskList } from '../types/task';
  import { Status } from './types/status';

  export type AddTaskFormProps = {
    currentList: TaskList;
    setCurrentList: (list: TaskList) => void;
  }

  const AddTaskForm = ({ currentList, setCurrentList }: AddTaskFormProps) => {
    const [taskText, setTaskText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!taskText.trim()) return;

      const newTask: TaskItem = {
        id: uuidv4(),
        text: taskText.trim(),
        status: Status.ToDo,
      };

      setCurrentList({
        ...currentList,
        tasks: [newTask, ...currentList.tasks]
      });

      setTaskText('');
    };

    return (
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a new task..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </form>
    );
  };

  export default AddTaskForm;
  ```
- **Validation**: Can add tasks with text input, tasks appear at top of list, form clears after submission, no TypeScript errors

## Task 10: Create LeftSidebar Component
**Brief Description**: Implement list navigation sidebar with all task lists

- **Commands**: `npm run dev`
- **Files**: `src/components/LeftSidebar.tsx`
- **Code**:
  ```typescript
  import type { ListsState } from '../types/task';

  export type LeftSidebarProps = {
    lists: ListsState;
    selectedList: string;
    setSelectedList: (listName: string) => void;
  }

  const LeftSidebar = ({ lists, selectedList, setSelectedList }: LeftSidebarProps) => {
    return (
      <aside className="w-64 bg-gray-50 border-r border-gray-300 p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Lists</h2>
        <nav className="space-y-2">
          {Object.keys(lists).map((listName) => (
            <button
              key={listName}
              onClick={() => setSelectedList(listName)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                selectedList === listName
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {listName}
            </button>
          ))}
        </nav>
      </aside>
    );
  };

  export default LeftSidebar;
  ```
- **Validation**: Lists display in sidebar, click functionality works for navigation, styling matches design, no TypeScript errors

## Task 11: Create ListView Component
**Brief Description**: Implement main view component containing task list and RightSidebar

- **Commands**: `npm run dev`
- **Files**: `src/components/ListView.tsx`
- **Code**:
  ```typescript
  import { useState } from 'react';
  import type { TaskList, TaskItem } from '../types/task';
  import RightSidebar from './RightSidebar';
  import TaskItemComponent from './TaskItem';
  import AddTaskForm from './AddTaskForm';

  export type ListViewProps = {
    currentList: TaskList;
    setCurrentList: (list: TaskList) => void;
  }

  const ListView = ({ currentList, setCurrentList }: ListViewProps) => {
    const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

    const handleUpdateTask = (updatedTask: TaskItem) => {
      const updatedTasks = currentList.tasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      );
      setCurrentList({
        ...currentList,
        tasks: updatedTasks
      });
    };

    return (
      <div className="flex-1 flex">
        <div className="flex-1 p-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{currentList.id}</h2>
            <AddTaskForm 
              currentList={currentList}
              setCurrentList={setCurrentList}
            />
            <div className="space-y-2">
              {currentList.tasks.map((task) => (
                <TaskItemComponent
                  key={task.id}
                  task={task}
                  onUpdate={handleUpdateTask}
                  onSelect={setSelectedTask}
                  isSelected={selectedTask?.id === task.id}
                />
              ))}
            </div>
          </div>
        </div>
        {selectedTask && (
          <RightSidebar task={selectedTask} />
        )}
      </div>
    );
  };

  export default ListView;
  ```
- **Validation**: All task operations work, RightSidebar appears/disappears correctly on task selection, no TypeScript errors

## Task 12: Create App.tsx with Global State Management
**Brief Description**: Implement main App component with global state and localStorage integration per SPEC.md State Management

- **Commands**: `npm run dev`
- **Files**: `src/App.tsx`
- **Code**:
  ```typescript
  import { useState, useEffect } from 'react';
  import { v4 as uuidv4 } from 'uuid';
  import type { ListsState, TaskList, TaskItem } from './types/task';
  import { Status } from './types/status';
  import TopBar from './components/TopBar';
  import LeftSidebar from './components/LeftSidebar';
  import ListView from './components/ListView';

  const defaultData: Record<string, TaskList> = {
    Todo: {
      id: uuidv4(),
      tasks: [
        {
          id: uuidv4(),
          text: "Do something",
          status: Status.ToDo,
        },
      ],
    },
  };

  function App() {
    const [lists, setLists] = useState<ListsState>({});
    const [selectedList, setSelectedList] = useState<string>("Todo");

    useEffect(() => {
      const stored = localStorage.getItem('opentodo-data');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setLists(parsed);
        } catch (error) {
          setLists(defaultData);
        }
      } else {
        setLists(defaultData);
      }
    }, []);

    useEffect(() => {
      if (Object.keys(lists).length > 0) {
        localStorage.setItem('opentodo-data', JSON.stringify(lists));
      }
    }, [lists]);

    const currentList = lists[selectedList] || defaultData.Todo;

    return (
      <div className="h-screen flex flex-col">
        <TopBar />
        <div className="flex flex-1">
          <LeftSidebar 
            lists={lists} 
            selectedList={selectedList} 
            setSelectedList={setSelectedList} 
          />
          <ListView 
            currentList={currentList}
            setCurrentList={(updatedList) => {
              setLists(prev => ({
                ...prev,
                [selectedList]: updatedList
              }));
            }}
          />
        </div>
      </div>
    );
  }

  export default App;
  ```
- **Validation**: App loads successfully, localStorage persists data across refreshes, state management works correctly, no TypeScript errors

## Task 13: Update Main Entry Point and Clean Up Default Content
**Brief Description**: Update main entry point and remove default React content

- **Commands**: `npm run dev`
- **Files**: `src/main.tsx`, `src/App.css` (remove content)
- **Code**:
  ```typescript
  // src/main.tsx (replace content)
  import React from 'react'
  import ReactDOM from 'react-dom/client'
  import App from './App.tsx'
  import './index.css'

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )

  // src/App.css (clear all content)
  
  ```
- **Validation**: App renders correctly without default React content, no console errors, all components display

## Task 14: Complete Application Integration Testing
**Brief Description**: Test all functionality end-to-end and fix any integration issues

- **Commands**: 
  ```bash
  npm run build
  npm run preview
  ```
- **Files**: All component files as needed for fixes
- **Code**: Any necessary fixes for integration issues
- **Validation**: 
  - Application builds without errors
  - All features work: add tasks, toggle completion, select tasks, navigate lists
  - localStorage persistence works across page refreshes
  - No console errors
  - Three-panel layout displays correctly

## Task 15: Final Validation Against SPEC.md Requirements
**Brief Description**: Comprehensive testing against all SPEC.md success criteria

- **Commands**: 
  ```bash
  npm run build
  npx tsc --noEmit
  ```
- **Files**: All source files
- **Code**: No code changes - validation only
- **Validation**:
  - ✅ Users can add, edit, delete, and complete tasks
  - ✅ Data persists across browser sessions ('opentodo-data' in localStorage)
  - ✅ All core features work as expected
  - ✅ TypeScript compilation without errors
  - ✅ Code follows established patterns and conventions
  - ✅ Build process generates optimized bundle
  - ✅ Interface is intuitive and easy to use

## Task 16: Documentation and Code Quality Review
**Brief Description**: Final review and ensure code quality standards from AGENTS.md

- **Commands**: `npm run build` (final check)
- **Files**: All source files
- **Code**: Any final cleanup or formatting needed
- **Validation**: 
  - Clean, maintainable codebase
  - Follows all coding standards from AGENTS.md
  - Complete documentation adherence
  - Production-ready application