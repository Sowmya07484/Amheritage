"use client";

import { useState, useEffect, useCallback } from 'react';
import { GameState, CharacterType, CHARACTER_PROGRESSION } from '@/lib/game-types';

const INITIAL_STATE: GameState = {
  score: 0,
  coins: 0,
  level: 1,
  questionsCorrect: 0,
  questionsTotal: 0,
  hearts: 3,
  lastHeartRegenTime: Date.now(),
  bestScore: 0,
  character: 'Founding Father',
  unlockedBadges: []
};

const HEARTS_MAX = 3;
const REGEN_TIME_MS = 30 * 1000; // Updated to 30 seconds

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

  // Heart regeneration logic
  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      if (state.hearts < HEARTS_MAX) {
        const now = Date.now();
        const timePassed = now - state.lastHeartRegenTime;
        
        if (timePassed >= REGEN_TIME_MS) {
          const heartsToAdd = Math.floor(timePassed / REGEN_TIME_MS);
          const newHearts = Math.min(HEARTS_MAX, state.hearts + heartsToAdd);
          const newRegenTime = state.lastHeartRegenTime + (heartsToAdd * REGEN_TIME_MS);
          
          setState(prev => ({
            ...prev,
            hearts: newHearts,
            lastHeartRegenTime: newHearts === HEARTS_MAX ? now : newRegenTime
          }));
        }
      }
    }, 1000); // Check every second for smoother countdown

    return () => clearInterval(interval);
  }, [state.hearts, state.lastHeartRegenTime, isLoaded]);

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

  const loseHeart = useCallback(() => {
    setState(prev => {
      if (prev.hearts <= 0) return prev;
      const now = Date.now();
      return {
        ...prev,
        hearts: prev.hearts - 1,
        lastHeartRegenTime: prev.hearts === HEARTS_MAX ? now : prev.lastHeartRegenTime
      };
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
    loseHeart,
    earnCoins,
    addScore,
    isLoaded,
    regenTimeRemaining: Math.max(0, REGEN_TIME_MS - (Date.now() - state.lastHeartRegenTime))
  };
}
