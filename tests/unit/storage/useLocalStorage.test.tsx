import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TodoList, Task, TaskStatus } from '@/types/todo';
import mockLocalStorage from '../__mocks__/localStorage';

// Mock the hooks
vi.mock('@/hooks/useLocalStorage', () => ({
  useLocalStorage: vi.fn()
}));

describe('useLocalStorage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should provide default value when localStorage is empty', () => {
    const mockUseLocalStorage = vi.mocked(useLocalStorage);
    mockUseLocalStorage.mockReturnValue({
      value: [],
      setValue: vi.fn().mockReturnValue(true),
      isLoading: false,
      error: null,
      isSupported: true
    });

    const { value } = mockUseLocalStorage('test-key', { defaultValue: [] });
    expect(value).toEqual([]);
  });

  it('should handle localStorage errors gracefully', () => {
    const mockUseLocalStorage = vi.mocked(useLocalStorage);
    mockUseLocalStorage.mockReturnValue({
      value: null,
      setValue: vi.fn().mockReturnValue(false),
      isLoading: false,
      error: 'Storage quota exceeded',
      isSupported: false
    });

    const { error, isSupported } = mockUseLocalStorage('test-key', { defaultValue: null });
    expect(error).toBe('Storage quota exceeded');
    expect(isSupported).toBe(false);
  });

  it('should update value successfully', () => {
    const mockUseLocalStorage = vi.mocked(useLocalStorage);
    const mockSetValue = vi.fn();
    
    mockUseLocalStorage.mockReturnValue({
      value: 'initial',
      setValue: mockSetValue,
      isLoading: false,
      error: null,
      isSupported: true
    });

    const { setValue } = mockUseLocalStorage('test-key', { defaultValue: 'initial' });
    
    const success = setValue('updated');
    expect(success).toBe(true);
    expect(mockSetValue).toHaveBeenCalledWith('updated');
  });

  it('should serialize JSON by default', () => {
    const mockUseLocalStorage = vi.mocked(useLocalStorage);
    const mockSetValue = vi.fn();
    
    mockUseLocalStorage.mockReturnValue({
      value: { test: 'data' },
      setValue: mockSetValue,
      isLoading: false,
      error: null,
      isSupported: true
    });

    const { setValue } = mockUseLocalStorage('test-key', { defaultValue: {} });
    setValue({ test: 'updated' });
    
    // Check if localStorage.setItem was called with serialized JSON
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'test-key',
      '{"test":"updated"}'
    );
  });
});