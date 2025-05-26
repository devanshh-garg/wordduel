import { useState, useCallback } from 'react';
import useSound from 'use-sound';

// Import sound files
const keyPressSound = 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3';
const correctSound = 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3';
const incorrectSound = 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3';
const winSound = 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3';

export const useSoundEffects = () => {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('wordleSound');
    return saved ? saved === 'muted' : false;
  });

  const [playKeyPress] = useSound(keyPressSound, { 
    volume: 0.1,
    soundEnabled: !isMuted 
  });
  
  const [playCorrect] = useSound(correctSound, { 
    volume: 0.2,
    soundEnabled: !isMuted 
  });
  
  const [playIncorrect] = useSound(incorrectSound, { 
    volume: 0.2,
    soundEnabled: !isMuted 
  });
  
  const [playWin] = useSound(winSound, { 
    volume: 0.3,
    soundEnabled: !isMuted 
  });

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newValue = !prev;
      localStorage.setItem('wordleSound', newValue ? 'muted' : 'unmuted');
      return newValue;
    });
  }, []);

  // Debounced key press sound
  const debouncedKeyPress = useCallback(() => {
    const now = Date.now();
    if (!debouncedKeyPress.lastCall || now - debouncedKeyPress.lastCall > 100) {
      playKeyPress();
      debouncedKeyPress.lastCall = now;
    }
  }, [playKeyPress]);

  // @ts-ignore - Adding lastCall property to the function
  debouncedKeyPress.lastCall = 0;

  return {
    playKeyPress: debouncedKeyPress,
    playCorrect,
    playIncorrect,
    playWin,
    isMuted,
    toggleMute
  };
}; 