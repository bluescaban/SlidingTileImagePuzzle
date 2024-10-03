import React from 'react';
import { usePuzzleContext } from '../context/PuzzleContext.tsx';

const Title: React.FC = () => {
  const { timer, bestScore } = usePuzzleContext(); // Use the timer and bestScore from context

  // Format the timer and best score as MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="title-container flex justify-between items-center p-4 bg-gray-100 rounded-lg">
      <h1 className="text-xl font-bold">Sliding Puzzle Game</h1>
      <div className="flex space-x-8">
        <p>Time: <span id="timer">{formatTime(timer)}</span></p>
        <p>Best Score: <span id="best-score">{bestScore !== null ? formatTime(bestScore) : "00:00"}</span></p>
      </div>
    </div>
  );
};

export default Title;
