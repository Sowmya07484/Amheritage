"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Sparkles, UserCheck, Flag } from 'lucide-react';
import { CharacterType } from '@/lib/game-types';

interface CharacterUnlockProps {
  character: CharacterType;
  onContinue: () => void;
}

export function CharacterUnlock({ character, onContinue }: CharacterUnlockProps) {
  return (
    <div className="absolute inset-0 z-[120] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl animate-in fade-in zoom-in duration-700">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(24)].map((_, i) => (
          <div 
            key={i} 
            className="absolute animate-bounce"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.3
            }}
          >
            <Flag className="w-6 h-6 text-primary fill-primary" />
          </div>
        ))}
      </div>

      <Card className="w-full max-w-sm bg-gradient-to-b from-card to-background border-primary/40 shadow-[0_0_100px_rgba(37,99,235,0.4)] overflow-hidden">
        <div className="pt-12 pb-8 text-center px-6">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-primary/20">
            <Sparkles className="w-3 h-3" /> New Rank Achieved
          </div>
          
          <div className="relative w-56 h-56 mx-auto mb-8 flex items-center justify-center">
            {/* Radiant Hero Aura */}
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-[80px] animate-pulse" />
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-[60px] animate-bounce delay-700" />
            
            <div className="relative z-10 w-48 h-48 bg-white/5 rounded-[2rem] border-2 border-white/10 flex items-center justify-center overflow-hidden shadow-2xl group hover:scale-105 transition-transform duration-500">
               <div 
                  className="w-40 h-40"
                  style={{
                    backgroundImage: 'url(/trump-sprite.png)',
                    backgroundSize: '400% 100%',
                    backgroundPosition: '0% 0%',
                    imageRendering: 'pixelated',
                  }}
                />
            </div>
          </div>

          <h2 className="text-4xl font-headline font-black text-white italic tracking-tighter uppercase leading-none mb-3 drop-shadow-lg">
            {character}
          </h2>
          <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] max-w-[240px] mx-auto leading-relaxed">
            Your persistence strengthens the legacy of liberty. Lead the charge through American history.
          </p>
        </div>

        <CardContent className="px-8 py-0">
          <div className="flex gap-2 mb-10">
            <div className="flex-1 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
            <div className="flex-1 h-1.5 bg-accent rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            <div className="flex-1 h-1.5 bg-white/10 rounded-full" />
          </div>
        </CardContent>

        <CardFooter className="px-8 pb-12">
          <Button 
            className="w-full h-16 bg-white text-black hover:bg-white/90 active:scale-95 transition-all font-headline font-black italic text-2xl rounded-2xl group shadow-2xl"
            onClick={onContinue}
          >
            <UserCheck className="w-6 h-6 mr-3 stroke-[3px]" />
            CONTINUE CAMPAIGN
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
