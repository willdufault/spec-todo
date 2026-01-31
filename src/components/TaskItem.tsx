import type { TaskItem as TaskItemType } from '../types/task';
import { Status } from '../types/status';

export type TaskItemProps = {
  task: TaskItemType;
  onUpdate: (updatedTask: TaskItemType) => void;
  onSelect: (task: TaskItemType) => void;
  isSelected: boolean;
}

const TaskItem = ({ task, onUpdate, onSelect, isSelected }: TaskItemProps) => {
  const handleToggle = () => {
    onUpdate({
        ...task,
        status: task.status === Status.ToDo ? Status.Completed : Status.ToDo
      });
  };

  const handleClick = () => {
    onSelect(task);
  };

  return (
    <div
      className={`p-3 border border-gray-200 rounded-md mb-2 cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={task.status === Status.Completed}
          onChange={handleToggle}
          onClick={(e) => e.stopPropagation()}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
        <span
          className={`flex-1 ${
            task.status === Status.Completed 
              ? 'line-through text-gray-500' 
              : 'text-gray-800'
          }`}
        >
          {task.text}
        </span>
      </div>
    </div>
  );
};

export default TaskItem;