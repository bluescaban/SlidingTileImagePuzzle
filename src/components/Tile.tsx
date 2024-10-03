//Tile.tsx
import React from 'react';

interface TileProps {
  tileNumber: number;
  position: { row: number; col: number };
  emptyTile: { row: number; col: number };
  moveTile: (row: number, col: number) => void;
}

const Tile: React.FC<TileProps> = ({ tileNumber, position, emptyTile, moveTile }) => {
  // Check if the tile is the empty one
  const isEmpty = tileNumber === -1;

  // Determine if the tile is adjacent to the empty space
  const isAdjacent =
    Math.abs(position.row - emptyTile.row) + Math.abs(position.col - emptyTile.col) === 1;

  // Generate the image file path dynamically based on tileNumber
  const getImagePath = (row: number, col: number) => {
    return `${process.env.PUBLIC_URL}/images/PuzzleTiles/${row + 1}.${col + 1}.jpg`; // Assuming filenames like "1.1.jpg"
  };

  const handleClick = () => {
    if (isAdjacent && !isEmpty) {
      moveTile(position.row, position.col);
    }
  };

  return (
    <div className={`tile ${isAdjacent ? 'active' : ''}`} onClick={handleClick}>
      {!isEmpty && (
        <img
          src={getImagePath(Math.floor(tileNumber / 8), tileNumber % 8)}
          alt={`Tile ${tileNumber}`}
          className="puzzle-image"
        />
      )}
    </div>
  );
};

export default Tile;
