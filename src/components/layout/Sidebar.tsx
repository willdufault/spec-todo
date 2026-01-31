import React, { useState } from 'react';
import { TodoList } from '@/types/todo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { validateListName } from '@/utils/validation';

interface SidebarProps {
  lists: TodoList[];
  selectedListId: string | null;
  isCreatingList: boolean;
  editingListId: string | null;
  collapsed: boolean;
  onListSelect: (id: string) => void;
  onListCreate: (name: string) => void;
  onListRename: (id: string, name: string) => void;
  onListDelete: (id: string) => void;
  onToggleCollapse: () => void;
  onSetCreatingList: (creating: boolean) => void;
  onSetEditingList: (id: string | null) => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  lists,
  selectedListId,
  isCreatingList,
  editingListId,
  collapsed,
  onListSelect,
  onListCreate,
  onListRename,
  onListDelete,
  onToggleCollapse,
  onSetCreatingList,
  onSetEditingList,
  className = ''
}) => {
  const [newListName, setNewListName] = useState('');
  const [editingName, setEditingName] = useState('');
  const [errors, setErrors] = useState<string | null>(null);

  const handleCreateList = () => {
    const error = validateListName(newListName);
    if (error) {
      setErrors(error);
      return;
    }
    
    onListCreate(newListName);
    setNewListName('');
    setErrors(null);
  };

  const handleRenameList = (listId: string) => {
    const error = validateListName(editingName);
    if (error) {
      setErrors(error);
      return;
    }
    
    onListRename(listId, editingName);
    setEditingName('');
    setErrors(null);
  };

  if (collapsed) {
    return (
      <div className={`${className} bg-gray-50 border-r border-gray-200 flex flex-col items-center py-4`}>
        <Button
          onClick={onToggleCollapse}
          variant="secondary"
          size="sm"
          className="mb-4"
          aria-label="Expand sidebar"
        >
          →
        </Button>
      </div>
    );
  }

  return (
    <div className={`${className} bg-gray-50 border-r border-gray-200 flex flex-col`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Lists</h2>
          <Button
            onClick={onToggleCollapse}
            variant="secondary"
            size="sm"
            aria-label="Collapse sidebar"
          >
            ←
          </Button>
        </div>
        
        {isCreatingList ? (
          <div className="space-y-2">
            <Input
              value={newListName}
              onChange={setNewListName}
              placeholder="New list name"
              error={errors || undefined}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleCreateList();
                }
              }}
            />
            <div className="flex space-x-2">
              <Button onClick={handleCreateList} size="sm">
                Add
              </Button>
              <Button onClick={() => {
                setNewListName('');
                onSetCreatingList(false);
              }} variant="secondary" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button onClick={() => {
            setNewListName('New List');
            onSetCreatingList(true);
          }} className="w-full">
            + New List
          </Button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {lists.map(list => (
            <li key={list.id}>
              {editingListId === list.id ? (
                <div className="space-y-2">
                  <Input
                    value={editingName || list.name}
                    onChange={setEditingName}
                  error={errors || undefined}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleRenameList(list.id);
                    }
                  }}
                  />
                  <div className="flex space-x-2">
                    <Button onClick={() => handleRenameList(list.id)} size="sm">
                      Save
                    </Button>
                    <Button 
                      onClick={() => {
                        setEditingName('');
                        onSetEditingList(null);
                      }} 
                      variant="secondary" 
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className={`
                    px-3 py-2 rounded-lg cursor-pointer transition-colors
                    flex items-center justify-between group
                    ${selectedListId === list.id 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'hover:bg-gray-200 text-gray-700'
                    }
                  `.trim()}
                >
                  <span
                    onClick={() => onListSelect(list.id)}
                    className="flex-1"
                  >
                    {list.name}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                    <Button
                      onClick={(e) => {
                        e?.stopPropagation();
                        setEditingName(list.name);
                        onSetEditingList(list.id);
                      }}
                      variant="secondary"
                      size="sm"
                      className="px-2 py-1 text-xs"
                    >
                      Edit
                    </Button>
                    {lists.length > 1 && (
                      <Button
                        onClick={(e) => {
                          e?.stopPropagation();
                          onListDelete(list.id);
                        }}
                        variant="danger"
                        size="sm"
                        className="px-2 py-1 text-xs"
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};