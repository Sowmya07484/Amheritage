"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CharacterType, CHARACTER_PRICE } from '@/lib/game-types';
import { Coins, UserCheck, Lock, ShoppingBag, X } from 'lucide-react';

interface StoreOverlayProps {
  coins: number;
  unlockedCharacters: CharacterType[];
  selectedCharacter: CharacterType;
  onClose: () => void;
  onBuy: (char: CharacterType) => void;
  onSelect: (char: CharacterType) => void;
}

const CHARACTERS: CharacterType[] = ['Donald Trump', 'George Washington', 'Benjamin Franklin'];

export function StoreOverlay({ coins, unlockedCharacters, selectedCharacter, onClose, onBuy, onSelect }: StoreOverlayProps) {
  return (
    <div className="absolute inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-xl p-6 animate-in fade-in duration-300">
      <Card className="w-full max-w-lg bg-card border-primary/20 shadow-2xl overflow-hidden relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4 text-white/40 hover:text-white"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </Button>

        <CardHeader className="text-center pt-8">
          <div className="flex justify-center mb-2">
            <ShoppingBag className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-black italic text-white uppercase tracking-tighter">Hero Store</CardTitle>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Coins className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-2xl font-black text-white">{coins}</span>
          </div>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-2">New character every 300 coins!</p>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-4 py-6">
          {CHARACTERS.map((char) => {
            const isUnlocked = unlockedCharacters.includes(char);
            const isSelected = selectedCharacter === char;
            const canAfford = coins >= CHARACTER_PRICE;

            return (
              <div 
                key={char}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                  isSelected ? 'bg-primary/20 border-primary shadow-[0_0_20px_rgba(37,99,235,0.2)]' : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-lg font-black text-white italic">{char}</span>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    {isUnlocked ? (isSelected ? 'Currently Selected' : 'Unlocked') : `${CHARACTER_PRICE} Coins`}
                  </span>
                </div>

                {isUnlocked ? (
                  <Button 
                    variant={isSelected ? "default" : "outline"}
                    className={isSelected ? "bg-primary" : "border-white/10 text-white"}
                    disabled={isSelected}
                    onClick={() => onSelect(char)}
                  >
                    {isSelected ? <UserCheck className="w-4 h-4 mr-2" /> : null}
                    {isSelected ? 'SELECTED' : 'SELECT'}
                  </Button>
                ) : (
                  <Button 
                    className={canAfford ? "bg-primary hover:bg-primary/90" : "bg-white/10 text-white/40"}
                    disabled={!canAfford}
                    onClick={() => onBuy(char)}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    BUY
                  </Button>
                )}
              </div>
            );
          })}
        </CardContent>
        
        <CardFooter className="pb-8 justify-center">
          <Button variant="ghost" className="text-white/40 uppercase font-black text-xs tracking-widest" onClick={onClose}>
            Back to Campaign
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
