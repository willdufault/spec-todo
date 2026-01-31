import React from 'react';
import { Task } from '@/types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  tasks: Task[];
  selectedTaskId: string | null;
  onTaskSelect: (taskId: string) => void;
  onTaskToggle: (taskId: string) => void;
  onTaskDelete: (taskId: string) => void;
  className?: string;
}

export const TodoList: React.FC<TodoListProps> = ({
  tasks,
  selectedTaskId,
  onTaskSelect,
  onTaskToggle,
  onTaskDelete,
  className = ''
}) => {
  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by completion status first, then by creation date
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className={`space-y-2 ${className}`}>
      {sortedTasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          isSelected={selectedTaskId === task.id}
          onSelect={() => onTaskSelect(task.id)}
          onToggle={() => onTaskToggle(task.id)}
          onDelete={() => onTaskDelete(task.id)}
        />
      ))}
    </div>
  );
};