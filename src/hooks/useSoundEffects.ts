import useSound from 'use-sound';

// Import sound files
const keyPressSound = '/sounds/key-press.mp3';
const correctSound = '/sounds/correct.mp3';
const incorrectSound = '/sounds/incorrect.mp3';
const winSound = '/sounds/win.mp3';
const revealSound = '/sounds/reveal.mp3';

export const useSoundEffects = () => {
  const [playKeyPress] = useSound(keyPressSound, { volume: 0.5 });
  const [playCorrect] = useSound(correctSound, { volume: 0.5 });
  const [playIncorrect] = useSound(incorrectSound, { volume: 0.5 });
  const [playWin] = useSound(winSound, { volume: 0.7 });
  const [playReveal] = useSound(revealSound, { volume: 0.5 });

  return {
    playKeyPress,
    playCorrect,
    playIncorrect,
    playWin,
    playReveal,
  };
}; 