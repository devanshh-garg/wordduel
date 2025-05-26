import React from 'react';
import { motion } from 'framer-motion';
import { useHapticFeedback } from '../hooks/useHapticFeedback';

interface KeyboardKeyProps {
  letter: string;
  state?: 'correct' | 'present' | 'absent' | 'unused';
  onClick: (key: string) => void;
}

const stateToColor = {
  correct: 'bg-emerald-500 text-white',
  present: 'bg-amber-500 text-white',
  absent: 'bg-slate-500 dark:bg-gray-600 text-white',
  unused: 'bg-slate-200 dark:bg-gray-700 text-slate-800 dark:text-slate-200'
};

const KeyboardKey: React.FC<KeyboardKeyProps> = ({ letter = '', state = 'unused', onClick }) => {
  const haptics = useHapticFeedback();

  const handleClick = () => {
    haptics.keyPress();
    onClick(letter);
  };

  const isSpecial = letter === 'enter' || letter === 'backspace';
  const displayText = letter === 'backspace' ? '←' : (letter || '').toUpperCase();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`
        ${isSpecial ? 'px-4 text-sm' : 'px-2 text-lg'}
        py-4 rounded-lg font-medium
        transition-colors duration-200
        ${stateToColor[state]}
        hover:opacity-90 active:opacity-100
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
      `}
      onClick={handleClick}
    >
      {displayText}
    </motion.button>
  );
};

export default KeyboardKey;