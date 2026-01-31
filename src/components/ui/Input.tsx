import React from 'react';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  disabled?: boolean;
  error?: string;
  className?: string;
  id?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  disabled = false,
  error,
  className = '',
  id,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  onKeyPress
}) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300';
  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed' : '';

  return (
    <div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          ${baseClasses}
          ${errorClasses}
          ${disabledClasses}
          ${className}
        `.trim()}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-invalid={!!error}
        onKeyPress={onKeyPress}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600" id={ariaDescribedBy}>
          {error}
        </p>
      )}
    </div>
  );
};