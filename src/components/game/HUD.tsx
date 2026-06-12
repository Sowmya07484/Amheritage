"use client";

import React from 'react';
import { Coins, Zap, Star } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { GameState } from '@/lib/game-types';

interface HUDProps {
  state: GameState;
  isPaused?: boolean;
}

export function HUD({ state, isPaused }: HUDProps) {
  const levelProgress = (state.questionsTotal % 5) * 20;

  return (
    <div className="absolute top-0 left-0 w-full p-4 flex flex-col gap-4 pointer-events-none z-10">
      <div className="flex justify-between items-start">
        {/* Stats Left */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 backdrop-blur-md rounded-2xl border border-yellow-500/40 shadow-lg self-start">
            <Coins className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-lg font-black text-white">{state.coins}</span>
          </div>
        </div>

        {/* Score Center */}
        <div className="flex flex-col items-center">
          <div className="text-5xl font-black text-white text-glow drop-shadow-[0_4px_8px_rgba(37,99,235,0.5)] italic tracking-tighter">
            {state.score.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
            <Zap className="w-3 h-3 text-primary fill-primary" /> Distance
          </div>
        </div>

        {/* Level Right */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex flex-col items-end bg-primary/20 backdrop-blur-md border border-primary/40 p-3 rounded-2xl shadow-lg">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground/50">Level</span>
            <span className="text-3xl font-black text-white italic leading-none">{state.level}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-white/60 bg-black/40 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> {state.bestScore}
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="w-full max-w-sm mx-auto mt-4 transform translate-y-[-10px]">
        <div className="flex justify-between items-end mb-1.5 px-2">
          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Questions {state.questionsCorrect}/{state.questionsTotal}</span>
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{state.character}</span>
        </div>
        <Progress value={levelProgress} className="h-3 bg-white/10 border border-white/5 rounded-full" />
      </div>
    </div>
  );
}
