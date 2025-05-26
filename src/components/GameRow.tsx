import React from 'react';
import { LetterState } from '../types';
import AnimatedTile from './AnimatedTile';

interface GameRowProps {
  word: string;
  states?: LetterState[];
  isCurrentGuess: boolean;
}

const GameRow: React.FC<GameRowProps> = ({ word, states, isCurrentGuess }) => {
  const letters = word.split('').concat(Array(5 - word.length).fill(''));

  return (
    <div className="grid grid-cols-5 gap-[6px]">
      {letters.map((letter, i) => {
        let state: 'empty' | 'tbd' | 'correct' | 'present' | 'absent' = 'empty';
        
        if (letter) {
          if (states) {
            state = states[i];
          } else if (isCurrentGuess) {
            state = 'tbd';
          }
        }

        return (
          <AnimatedTile
            key={i}
            letter={letter}
            state={state}
            delay={states ? i * 0.2 : 0}
          />
        );
      })}
    </div>
  );
};

export default GameRow;