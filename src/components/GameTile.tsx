import React from 'react';
import { LetterState } from '../types';

interface GameTileProps {
  letter: string;
  state: LetterState;
  position: number;
  isCurrentGuess?: boolean;
}

const GameTile: React.FC<GameTileProps> = ({ 
  letter, 
  state, 
  position,
  isCurrentGuess = false 
}) => {
  const stateClasses = {
    correct: 'bg-emerald-500 border-emerald-600 text-white',
    present: 'bg-amber-400 border-amber-500 text-white',
    absent: 'bg-slate-500 border-slate-600 text-white',
    unused: 'bg-white border-slate-300 text-slate-800'
  };
  
  // Add animation delay based on position
  const animationDelay = `${position * 100}ms`;
  
  // Add animation classes if it's a submitted guess
  const animationClass = state !== 'unused' && !isCurrentGuess 
    ? 'animate-flip-in' 
    : '';
  
  // Add pulse animation if it's the current guess
  const pulseClass = letter && isCurrentGuess 
    ? 'animate-pulse-once' 
    : '';
  
  return (
    <div 
      className={`
        w-full aspect-square flex items-center justify-center 
        text-2xl font-bold uppercase border-2 rounded
        ${stateClasses[state]} 
        ${animationClass}
        ${pulseClass}
        transform-gpu
      `}
      style={{ animationDelay }}
    >
      {letter}
    </div>
  );
};

export default GameTile;