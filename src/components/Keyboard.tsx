import React from 'react';
import { LetterState } from '../types';
import KeyboardRow from './KeyboardRow';
import { getKeyboardState } from '../utils/gameUtils';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  guesses: string[];
  letterStates: Record<string, LetterState[]>;
}

const Keyboard: React.FC<KeyboardProps> = ({ 
  onKeyPress, 
  onDelete, 
  onEnter, 
  guesses,
  letterStates
}) => {
  const keyStates: Record<string, LetterState> = {};

  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
    keyStates[letter] = 'unused';
  });
  
  guesses.forEach(guess => {
    const states = letterStates[guess];
    if (states) {
      guess.toLowerCase().split('').forEach((letter, index) => {
        const currentState = keyStates[letter];
        const newState = states[index];
        
        if (newState === 'correct') {
          keyStates[letter] = 'correct';
        } else if (newState === 'present' && currentState !== 'correct') {
          keyStates[letter] = 'present';
        } else if (newState === 'absent' && currentState === 'unused') {
          keyStates[letter] = 'absent';
        }
      });
    }
  });

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
    <div className="w-full max-w-[600px] mx-auto mt-8 px-4 pb-6">
      {rows.map((row, index) => (
        <KeyboardRow 
          key={index} 
          keys={row} 
          keyStates={keyStates}
          onKeyClick={handleKeyClick}
        />
      ))}
    </div>
  );
};

export default Keyboard;