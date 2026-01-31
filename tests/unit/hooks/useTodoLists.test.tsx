import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { useTodoLists } from '@/hooks/useTodoLists';
import { TodoList, Task, TaskStatus } from '@/types/todo';
import { generateTaskId, generateListId } from '@/utils/idGeneration';

// Mock the dependencies
vi.mock('@/utils/idGeneration');
vi.mock('@/utils/validation', () => ({
  validateTask: vi.fn(() => ({ isValid: true, errors: [] })),
  validateList: vi.fn(() => ({ isValid: true, errors: [] })),
  isTaskTitleUnique: vi.fn(() => true),
  isListNameUnique: vi.fn(() => true)
}));

const mockUseTodoListsStorage = {
  value: [],
  setValue: vi.fn().mockReturnValue(true),
  isLoading: false,
  error: null,
  isSupported: true
};

vi.mock('@/hooks/useLocalStorage', () => ({
  useTodoListsStorage: vi.fn(() => mockUseTodoListsStorage)
}));

const mockGenerateTaskId = vi.mocked(generateTaskId);
const mockGenerateListId = vi.mocked(generateListId);

describe('useTodoLists', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup default mock values
    mockGenerateTaskId.mockReturnValue('task-1');
    mockGenerateListId.mockReturnValue('list-1');
  });

  it('should initialize with default list when no lists exist', () => {
    const mockUseTodoLists = vi.mocked(useTodoLists);
    const { createTask } = mockUseTodoLists();

    await createTask('list-1', 'New Task');

    // Check that task was added to the correct list
    expect(mockSetValue).toHaveBeenCalledTimes(1);
    const savedLists = mockSetValue.mock.calls[0][0];
    expect(savedLists[0]).toHaveLength(1);
    expect(savedLists[0].tasks).toHaveLength(1);
    expect(savedLists[0].tasks[0].title).toBe('New Task');
    expect(savedLists[0].tasks[0].status).toBe(TaskStatus.ToDo);
    expect(savedLists[0].tasks[0].position).toBe(0); // Top of list
  });

  it('should toggle task status successfully', async () => {
    const initialTask: Task = {
      id: 'task-1',
      title: 'Test Task',
      status: TaskStatus.ToDo,
      createdAt: Date.now(),
      position: 0
    };

    const mockUseTodoListsStorage = vi.mocked(useTodoListsStorage);
    const mockSetValue = vi.fn();
    
    mockUseTodoListsStorage.mockReturnValue({
      value: [{ id: 'list-1', name: 'Test List', tasks: [initialTask], createdAt: Date.now(), updatedAt: Date.now(), position: 0, isDefault: false }],
      setValue: mockSetValue,
      isLoading: false,
      error: null,
      isSupported: true
    });

    const mockUseTodoLists = vi.mocked(useTodoLists);
    const { toggleTaskStatus } = mockUseTodoLists();

    await toggleTaskStatus('task-1');

    // Check that task status was toggled
    expect(mockSetValue).toHaveBeenCalledTimes(1);
    const savedLists = mockSetValue.mock.calls[0][0];
    expect(savedLists[0].tasks[0].status).toBe(TaskStatus.Completed);
    expect(savedLists[0].tasks[0].completedAt).toBeDefined();
  });

  it('should handle task creation validation errors', async () => {
    const { validateTask } = await import('@/utils/validation');
    vi.mocked(validateTask).mockReturnValue({
      isValid: false,
      errors: [{ field: 'title', message: 'Title is required', code: 'REQUIRED' }]
    });

    const mockUseTodoLists = vi.mocked(useTodoLists);
    const { createTask, error } = mockUseTodoLists();

    await createTask('list-1', '');

    // Should have set error state
    expect(error).toBe('Task title cannot be empty');
  });

  it('should delete task successfully', async () => {
    const initialTask: Task = {
      id: 'task-1',
      title: 'Test Task',
      status: TaskStatus.ToDo,
      createdAt: Date.now(),
      position: 0
    };

    const mockUseTodoListsStorage = vi.mocked(useTodoListsStorage);
    const mockSetValue = vi.fn();
    
    mockUseTodoListsStorage.mockReturnValue({
      value: [{ id: 'list-1', name: 'Test List', tasks: [initialTask], createdAt: Date.now(), updatedAt: Date.now(), position: 0, isDefault: false }],
      setValue: mockSetValue,
      isLoading: false,
      error: null,
      isSupported: true
    });

    const mockUseTodoLists = vi.mocked(useTodoLists);
    const { deleteTask } = mockUseTodoLists();

    const result = await deleteTask('task-1');

    expect(result).toBe(true);

    // Check that task was removed
    expect(mockSetValue).toHaveBeenCalledTimes(1);
    const savedLists = mockSetValue.mock.calls[0][0];
    expect(savedLists[0].tasks).toHaveLength(0);
  });

  it('should not delete last remaining list', async () => {
    const mockUseTodoListsStorage = vi.mocked(useTodoListsStorage);
    
    mockUseTodoListsStorage.mockReturnValue({
      value: [{ id: 'list-1', name: 'Test List', tasks: [], createdAt: Date.now(), updatedAt: Date.now(), position: 0, isDefault: true }],
      setValue: vi.fn().mockReturnValue(true),
      isLoading: false,
      error: null,
      isSupported: true
    });

    const mockUseTodoLists = vi.mocked(useTodoLists);
    const { deleteTask, error } = mockUseTodoLists();

    const result = await deleteTask('list-1');

    expect(result).toBe(false);
    expect(error).toBe('Cannot delete the last remaining list');
  });
});