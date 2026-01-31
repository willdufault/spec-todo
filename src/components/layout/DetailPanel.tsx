import React from 'react';
import { Task } from '@/types/todo';
import { Button } from '@/components/ui/Button';

interface DetailPanelProps {
  task?: Task;
  isOpen: boolean;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
  onClose: () => void;
  className?: string;
}

export const DetailPanel: React.FC<DetailPanelProps> = ({
  task,
  isOpen,
  onUpdate,
  onDelete,
  onClose,
  className = ''
}) => {
  if (!isOpen || !task) {
    return (
      <div className={`${className} bg-gray-50 border-l border-gray-200 p-6`}>
        <div className="text-center">
          <p className="text-gray-500">
            Select a task to view details
          </p>
        </div>
      </div>
    );
  }

  const handleToggleComplete = () => {
    onUpdate(task.id, { completed: !task.completed });
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div className={`${className} bg-white border-l border-gray-200 overflow-y-auto`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Task Details
          </h3>
          <Button
            onClick={onClose}
            variant="secondary"
            size="sm"
            aria-label="Close details"
          >
            ×
          </Button>
        </div>
        
        <div className="space-y-6">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <p className={`
              text-base
              ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}
            `.trim()}>
              {task.title}
            </p>
          </div>
          
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex items-center space-x-3">
              <span className={`
                px-3 py-1 rounded-full text-sm font-medium
                ${task.completed 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
                }
              `.trim()}>
                {task.completed ? 'Completed' : 'Active'}
              </span>
              <Button
                onClick={handleToggleComplete}
                variant="secondary"
                size="sm"
              >
                {task.completed ? 'Mark as Active' : 'Mark as Complete'}
              </Button>
            </div>
          </div>
          
          {/* Dates */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Created
              </label>
              <p className="text-sm text-gray-600">
                {new Date(task.createdAt).toLocaleString()}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Updated
              </label>
              <p className="text-sm text-gray-600">
                {new Date(task.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
          
          {/* Actions */}
          <div className="pt-4 border-t border-gray-200">
            <Button
              onClick={handleDelete}
              variant="danger"
              className="w-full"
            >
              Delete Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};