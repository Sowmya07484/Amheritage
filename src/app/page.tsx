"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { HUD } from '@/components/game/HUD';
import { GameWorld } from '@/components/game/GameWorld';
import { QuizOverlay } from '@/components/game/QuizOverlay';
import { GameOver } from '@/components/game/GameOver';
import { LevelComplete } from '@/components/game/LevelComplete';
import { CharacterUnlock } from '@/components/game/CharacterUnlock';
import { usePersistentGameState } from '@/hooks/use-persistent-game-state';
import { Lane } from '@/lib/game-types';
import { Button } from '@/components/ui/button';
import { Play, Flag, Star } from 'lucide-react';

export default function HeritageSprint() {
  const { state, updateState, addScore, earnCoins, isLoaded } = usePersistentGameState();
  const [lane, setLane] = useState<Lane>(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [isUnlockActive, setIsUnlockActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(12);

  // Input Handlers
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isPlaying || isQuizActive || isGameOver || isLevelComplete || isUnlockActive) return;
    if (e.key === 'ArrowLeft') setLane(prev => Math.max(0, prev - 1) as Lane);
    if (e.key === 'ArrowRight') setLane(prev => Math.min(2, prev + 1) as Lane);
  }, [isPlaying, isQuizActive, isGameOver, isLevelComplete, isUnlockActive]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isPlaying || isQuizActive || isGameOver || isLevelComplete || isUnlockActive) return;
    const touchX = e.touches[0].clientX;
    const width = window.innerWidth;
    if (touchX < width / 3) setLane(0);
    else if (touchX < (width * 2) / 3) setLane(1);
    else setLane(2);
  };

  const onCollision = useCallback(() => {
    // Collision now just penalizes speed
    setSpeed(prev => Math.max(8, prev - 3));
    setTimeout(() => setSpeed(prev => Math.min(18, prev + 2)), 1500);
  }, []);

  const onCoinCollected = useCallback(() => {
    earnCoins(1);
    addScore(10);
  }, [earnCoins, addScore]);

  const onCheckpoint = useCallback(() => {
    setIsQuizActive(true);
  }, []);

  const onQuizAnswer = useCallback((correct: boolean) => {
    setIsQuizActive(false);
    
    if (correct) {
      const nextTotal = state.questionsTotal + 1;
      const nextCorrect = state.questionsCorrect + 1;
      
      updateState({
        questionsTotal: nextTotal,
        questionsCorrect: nextCorrect,
        score: state.score + 100,
        coins: state.coins + 10
      });
      setSpeed(prev => Math.min(25, prev + 2));

      // Check for level complete (every 5 questions)
      if (nextTotal % 5 === 0) {
        setIsLevelComplete(true);
      }
    } else {
      // Wrong answer just increments total without rewards
      updateState({
        questionsTotal: state.questionsTotal + 1
      });
    }
  }, [state, updateState]);

  const handleNextLevel = () => {
    setIsLevelComplete(false);
    const nextLevel = state.level + 1;
    updateState({ level: nextLevel });
    
    // Check for character unlock every 5 levels
    if (nextLevel % 5 === 1 && nextLevel > 1) {
      setIsUnlockActive(true);
    }
  };

  const startNewGame = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    setIsQuizActive(false);
    setIsLevelComplete(false);
    setIsUnlockActive(false);
    updateState({ score: 0, questionsCorrect: 0, questionsTotal: 0 });
  };

  if (!isLoaded) return null;

  return (
    <main 
      className="relative w-full h-svh bg-background overflow-hidden font-headline"
      onTouchStart={handleTouchStart}
    >
      {!isPlaying && !isGameOver && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl p-8">
          <div className="mb-12 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-6 ring-8 ring-primary/20 animate-bounce">
              <Flag className="w-12 h-12 text-white fill-white" />
            </div>
            <h1 className="text-6xl font-black text-white italic tracking-tighter uppercase leading-none drop-shadow-[0_5px_15px_rgba(37,99,235,0.8)]">
              American<br /><span className="text-accent italic">Heritage Run</span>
            </h1>
            <p className="mt-4 text-white/70 text-sm font-bold uppercase tracking-[0.2em]">Protect Liberty. Answer the Call.</p>
          </div>
          
          <Button 
            className="w-full max-w-xs h-20 bg-primary hover:bg-primary/90 text-white font-black italic text-3xl rounded-3xl shadow-2xl border-b-8 border-primary/60 group transition-all transform hover:scale-105 active:scale-95"
            onClick={startNewGame}
          >
            <Play className="w-8 h-8 mr-3 fill-white" />
            RUN NOW
          </Button>

          <div className="mt-12 flex gap-4">
             <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10 w-32">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500 mb-2" />
                <p className="text-[10px] font-bold text-white/40 uppercase">Best Score</p>
                <p className="text-xl font-black text-white">{state.bestScore}</p>
             </div>
             <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10 w-32">
                <Flag className="w-6 h-6 text-primary mb-2" />
                <p className="text-[10px] font-bold text-white/40 uppercase">Max Level</p>
                <p className="text-xl font-black text-white">{state.level}</p>
             </div>
          </div>
        </div>
      )}

      <HUD 
        state={state} 
        isPaused={isQuizActive || isLevelComplete || isUnlockActive || !isPlaying} 
      />

      <GameWorld 
        lane={lane} 
        speed={speed} 
        isPaused={isQuizActive || isLevelComplete || isUnlockActive || !isPlaying || isGameOver}
        onCollision={onCollision}
        onCheckpoint={onCheckpoint}
        onCoinCollected={onCoinCollected}
      />

      {isQuizActive && (
        <QuizOverlay 
          level={state.level} 
          onAnswer={onQuizAnswer} 
        />
      )}

      {isLevelComplete && (
        <LevelComplete 
          level={state.level} 
          score={state.score} 
          onNext={handleNextLevel} 
        />
      )}

      {isUnlockActive && (
        <CharacterUnlock 
          character={state.character} 
          onContinue={() => setIsUnlockActive(false)} 
        />
      )}

      {isGameOver && (
        <GameOver 
          state={state} 
          onRestart={startNewGame} 
        />
      )}

      {/* Decorative Overlays */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none opacity-80" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent pointer-events-none opacity-60" />
    </main>
  );
}
