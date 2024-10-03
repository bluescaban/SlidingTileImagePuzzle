import React from 'react';
import { usePuzzleContext } from '../context/PuzzleContext.tsx';

const ControlBoard: React.FC = () => {
  const { reset, jumble, gameStarted, setGameStarted } = usePuzzleContext(); // Removed timer, since it's unused here
  const [isPaused, setIsPaused] = React.useState(false);

  // Handle the start/pause/resume logic
  const handleStartPause = () => {
    if (!gameStarted) {
      // Start the game (jumble pieces and start timer)
      jumble();
      setGameStarted(true);
    } else if (isPaused) {
      // Resume the game
      setIsPaused(false);
      setGameStarted(true); // Resume the game in the context
    } else {
      // Pause the game
      setIsPaused(true);
      setGameStarted(false); // Pause the game in the context
    }
  };

  // Reset the game
  const handleReset = () => {
    reset(); // Reset in the context
    setIsPaused(false); // Reset pause state locally
  };

  return (
    <div className="control-board flex justify-center space-x-4 mt-4">
      <button
        onClick={handleStartPause}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {gameStarted ? (isPaused ? 'Resume' : 'Pause') : 'Start'}
      </button>
      <button
        onClick={handleReset}
        className={`px-4 py-2 bg-red-500 text-white rounded ${!gameStarted ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!gameStarted}
      >
        Reset
      </button>
    </div>
  );
};

export default ControlBoard;
