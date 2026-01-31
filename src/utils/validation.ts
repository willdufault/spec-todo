export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .slice(0, 200);
};

export const validateTaskTitle = (title: string): string | null => {
  if (!title || title.trim().length === 0) {
    return 'Task title is required';
  }
  if (title.trim().length > 200) {
    return 'Task title must be less than 200 characters';
  }
  return null;
};

export const validateListName = (name: string): string | null => {
  if (!name || name.trim().length === 0) {
    return 'List name is required';
  }
  if (name.trim().length > 50) {
    return 'List name must be less than 50 characters';
  }
  return null;
};