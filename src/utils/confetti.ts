import confetti from 'canvas-confetti';

export const fireConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 1000,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Start the sequence
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    decay: 0.95,
    scalar: 0.8,
  });

  fire(0.2, {
    spread: 60,
    decay: 0.91,
    scalar: 0.6,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.92,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    decay: 0.91,
    scalar: 1,
  });
}; 