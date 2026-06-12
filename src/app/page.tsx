"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { HUD } from '@/components/game/HUD';
import { GameWorld } from '@/components/game/GameWorld';
import { QuizOverlay } from '@/components/game/QuizOverlay';
import { GameOver } from '@/components/game/GameOver';
import { LevelComplete } from '@/components/game/LevelComplete';
import { CharacterUnlock } from '@/components/game/CharacterUnlock';
import { LevelMap } from '@/components/game/LevelMap';
import { PauseOverlay } from '@/components/game/PauseOverlay';
import { usePersistentGameState } from '@/hooks/use-persistent-game-state';
import { Lane, QUESTIONS_PER_LEVEL, MAX_LEVELS, CHARACTER_PROGRESSION } from '@/lib/game-types';
import { Button } from '@/components/ui/button';
import { Play, Flag, Star, ChevronLeft, ChevronRight, Map as MapIcon } from 'lucide-react';

export default function HeritageSprint() {
  const { state, updateState, addScore, earnCoins, isLoaded } = usePersistentGameState();
  const [lane, setLane] = useState<Lane>(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [isUnlockActive, setIsUnlockActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [speed, setSpeed] = useState(12);
  const [lastEarnedStars, setLastEarnedStars] = useState(0);

  const touchStartPos = useRef<{ x: number, y: number } | null>(null);

  const moveLeft = useCallback(() => {
    setLane(prev => (prev > 0 ? prev - 1 : 0) as Lane);
  }, []);

  const moveRight = useCallback(() => {
    setLane(prev => (prev < 2 ? prev + 1 : 2) as Lane);
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || isQuizActive || isGameOver || isLevelComplete || isUnlockActive || isPaused) return;
      
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') moveLeft();
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') moveRight();
      if (e.key === 'Escape') setIsPaused(true);
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isPlaying, isQuizActive, isGameOver, isLevelComplete, isUnlockActive, isPaused, moveLeft, moveRight]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartPos.current || !isPlaying || isQuizActive || isGameOver || isLevelComplete || isUnlockActive || isPaused) return;
    const diffX = e.changedTouches[0].clientX - touchStartPos.current.x;
    const diffY = e.changedTouches[0].clientY - touchStartPos.current.y;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
      if (diffX > 0) moveRight(); else moveLeft();
    }
    touchStartPos.current = null;
  };

  const onCollision = useCallback(() => {
    addScore(-5);
  }, [addScore]);

  const onCoinCollected = useCallback(() => {
    earnCoins(1);
    addScore(10);
  }, [earnCoins, addScore]);

  const onCheckpoint = useCallback(() => {
    setIsQuizActive(true);
  }, []);

  const onQuizAnswer = useCallback((correct: boolean) => {
    setIsQuizActive(false);
    
    const nextInLevel = state.questionsInLevel + 1;
    const nextCorrect = correct ? state.questionsCorrect + 1 : state.questionsCorrect;
    const nextTotal = state.questionsTotal + 1;

    if (nextInLevel >= QUESTIONS_PER_LEVEL) {
      let stars = 0;
      if (nextCorrect === 10) stars = 3;
      else if (nextCorrect >= 8) stars = 2;
      else if (nextCorrect >= 6) stars = 1;

      setLastEarnedStars(stars);
      setIsLevelComplete(true);

      const updatedStarsByLevel = { ...state.starsByLevel, [state.level]: stars };
      const totalStars = Object.values(updatedStarsByLevel).reduce((a, b) => a + b, 0);

      updateState({
        questionsInLevel: 0,
        questionsCorrect: 0,
        questionsTotal: nextTotal,
        score: state.score + (correct ? 100 : 0) + 500,
        starsByLevel: updatedStarsByLevel,
        totalStars: totalStars
      });
    } else {
      updateState({
        questionsInLevel: nextInLevel,
        questionsCorrect: nextCorrect,
        questionsTotal: nextTotal,
        score: state.score + (correct ? 100 : -50)
      });
    }
  }, [state, updateState]);

  const handleNextLevel = () => {
    const earnedStars = state.starsByLevel[state.level] || 0;
    
    if (earnedStars < 2) {
      setIsLevelComplete(false);
      startNewGame();
      return;
    }

    setIsLevelComplete(false);
    const nextLevel = Math.min(MAX_LEVELS, state.level + 1);
    const isUnlockLevel = CHARACTER_PROGRESSION[nextLevel] && CHARACTER_PROGRESSION[nextLevel] !== state.character;
    
    updateState({ level: nextLevel });
    
    if (isUnlockLevel) {
      setIsUnlockActive(true);
    } else {
      setShowMap(true);
      setIsPlaying(false);
    }
  };

  const startNewGame = () => {
    setIsPlaying(true);
    setIsPaused(false);
    setIsGameOver(false);
    setIsQuizActive(false);
    setIsLevelComplete(false);
    setIsUnlockActive(false);
    setShowMap(false);
    setLane(1);
    setSpeed(12 + (state.level * 1.5));
  };

  if (!isLoaded) return null;

  return (
    <main 
      className="relative w-full h-svh bg-background overflow-hidden select-none touch-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {!isPlaying && !isGameOver && !isLevelComplete && !isQuizActive && !isUnlockActive && (
        <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl p-8">
          {showMap ? (
            <div className="flex flex-col items-center gap-8 w-full">
               <LevelMap currentLevel={state.level} starsByLevel={state.starsByLevel} />
               <Button 
                className="w-full max-w-xs h-20 bg-primary hover:bg-primary/90 text-white font-black italic text-3xl rounded-3xl shadow-2xl border-b-8 border-primary/60 group transition-all transform hover:scale-105 active:scale-95"
                onClick={startNewGame}
              >
                <Play className="w-8 h-8 mr-3 fill-white" />
                START LEVEL {state.level}
              </Button>
              <Button variant="ghost" className="text-white/40 font-bold uppercase tracking-widest text-xs" onClick={() => setShowMap(false)}>
                Return to Menu
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-12 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-6 ring-8 ring-primary/20 animate-bounce">
                  <Flag className="w-12 h-12 text-white fill-white" />
                </div>
                <h1 className="text-6xl font-black text-white italic tracking-tighter uppercase leading-none drop-shadow-[0_5px_15px_rgba(37,99,235,0.8)]">
                  American<br /><span className="text-accent italic">Heritage Run</span>
                </h1>
                <p className="mt-4 text-white/70 text-sm font-bold uppercase tracking-[0.2em]">Defend Liberty. Master History.</p>
              </div>
              
              <div className="flex flex-col gap-4 w-full max-w-xs">
                <Button 
                  className="w-full h-20 bg-primary hover:bg-primary/90 text-white font-black italic text-3xl rounded-3xl shadow-2xl border-b-8 border-primary/60 group transition-all transform hover:scale-105 active:scale-95"
                  onClick={startNewGame}
                >
                  <Play className="w-8 h-8 mr-3 fill-white" />
                  PLAY
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full h-16 bg-white/5 border-white/10 text-white font-bold italic text-xl rounded-2xl group transition-all"
                  onClick={() => setShowMap(true)}
                >
                  <MapIcon className="w-6 h-6 mr-3" />
                  VIEW MAP
                </Button>
              </div>

              <div className="mt-12 flex gap-4">
                <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10 w-32">
                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500 mb-2" />
                    <p className="text-[10px] font-bold text-white/40 uppercase">Best</p>
                    <p className="text-xl font-black text-white">{state.bestScore}</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10 w-32">
                    <Flag className="w-6 h-6 text-primary mb-2" />
                    <p className="text-[10px] font-bold text-white/40 uppercase">Phase</p>
                    <p className="text-xl font-black text-white">{state.level}</p>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <HUD 
        state={state} 
        isPaused={isPaused} 
        onTogglePause={() => setIsPaused(!isPaused)}
      />

      <GameWorld 
        lane={lane} 
        speed={speed} 
        isPaused={isQuizActive || isLevelComplete || isUnlockActive || !isPlaying || isGameOver || isPaused}
        onCollision={onCollision}
        onCheckpoint={onCheckpoint}
        onCoinCollected={onCoinCollected}
      />

      {isPaused && (
        <PauseOverlay 
          onResume={() => setIsPaused(false)}
          onRestart={startNewGame}
          onHome={() => {
            setIsPlaying(false);
            setIsPaused(false);
          }}
        />
      )}

      {isQuizActive && (
        <QuizOverlay 
          level={state.level} 
          questionNumber={state.questionsInLevel + 1}
          onAnswer={onQuizAnswer} 
        />
      )}

      {isLevelComplete && (
        <LevelComplete 
          level={state.level} 
          score={state.score} 
          stars={lastEarnedStars}
          onNext={handleNextLevel} 
        />
      )}

      {isUnlockActive && (
        <CharacterUnlock 
          character={state.character} 
          onContinue={() => {
            setIsUnlockActive(false);
            setShowMap(true);
            setIsPlaying(false);
          }} 
        />
      )}

      {isGameOver && (
        <GameOver 
          state={state} 
          onRestart={startNewGame} 
        />
      )}

      {isPlaying && !isQuizActive && !isLevelComplete && !isGameOver && !isUnlockActive && !isPaused && (
        <div className="absolute inset-x-0 bottom-12 z-50 px-6 flex justify-between pointer-events-none">
          <Button 
            className="w-24 h-24 rounded-full bg-primary/30 backdrop-blur-xl border-4 border-primary/50 text-white pointer-events-auto active:scale-90 active:bg-primary/60 transition-all flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            onClick={(e) => { e.preventDefault(); moveLeft(); }}
          >
            <ChevronLeft className="w-14 h-14 stroke-[4px]" />
          </Button>
          
          <Button 
            className="w-24 h-24 rounded-full bg-accent/30 backdrop-blur-xl border-4 border-accent/50 text-white pointer-events-auto active:scale-90 active:bg-accent/60 transition-all flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.4)]"
            onClick={(e) => { e.preventDefault(); moveRight(); }}
          >
            <ChevronRight className="w-14 h-14 stroke-[4px]" />
          </Button>
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none opacity-80" />
    </main>
  );
}
