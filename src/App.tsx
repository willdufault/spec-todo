import React, { useEffect } from 'react';
import { useTodoLists } from '@/hooks/useTodoLists';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { MainPanel } from '@/components/layout/MainPanel';
import { DetailPanel } from '@/components/layout/DetailPanel';

const App: React.FC = () => {
  const todoLists = useTodoLists();

  const handleListSelect = (listId: string) => {
    todoLists.selectList(listId);
  };

  const handleTaskSelect = (taskId: string) => {
    todoLists.selectTask(taskId);
  };

  const handleTaskToggle = (taskId: string) => {
    todoLists.toggleTaskStatus(taskId);
  };

  const handleTaskCreate = (title: string) => {
    if (todoLists.selectedListId) {
      todoLists.createTask(todoLists.selectedListId, title);
    }
  };

  const handleTaskUpdate = (taskId: string, updates: any) => {
    todoLists.updateTask(taskId, updates);
  };

  const handleTaskDelete = (taskId: string) => {
    todoLists.deleteTask(taskId);
  };

  const handleSidebarToggle = () => {
    todoLists.toggleSidebar();
  };

  const handleCreateList = (name: string) => {
    todoLists.createList(name);
  };

  const handleListRename = (listId: string, name: string) => {
    todoLists.updateList(listId, { name });
  };

  const handleListDelete = (listId: string) => {
    todoLists.deleteList(listId);
  };

  // Close detail panel when clicking outside
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const detailPanel = document.getElementById('detail-panel');
      
      if (detailPanel && !detailPanel.contains(target) && todoLists.selectedTaskId) {
        todoLists.selectTask(null);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [todoLists.selectedTaskId]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        title="SpecTodo"
        actions={[
          {
            label: 'Toggle Sidebar',
            onClick: handleSidebarToggle
          }
        ]}
      />
      
      {/* Main Content */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <Sidebar
          lists={todoLists.lists}
          selectedListId={todoLists.selectedListId}
          isCreatingList={todoLists.uiState.isCreatingList}
          editingListId={todoLists.uiState.isEditingList}
          collapsed={todoLists.uiState.sidebarCollapsed}
          onListSelect={handleListSelect}
          onListCreate={handleCreateList}
          onListRename={handleListRename}
          onListDelete={handleListDelete}
          onToggleCollapse={handleSidebarToggle}
          onSetCreatingList={todoLists.setCreatingList}
          onSetEditingList={todoLists.setEditingList}
          className={todoLists.uiState.sidebarCollapsed ? 'w-16' : 'w-64'}
        />
        
        {/* Main Panel */}
        <MainPanel
          list={todoLists.getSelectedList()}
          selectedTaskId={todoLists.selectedTaskId}
          onTaskCreate={handleTaskCreate}
          onTaskDelete={handleTaskDelete}
          onTaskSelect={handleTaskSelect}
          onTaskToggle={handleTaskToggle}
        />
        
        {/* Detail Panel */}
        <div id="detail-panel" className="w-80 relative">
          <DetailPanel
            task={todoLists.getSelectedTask()}
            isOpen={!!todoLists.getSelectedTask()}
            onUpdate={handleTaskUpdate}
            onDelete={handleTaskDelete}
            onClose={() => todoLists.selectTask(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default App;