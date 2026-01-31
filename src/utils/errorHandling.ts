export interface AppError {
  message: string;
  code: string;
  originalError?: Error;
}

export const createError = (message: string, code: string, originalError?: Error): AppError => ({
  message,
  code,
  originalError
});

export const isQuotaExceededError = (error: Error): boolean => {
  return error.name === 'QuotaExceededError' || 
         (error as any).code === 22 || 
         error.message.includes('quota');
};

export const handleStorageError = (error: Error): string => {
  if (isQuotaExceededError(error)) {
    return 'Storage quota exceeded. Please delete some items to free up space.';
  }
  return 'An error occurred while saving your data. Please try again.';
};