"use client";

import { useState, useEffect, useCallback } from 'react';
import { GameState, CharacterType, CHARACTER_PRICE } from '@/lib/game-types';

const INITIAL_STATE: GameState = {
  score: 0,
  coins: 0,
  distance: 0,
  level: 1,
  questionsInLevel: 0,
  questionsCorrect: 0,
  questionsTotal: 0,
  character: 'Donald Trump',
  unlockedCharacters: ['Donald Trump'],
  starsByLevel: {}
};

export function usePersistentGameState() {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('heritage_sprint_v5');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migration: ensure character types match current set
        if (parsed.character === 'Benjamin Franklin') parsed.character = 'Ariana Grande';
        
        if (parsed.unlockedCharacters) {
          parsed.unlockedCharacters = parsed.unlockedCharacters.map((c: string) => {
            if (c === 'Benjamin Franklin') return 'Ariana Grande';
            return c;
          });
        }
        setState({ ...INITIAL_STATE, ...parsed });
      } catch (e) {
        console.error("Failed to load game state", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('heritage_sprint_v5', JSON.stringify(state));
    }
  }, [state, isLoaded]);

  const updateState = useCallback((updates: Partial<GameState>) => {
    setState(prev => {
      const newState = { ...prev, ...updates };
      if (newState.score < 0) newState.score = 0;
      return newState;
    });
  }, []);

  const earnCoins = useCallback((amount: number) => {
    setState(prev => ({ ...prev, coins: prev.coins + amount }));
  }, []);

  const addScore = useCallback((amount: number) => {
    setState(prev => ({ ...prev, score: Math.max(0, prev.score + amount) }));
  }, []);

  const incrementDistance = useCallback((amount: number) => {
    setState(prev => ({ ...prev, distance: prev.distance + amount }));
  }, []);

  const buyCharacter = useCallback((char: CharacterType) => {
    setState(prev => {
      if (prev.coins >= CHARACTER_PRICE && !prev.unlockedCharacters.includes(char)) {
        return {
          ...prev,
          coins: prev.coins - CHARACTER_PRICE,
          unlockedCharacters: [...prev.unlockedCharacters, char],
          character: char
        };
      }
      return prev;
    });
  }, []);

  const selectCharacter = useCallback((char: CharacterType) => {
    setState(prev => {
      if (prev.unlockedCharacters.includes(char)) {
        return { ...prev, character: char };
      }
      return prev;
    });
  }, []);

  const resetProgress = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    state,
    updateState,
    earnCoins,
    addScore,
    incrementDistance,
    buyCharacter,
    selectCharacter,
    resetProgress,
    isLoaded
  };
}
