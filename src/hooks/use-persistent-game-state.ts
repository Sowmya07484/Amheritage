"use client";

import { useState, useEffect, useCallback } from 'react';
import { GameState, CharacterType, CHARACTER_PROGRESSION } from '@/lib/game-types';

const INITIAL_STATE: GameState = {
  score: 0,
  coins: 0,
  level: 1,
  questionsCorrect: 0,
  questionsTotal: 0,
  bestScore: 0,
  character: 'Founding Father',
  unlockedBadges: []
};

export function usePersistentGameState() {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('heritage_sprint_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState({ ...INITIAL_STATE, ...parsed });
      } catch (e) {
        console.error("Failed to load game state", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('heritage_sprint_v1', JSON.stringify(state));
    }
  }, [state, isLoaded]);

  const updateState = useCallback((updates: Partial<GameState>) => {
    setState(prev => {
      const newState = { ...prev, ...updates };
      
      // Update character based on level
      const levelBase = Math.floor((newState.level - 1) / 5) * 5 + 1;
      const char = CHARACTER_PROGRESSION[levelBase as keyof typeof CHARACTER_PROGRESSION] || 'Founding Father';
      newState.character = char as CharacterType;

      // Update best score if needed
      if (newState.score > newState.bestScore) {
        newState.bestScore = newState.score;
      }
      
      return newState;
    });
  }, []);

  const earnCoins = useCallback((amount: number) => {
    setState(prev => ({ ...prev, coins: prev.coins + amount }));
  }, []);

  const addScore = useCallback((amount: number) => {
    setState(prev => ({ ...prev, score: prev.score + amount }));
  }, []);

  return {
    state,
    updateState,
    earnCoins,
    addScore,
    isLoaded
  };
}
