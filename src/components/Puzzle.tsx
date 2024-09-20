import React, { useState } from 'react';
import Tile from './Tile.tsx';
import '../styles/Puzzle.css';

type TileValue = number | null;

type Position = {
  row: number;
  col: number;
};

const initialTiles: TileValue[][] = [
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24],
  [25, 26, 27, 28, 29, 30],
  [31, 32, 33, 34, 35, null],  // null represents the empty space
];

const emptyTilePosition: Position = { row: 5, col: 5 };

const Puzzle: React.FC = () => {
  const [tiles, setTiles] = useState<TileValue[][]>(initialTiles);
  const [emptyPosition, setEmptyPosition] = useState<Position>(emptyTilePosition);

  const isValidMove = (row: number, col: number): boolean => {
    const { row: emptyRow, col: emptyCol } = emptyPosition;
    return (
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1)
    );
  };

  const moveTile = (row: number, col: number) => {
    if (isValidMove(row, col)) {
      const newTiles = tiles.map(row => [...row]);
      const { row: emptyRow, col: emptyCol } = emptyPosition;

      newTiles[emptyRow][emptyCol] = tiles[row][col];
      newTiles[row][col] = null;

      setTiles(newTiles);
      setEmptyPosition({ row, col });
    }
  };

  const resetPuzzle = () => {
    setTiles(initialTiles);
    setEmptyPosition(emptyTilePosition);
  };

  const imageSize = 600;  // Adjust based on the size of your image

  return (
    <div className="puzzle">
      <div className="grid">
        {tiles.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((tile, colIndex) => (
              <Tile
                key={colIndex}
                value={tile}
                onClick={() => moveTile(rowIndex, colIndex)}
                isEmpty={tile === null}
                canMove={isValidMove(rowIndex, colIndex)}
                row={rowIndex}
                col={colIndex}
                imageSize={imageSize}  // Pass the image size for background positioning
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      <button onClick={resetPuzzle}>Reset</button>
    </div>
  );
};

export default Puzzle;
