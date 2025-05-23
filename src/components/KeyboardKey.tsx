import React from 'react';
import { KeyboardKey as KeyboardKeyType } from '../types';
import { SpaceIcon as BackspaceIcon } from 'lucide-react';

interface KeyboardKeyProps {
  keyData: KeyboardKeyType;
  onClick: () => void;
}

const KeyboardKey: React.FC<KeyboardKeyProps> = ({ keyData, onClick }) => {
  const { key, state, width = 1 } = keyData;
  
  const stateClasses = {
    correct: 'bg-emerald-500 hover:bg-emerald-600 text-white',
    present: 'bg-amber-400 hover:bg-amber-500 text-white',
    absent: 'bg-slate-500 hover:bg-slate-600 text-white',
    unused: 'bg-slate-300 hover:bg-slate-400 text-slate-800'
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
        rounded font-medium flex items-center justify-center
        transition-colors uppercase text-sm
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