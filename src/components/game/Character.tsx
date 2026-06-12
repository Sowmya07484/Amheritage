"use client";

import React from 'react';
import { CharacterType } from '@/lib/game-types';

interface CharacterProps {
  type: CharacterType;
  isJumping?: boolean;
  isMoving?: boolean;
}

export function Character({ type, isJumping, isMoving }: CharacterProps) {
  // Cartoon Trump-style Avatar (Simplified SVG representation)
  return (
    <div className={`relative w-24 h-32 transition-transform duration-200 ${isJumping ? '-translate-y-12' : ''} ${isMoving ? 'animate-bounce' : ''}`}>
      {/* Cartoon Donald Avatar */}
      <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-2xl">
        {/* Hair - Iconic swoop */}
        <path d="M20,30 Q50,0 90,30 Q70,40 20,30" fill="#FBBF24" />
        {/* Face */}
        <ellipse cx="50" cy="55" rx="30" ry="35" fill="#FED7AA" />
        {/* Eyes */}
        <circle cx="40" cy="50" r="3" fill="black" />
        <circle cx="60" cy="50" r="3" fill="black" />
        {/* Mouth */}
        <path d="M40,75 Q50,85 60,75" fill="none" stroke="red" strokeWidth="2" />
        {/* Suit */}
        <path d="M20,90 L80,90 L90,120 L10,120 Z" fill="#1E3A8A" />
        {/* White Shirt / Red Tie */}
        <path d="M45,90 L55,90 L55,120 L45,120 Z" fill="white" />
        <path d="M48,95 L52,95 L55,120 L45,120 Z" fill="red" />
      </svg>
      
      {/* Cape for "The Patriot" style */}
      <div className="absolute -z-10 top-20 left-1/2 -translate-x-1/2 w-20 h-24 bg-red-600 rounded-lg opacity-80 animate-pulse" />
    </div>
  );
}
