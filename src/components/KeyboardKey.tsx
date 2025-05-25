import React from 'react';
import { KeyboardKey as KeyboardKeyType } from '../types';
import { Backspace as BackspaceIcon } from 'lucide-react';

interface KeyboardKeyProps {
  keyData: KeyboardKeyType;
  onClick: () => void;
}

const KeyboardKey: React.FC<KeyboardKeyProps> = ({ keyData, onClick }) => {
  const { key, state, width = 1 } = keyData;
  
  const stateClasses = {
    correct: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200',
    present: 'bg-amber-400 hover:bg-amber-500 text-white shadow-amber-200',
    absent: 'bg-slate-500 hover:bg-slate-600 text-white shadow-slate-200',
    unused: 'bg-slate-200 hover:bg-slate-300 text-slate-700 shadow-slate-100'
  };

  // Calculate width based on the width prop (1 = standard key width)
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
        shadow-lg uppercase text-sm
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