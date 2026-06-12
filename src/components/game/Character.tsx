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
      case 'Benjamin Franklin':
        return (
          <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
            {/* Colonial Suit (Grey/Brown) */}
            <path d="M15,135 L85,135 L80,60 Q80,50 70,45 L30,45 Q20,50 20,60 Z" fill="#4b5563" stroke="#1f2937" strokeWidth="1" />
            <path d="M40,45 L60,45 L62,60 L38,60 Z" fill="#ffffff" />
            
            {/* Head with Balding Hair */}
            <circle cx="50" cy="30" r="22" fill="#fee2e2" />
            <path d="M28,30 Q28,10 50,10 Q72,10 72,30 L72,35 Q72,45 50,45 Q28,45 28,35 Z" fill="#fee2e2" />
            <path d="M28,25 Q28,45 40,50 L40,30 Z" fill="#e5e7eb" />
            <path d="M72,25 Q72,45 60,50 L60,30 Z" fill="#e5e7eb" />
            
            {/* Specs */}
            <circle cx="42" cy="35" r="5" fill="none" stroke="#374151" strokeWidth="1.5" />
            <circle cx="58" cy="35" r="5" fill="none" stroke="#374151" strokeWidth="1.5" />
            <line x1="47" y1="35" x2="53" y2="35" stroke="#374151" strokeWidth="1.5" />
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
