
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="mt-6 p-4 bg-red-700 border-2 border-red-500 text-red-100 rounded-md w-full shadow-lg shadow-red-500/30" role="alert">
      <p className="font-semibold">Error:</p>
      <p>{message}</p>
    </div>
  );
};
    