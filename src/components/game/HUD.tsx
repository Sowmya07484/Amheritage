"use client";

import React from 'react';
import { Coins, Zap, Star, Pause, Play } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { GameState, QUESTIONS_PER_LEVEL } from '@/lib/game-types';
import { Button } from '@/components/ui/button';

interface HUDProps {
  state: GameState;
  isPaused: boolean;
  onTogglePause: () => void;
}

export function HUD({ state, isPaused, onTogglePause }: HUDProps) {
  const levelProgress = (state.questionsInLevel / QUESTIONS_PER_LEVEL) * 100;

  return (
    <div className="absolute top-0 left-0 w-full p-4 flex flex-col gap-4 pointer-events-none z-40">
      <div className="flex justify-between items-start">
        {/* Stats Left */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 backdrop-blur-md rounded-2xl border border-yellow-500/40 shadow-lg self-start pointer-events-auto">
            <Coins className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-lg font-black text-white">{state.coins}</span>
          </div>
          
          <Button 
            variant="ghost" 
            className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 p-0 flex items-center justify-center pointer-events-auto hover:bg-black/60 active:scale-95 transition-all"
            onClick={onTogglePause}
          >
            {isPaused ? <Play className="w-6 h-6 text-white" /> : <Pause className="w-6 h-6 text-white" />}
          </Button>
        </div>

        {/* Score Center */}
        <div className="flex flex-col items-center">
          <div className="text-5xl font-black text-white text-glow drop-shadow-[0_4px_8px_rgba(37,99,235,0.5)] italic tracking-tighter">
            {state.score.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {state.totalStars} Stars Collected
          </div>
        </div>

        {/* Level Right */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex flex-col items-end bg-primary/20 backdrop-blur-md border border-primary/40 p-3 rounded-2xl shadow-lg">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground/50">Phase</span>
            <span className="text-3xl font-black text-white italic leading-none">{state.level}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-white/60 bg-black/40 px-3 py-1 rounded-full">
            <Zap className="w-4 h-4 text-primary fill-primary" /> {state.bestScore}
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="w-full max-w-sm mx-auto mt-4 transform translate-y-[-10px]">
        <div className="flex justify-between items-end mb-1.5 px-2">
          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Progress {state.questionsInLevel}/{QUESTIONS_PER_LEVEL}</span>
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{state.character}</span>
        </div>
        <Progress value={levelProgress} className="h-3 bg-white/10 border border-white/5 rounded-full" />
      </div>
    </div>
  );
}
