
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-2xl text-center mb-8 mt-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-fuchsia-500 pb-2">
        Pixel Art Generator
      </h1>
      <p className="text-slate-400 text-sm sm:text-base">
        Craft stunning pixel art masterpieces with the power of AI.
      </p>
    </header>
  );
};
    