
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
    const lowerCaseKey = key.toLowerCase(); // Convert key to lowercase
    if (lowerCaseKey === 'enter') {
      return { key, state: 'unused', width: 1.5 };
    }
    if (lowerCaseKey === 'backspace') {
      return { key, state: 'unused', width: 1.5 };
    }
    return { key, state: keyStates[lowerCaseKey] || 'unused' }; // Use lowerCaseKey here
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
