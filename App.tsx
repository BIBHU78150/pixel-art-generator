
import React, { useState, useCallback } from 'react';
import { PromptInput } from './components/PromptInput';
import { PixelArtDisplay } from './components/PixelArtDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { generatePixelArt } from './services/geminiService';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to generate pixel art.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageDataUrl = await generatePixelArt(prompt);
      setGeneratedImage(imageDataUrl);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(`Failed to generate pixel art: ${err.message}. Ensure your API key is configured correctly.`);
      } else {
        setError('An unknown error occurred while generating pixel art.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 bg-slate-900 text-slate-100 font-mono selection:bg-teal-500 selection:text-slate-900">
      <Header />
      <main className="w-full max-w-2xl flex flex-col items-center space-y-6 flex-grow mt-8">
        <PromptInput
          prompt={prompt}
          onPromptChange={setPrompt}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {generatedImage && !isLoading && <PixelArtDisplay imageUrl={generatedImage} altText={prompt} />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
    