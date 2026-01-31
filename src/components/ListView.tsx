import { useState } from 'react';
import type { TaskList, TaskItem } from '../types/task';
import RightSidebar from './RightSidebar';
import TaskItemComponent from './TaskItem';
import AddTaskForm from './AddTaskForm';

export type ListViewProps = {
  currentList: TaskList;
  setCurrentList: (list: TaskList) => void;
}

const ListView = ({ currentList, setCurrentList }: ListViewProps) => {
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

  const handleUpdateTask = (updatedTask: TaskItem) => {
    const updatedTasks = currentList.tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setCurrentList({
        ...currentList,
        tasks: updatedTasks
      });
  };

  return (
      <div className="flex-1 flex">
        <div className="flex-1 p-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{currentList.id}</h2>
            <AddTaskForm 
              currentList={currentList}
              setCurrentList={setCurrentList}
            />
            <div className="space-y-2">
              {currentList.tasks.map((task) => (
                <TaskItemComponent
                  key={task.id}
                  task={task}
                  onUpdate={handleUpdateTask}
                  onSelect={setSelectedTask}
                  isSelected={selectedTask?.id === task.id}
                />
              ))}
            </div>
          </div>
        </div>
        {selectedTask && (
          <RightSidebar task={selectedTask} />
        )}
      </div>
    );
  };

  export default ListView;