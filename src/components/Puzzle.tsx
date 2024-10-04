import React from 'react';
import Tile from './Tile.tsx';
import { usePuzzleContext } from '../context/PuzzleContext.tsx';
import ControlBoard from './ControlBoard.tsx';
import Title from './Title.tsx';

const Puzzle: React.FC = () => {
  const { tiles, emptyTile, moveTile } = usePuzzleContext();

  return (
    <div className="bg-white min-h-screen flex justify-center items-start pt-2">
      <div className="bg-[#FDFE53] p-8 rounded-lg border-4 border-[#FDFE53] max-w-full max-h-full sm:max-w-[90%] sm:max-h-[90%]">
        <Title />
        <div className="p-2 rounded-lg border-4 border-[#FDFE53] bg-white grid grid-cols-8 gap-1">
          {tiles.flat().map((tile, index) => (
            <Tile
              key={index} // Use index as the key to maintain consistent grid layout
              tileNumber={tile}
              position={{ row: Math.floor(index / 8), col: index % 8 }}
              emptyTile={emptyTile}
              moveTile={moveTile}
            />
          ))}
        </div>
        <ControlBoard />
      </div>
    </div>
  );
};

export default Puzzle;
