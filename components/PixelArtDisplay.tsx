
import React from 'react';

interface PixelArtDisplayProps {
  imageUrl: string;
  altText: string;
}

export const PixelArtDisplay: React.FC<PixelArtDisplayProps> = ({ imageUrl, altText }) => {
  return (
    <div className="mt-6 p-4 bg-slate-800 border-2 border-teal-500 shadow-lg shadow-teal-500/20 rounded-md w-full flex flex-col items-center">
      <h2 className="text-xl font-semibold text-teal-300 mb-4">Your Pixel Art:</h2>
      <div className="bg-slate-700 p-2 rounded-sm inline-block">
         <img 
            src={imageUrl} 
            alt={`Pixel art of: ${altText}`} 
            className="max-w-full h-auto rounded-sm pixelated"
            style={{ maxWidth: '512px', maxHeight: '512px' }} // Constrain size to keep it somewhat pixelated
        />
      </div>
      <a
        href={imageUrl}
        download={`pixel_art_${altText.replace(/\s+/g, '_').slice(0,20)}.png`}
        className="mt-4 px-4 py-2 bg-fuchsia-500 text-white font-semibold rounded-md hover:bg-fuchsia-400 transition-colors duration-150"
      >
        Download Image
      </a>
    </div>
  );
};
    