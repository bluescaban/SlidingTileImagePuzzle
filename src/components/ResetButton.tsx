// ResetButton.tsx
import React from 'react';

type ResetButtonProps = {
  onClick: () => void; // Function to handle reset click
};

const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>Reset</button>;
};

export default ResetButton;
