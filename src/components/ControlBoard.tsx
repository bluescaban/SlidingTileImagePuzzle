import React from 'react';
import { usePuzzleContext } from '../context/PuzzleContext.tsx';

const ControlBoard: React.FC = () => {
  const { reset, jumble, gameStarted, setGameStarted } = usePuzzleContext();
  const [isPaused, setIsPaused] = React.useState(false);

  // Handle the start/pause/resume logic
  const handleStartPause = () => {
    if (!gameStarted && !isPaused) {
      // Start the game (jumble pieces and start timer)
      jumble();
      setGameStarted(true);
      setIsPaused(false); // The game has started, so it's not paused
    } else if (isPaused) {
      // Resume the game
      setIsPaused(false);
      setGameStarted(true); // Resume the game
    } else {
      // Pause the game
      setIsPaused(true);
      setGameStarted(false); // Pause the game
    }
  };

  // Reset the game
  const handleReset = () => {
    reset(); // Reset in the context
    setIsPaused(false); // Reset pause state locally
    setGameStarted(false); // Game is reset, not started
  };

  return (
    <div className="control-board flex justify-center space-x-4 mt-4">
      <button
        onClick={handleStartPause}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isPaused ? 'Resume' : gameStarted ? 'Pause' : 'Start'}
      </button>
      <button
        onClick={handleReset}
        className={`px-4 py-2 bg-red-500 text-white rounded ${!gameStarted && !isPaused ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!gameStarted && !isPaused} // Only enable Reset if the game has started or is paused
      >
        Reset
      </button>
    </div>
  );
};

export default ControlBoard;
