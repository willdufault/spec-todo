# Todo List App - Project Specification

## Overview

A simple, web-based todo list application built with React and TypeScript, designed for personal productivity. The app will provide basic task management functionality with local storage persistence. This is a single-page desktop application with no mobile responsiveness initially.

## Project Goals

- Create a minimal viable product (MVP) for personal task management
- Provide intuitive and simple user experience
- Ensure data persistence using browser local storage
- Build with modern web technologies (React + TypeScript)
- Maintain clean, maintainable codebase

## Technology Stack

### Frontend

- **React 19 (latest)** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Vite** - Build tool (recommended)
- **uuid** + **@types/uuid** - UUID generation for list and task IDs

### Data Storage

- **localStorage** - Browser local storage for persistence
- No backend database initially (designed for easy migration later)

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting

## Core Features

### 1. List Management

- **Create**: Add new lists with unique names
- **Read**: Display all lists in left sidebar
- **Update**: Edit list names
- **Delete**: Remove lists and their tasks

### 2. Task Management (CRUD)

- **Create**: Add new tasks to current list (appear at top of task list)
- **Read**: Display tasks in selected list with completion status
- **Update**: Mark tasks as complete/incomplete via checkbox
- **Delete**: Remove tasks from list

### 3. Task Organization

- Task text content (required)
- Task completion status (ToDo/Completed)
- Checkbox for completion toggle
- Strikethrough styling for completed tasks
- Task selection for detail view (right sidebar)

### 3. Data Persistence

- Lists and tasks saved to browser localStorage automatically
- Selected list/task reset to defaults on app reload
- Automatic data restoration from localStorage on app load
- Default data initialization for first-time users
- Storage key: 'opentodo-data'
- Data survives page refreshes, browser restarts, and extended periods

## UI Components

### Main Components

1. **TopBar** - Header with "OpenTodo" text centered
2. **LeftSidebar** - Vertical list of all task lists for navigation
3. **ListView** - Main view showing selected list with name, task input, task items, and contains RightSidebar
4. **TaskItem** - Individual task display with checkbox and text
5. **RightSidebar** - Collapsible panel showing selected task details (child of ListView)
6. **AddTaskForm** - Text input bar for adding new tasks to current list

### User Interactions

- Click list name in left sidebar to open that list in main view
- Click task item to show details in right sidebar (managed within ListView)
- Click checkbox to mark task as complete/incomplete (completed tasks show strikethrough text)
- Add new task via text input bar (new items appear at top of list with generated UUID)
- Tasks maintain position in list when completed (stay in original order)
- Right sidebar appears/disappears based on task selection (internal ListView state)
- Right sidebar contains task name and placeholder for future enhancements (categories, due dates, etc.)
- TaskItem components use task.id as React key for optimal rendering performance

### Layout

Three-panel desktop layout with fixed dimensions:

- **Top Bar**: Full-width header with "OpenTodo" text centered
- **Left Sidebar**: Fixed-width vertical list of all task lists (clickable navigation)
- **Main View**: Dynamic content area showing selected list with:
  - List name at top
  - Text input bar for new task items
  - Current list items below (new items appear at top)
- **Right Sidebar**: Collapsible panel for task details (visible only when task is selected)
- No mobile responsiveness (future consideration)

## Technical Requirements

### Architecture

- Component-based React architecture with encapsulated state
- TypeScript for type safety
- Functional components with hooks
- Global state in App.tsx (lists, selectedList)
- Local state in ListView (selectedTask)
- No external state management libraries
- localStorage persistence for lists and tasks only

### State Management

**Global State in App.tsx:**

```typescript
const [lists, setLists] = useState<Record<string, TaskList>>({})
const [selectedList, setSelectedList] = useState<string>("Todo")
```

**Local State in ListView.tsx:**

```typescript
const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null)
```

### Component Responsibilities

- **App.tsx**: Global lists management, layout container
- **LeftSidebar**: List navigation, calls setSelectedList
- **ListView**: Task management, selected task state, contains RightSidebar
- **RightSidebar**: Task details display (child of ListView)
- **TopBar**: Static header content

### Data Structure

```typescript
// Status enum using erasable syntax standards (no 'enum' keyword)
const Status = {
  ToDo: "todo",
  Completed: "completed",
} as const

type Status = (typeof Status)[keyof typeof Status]

// Individual task item within a list
type TaskItem = {
  id: string // UUIDv4 identifier for the task (used as React key)
  text: string // Task description/text
  status: Status.Completed | Status.ToDo // Task completion status
}

// Individual list containing tasks
type TaskList = {
  id: string // UUIDv4 identifier for the list
  tasks: TaskItem[] // Array of tasks in this list
}

// Main state type - direct Record type, no wrapper needed
type ListsState = Record<string, TaskList>
```

