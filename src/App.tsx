// src/App.tsx
import React from 'react';
import Puzzle from './components/Puzzle.tsx';
import './styles/Puzzle.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Sliding Puzzle</h1>
      <Puzzle />
    </div>
  );
};

export default App;
