import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { ListsState, TaskList } from './types/task';
import { Status } from './types/status';
import TopBar from './components/TopBar';
import LeftSidebar from './components/LeftSidebar';
import ListView from './components/ListView';

const defaultData: Record<string, TaskList> = {
  Todo: {
      id: uuidv4(),
      tasks: [
        {
          id: uuidv4(),
          text: "Do something",
          status: Status.ToDo,
        },
      ],
    },
  };

function App() {
  const [lists, setLists] = useState<ListsState>({});
  const [selectedList, setSelectedList] = useState<string>("Todo");

  useEffect(() => {
      const stored = localStorage.getItem('opentodo-data');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setLists(parsed);
        } catch (error) {
          setLists(defaultData);
        }
      } else {
        setLists(defaultData);
      }
  }, []);

  useEffect(() => {
      if (Object.keys(lists).length > 0) {
        localStorage.setItem('opentodo-data', JSON.stringify(lists));
      }
  }, [lists]);

  const currentList = lists[selectedList] || defaultData.Todo;

  return (
      <div className="h-screen flex flex-col">
        <TopBar />
        <div className="flex flex-1">
          <LeftSidebar 
            lists={lists} 
            selectedList={selectedList} 
            setSelectedList={setSelectedList} 
          />
          <ListView 
            currentList={currentList}
            setCurrentList={(updatedList) => {
              setLists(prev => ({
                ...prev,
                [selectedList]: updatedList
              }));
            }}
          />
        </div>
      </div>
  );
}

export default App;
