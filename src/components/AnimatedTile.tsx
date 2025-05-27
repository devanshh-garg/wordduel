import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTileProps {
  letter: string;
  state: 'empty' | 'tbd' | 'correct' | 'present' | 'absent';
  delay?: number;
}

const stateToColor = {
  empty: 'bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-700 dark:to-gray-800 shadow-inner',
  tbd: 'bg-gradient-to-br from-slate-200 to-slate-300 dark:from-gray-600 dark:to-gray-700',
  correct: 'bg-gradient-to-br from-emerald-400 to-emerald-600 dark:from-emerald-500 dark:to-emerald-700',
  present: 'bg-gradient-to-br from-amber-400 to-amber-500 dark:from-amber-500 dark:to-amber-600',
  absent: 'bg-gradient-to-br from-slate-400 to-slate-500 dark:from-gray-600 dark:to-gray-700'
};

const AnimatedTile: React.FC<AnimatedTileProps> = ({ letter, state, delay = 0 }) => {
  const variants = {
    initial: { scale: 1, rotateX: 0 },
    pop: { 
      scale: [1, 1.1, 1],
      transition: { duration: 0.15 }
    },
    flip: {
      rotateX: [0, 90, 0],
      transition: { 
        duration: 0.5,
        delay,
        times: [0, 0.5, 1]
      }
    },
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate={state === 'tbd' ? 'pop' : 'flip'}
      variants={variants}
      className={`
        w-[62px] h-[62px] flex items-center justify-center
        font-bold text-3xl rounded-xl
        transform transition-colors duration-500
        ${stateToColor[state]}
        ${state === 'empty' ? 'text-slate-400 dark:text-gray-500' : 'text-white'}
        border-2 ${state === 'empty' ? 'border-slate-300 dark:border-gray-600' : 'border-transparent'}
        shadow-lg
      `}
    >
      {letter.toUpperCase()}
    </motion.div>
  );
};

export default AnimatedTile;