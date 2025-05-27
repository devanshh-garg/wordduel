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
    <div className="flex justify-center gap-[6px] my-[3px]">
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