"use client";

import React from 'react';
import { GameState } from '@/lib/game-types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Trophy, RotateCcw, Home, Star, Coins, Zap } from 'lucide-react';

interface GameOverProps {
  state: GameState;
  onRestart: () => void;
}

export function GameOver({ state, onRestart }: GameOverProps) {
  const accuracy = state.questionsTotal > 0 
    ? Math.round((state.questionsCorrect / state.questionsTotal) * 100) 
    : 0;

  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-lg animate-in fade-in zoom-in duration-500">
      <Card className="w-full max-w-sm bg-card border-accent/20 shadow-2xl overflow-hidden">
        <div className="bg-accent/10 py-6 border-b border-white/10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-3 ring-4 ring-accent/30 animate-pulse">
            <Zap className="w-10 h-10 text-accent fill-accent" />
          </div>
          <h2 className="text-3xl font-headline font-black text-white italic tracking-tighter uppercase red-glow">Mission Summary</h2>
          <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mt-1">Liberty requires persistence</p>
        </div>

        <CardContent className="pt-6 grid grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Score</p>
            <p className="text-2xl font-headline font-black text-white">{state.score.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Level</p>
            <p className="text-2xl font-headline font-black text-white">{state.level}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Accuracy</p>
            <p className="text-2xl font-headline font-black text-primary italic">{accuracy}%</p>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Coins</p>
            <div className="flex items-center justify-center gap-1.5">
              <Coins className="w-4 h-4 text-yellow-500 fill-yellow-400" />
              <p className="text-2xl font-headline font-black text-white">{state.coins}</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pb-8">
          <Button 
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-headline font-black italic text-lg shadow-xl shadow-primary/20"
            onClick={onRestart}
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          <div className="flex w-full gap-2">
            <Button variant="outline" className="flex-1 h-12 border-white/10 hover:bg-white/5 font-bold uppercase text-[10px] tracking-widest">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button variant="outline" className="flex-1 h-12 border-white/10 hover:bg-white/5 font-bold uppercase text-[10px] tracking-widest">
              <Star className="w-4 h-4 mr-2" />
              Badges
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
