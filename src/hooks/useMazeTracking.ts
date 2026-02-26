import { useEffect } from 'react';

declare global {
  interface Window {
    mazeUniversalSnippetApiKey?: string;
  }
}

export function useMazeTracking() {
  useEffect(() => {
    // Check if Maze script is already loaded
    if (window.mazeUniversalSnippetApiKey) {
      return;
    }

    const apiKey = 'f0d44cee-9f7a-4567-aa26-798870622fa9';

    // Session storage handling
    let sessionId: string | number;
    try {
      const stored = sessionStorage.getItem('maze-us');
      sessionId = stored || new Date().getTime();
      if (!stored) {
        sessionStorage.setItem('maze-us', String(sessionId));
      }
    } catch (err) {
      sessionId = new Date().getTime();
    }

    // Create and append script
    const script = document.createElement('script');
    script.src = `https://snippet.maze.co/maze-universal-loader.js?apiKey=${apiKey}`;
    script.async = true;

    document.head.appendChild(script);
    window.mazeUniversalSnippetApiKey = apiKey;

    // Cleanup on unmount
    return () => {
      // Note: We don't remove the script as Maze may need to persist
    };
  }, []);
}

export default useMazeTracking;
