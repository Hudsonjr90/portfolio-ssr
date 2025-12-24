import { useState, useEffect } from 'react';

export const useAudio = () => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  useEffect(() => {
    // Only access localStorage after component mounts on client
    const savedSoundEnabled = localStorage.getItem("soundEnabled");
    if (savedSoundEnabled !== null) {
      setSoundEnabled(JSON.parse(savedSoundEnabled));
    }
  }, []);

  const handleAudio = () => {
    if (!soundEnabled) return;

    const audio = new Audio('/sounds/button_click.mp3');
    audio.play();
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem("soundEnabled", JSON.stringify(newState));
  };

  return {
    handleAudio,
    toggleSound,
    soundEnabled,
    setSoundEnabled,
  };
};