//PuzzleContext.tsx
import React, { createContext, useState, useContext, useEffect, useRef } from 'react';

// Define the shape of the context data
interface PuzzleContextType {
    tiles: number[][];
    emptyTile: { row: number, col: number };
    timer: number;
    bestScore: number | null;
    gameStarted: boolean; // Add gameStarted to track if the game has started
    setGameStarted: (started: boolean) => void; // Add setter function for gameStarted
    moveTile: (row: number, col: number) => void;
    reset: () => void;
    jumble: () => void;
  }

// Create context with default values
const PuzzleContext = createContext<PuzzleContextType | undefined>(undefined);

// Create a custom hook for easy access to context
export const usePuzzleContext = () => {
  const context = useContext(PuzzleContext);
  if (!context) {
    throw new Error('usePuzzleContext must be used within a PuzzleProvider');
  }
  return context;
};

// Create the PuzzleProvider component
export const PuzzleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

// Initialize the puzzle tiles (8x8 grid)
  const initializeTiles = (): number[][] => {
    const arr: number[][] = [];
    let tileNumber = 0;
    for (let i = 0; i < 8; i++) {
      const row: number[] = [];
      for (let j = 0; j < 8; j++) {
        if (i === 7 && j === 7) {
          row.push(-1); // The last tile (bottom-right) is the empty space
        } else {
          row.push(tileNumber);
          tileNumber++;
        }
      }
      arr.push(row);
    }
    return arr;
  };
    
  const [tiles, setTiles] = useState<number[][]>(initializeTiles());
  const [emptyTile, setEmptyTile] = useState({ row: 7, col: 7 });
  const [timer, setTimer] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const intervalRef = useRef<number | null>(null); // Ref to store the timer interval

// Start the timer when the game starts
    useEffect(() => {
        if (gameStarted) {
          intervalRef.current = window.setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
          }, 1000); // Increment every second
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current); // Clear the timer interval when the game is paused or reset
            intervalRef.current = null;
          }
        }
      }, [gameStarted]);

  const checkIfSolved = (): boolean => {
    // Flatten the tiles and check if each tile is in the correct position
    const flattenedTiles = tiles.flat();
    for (let i = 0; i < flattenedTiles.length - 1; i++) {
      if (flattenedTiles[i] !== i) {
        return false;
      }
    }
    return flattenedTiles[flattenedTiles.length - 1] === -1; // The last tile should be the empty one
  };
  
  const moveTile = (row: number, col: number) => {
    const newTiles = tiles.map(row => row.slice()); // Clone the tile array
  
    // Check if the clicked tile is adjacent to the empty tile
    if (isAdjacent(row, col)) {
      // Swap the clicked tile with the empty tile
      newTiles[emptyTile.row][emptyTile.col] = newTiles[row][col];
      newTiles[row][col] = -1; // Set the empty tile's new position
  
      // Update the tiles and the emptyTile state
      setTiles(newTiles);
      setEmptyTile({ row, col });
  
      // Check if the puzzle is solved
      if (checkIfSolved()) {
        setGameStarted(false); // Stop the game
        if (bestScore === null || timer < bestScore) {
          setBestScore(timer); // Set a new best score if applicable
        }
        console.log("Puzzle solved!");
      }
    }
  };

  // Helper function to check if the clicked tile is adjacent to the empty space
  const isAdjacent = (row: number, col: number): boolean => {
    const rowDiff = Math.abs(emptyTile.row - row);
    const colDiff = Math.abs(emptyTile.col - col);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  };

  // Reset the game
  const reset = () => {
    const originalTiles = initializeTiles();
    console.log('Resetting tiles to original order:', originalTiles); // Debugging: log the reset order
    setTiles(originalTiles); // Set the tiles back to their original order
    setEmptyTile({ row: 7, col: 7 }); // Reset the empty tile position
    setTimer(0); // Reset the timer
    setGameStarted(false); // Reset the game state
  };  

  const jumble = () => {
    const newTiles = tiles.map(row => row.slice()); // Clone the tile array
  
    // Flatten the tiles array
    const flatTiles = newTiles.flat();
  
    // Apply Fisher-Yates shuffle (excluding the last tile to keep it as the empty space)
    for (let i = flatTiles.length - 2; i > 0; i--) { // Exclude the last element (empty tile)
      const j = Math.floor(Math.random() * (i + 1));
      [flatTiles[i], flatTiles[j]] = [flatTiles[j], flatTiles[i]];
    }
  
    // Un-flatten the array back to 2D (8x8)
    const shuffledTiles: number[][] = [];
    for (let i = 0; i < 8; i++) {
      shuffledTiles.push(flatTiles.slice(i * 8, (i + 1) * 8));
    }
  
    // Ensure the empty tile (-1) is in the last position
    shuffledTiles[7][7] = -1;
  
    // Update the tiles and empty tile state
    setTiles(shuffledTiles);
    setEmptyTile({ row: 7, col: 7 }); // Set the empty tile to the bottom-right
  };
  

  return (
    <PuzzleContext.Provider value={{ tiles, emptyTile, timer, bestScore, gameStarted, setGameStarted, moveTile, reset, jumble }}>
      {children}
    </PuzzleContext.Provider>
  );
};
