import type { TaskItem } from '../types/task';

export type RightSidebarProps = {
  task: TaskItem;
}

const RightSidebar = ({ task }: RightSidebarProps) => {
  return (
      <aside className="w-64 bg-gray-50 border-l border-gray-300 p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Task Details</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-1">Task Name</h4>
            <p className="text-gray-800">{task.text}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-1">Status</h4>
            <p className="text-gray-800 capitalize">{task.status}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-1">Future Enhancements</h4>
            <p className="text-sm text-gray-500">Categories, due dates, priorities coming soon...</p>
          </div>
        </div>
      </aside>
    );
  };

  export default RightSidebar;