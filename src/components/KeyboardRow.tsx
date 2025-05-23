import React from 'react';
import { LetterState, KeyboardKey as KeyboardKeyType } from '../types';
import KeyboardKey from './KeyboardKey';

interface KeyboardRowProps {
  keys: string[];
  keyStates: Record<string, LetterState>;
  onKeyClick: (key: string) => void;
}

const KeyboardRow: React.FC<KeyboardRowProps> = ({ keys, keyStates, onKeyClick }) => {
  const processedKeys: KeyboardKeyType[] = keys.map(key => {
    if (key === 'enter') {
      return { key, state: 'unused', width: 1.5 };
    }
    if (key === 'backspace') {
      return { key, state: 'unused', width: 1.5 };
    }
    return { key, state: keyStates[key] || 'unused' };
  });
  
  return (
    <div className="flex justify-center gap-1 my-1">
      {processedKeys.map((key, index) => (
        <KeyboardKey 
          key={index} 
          keyData={key} 
          onClick={() => onKeyClick(key.key)}
        />
      ))}
    </div>
  );
};

export default KeyboardRow;