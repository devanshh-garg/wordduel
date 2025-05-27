import React from 'react';
import { motion } from 'framer-motion';
import { useHapticFeedback } from '../hooks/useHapticFeedback';

interface KeyboardKeyProps {
  letter: string;
  state?: 'correct' | 'present' | 'absent' | 'unused';
  onClick: (key: string) => void;
}

const stateToColor = {
  correct: 'bg-gradient-to-br from-emerald-500 to-emerald-700 dark:from-emerald-600 dark:to-emerald-800 text-white',
  present: 'bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 text-white',
  absent: 'bg-gradient-to-br from-slate-600 to-slate-700 dark:from-gray-700 dark:to-gray-800 text-white/80',
  unused: 'bg-gradient-to-br from-slate-200 to-slate-300 dark:from-gray-600 dark:to-gray-700 text-slate-700 dark:text-white/90'
};

const KeyboardKey: React.FC<KeyboardKeyProps> = ({ letter = '', state = 'unused', onClick }) => {
  const haptics = useHapticFeedback();

  const handleClick = () => {
    haptics.keyPress();
    onClick(letter);
  };

  const displayText = letter === 'backspace' ? '←' : (letter || '').toUpperCase();
  const isSpecialKey = letter === 'enter' || letter === 'backspace';

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`
        h-[45px] text-base font-medium
        flex items-center justify-center
        rounded-lg shadow-md
        transition-all duration-200
        ${stateToColor[state]}
        ${isSpecialKey ? 'px-2 text-sm min-w-[50px] sm:min-w-[65px]' : 'w-[32px] sm:w-[38px]'}
        hover:brightness-110 active:brightness-90
        border border-slate-300/10 dark:border-white/5
      `}
      onClick={handleClick}
    >
      {displayText}
    </motion.button>
  );
};

export default KeyboardKey;