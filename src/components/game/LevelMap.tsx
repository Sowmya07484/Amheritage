"use client";

import React from 'react';
import { MAX_LEVELS } from '@/lib/game-types';
import { cn } from '@/lib/utils';
import { Star, Flag, Lock, CheckCircle2 } from 'lucide-react';

interface LevelMapProps {
  currentLevel: number;
  onSelectLevel?: (level: number) => void;
}

export function LevelMap({ currentLevel }: LevelMapProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] -z-10" />
      
      <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase text-center mb-8 flex items-center justify-center gap-2">
        <Flag className="w-6 h-6 text-primary" /> Heritage Campaign Map
      </h3>

      <div className="grid grid-cols-5 gap-6 relative">
        {/* Connector Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 -z-10" />
        
        {Array.from({ length: MAX_LEVELS }).map((_, i) => {
          const levelNum = i + 1;
          const isCompleted = levelNum < currentLevel;
          const isCurrent = levelNum === currentLevel;
          const isLocked = levelNum > currentLevel;

          return (
            <div 
              key={levelNum}
              className="flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div 
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 relative",
                  isCompleted ? "bg-primary shadow-[0_0_15px_rgba(37,99,235,0.5)]" : 
                  isCurrent ? "bg-accent animate-pulse-light shadow-[0_0_20px_rgba(239,68,68,0.6)]" : 
                  "bg-white/5 border border-white/10"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-white" />
                ) : isLocked ? (
                  <Lock className="w-4 h-4 text-white/20" />
                ) : (
                  <span className="text-xl font-black text-white italic">{levelNum}</span>
                )}
                
                {isCurrent && (
                  <div className="absolute -top-1 -right-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-bounce" />
                  </div>
                )}
              </div>
              <span className={cn(
                "text-[8px] font-black uppercase tracking-widest",
                isCurrent ? "text-accent" : isLocked ? "text-white/20" : "text-white/60"
              )}>
                {isCurrent ? "Active" : isLocked ? "Locked" : "Done"}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/40">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" /> Completed
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent" /> Target
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white/20" /> Strategic Reserve
        </div>
      </div>
    </div>
  );
}
