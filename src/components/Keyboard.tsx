import React from 'react';
import { LetterState } from '../types';
import KeyboardRow from './KeyboardRow';
import { getKeyboardState } from '../utils/gameUtils';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  guesses: string[];
  targetWord: string;
}

const Keyboard: React.FC<KeyboardProps> = ({ 
  onKeyPress, 
  onDelete, 
  onEnter, 
  guesses,
  targetWord
}) => {
  const keyboardState = getKeyboardState(guesses, targetWord);
  
  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace']
  ];
  
  const handleKeyClick = (key: string) => {
    if (key === 'enter') {
      onEnter();
    } else if (key === 'backspace') {
      onDelete();
    } else {
      onKeyPress(key);
    }
  };
  
  return (
    <div className="w-full max-w-xl mx-auto mt-6">
      {rows.map((row, index) => (
        <KeyboardRow 
          key={index} 
          keys={row} 
          keyStates={keyboardState}
          onKeyClick={handleKeyClick}
        />
      ))}
    </div>
  );
};

export default Keyboard;