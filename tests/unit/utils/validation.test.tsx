import { describe, it, expect } from 'vitest';
import { sanitizeUserInput, validateTask, validators } from '@/utils/validation';
import { TaskStatus } from '@/types/todo';

describe('validation utilities', () => {
  describe('sanitizers', () => {
    it('should remove HTML tags from input', () => {
      const input = '<script>alert("xss")</script>Hello';
      const result = sanitizeUserInput(input);
      
      expect(result).toBe('Hello');
    });

    it('should remove XSS patterns', () => {
      const input = '<img src="x" onerror="alert(1)">';
      const result = sanitizeUserInput(input);
      
      expect(result).not.toContain('onerror');
      expect(result).not.toContain('<img');
    });

    it('should trim whitespace', () => {
      const input = '  hello world  ';
      const result = sanitizeUserInput(input);
      
      expect(result).toBe('hello world');
    });
  });

  describe('validators', () => {
    describe('required', () => {
      it('should return true for non-empty values', () => {
        expect(validators.required('hello')).toBe(true);
        expect(validators.required(0)).toBe(true);
        expect(validators.required(false)).toBe(false);
        expect(validators.required(null)).toBe(false);
        expect(validators.required('')).toBe(false);
        expect(validators.required(undefined)).toBe(false);
      });
    });

    describe('minLength', () => {
      it('should validate minimum length correctly', () => {
        const validator = validators.minLength(3);
        
        expect(validator('hello')).toBe(true);
        expect(validator('he')).toBe(false);
        expect(validator('')).toBe(false);
      });
    });

    describe('maxLength', () => {
      it('should validate maximum length correctly', () => {
        const validator = validators.maxLength(5);
        
        expect(validator('hello')).toBe(true);
        expect(validator('hello world')).toBe(false);
        expect(validator('')).toBe(true); // Empty string passes max length
      });
    });

    describe('unique', () => {
      it('should validate uniqueness correctly', () => {
        const existing = ['apple', 'banana', 'cherry'];
        const validator = validators.unique(existing);
        
        expect(validator('apple')).toBe(false);
        expect(validator('banana')).toBe(false);
        expect(validator('cherry')).toBe(false);
        expect(validator('date')).toBe(true);
      });
    });

    describe('pattern', () => {
      it('should validate regex patterns correctly', () => {
        const validator = validators.pattern(/^[a-zA-Z]+$/);
        
        expect(validator('hello')).toBe(true);
        expect(validator('Hello')).toBe(false);
        expect(validator('hello123')).toBe(false);
        expect(validator('hello_world')).toBe(false);
      });
    });
  });

  describe('validateTask', () => {
    it('should pass validation for valid task', () => {
      const task = {
        id: 'task-1',
        title: 'Valid Task Title',
        status: TaskStatus.ToDo,
        createdAt: Date.now(),
        position: 0
      };

      const result = validateTask(task);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should fail validation for empty title', () => {
      const task = {
        id: 'task-1',
        title: '',
        status: TaskStatus.ToDo,
        createdAt: Date.now(),
        position: 0
      };

      const result = validateTask(task);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          field: 'title',
          code: 'REQUIRED'
        })
      );
    });

    it('should fail validation for invalid status', () => {
      const task = {
        id: 'task-1',
        title: 'Valid Task Title',
        status: 'Invalid' as any,
        createdAt: Date.now(),
        position: 0
      };

      const result = validateTask(task);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          field: 'status',
          code: 'INVALID_STATUS'
        })
      );
    });

    it('should fail validation for invalid position', () => {
      const task = {
        id: 'task-1',
        title: 'Valid Task Title',
        status: TaskStatus.ToDo,
        createdAt: Date.now(),
        position: -1
      };

      const result = validateTask(task);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          field: 'position',
          code: 'INVALID_POSITION'
        })
      );
    });
  });
});