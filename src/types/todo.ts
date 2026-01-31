export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoList {
  id: string;
  name: string;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoState {
  lists: TodoList[];
  selectedListId: string | null;
  selectedTaskId: string | null;
  uiState: {
    sidebarCollapsed: boolean;
    isCreatingList: boolean;
    isEditingList: string | null;
    isEditingTask: string | null;
  };
}

export interface TodoActions {
  // List operations
  createList: (name: string) => void;
  updateList: (id: string, updates: Partial<TodoList>) => void;
  deleteList: (id: string) => void;
  selectList: (id: string | null) => void;
  
  // Task operations
  createTask: (listId: string, title: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  selectTask: (id: string | null) => void;
  
  // UI operations
  toggleSidebar: () => void;
  setCreatingList: (creating: boolean) => void;
  setEditingList: (id: string | null) => void;
  setEditingTask: (id: string | null) => void;
  
  // Getters
  getSelectedList: () => TodoList | undefined;
  getSelectedTask: () => Task | undefined;
}