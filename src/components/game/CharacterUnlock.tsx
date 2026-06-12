
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Sparkles, Star, UserCheck } from 'lucide-react';
import { CharacterType } from '@/lib/game-types';

interface CharacterUnlockProps {
  character: CharacterType;
  onContinue: () => void;
}

export function CharacterUnlock({ character, onContinue }: CharacterUnlockProps) {
  return (
    <div className="absolute inset-0 z-[120] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl animate-in fade-in zoom-in duration-700">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.2
            }}
          >
            <Star className="w-4 h-4 text-primary fill-primary" />
          </div>
        ))}
      </div>

      <Card className="w-full max-w-sm bg-gradient-to-b from-card to-background border-primary/40 shadow-[0_0_100px_rgba(37,99,235,0.3)] overflow-hidden">
        <div className="pt-12 pb-8 text-center px-6">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3" /> New Hero Unlocked
          </div>
          
          <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
             {/* Glowing Background for Character */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="relative z-10 w-40 h-40 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden">
               <div 
                  className="w-32 h-32"
                  style={{
                    backgroundImage: 'url(/trump-sprite.png)',
                    backgroundSize: '400% 100%',
                    backgroundPosition: '0% 0%',
                    imageRendering: 'pixelated',
                  }}
                />
            </div>
          </div>

          <h2 className="text-4xl font-headline font-black text-white italic tracking-tighter uppercase leading-none mb-2">
            {character}
          </h2>
          <p className="text-white/40 text-xs font-medium max-w-[200px] mx-auto leading-relaxed">
            Your influence grows. This legendary status grants you increased prestige and faster coin collection!
          </p>
        </div>

        <CardContent className="px-6 py-0">
          <div className="grid grid-cols-3 gap-2 mb-8">
            <div className="h-1 bg-primary rounded-full" />
            <div className="h-1 bg-accent rounded-full" />
            <div className="h-1 bg-white/20 rounded-full" />
          </div>
        </CardContent>

        <CardFooter className="px-6 pb-12">
          <Button 
            className="w-full h-16 bg-white text-black hover:bg-white/90 font-headline font-black italic text-xl rounded-2xl group"
            onClick={onContinue}
          >
            <UserCheck className="w-6 h-6 mr-2" />
            EQUIP NOW
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
