import React from 'react';
import { LetterState } from '../types';
import GameTile from './GameTile';

interface GameRowProps {
  word: string;
  states?: LetterState[];
  isCurrentGuess?: boolean;
}

const GameRow: React.FC<GameRowProps> = ({ word, states, isCurrentGuess = false }) => {
  const letters = word.split('');
  
  // Pad with empty letters if needed
  while (letters.length < 5) {
    letters.push('');
  }
  
  return (
    <div className="grid grid-cols-5 gap-2">
      {letters.map((letter, index) => (
        <GameTile 
          key={index} 
          letter={letter} 
          state={states ? states[index] : 'unused'} 
          position={index}
          isCurrentGuess={isCurrentGuess}
        />
      ))}
    </div>
  );
};

export default GameRow;