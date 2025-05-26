import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTileProps {
  letter: string;
  state: 'empty' | 'tbd' | 'correct' | 'present' | 'absent';
  delay?: number;
}

const stateToColor = {
  empty: 'bg-slate-700/50 dark:bg-gray-700/50',
  tbd: 'bg-slate-600/50 dark:bg-gray-600/50',
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
        w-[62px] h-[62px] flex items-center justify-center
        font-bold text-3xl rounded-xl
        transform transition-colors duration-500
        ${stateToColor[state]}
        ${state !== 'empty' ? 'text-white' : 'text-white/80'}
        border-2 border-slate-600/20 dark:border-gray-600/20
      `}
    >
      {letter.toUpperCase()}
    </motion.div>
  );
};

export default AnimatedTile; 