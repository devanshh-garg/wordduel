import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTileProps {
  letter: string;
  state: 'empty' | 'tbd' | 'correct' | 'present' | 'absent';
  delay?: number;
}

const stateToColor = {
  empty: 'bg-slate-200 dark:bg-gray-700',
  tbd: 'bg-slate-300 dark:bg-gray-600',
  correct: 'bg-emerald-500',
  present: 'bg-amber-500',
  absent: 'bg-slate-500 dark:bg-gray-600'
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
        w-14 h-14 flex items-center justify-center
        font-bold text-2xl rounded-lg
        transform transition-colors duration-500
        ${stateToColor[state]}
        ${state !== 'empty' ? 'text-white' : 'text-slate-700 dark:text-slate-300'}
      `}
    >
      {letter.toUpperCase()}
    </motion.div>
  );
};

export default AnimatedTile; 