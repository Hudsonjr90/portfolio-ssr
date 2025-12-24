'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ParticlesContextType {
  particlesEnabled: boolean;
  toggleParticles: () => void;
}

const ParticlesContext = createContext<ParticlesContextType | undefined>(undefined);

export const useParticles = () => {
  const context = useContext(ParticlesContext);
  if (!context) {
    throw new Error('useParticles must be used within a ParticlesProvider');
  }
  return context;
};

interface ParticlesProviderProps {
  children: ReactNode;
}

export const ParticlesProvider: React.FC<ParticlesProviderProps> = ({ children }) => {
  const [particlesEnabled, setParticlesEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('particlesEnabled');
      if (saved !== null) {
        setParticlesEnabled(JSON.parse(saved));
      }
    }
  }, []);

  const toggleParticles = () => {
    const newState = !particlesEnabled;
    setParticlesEnabled(newState);
    if (typeof window !== 'undefined') {
      localStorage.setItem('particlesEnabled', JSON.stringify(newState));
    }
  };

  return (
    <ParticlesContext.Provider value={{ particlesEnabled, toggleParticles }}>
      {children}
    </ParticlesContext.Provider>
  );
};