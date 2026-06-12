"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Trophy, Star, ArrowRight, Zap, XCircle } from 'lucide-react';

interface LevelCompleteProps {
  level: number;
  score: number;
  stars: number;
  onNext: () => void;
}

export function LevelComplete({ level, score, stars, onNext }: LevelCompleteProps) {
  const isRequirementMet = stars >= 2;

  // Feedback based on stars
  const getFeedbackMessage = () => {
    if (stars === 3) return "EXCELLENT";
    if (stars === 2) return "NICE";
    if (stars === 1) return "GOOD";
    return "BETTER LUCK NEXT TIME";
  };

  return (
    <div className="absolute inset-0 z-[110] flex items-center justify-center p-6 bg-primary/20 backdrop-blur-xl animate-in fade-in zoom-in duration-500">
      <Card className="w-full max-w-sm bg-card border-primary/50 shadow-[0_0_50px_rgba(37,99,235,0.4)] overflow-hidden">
        <div className="bg-primary/20 py-8 border-b border-primary/30 flex flex-col items-center relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="grid grid-cols-4 gap-2 p-4">
              {[...Array(12)].map((_, i) => <Star key={i} className="w-4 h-4 text-white fill-white" />)}
            </div>
          </div>
          
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mb-4 ring-8 ring-primary/20 animate-bounce">
            <Trophy className="w-12 h-12 text-white fill-white" />
          </div>
          <h2 className="text-4xl font-headline font-black text-white italic tracking-tighter uppercase text-glow">Level {level}</h2>
          
          {/* Star Display */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <Star 
                key={s} 
                className={`w-8 h-8 ${s <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} 
              />
            ))}
          </div>

          <p className="text-primary-foreground/60 text-xs font-bold tracking-[0.3em] uppercase mt-4">
            {getFeedbackMessage()}
          </p>
        </div>

        <CardContent className="pt-8 pb-4">
          <div className="flex justify-around items-center">
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Total Score</p>
              <p className="text-3xl font-headline font-black text-white">{score.toLocaleString()}</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Stars</p>
              <p className="text-3xl font-headline font-black text-primary italic">{stars}/3</p>
            </div>
          </div>
          
          {!isRequirementMet && (
            <div className="mt-8 p-4 bg-accent/10 rounded-2xl border border-accent/20 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Unlock Failed</p>
                <p className="text-[10px] text-white/50">Need 2 stars (80% correct) to advance!</p>
              </div>
            </div>
          )}

          {isRequirementMet && (
            <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary fill-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Strategic Advance</p>
                <p className="text-[10px] text-white/50">Next level unlocked successfully!</p>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="pb-8">
          <Button 
            className={`w-full h-16 ${isRequirementMet ? 'bg-primary hover:bg-primary/90' : 'bg-white/10 text-white/40 hover:bg-white/20'} font-headline font-black italic text-xl rounded-2xl shadow-2xl group transition-all transform hover:scale-105`}
            onClick={onNext}
          >
            {isRequirementMet ? "NEXT CAMPAIGN" : "RETRY LEVEL"}
            <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
