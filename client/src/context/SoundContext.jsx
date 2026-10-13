import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundEffects } from '../utils/soundSynth';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('quizkids_sound_muted') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('quizkids_sound_muted', isMuted);
  }, [isMuted]);

  const toggleSound = () => {
    setIsMuted(prev => {
      const next = !prev;
      if (!next) {
        // play a playful click to demonstrate sound is enabled
        soundEffects.playClick(false);
      }
      return next;
    });
  };

  const playCorrect = () => soundEffects.playCorrect(isMuted);
  const playWrong = () => soundEffects.playWrong(isMuted);
  const playComplete = () => soundEffects.playComplete(isMuted);
  const playBadge = () => soundEffects.playBadge(isMuted);
  const playClick = () => soundEffects.playClick(isMuted);

  return (
    <SoundContext.Provider value={{
      isMuted,
      toggleSound,
      playCorrect,
      playWrong,
      playComplete,
      playBadge,
      playClick
    }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
