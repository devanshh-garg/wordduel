import React from 'react';
import { LetterState } from '../types';
import KeyboardKey from './KeyboardKey';

interface KeyboardRowProps {
  keys: string[];
  keyStates: Record<string, LetterState>;
  onKeyClick: (key: string) => void;
}

const KeyboardRow: React.FC<KeyboardRowProps> = ({ keys, keyStates, onKeyClick }) => {
  return (
    <div className="flex justify-center gap-1.5 my-1.5">
      {keys.map((key, index) => {
        const lowerCaseKey = key.toLowerCase();
        const state = keyStates[lowerCaseKey] || 'unused';
        
        return (
          <KeyboardKey
            key={index}
            letter={key}
            state={state}
            onClick={() => onKeyClick(key)}
          />
        );
      })}
    </div>
  );
};

export default KeyboardRow;
