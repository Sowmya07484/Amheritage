"use client";

import React from 'react';
import { Heart, Coins, Trophy, Zap } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { GameState } from '@/lib/game-types';

interface HUDProps {
  state: GameState;
  regenTimeFormatted: string;
  isPaused?: boolean;
}

export function HUD({ state, regenTimeFormatted, isPaused }: HUDProps) {
  const levelProgress = (state.questionsTotal % 5) * 20;

  return (
    <div className="absolute top-0 left-0 w-full p-4 flex flex-col gap-4 pointer-events-none z-10">
      {/* Top Bar */}
      <div className="flex justify-between items-start">
        {/* Left: Hearts & Timer */}
        <div className="flex flex-col gap-1">
          <div className="flex gap-1.5 items-center bg-black/40 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
            {[...Array(3)].map((_, i) => (
              <Heart 
                key={i} 
                className={`w-5 h-5 transition-all duration-300 ${i < state.hearts ? 'fill-accent text-accent' : 'text-white/20 fill-transparent'}`} 
              />
            ))}
            {state.hearts < 3 && (
              <span className="text-[10px] font-headline font-bold text-white/70 ml-2">
                {regenTimeFormatted}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 self-start">
            <Coins className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-headline font-bold text-white">{state.coins}</span>
          </div>
        </div>

        {/* Center: Score */}
        <div className="flex flex-col items-center">
          <div className="text-4xl font-headline font-black text-white text-glow drop-shadow-lg tracking-tighter italic">
            {state.score.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-headline font-bold uppercase tracking-widest text-primary-foreground/60">
            <Zap className="w-3 h-3 text-primary fill-primary" /> Distance
          </div>
        </div>

        {/* Right: Level & Best */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-md border border-primary/40 rounded-xl">
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-bold uppercase tracking-widest text-primary-foreground/50">Level</span>
              <span className="text-xl font-headline font-black text-white italic">{state.level}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-headline font-bold text-white/40">
            <Trophy className="w-3 h-3" /> {state.bestScore}
          </div>
        </div>
      </div>

      {/* Level Progress Bar */}
      <div className="w-full max-w-md mx-auto px-4 mt-2">
        <div className="flex justify-between items-end mb-1 px-1">
          <span className="text-[10px] font-headline font-bold text-white/50 uppercase tracking-widest">Questions {state.questionsCorrect}/{state.questionsTotal}</span>
          <span className="text-[10px] font-headline font-bold text-white/50 uppercase tracking-widest">{state.character}</span>
        </div>
        <Progress value={levelProgress} className="h-1.5 bg-white/10 border-none" />
      </div>
    </div>
  );
}
