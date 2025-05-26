import React from 'react';
import { motion } from 'framer-motion';
import { useHapticFeedback } from '../hooks/useHapticFeedback';

interface KeyboardKeyProps {
  letter: string;
  state?: 'correct' | 'present' | 'absent' | 'unused';
  onClick: (key: string) => void;
}

const stateToColor = {
  correct: 'bg-emerald-600',
  present: 'bg-amber-500',
  absent: 'bg-slate-800 dark:bg-slate-400',
  unused: 'bg-slate-700/90 dark:bg-slate-400/90'
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
        min-w-[32px] h-[45px] text-base font-medium
        flex items-center justify-center
        rounded-md
        transition-colors duration-200
        ${stateToColor[state]}
        text-white
        ${letter === 'enter' || letter === 'backspace' ? 'px-2' : 'px-1'}
      `}
      onClick={handleClick}
    >
      {displayText}
    </motion.button>
  );
};

export default KeyboardKey;