import React from 'react';
import { Button } from '@/components/ui/Button';

interface HeaderAction {
  label: string;
  onClick: () => void;
}

interface HeaderProps {
  title: string;
  actions?: HeaderAction[];
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  actions = [], 
  className = '' 
}) => {
  return (
    <header className={`
      h-16 bg-white border-b border-gray-200 flex items-center justify-between
      px-6 shadow-sm
      ${className}
    `.trim()}>
      <h1 className="text-xl font-semibold text-gray-900">
        {title}
      </h1>
      
      {actions.length > 0 && (
        <div className="flex items-center space-x-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              variant="secondary"
              size="sm"
              aria-label={action.label}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </header>
  );
};