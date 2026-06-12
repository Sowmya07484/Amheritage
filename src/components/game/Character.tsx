"use client";

import React from 'react';
import { CharacterType } from '@/lib/game-types';

interface CharacterProps {
  isJumping?: boolean;
  isMoving?: boolean;
  isHit?: boolean;
  lane: number;
  type?: CharacterType;
}

export function Character({ isJumping, isMoving, isHit, lane, type = 'Donald Trump' }: CharacterProps) {
  const lanePositions = ['20%', '50%', '80%'];
  
  const renderSprite = () => {
    switch (type) {
      case 'George Washington':
        return (
          <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
            {/* Colonial Coat (Deep Blue) */}
            <path d="M15,135 L85,135 L82,55 Q82,42 70,35 L30,35 Q18,42 18,55 Z" fill="#1e3a8a" stroke="#172554" strokeWidth="1" />
            <path d="M18,55 L35,135 M82,55 L65,135" stroke="#eab308" strokeWidth="2" strokeOpacity="0.5" />
            <path d="M38,35 L62,35 L65,55 L35,55 Z" fill="#ffffff" />
            <path d="M25,35 Q25,2 50,2 Q75,2 75,35 L25,35" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="28" cy="30" r="5" fill="#f8fafc" />
            <circle cx="72" cy="30" r="5" fill="#f8fafc" />
            <circle cx="23" cy="28" r="6" fill="#fee2e2" />
            <circle cx="77" cy="28" r="6" fill="#fee2e2" />
          </svg>
        );
      case 'Ariana Grande':
        return (
          <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
            {/* Pop Star Outfit (Lavender/Silver) */}
            <path d="M20,135 L80,135 L75,55 Q75,45 65,40 L35,40 Q25,45 25,55 Z" fill="#c084fc" stroke="#a855f7" strokeWidth="1" />
            <circle cx="50" cy="80" r="10" fill="#e9d5ff" /> {/* Sparkle detail */}
            
            {/* Signature High Ponytail */}
            <path d="M50,15 L75,40 L85,90 L70,85 L55,30 Z" fill="#451a03" /> {/* The Tail */}
            <circle cx="50" cy="25" r="22" fill="#451a03" stroke="#27272a" strokeWidth="1" /> {/* Head shape */}
            
            {/* Face/Ears */}
            <circle cx="28" cy="35" r="6" fill="#fdf4ff" />
            <circle cx="72" cy="35" r="6" fill="#fdf4ff" />
          </svg>
        );
      case 'Donald Trump':
      default:
        return (
          <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
            <path d="M15,135 L85,135 L82,55 Q82,42 70,35 L30,35 Q18,42 18,55 Z" fill="#1e3a8a" stroke="#172554" strokeWidth="1" />
            <line x1="50" y1="40" x2="50" y2="135" stroke="#172554" strokeWidth="2" strokeOpacity="0.5" />
            <path d="M38,35 L62,35 L68,48 L32,48 Z" fill="#ffffff" />
            <path d="M46,35 L54,35 L53,60 L47,60 Z" fill="#ef4444" />
            <path d="M25,35 Q25,2 50,2 Q75,2 75,35 L25,35" fill="#fde047" stroke="#eab308" strokeWidth="1" />
            <circle cx="23" cy="28" r="6" fill="#fee2e2" />
            <circle cx="77" cy="28" r="6" fill="#fee2e2" />
          </svg>
        );
    }
  };
  
  return (
    <div 
      className={`absolute bottom-24 left-1/2 -translate-x-1/2 w-32 h-44 transition-all duration-300 ease-out z-30 pointer-events-none`}
      style={{ 
        left: lanePositions[lane],
        transform: `translate(-50%, 0) scale(${isJumping ? 1.2 : 1})`,
        filter: isHit ? 'brightness(2) contrast(2)' : 'none'
      }}
    >
      <div 
        className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-black/40 blur-xl rounded-full transition-all duration-300 ${
          isJumping ? 'scale-50 opacity-10' : 'scale-100 opacity-100'
        }`} 
      />

      <div className={`w-full h-full relative ${isMoving ? 'animate-bounce' : ''}`} style={{ animationDuration: '0.4s' }}>
        {renderSprite()}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-[40px] -z-10 opacity-60 animate-pulse" />
      </div>
    </div>
  );
}
