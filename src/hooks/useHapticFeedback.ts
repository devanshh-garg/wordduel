export const useHapticFeedback = () => {
  const isVibrationAvailable = 'vibrate' in navigator;

  const vibrate = (pattern: number | number[]) => {
    if (isVibrationAvailable) {
      navigator.vibrate(pattern);
    }
  };

  const keyPress = () => vibrate(10);
  const error = () => vibrate([100, 50, 100]);
  const success = () => vibrate([50, 100, 50, 100, 50]);
  const gameWon = () => vibrate([100, 50, 100, 50, 100, 50, 100]);

  return {
    keyPress,
    error,
    success,
    gameWon,
    isAvailable: isVibrationAvailable,
  };
}; 