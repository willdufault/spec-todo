import { useImmer } from 'use-immer';
import { generateId } from '@/utils/idGeneration';
import { TodoState, TodoActions, Task, TodoList } from '@/types/todo';

const initialState: TodoState = {
  lists: [
    {
      id: 'default',
      name: 'Default List',
      tasks: [
        {
          id: generateId(),
          title: 'Do something',
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  selectedListId: 'default',
  selectedTaskId: null,
  uiState: {
    sidebarCollapsed: false,
    isCreatingList: false,
    isEditingList: null,
    isEditingTask: null
  }
};

export const useTodoLists = (): TodoState & TodoActions => {
  const [state, setState] = useImmer<TodoState>(initialState);

  const createList = (name: string) => {
    setState(draft => {
      const newList: TodoList = {
        id: generateId(),
        name: name.trim(),
        tasks: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      draft.lists.push(newList);
      draft.selectedListId = newList.id;
      draft.uiState.isCreatingList = false;
    });
  };

  const updateList = (id: string, updates: Partial<TodoList>) => {
    setState(draft => {
      const list = draft.lists.find(l => l.id === id);
      if (list) {
        Object.assign(list, updates, { updatedAt: new Date() });
        draft.uiState.isEditingList = null;
      }
    });
  };

  const deleteList = (id: string) => {
    setState(draft => {
      draft.lists = draft.lists.filter(l => l.id !== id);
      if (draft.selectedListId === id) {
        draft.selectedListId = draft.lists.length > 0 ? draft.lists[0].id : null;
      }
      if (draft.selectedListId === null) {
        draft.selectedTaskId = null;
      }
    });
  };

  const selectList = (id: string | null) => {
    setState(draft => {
      draft.selectedListId = id;
      draft.selectedTaskId = null;
    });
  };

  const createTask = (listId: string, title: string) => {
    setState(draft => {
      const list = draft.lists.find(l => l.id === listId);
      if (list) {
        const newTask: Task = {
          id: generateId(),
          title: title.trim(),
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        list.tasks.push(newTask);
        list.updatedAt = new Date();
      }
    });
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setState(draft => {
      for (const list of draft.lists) {
        const task = list.tasks.find(t => t.id === id);
        if (task) {
          Object.assign(task, updates, { updatedAt: new Date() });
          list.updatedAt = new Date();
          draft.uiState.isEditingTask = null;
          break;
        }
      }
    });
  };

  const deleteTask = (id: string) => {
    setState(draft => {
      for (const list of draft.lists) {
        const taskIndex = list.tasks.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
          list.tasks.splice(taskIndex, 1);
          list.updatedAt = new Date();
          if (draft.selectedTaskId === id) {
            draft.selectedTaskId = null;
          }
          break;
        }
      }
    });
  };

  const toggleTaskStatus = (id: string) => {
    setState(draft => {
      for (const list of draft.lists) {
        const task = list.tasks.find(t => t.id === id);
        if (task) {
          task.completed = !task.completed;
          task.updatedAt = new Date();
          list.updatedAt = new Date();
          break;
        }
      }
    });
  };

  const selectTask = (id: string | null) => {
    setState(draft => {
      draft.selectedTaskId = id;
    });
  };

  const toggleSidebar = () => {
    setState(draft => {
      draft.uiState.sidebarCollapsed = !draft.uiState.sidebarCollapsed;
    });
  };

  const setCreatingList = (creating: boolean) => {
    setState(draft => {
      draft.uiState.isCreatingList = creating;
    });
  };

  const setEditingList = (id: string | null) => {
    setState(draft => {
      draft.uiState.isEditingList = id;
    });
  };

  const setEditingTask = (id: string | null) => {
    setState(draft => {
      draft.uiState.isEditingTask = id;
    });
  };

  const getSelectedList = () => {
    return state.lists.find(l => l.id === state.selectedListId);
  };

  const getSelectedTask = () => {
    for (const list of state.lists) {
      const task = list.tasks.find(t => t.id === state.selectedTaskId);
      if (task) return task;
    }
    return undefined;
  };

  return {
    ...state,
    createList,
    updateList,
    deleteList,
    selectList,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    selectTask,
    toggleSidebar,
    setCreatingList,
    setEditingList,
    setEditingTask,
    getSelectedList,
    getSelectedTask
  };
};