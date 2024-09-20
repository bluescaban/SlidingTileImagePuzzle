import React from 'react';
import '../styles/Tile.css';
import pandaImage from '../assets/images/panda.jpg';  // Import the image

type TileProps = {
  value: number | null;
  onClick: () => void;
  isEmpty: boolean;
  canMove: boolean;
  row: number;
  col: number;
  imageSize: number;
};

const Tile: React.FC<TileProps> = ({ value, onClick, isEmpty, canMove, row, col, imageSize }) => {
  const tileSize = imageSize / 6; // 6x6 grid
  const backgroundPosition = `${-col * tileSize}px ${-row * tileSize}px`;  // Correct part of the image

  return (
    <div
      className={`tile ${isEmpty ? 'empty' : ''} ${canMove ? 'can-move' : ''}`}
      style={{
        backgroundImage: isEmpty ? '' : `url(${pandaImage})`,
        backgroundPosition: isEmpty ? 'none' : backgroundPosition,
        backgroundSize: `${imageSize}px ${imageSize}px`,  // Size the background to fit the full image
      }}
      onClick={onClick}
    >
      {/* Optional: Display the tile number */}
      {!isEmpty && <span className="tile-number">{value}</span>}
    </div>
  );
};

export default Tile;
