
"use client";

import { useState, useEffect, useCallback } from 'react';
import { GameState, CharacterType, CHARACTER_PROGRESSION } from '@/lib/game-types';

const INITIAL_STATE: GameState = {
  score: 0,
  coins: 0,
  level: 1,
  questionsInLevel: 0,
  questionsCorrect: 0,
  questionsTotal: 0,
  bestScore: 0,
  character: 'The Patriot',
  unlockedBadges: [],
  starsByLevel: {},
  totalStars: 0
};

export function usePersistentGameState() {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('heritage_sprint_v3');
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
      localStorage.setItem('heritage_sprint_v3', JSON.stringify(state));
    }
  }, [state, isLoaded]);

  const updateState = useCallback((updates: Partial<GameState>) => {
    setState(prev => {
      const newState = { ...prev, ...updates };
      
      // Ensure score is never negative
      if (newState.score < 0) newState.score = 0;

      // Update character based on level
      const currentLevel = newState.level;
      let newChar = prev.character;
      
      // Find highest unlocked character
      Object.keys(CHARACTER_PROGRESSION)
        .map(Number)
        .sort((a, b) => a - b)
        .forEach(lvl => {
          if (currentLevel >= lvl) {
            newChar = CHARACTER_PROGRESSION[lvl];
          }
        });
      
      newState.character = newChar;

      // Update best score
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
    setState(prev => ({ ...prev, score: Math.max(0, prev.score + amount) }));
  }, []);

  const resetProgress = useCallback(() => {
    setState({ ...INITIAL_STATE, bestScore: state.bestScore });
  }, [state.bestScore]);

  return {
    state,
    updateState,
    earnCoins,
    addScore,
    resetProgress,
    isLoaded
  };
}
