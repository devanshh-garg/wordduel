import React from 'react';
import { motion } from 'framer-motion';
import { useHapticFeedback } from '../hooks/useHapticFeedback';

interface KeyboardKeyProps {
  letter: string;
  state?: 'correct' | 'present' | 'absent' | 'unused';
  onClick: (key: string) => void;
}

const stateToColor = {
  correct: 'bg-emerald-500',
  present: 'bg-amber-500',
  absent: 'bg-slate-600/90 dark:bg-gray-600/90',
  unused: 'bg-slate-600/70 dark:bg-gray-600/70'
};

const KeyboardKey: React.FC<KeyboardKeyProps> = ({ letter = '', state = 'unused', onClick }) => {
  const haptics = useHapticFeedback();

  const handleClick = () => {
    haptics.keyPress();
    onClick(letter);
  };

  const displayText = letter === 'backspace' ? '←' : (letter || '').toUpperCase();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`
        min-w-[38px] h-[52px] text-lg font-medium
        flex items-center justify-center
        rounded-lg
        transition-colors duration-200
        ${stateToColor[state]}
        text-white
        shadow-lg shadow-black/20
        ${letter === 'enter' || letter === 'backspace' ? 'px-3' : 'px-2'}
      `}
      onClick={handleClick}
    >
      {displayText}
    </motion.button>
  );
};

export default KeyboardKey;