### Performance

- Minimal re-renders
- Lazy loading for large task lists (future enhancement)

### Layout Hierarchy

**App.tsx Layout Container:**

```
<div>
  <TopBar />
  <div>
    <LeftSidebar />
    <ListView /> {/* Contains main content + right sidebar */}
  </div>
</div>
```

**ListView Internal Layout:**

```
<div>
  <div>
    <ListHeader />
    <AddTaskForm />
    <TaskList />
  </div>
  {selectedTask && <RightSidebar task={selectedTask} />}
</div>
```

**Three-Panel Result:**

- Top: TopBar (full width)
- Left: LeftSidebar (fixed width)
- Center: Main content (flexible)
- Right: RightSidebar (conditional, fixed width)

### Component Props Pattern

**App.tsx → Children:**

- **LeftSidebar**: receives (lists, selectedList, setSelectedList)
- **ListView**: receives (currentList, setCurrentList)
- **TopBar**: no props needed (static content)

**ListView Internal State:**

- **selectedTask**: Local state for task selection
- **RightSidebar**: Receives (selectedTask) as child component

**No Prop Drilling:**

- Selected task state managed entirely within ListView
- RightSidebar accesses selected task as direct child
- TaskItem components call ListView's internal setSelectedTask

### Initial Data Setup

Default data structure for first-time users:

```typescript
const defaultData: Record<string, TaskList> = {
  Todo: {
    id: "generated-uuid",
    tasks: [
      {
        id: "generated-uuid",
        text: "Do something",
        status: Status.ToDo,
      },
    ],
  },
}
```

- Default list named "Todo" created automatically
- Default list selected automatically on first load
- Sample task "Do something" included for demonstration
- Users can immediately start interacting with the app

### Data Flow Examples

**List Selection Flow:**

1. User clicks list in LeftSidebar
2. LeftSidebar calls setSelectedList(listName)
3. App.tsx re-renders with new currentList
4. ListView receives new currentList prop

**Task Selection Flow:**

1. User clicks task in ListView
2. TaskItem calls ListView's internal setSelectedTask(task)
3. ListView re-renders with RightSidebar visible
4. RightSidebar receives selectedTask as prop

**Task Update Flow:**

1. User toggles task checkbox in ListView
2. ListView calls setCurrentList(updatedList) directly
3. App.tsx updates global lists state
4. Changes persisted to localStorage

### UUID Usage

Direct imports in components that need UUID generation:

```typescript
import { v4 as uuidv4 } from "uuid"

// Usage
const newTask = {
  id: uuidv4(),
  text: "Task text",
  status: Status.ToDo,
}
```

- No separate utility file needed
- Direct import pattern throughout components

## Non-Functional Requirements

### Accessibility

- Semantic HTML5 structure
- Keyboard navigation support
- ARIA labels where appropriate (future enhancement)
- Color contrast compliance (future enhancement)

### Security

- No sensitive data storage (localStorage is client-side only)
- Input validation and sanitization
- XSS protection

### Performance

- Fast initial load time
- Smooth interactions
- Efficient state updates

## Future Enhancements (Post-MVP)

1. **Backend Integration**
   - Replace localStorage with database
   - User authentication
   - Data synchronization

2. **Advanced Features**
   - Task categories/tags
   - Due dates and reminders
   - Task priorities
   - Task descriptions
   - Search and filter functionality

3. **UI/UX Improvements**
   - Dark mode support
   - Custom themes
   - Drag and drop reordering
   - Task statistics and analytics

4. **Future Mobile Support**
   - Mobile-first design (future consideration)
   - Touch-friendly interactions (future consideration)
   - Responsive layout (future consideration)

## Development Guidelines

### Code Quality

- Follow TypeScript best practices
- Use ESLint and Prettier for consistent code style
- Document complex logic with comments

## Project Structure

```

src/
├── components/
│ ├── TopBar.tsx
│ ├── LeftSidebar.tsx
│ ├── ListView.tsx (contains RightSidebar)
│ ├── TaskItem.tsx
│ ├── RightSidebar.tsx (child of ListView)
│ └── AddTaskForm.tsx
├── types/
│ ├── task.ts
│ └── status.ts
├── App.tsx (global lists state only)
├── index.tsx
└── App.css

```

## Success Criteria

1. **Functional Requirements Met**
   - Users can add, edit, delete, and complete tasks
   - Data persists across browser sessions
   - All core features work as expected

2. **Technical Requirements Met**
   - TypeScript compilation without errors
   - Code follows established patterns and conventions
   - Build process generates optimized bundle

3. **User Experience**
   - Interface is intuitive and easy to use
   - No critical bugs or issues
   - Performance is acceptable for typical use cases
