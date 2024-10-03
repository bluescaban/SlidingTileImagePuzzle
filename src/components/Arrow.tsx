import React from 'react';

interface ArrowProps {
  direction: 'up' | 'down' | 'left' | 'right';
}

const Arrow: React.FC<ArrowProps> = ({ direction }) => {
  return (
    <div className={`arrow arrow-${direction}`}>
      {/* Use an arrow icon here */}
      {direction === 'up' && '↑'}
      {direction === 'down' && '↓'}
      {direction === 'left' && '←'}
      {direction === 'right' && '→'}
    </div>
  );
};

export default Arrow;
