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
    correct: 'bg-gradient-to-br from-emerald-400 to-emerald-600 dark:from-emerald-500 dark:to-emerald-700 border-emerald-600 dark:border-emerald-700 text-white',
    present: 'bg-gradient-to-br from-amber-400 to-amber-500 dark:from-amber-500 dark:to-amber-600 border-amber-500 dark:border-amber-600 text-white',
    absent: 'bg-gradient-to-br from-slate-400 to-slate-600 dark:from-slate-600 dark:to-slate-800 border-slate-600 dark:border-slate-800 text-white',
    unused: 'bg-white dark:bg-gray-700 border-slate-300 dark:border-gray-600 text-slate-800 dark:text-slate-200'
  };
  
  const animationDelay = `${position * 100}ms`;
  
  const animationClass = state !== 'unused' && !isCurrentGuess 
    ? 'animate-flip-in' 
    : '';
  
  const pulseClass = letter && isCurrentGuess 
    ? 'animate-pulse-once' 
    : '';
  
  return (
    <div 
      className={`
        w-full aspect-square flex items-center justify-center 
        text-2xl font-bold uppercase border-2 rounded-lg
        ${stateClasses[state]} 
        ${animationClass}
        ${pulseClass}
        transform-gpu transition-all duration-300
      `}
      style={{ animationDelay }}
    >
      {letter}
    </div>
  );
};

export default GameTile;