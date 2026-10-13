import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

export const ConfettiEffect = ({ active = true, duration = 3000 }) => {
  useEffect(() => {
    if (!active) return;

    // Multi-stage colorful confetti explosion
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#38bdf8', '#8b5cf6', '#f59e0b', '#10b981', '#fb7185']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#38bdf8', '#8b5cf6', '#f59e0b', '#10b981', '#fb7185']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45
    });

  }, [active]);

  return null;
};
