# API Contracts: SpecTodo Web Application

**Purpose**: Define internal API contracts for todo list application  
**Created**: 2026-01-31  
**Feature**: SpecTodo Web Application

## Storage API Contracts

### List Storage Operations

```typescript
interface ListStorageAPI {
  // CRUD Operations
  getLists(): TodoList[]
  getList(id: string): TodoList | null
  createList(list: Omit<TodoList, 'id' | 'createdAt' | 'updatedAt'>): TodoList
  updateList(id: string, updates: Partial<TodoList>): TodoList
  deleteList(id: string): boolean
  
  // Utility Operations
  saveLists(lists: TodoList[]): boolean
  validateList(list: TodoList): ValidationResult
  generateListId(): string
}

interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

interface ValidationError {
  field: string
  message: string
  code: string
}
```

### Task Storage Operations

```typescript
interface TaskStorageAPI {
  // CRUD Operations
  getTasks(listId: string): Task[]
  getTask(taskId: string): Task | null
  createTask(listId: string, task: Omit<Task, 'id' | 'createdAt'>): Task
  updateTask(taskId: string, updates: Partial<Task>): Task
  deleteTask(taskId: string): boolean
  
  // Utility Operations
  validateTask(task: Task): ValidationResult
  generateTaskId(): string
  reorderTasks(listId: string, taskIds: string[]): boolean
}
```

## State Management Contracts

### Application State Manager

```typescript
interface AppStateManager {
  // State Access
  getState(): AppState
  getLists(): TodoList[]
  getSelectedList(): TodoList | null
  getSelectedTask(): Task | null
  
  // List Operations
  createList(name: string): Promise<TodoList>
  updateList(id: string, updates: Partial<TodoList>): Promise<TodoList>
  deleteList(id: string): Promise<boolean>
  selectList(id: string): void
  reorderLists(sourceIndex: number, targetIndex: number): void
  
  // Task Operations
  createTask(listId: string, title: string): Promise<Task>
  updateTask(taskId: string, updates: Partial<Task>): Promise<Task>
  deleteTask(taskId: string): Promise<boolean>
  toggleTaskStatus(taskId: string): Promise<Task>
  selectTask(taskId: string | null): void
  reorderTasks(listId: string, sourceIndex: number, targetIndex: number): void
  
  // UI Operations
  toggleSidebar(): void
  toggleDetailPanel(): void
  setCreatingList(creating: boolean): void
  setEditingList(listId: string | null): void
  setEditingTask(taskId: string | null): void
  
  // Error Handling
  addError(error: AppStateError): void
  clearErrors(): void
  dismissError(errorId: string): void
}
```

### Event System

```typescript
interface EventSystem {
  // Event Subscription
  subscribe<T extends AppEvent>(eventType: T['type'], handler: (event: T) => void): string
  unsubscribe(subscriptionId: string): void
  
  // Event Publishing
  publish<T extends AppEvent>(event: T): void
}

type AppEvent = 
  | ListCreatedEvent
  | ListUpdatedEvent
  | ListDeletedEvent
  | TaskCreatedEvent
  | TaskUpdatedEvent
  | TaskDeletedEvent
  | ListSelectedEvent
  | TaskSelectedEvent
  | ErrorEvent

interface BaseEvent {
  type: string
  timestamp: number
  source: string
}

interface ListCreatedEvent extends BaseEvent {
  type: 'LIST_CREATED'
  listId: string
  listName: string
}

interface ListUpdatedEvent extends BaseEvent {
  type: 'LIST_UPDATED'
  listId: string
  changes: Partial<TodoList>
}

interface ListDeletedEvent extends BaseEvent {
  type: 'LIST_DELETED'
  listId: string
  listName: string
}

interface TaskCreatedEvent extends BaseEvent {
  type: 'TASK_CREATED'
  taskId: string
  taskTitle: string
  listId: string
}

interface TaskUpdatedEvent extends BaseEvent {
  type: 'TASK_UPDATED'
  taskId: string
  changes: Partial<Task>
}

interface TaskDeletedEvent extends BaseEvent {
  type: 'TASK_DELETED'
  taskId: string
  taskTitle: string
  listId: string
}

interface ListSelectedEvent extends BaseEvent {
  type: 'LIST_SELECTED'
  listId: string
  previousListId: string | null
}

interface TaskSelectedEvent extends BaseEvent {
  type: 'TASK_SELECTED'
  taskId: string | null
  listId: string | null
}

interface ErrorEvent extends BaseEvent {
  type: 'ERROR_OCCURRED'
  error: AppStateError
}
```

## Component Contracts

### Layout Components

```typescript
// Header Component Props
interface HeaderProps {
  title: string
  subtitle?: string
  actions?: HeaderAction[]
  className?: string
}

interface HeaderAction {
  label: string
  icon?: ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'danger'
}

// Sidebar Component Props
interface SidebarProps {
  lists: TodoList[]
  selectedListId: string | null
  isCreatingList: boolean
  editingListId: string | null
  collapsed: boolean
  onListSelect: (listId: string) => void
  onListCreate: (name: string) => void
  onListRename: (listId: string, name: string) => void
  onListDelete: (listId: string) => void
  onListReorder: (sourceIndex: number, targetIndex: number) => void
  onToggleCollapse: () => void
  className?: string
}

// Main Panel Component Props
interface MainPanelProps {
  list: TodoList | null
  selectedTaskId: string | null
  editingTaskId: string | null
  onTaskCreate: (title: string) => void
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void
  onTaskDelete: (taskId: string) => void
  onTaskSelect: (taskId: string) => void
  onTaskToggle: (taskId: string) => void
  onTaskReorder: (sourceIndex: number, targetIndex: number) => void
  className?: string
}

// Detail Panel Component Props
interface DetailPanelProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
  onUpdate: (taskId: string, updates: Partial<Task>) => void
  onDelete: (taskId: string) => void
  className?: string
}
```

