import React, { useState } from 'react';
import { validateTaskTitle } from '@/utils/validation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface TodoFormProps {
  onSubmit: (title: string) => void;
  placeholder?: string;
  submitText?: string;
  className?: string;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  placeholder = 'Task title...',
  submitText = 'Add',
  className = ''
}) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateTaskTitle(title);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    onSubmit(title);
    setTitle('');
    setError(null);
  };

  const handleInputChange = (value: string) => {
    setTitle(value);
    if (error) {
      setError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-2 ${className}`}>
      <Input
        value={title}
        onChange={handleInputChange}
        placeholder={placeholder}
        error={error || undefined}
        aria-label="Task title"
      />
      <Button type="submit" disabled={!title.trim()}>
        {submitText}
      </Button>
    </form>
  );
};