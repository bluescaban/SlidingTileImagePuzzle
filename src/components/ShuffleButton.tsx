// ShuffleButton.tsx
import React from 'react';

type ShuffleButtonProps = {
  onClick: () => void; // Function to handle shuffle click
};

const ShuffleButton: React.FC<ShuffleButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>Shuffle</button>;
};

export default ShuffleButton;
