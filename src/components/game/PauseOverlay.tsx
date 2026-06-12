"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Home, RotateCcw } from 'lucide-react';

interface PauseOverlayProps {
  onResume: () => void;
  onRestart: () => void;
  onHome: () => void;
}

export function PauseOverlay({ onResume, onRestart, onHome }: PauseOverlayProps) {
  return (
    <div className="absolute inset-0 z-[80] flex items-center justify-center bg-black/70 backdrop-blur-xl p-8 animate-in fade-in duration-300">
      <div className="flex flex-col items-center gap-8 w-full max-w-xs">
        <div className="text-center space-y-2">
          <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase drop-shadow-2xl">Game Paused</h2>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Strategy is required for victory</p>
        </div>

        <Button 
          className="w-full h-20 bg-primary hover:bg-primary/90 text-white font-black italic text-3xl rounded-3xl shadow-2xl group transition-all transform hover:scale-105 active:scale-95"
          onClick={onResume}
        >
          <Play className="w-8 h-8 mr-3 fill-white" />
          RESUME
        </Button>

        <div className="grid grid-cols-2 gap-4 w-full">
          <Button 
            variant="outline"
            className="h-14 bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10 font-bold rounded-2xl"
            onClick={onRestart}
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            RETRY
          </Button>
          <Button 
            variant="outline"
            className="h-14 bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10 font-bold rounded-2xl"
            onClick={onHome}
          >
            <Home className="w-5 h-5 mr-2" />
            HOME
          </Button>
        </div>
      </div>
    </div>
  );
}
