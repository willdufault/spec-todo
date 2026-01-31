import React from 'react';
import { Task } from '@/types/todo';

interface TodoItemProps {
  task: Task;
  isSelected: boolean;
  onSelect: () => void;
  onToggle: () => void;
  onDelete: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  task,
  isSelected,
  onSelect,
  onToggle,
  onDelete
}) => {
  return (
    <div
      className={`
        p-4 border rounded-lg cursor-pointer transition-all
        ${isSelected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
        }
      `.trim()}
      onClick={onSelect}
    >
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          onClick={(e) => e.stopPropagation()}
          className="task-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        
        <div className="flex-1">
          <p className={`
            text-base
            ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}
          `.trim()}>
            {task.title}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Created {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 opacity-0 hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Would implement edit functionality here
            }}
            className="p-1 text-gray-400 hover:text-blue-600"
            aria-label="Edit task"
          >
            ✏️
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 text-gray-400 hover:text-red-600"
            aria-label="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};