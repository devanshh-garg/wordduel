import React from 'react';
import { KeyboardKey as KeyboardKeyType } from '../types';
import { Delete as BackspaceIcon } from 'lucide-react';

interface KeyboardKeyProps {
  keyData: KeyboardKeyType;
  onClick: () => void;
}

const KeyboardKey: React.FC<KeyboardKeyProps> = ({ keyData, onClick }) => {
  const { key, state, width = 1 } = keyData;
  
  const stateClasses = {
    correct: 'bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-700 text-white',
    present: 'bg-amber-400 dark:bg-amber-500 hover:bg-amber-500 dark:hover:bg-amber-600 text-white',
    absent: 'bg-slate-500 dark:bg-slate-600 hover:bg-slate-600 dark:hover:bg-slate-700 text-white',
    unused: 'bg-slate-200 dark:bg-gray-600 hover:bg-slate-300 dark:hover:bg-gray-700 text-slate-700 dark:text-slate-200'
  };

  const widthClass = width === 1
    ? 'w-8 sm:w-10'
    : 'w-16 sm:w-20';
 
  return (
    <button
      onClick={onClick}
      className={`
        ${stateClasses[state]}
        ${widthClass}
        h-12 sm:h-14
        rounded-lg font-medium
        flex items-center justify-center
        transition-all duration-200
        uppercase text-sm
        transform hover:scale-105 active:scale-95
      `}
    >
      {key === 'backspace' ? (
        <BackspaceIcon size={20} />
      ) : key === 'enter' ? (  
        'Enter'
      ) : (
        key
      )}
    </button>
  );
};

export default KeyboardKey;