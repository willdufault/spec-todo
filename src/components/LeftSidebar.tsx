import type { ListsState } from '../types/task';

export type LeftSidebarProps = {
  lists: ListsState;
  selectedList: string;
  setSelectedList: (listName: string) => void;
}

const LeftSidebar = ({ lists, selectedList, setSelectedList }: LeftSidebarProps) => {
  return (
      <aside className="w-64 bg-gray-50 border-r border-gray-300 p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Lists</h2>
        <nav className="space-y-2">
          {Object.keys(lists).map((listName) => (
            <button
              key={listName}
              onClick={() => setSelectedList(listName)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                selectedList === listName
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {listName}
            </button>
          ))}
        </nav>
      </aside>
    );
  };

  export default LeftSidebar;