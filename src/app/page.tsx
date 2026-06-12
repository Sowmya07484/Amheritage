"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { HUD } from '@/components/game/HUD';
import { GameWorld } from '@/components/game/GameWorld';
import { QuizOverlay } from '@/components/game/QuizOverlay';
import { GameOver } from '@/components/game/GameOver';
import { usePersistentGameState } from '@/hooks/use-persistent-game-state';
import { Lane } from '@/lib/game-types';
import { Button } from '@/components/ui/button';
import { Zap, Play } from 'lucide-react';

export default function HeritageSprint() {
  const { state, updateState, loseHeart, addScore, earnCoins, isLoaded, regenTimeRemaining } = usePersistentGameState();
  const [lane, setLane] = useState<Lane>(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(10);

  // Input Handlers
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isPlaying || isQuizActive || isGameOver) return;
    
    if (e.key === 'ArrowLeft') setLane(prev => Math.max(0, prev - 1) as Lane);
    if (e.key === 'ArrowRight') setLane(prev => Math.min(2, prev + 1) as Lane);
  }, [isPlaying, isQuizActive, isGameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Touch Handling (Swipe)
  const touchStartRef = React.useRef<{ x: number, y: number } | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    if (Math.abs(dx) > 30) {
      if (dx > 0) setLane(prev => Math.min(2, prev + 1) as Lane);
      else setLane(prev => Math.max(0, prev - 1) as Lane);
    }
    touchStartRef.current = null;
  };

  const onCollision = useCallback(() => {
    loseHeart();
    // Temporary slow down
    setSpeed(prev => Math.max(5, prev - 2));
    setTimeout(() => setSpeed(prev => Math.min(15, prev + 2)), 2000);
    
    // Game over check is handled by heart count in persistent state
  }, [loseHeart]);

  useEffect(() => {
    if (isLoaded && state.hearts <= 0 && isPlaying) {
      setIsGameOver(true);
      setIsPlaying(false);
    }
  }, [state.hearts, isLoaded, isPlaying]);

  const onCheckpoint = useCallback(() => {
    setIsQuizActive(true);
  }, []);

  const onQuizAnswer = useCallback((correct: boolean) => {
    setIsQuizActive(false);
    updateState({
      questionsTotal: state.questionsTotal + 1,
      questionsCorrect: state.questionsCorrect + (correct ? 1 : 0),
      score: state.score + (correct ? 100 : 0),
      coins: state.coins + (correct ? 10 : 0)
    });

    if (correct) {
      // Speed boost
      setSpeed(prev => Math.min(20, prev + 3));
      setTimeout(() => setSpeed(prev => Math.max(10, prev - 3)), 5000);
    } else {
      loseHeart();
    }

    // Level up check
    if ((state.questionsTotal + 1) % 5 === 0) {
      updateState({ level: state.level + 1 });
    }
  }, [state, updateState, loseHeart]);

  const startNewGame = () => {
    if (state.hearts <= 0) return;
    setIsPlaying(true);
    setIsGameOver(false);
    setIsQuizActive(false);
    updateState({ score: 0, questionsCorrect: 0, questionsTotal: 0 });
  };

  const regenMinutes = Math.floor(regenTimeRemaining / 60000);
  const regenSeconds = Math.floor((regenTimeRemaining % 60000) / 1000);
  const formattedRegen = `${regenMinutes}:${regenSeconds.toString().padStart(2, '0')}`;

  if (!isLoaded) return null;

  return (
    <main 
      className="relative w-full h-svh bg-background overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {!isPlaying && !isGameOver && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md p-8">
          <div className="mb-12 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-primary/20 rounded-3xl flex items-center justify-center mb-6 ring-4 ring-primary/40 animate-float">
              <Zap className="w-14 h-14 text-primary fill-primary drop-shadow-[0_0_15px_rgba(37,99,235,0.6)]" />
            </div>
            <h1 className="text-6xl font-headline font-black text-white italic tracking-tighter uppercase leading-none drop-shadow-2xl">
              Heritage<br /><span className="text-primary italic">Sprint</span>
            </h1>
            <p className="mt-4 text-white/50 text-[10px] font-bold uppercase tracking-[0.3em]">The Endless Frontier Awaits</p>
          </div>
          
          <Button 
            className="w-full max-w-xs h-20 bg-primary hover:bg-primary/90 text-white font-headline font-black italic text-2xl rounded-2xl shadow-2xl shadow-primary/40 border-b-8 border-primary/50 group transition-all"
            onClick={startNewGame}
            disabled={state.hearts <= 0}
          >
            <Play className="w-8 h-8 mr-3 fill-white transition-transform group-hover:scale-110" />
            RUN NOW
          </Button>

          {state.hearts <= 0 && (
            <div className="mt-8 flex flex-col items-center gap-2">
              <p className="text-accent font-bold uppercase tracking-widest text-[10px] animate-pulse">Out of Hearts</p>
              <p className="text-white/40 font-medium text-xs">Next heart in {formattedRegen}</p>
            </div>
          )}
        </div>
      )}

      <HUD 
        state={state} 
        regenTimeFormatted={formattedRegen} 
        isPaused={isQuizActive || !isPlaying} 
      />

      <GameWorld 
        lane={lane} 
        speed={speed} 
        isPaused={isQuizActive || !isPlaying || isGameOver}
        onCollision={onCollision}
        onCheckpoint={onCheckpoint}
      />

      {isQuizActive && (
        <QuizOverlay 
          level={state.level} 
          onAnswer={onQuizAnswer} 
        />
      )}

      {isGameOver && (
        <GameOver 
          state={state} 
          onRestart={startNewGame} 
        />
      )}

      {/* Decorative Overlays */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background to-transparent pointer-events-none opacity-60" />
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background to-transparent pointer-events-none opacity-40" />
    </main>
  );
}
