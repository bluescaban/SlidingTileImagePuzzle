import React from 'react';

interface TileProps {
  tileNumber: number;
  position: { row: number; col: number };
  emptyTile: { row: number; col: number };
  moveTile: (row: number, col: number) => void;
}

const Tile: React.FC<TileProps> = ({ tileNumber, position, emptyTile, moveTile }) => {
  const isEmpty = tileNumber === -1;

  const isAdjacent = Math.abs(position.row - emptyTile.row) + Math.abs(position.col - emptyTile.col) === 1;

  const getImagePath = (row: number, col: number) => {
    return `${process.env.PUBLIC_URL}/images/PuzzleTiles/${row + 1}.${col + 1}.jpg`; // Assuming filenames like "1.1.jpg"
  };

  const handleClick = () => {
    if (isAdjacent && !isEmpty) {
      moveTile(position.row, position.col);
    }
  };

  return (
    <div
      className={`tile w-full h-full ${isAdjacent ? 'ring-4 ring-red-500 animate-pulse cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      {!isEmpty && (
        <img
          src={getImagePath(Math.floor(tileNumber / 8), tileNumber % 8)}
          alt={`Tile ${tileNumber}`}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default Tile;