### Todo Components

```typescript
// Todo List Component Props
interface TodoListProps {
  tasks: Task[]
  selectedTaskId: string | null
  editingTaskId: string | null
  showCompleted?: boolean
  filterStatus?: TaskStatus
  onTaskSelect: (taskId: string) => void
  onTaskToggle: (taskId: string) => void
  onTaskEdit: (taskId: string) => void
  onTaskDelete: (taskId: string) => void
  onTaskReorder: (sourceIndex: number, targetIndex: number) => void
  className?: string
}

// Todo Item Component Props
interface TodoItemProps {
  task: Task
  isSelected: boolean
  isEditing: boolean
  onSelect: (taskId: string) => void
  onToggle: (taskId: string) => void
  onEdit: (taskId: string) => void
  onDelete: (taskId: string) => void
  className?: string
}

// Todo Form Component Props
interface TodoFormProps {
  placeholder?: string
  onSubmit: (title: string) => void
  onCancel?: () => void
  initialValue?: string
  autoFocus?: boolean
  className?: string
}

// List Manager Component Props
interface ListManagerProps {
  lists: TodoList[]
  selectedListId: string | null
  isCreating: boolean
  editingListId: string | null
  onListCreate: (name: string) => void
  onListRename: (listId: string, name: string) => void
  onListDelete: (listId: string) => void
  className?: string
}
```

## Hook Contracts

### Custom Hooks

```typescript
// useLocalStorage Hook
interface UseLocalStorageReturn<T> {
  value: T
  setValue: (value: T) => boolean
  isLoading: boolean
  error: string | null
  isSupported: boolean
}

interface UseLocalStorageOptions<T> {
  defaultValue: T
  key: string
  serialize?: (value: T) => string
  deserialize?: (value: string) => T
  onError?: (error: Error) => void
}

// useTodoLists Hook
interface UseTodoListsReturn {
  lists: TodoList[]
  selectedListId: string | null
  selectedTaskId: string | null
  isLoading: boolean
  error: string | null
  
  // List operations
  createList: (name: string) => Promise<TodoList>
  updateList: (id: string, updates: Partial<TodoList>) => Promise<TodoList>
  deleteList: (id: string) => Promise<boolean>
  selectList: (id: string) => void
  reorderLists: (sourceIndex: number, targetIndex: number) => void
  
  // Task operations
  createTask: (listId: string, title: string) => Promise<Task>
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<Task>
  deleteTask: (taskId: string) => Promise<boolean>
  toggleTaskStatus: (taskId: string) => Promise<Task>
  selectTask: (taskId: string | null) => void
  reorderTasks: (listId: string, sourceIndex: number, targetIndex: number) => void
}

// useDebounce Hook
interface UseDebounceReturn<T> {
  debouncedValue: T
  setDebouncedValue: (value: T) => void
  isPending: boolean
  cancel: () => void
}

interface UseDebounceOptions {
  delay: number
  leading?: boolean
  trailing?: boolean
}
```

## Utility Contracts

### ID Generation

```typescript
interface IDGenerator {
  generateListId(): string
  generateTaskId(): string
  generateErrorId(): string
  generateSubscriptionId(): string
}

interface IDGeneratorOptions {
  namespace?: string
  prefix?: string
  timestamp?: boolean
}
```

### Validation

```typescript
interface Validator<T> {
  validate(value: T): ValidationResult
  sanitize(value: T): T
  normalize(value: T): T
}

interface ListValidator extends Validator<TodoList> {
  rules: {
    name: ValidationRule<string>
    position: ValidationRule<number>
    color?: ValidationRule<string>
  }
}

interface TaskValidator extends Validator<Task> {
  rules: {
    title: ValidationRule<string>
    status: ValidationRule<TaskStatus>
    position: ValidationRule<number>
    description?: ValidationRule<string>
    priority?: ValidationRule<Priority>
  }
}

interface ValidationRule<T> {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: T) => boolean
  message?: string
}
```

## Performance Contracts

### Virtual Scrolling

```typescript
interface VirtualScrollProps {
  items: any[]
  itemHeight: number
  containerHeight: number
  renderItem: (item: any, index: number) => ReactNode
  overscan?: number
  className?: string
}

interface VirtualScrollReturn {
  visibleItems: any[]
  totalHeight: number
  scrollTop: number
  setScrollTop: (scrollTop: number) => void
}
```

### Debouncing

```typescript
interface Debouncer<T> {
  debounced: T
  update: (value: T) => void
  cancel: () => void
  flush: () => void
  isPending: boolean
}

interface DebounceOptions {
  delay: number
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}
```

These contracts define the internal API boundaries and ensure consistent interfaces across the application components, hooks, and utilities.