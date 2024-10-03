// src/App.tsx
import React from 'react';
import Puzzle from './components/Puzzle.tsx';
import { PuzzleProvider } from './context/PuzzleContext.tsx';

const App: React.FC = () => {
  return (
    <PuzzleProvider>
      <div className="app-container">
        <Puzzle />
      </div>
    </PuzzleProvider>
  );
}

export default App;
