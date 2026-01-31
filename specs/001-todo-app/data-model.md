# Data Model: SpecTodo Web Application

**Purpose**: Define data structures and relationships for todo list application  
**Created**: 2026-01-31  
**Feature**: SpecTodo Web Application

## Core Entities

### TodoList

Represents a collection of tasks with organizational properties.

```typescript
interface TodoList {
  id: string              // Unique identifier (uuidv5)
  name: string            // Display name for the list
  tasks: Task[]          // Array of tasks in this list
  createdAt: number       // Creation timestamp (Unix epoch)
  updatedAt: number       // Last modification timestamp
  position: number        // Sort order in sidebar (lower = higher priority)
  color?: string         // Optional color coding for visual organization
  isDefault: boolean     // Whether this is the default list
}
```

**Validation Rules**:
- `name`: Required, 1-100 characters, no special characters except spaces and hyphens
- `position`: Non-negative integer, unique across all lists
- `color`: Optional, valid hex color code if provided
- `tasks`: Array, can be empty for new lists

### Task

Represents an individual actionable item within a todo list.

```typescript
interface Task {
  id: string              // Unique identifier (uuidv5)
  title: string           // Task description/title
  status: TaskStatus      // Current status of the task
  createdAt: number       // Creation timestamp
  completedAt?: number    // Completion timestamp (null if not completed)
  position: number        // Sort order within list (lower = higher priority)
  description?: string    // Optional detailed description
  priority?: Priority     // Optional priority level
  tags?: string[]         // Optional tags for categorization
  metadata?: TaskMetadata // Additional metadata
}
```

**Validation Rules**:
- `title`: Required, 1-500 characters, sanitized for XSS
- `position`: Non-negative integer, unique within parent list
- `description`: Optional, max 2000 characters if provided
- `tags`: Optional array, each tag max 50 characters, max 10 tags
- `priority`: Optional enum value if provided

### TaskStatus

Enumeration defining possible task states.

```typescript
enum TaskStatus {
  ToDo = 'ToDo',
  Completed = 'Completed'
}
```

**State Transitions**:
- `ToDo` → `Completed`: Mark task as completed, set `completedAt`
- `Completed` → `ToDo`: Mark task as incomplete, clear `completedAt`

### Priority

Enumeration for task prioritization.

```typescript
enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high'
}
```

### TaskMetadata

Additional metadata for enhanced task management.

```typescript
interface TaskMetadata {
  estimatedTime?: number   // Estimated completion time in minutes
  actualTime?: number      // Actual time spent in minutes
  dueDate?: number        // Due date timestamp
  category?: string       // Category for organization
  subtasks?: string[]     // Simple subtask list (future enhancement)
}
```

## Relationships

### List-Task Relationship

```
TodoList (1) ──────── (N) Task
```

- Each `TodoList` contains zero or more `Task` objects
- Each `Task` belongs to exactly one `TodoList`
- Deleting a `TodoList` cascades to delete all contained `Task` objects
- Task ordering is maintained within each list via `position` field

### Global State Structure

Overall application state for UI management.

```typescript
interface AppState {
  lists: TodoList[]              // All todo lists
  selectedListId: string | null   // Currently active list
  selectedTaskId: string | null   // Currently selected task for details
  uiState: UIState               // UI-specific state
  errors: AppStateError[]          // Error queue for user feedback
}

interface UIState {
  sidebarCollapsed: boolean        // Whether sidebar is collapsed
  detailPanelOpen: boolean        // Whether detail panel is open
  isCreatingList: boolean         // List creation modal state
  isEditingList: string | null   // List being edited (ID or null)
  isEditingTask: string | null   // Task being edited (ID or null)
  searchQuery: string            // Current search query
  filterStatus?: TaskStatus       // Current status filter
}

interface AppStateError {
  id: string                    // Unique error identifier
  message: string              // User-friendly error message
  type: ErrorType              // Error categorization
  timestamp: number            // Error occurrence time
  dismissible: boolean         // Whether user can dismiss
}

enum ErrorType {
  VALIDATION = 'validation',
  STORAGE = 'storage',
  NETWORK = 'network',
  SYSTEM = 'system'
}
```

## Data Operations

### List Operations

```typescript
interface ListOperations {
  createList: (name: string) => TodoList
  updateList: (id: string, updates: Partial<TodoList>) => TodoList
  deleteList: (id: string) => void
  reorderLists: (sourceIndex: number, targetIndex: number) => void
  selectList: (id: string) => void
}
```

### Task Operations

```typescript
interface TaskOperations {
  createTask: (listId: string, title: string) => Task
  updateTask: (taskId: string, updates: Partial<Task>) => Task
  deleteTask: (taskId: string) => void
  toggleTaskStatus: (taskId: string) => Task
  reorderTasks: (listId: string, sourceIndex: number, targetIndex: number) => void
  selectTask: (taskId: string | null) => void
}
```

## Storage Schema

### localStorage Keys

```typescript
const STORAGE_KEYS = {
  LISTS: 'spectodo_lists',           // Primary data storage
  UI_STATE: 'spectodo_ui_state',     // UI preferences
  APP_VERSION: 'spectodo_version',    // Schema version tracking
  USER_PREFERENCES: 'spectodo_prefs'  // User preferences
} as const
```

### Storage Format

```typescript
interface StoredData {
  version: string                    // Schema version for migration
  timestamp: number                  // Last save timestamp
  lists: TodoList[]                 // Current lists data
  checksum?: string                  // Data integrity verification
}

interface StoredUIState {
  version: string                    // UI state version
  sidebarCollapsed: boolean
  lastSelectedList: string | null
  preferences: UserPreferences
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  defaultListId: string | null
  autoSaveInterval: number          // Auto-save frequency in ms
  showCompletedTasks: boolean
  taskViewMode: 'list' | 'grid'
}
```

## Data Validation

### Input Sanitization

```typescript
interface ValidationRules {
  sanitizers: {
    html: (input: string) => string     // Remove HTML tags
    xss: (input: string) => string      // XSS protection
    length: (max: number) => (input: string) => string
  }
  
  validators: {
    required: (value: any) => boolean
    minLength: (min: number) => (value: string) => boolean
    maxLength: (max: number) => (value: string) => boolean
    unique: (existing: string[]) => (value: string) => boolean
    pattern: (regex: RegExp) => (value: string) => boolean
  }
}
```

### Business Logic Rules

1. **List Management**:
   - At least one list must always exist (default list)
   - List names must be unique within the application
   - Cannot delete the last remaining list
   - Position reordering maintains integer sequence

2. **Task Management**:
   - Task titles must be unique within their parent list
   - New tasks are added to position 0 (top of list)
   - Completed tasks remain in the list until explicitly deleted
   - Task positions are renumbered after reorder operations

3. **State Consistency**:
   - Selected list must always exist in lists array
   - Selected task must belong to selected list
   - UI state must reflect actual data state
   - Storage operations maintain ACID-like properties at client level

## Migration Strategy

### Version Management

```typescript
interface Migration {
  version: string                   // Target version
  description: string               // Migration description
  migrate: (data: any) => any     // Migration function
}

const MIGRATIONS: Migration[] = [
  {
    version: '1.0.0',
    description: 'Initial release version',
    migrate: (data) => data
  },
  // Future migrations will be added here
]
```

### Data Recovery

- Automatic backup creation before migrations
- Rollback capability for failed migrations
- Corruption detection with checksum validation
- Graceful degradation for incompatible data

This data model provides a robust foundation for the SpecTodo application while ensuring data integrity, performance, and scalability.