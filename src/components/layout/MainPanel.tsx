import React from 'react';
import { TodoList } from '@/types/todo';
import { TodoForm } from '@/components/todo/TodoForm';
import { TodoList as TodoListComponent } from '@/components/todo/TodoList';

interface MainPanelProps {
  list?: TodoList;
  selectedTaskId: string | null;
  onTaskCreate: (title: string) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskSelect: (taskId: string) => void;
  onTaskToggle: (taskId: string) => void;
  className?: string;
}

export const MainPanel: React.FC<MainPanelProps> = ({
  list,
  selectedTaskId,
  onTaskCreate,
  onTaskDelete,
  onTaskSelect,
  onTaskToggle,
  className = ''
}) => {
  if (!list) {
    return (
      <div className={`${className} bg-white flex items-center justify-center`}>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No List Selected
          </h2>
          <p className="text-gray-600">
            Select a list from the sidebar to start managing tasks
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} bg-white flex flex-col`}>
      {/* List Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {list.name}
        </h2>
        <TodoForm
          onSubmit={onTaskCreate}
          placeholder="Add a new task..."
          submitText="Add Task"
        />
      </div>
      
      {/* Tasks */}
      <div className="flex-1 overflow-y-auto p-6">
        {list.tasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No tasks yet. Add your first task above to get started.
            </p>
          </div>
        ) : (
          <TodoListComponent
            tasks={list.tasks}
            selectedTaskId={selectedTaskId}
            onTaskSelect={onTaskSelect}
            onTaskToggle={onTaskToggle}
            onTaskDelete={onTaskDelete}
          />
        )}
      </div>
    </div>
  );
};