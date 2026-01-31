import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { TaskItem } from '../types/task';
import { Status } from '../types/status';
import type { TaskList } from '../types/task';

export type AddTaskFormProps = {
  currentList: TaskList;
  setCurrentList: (list: TaskList) => void;
}

const AddTaskForm = ({ currentList, setCurrentList }: AddTaskFormProps) => {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
      
      if (!taskText.trim()) return;

      const newTask: TaskItem = {
        id: uuidv4(),
        text: taskText.trim(),
        status: Status.ToDo,
      };

      setCurrentList({
        ...currentList,
        tasks: [newTask, ...currentList.tasks]
      });

      setTaskText('');
    };

  return (
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a new task..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </form>
    );
  };

  export default AddTaskForm;