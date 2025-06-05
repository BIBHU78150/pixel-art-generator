
import React from 'react';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, onPromptChange, onSubmit, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!isLoading) {
        onSubmit();
      }
    }
  };

  return (
    <div className="w-full p-4 bg-slate-800 border-2 border-teal-500 shadow-lg shadow-teal-500/20 rounded-md">
      <label htmlFor="prompt-input" className="block text-sm font-medium text-teal-300 mb-2">
        Enter your pixel art vision:
      </label>
      <textarea
        id="prompt-input"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., a knight riding a unicorn, a futuristic city skyline, a cute cat"
        className="w-full p-3 bg-slate-700 text-slate-100 border border-slate-600 rounded-md focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-shadow duration-150 ease-in-out resize-none h-24 placeholder-slate-500"
        disabled={isLoading}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className={`mt-4 w-full px-6 py-3 font-semibold text-slate-900 rounded-md transition-all duration-150 ease-in-out
                    ${isLoading ? 'bg-slate-600 cursor-not-allowed' : 'bg-teal-400 hover:bg-teal-300 active:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-slate-800 shadow-md hover:shadow-lg'}`}
      >
        {isLoading ? 'Generating Pixels...' : 'Generate Pixel Art'}
      </button>
    </div>
  );
};
    