
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 my-8 p-4">
      <div className="w-16 h-16 border-4 border-dashed border-teal-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-teal-300 text-lg animate-pulse">Conjuring pixels...</p>
    </div>
  );
};
    