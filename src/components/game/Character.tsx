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

export function Character({ isJumping, isMoving, isHit, lane, type = 'The Patriot' }: CharacterProps) {
  const lanePositions = ['20%', '50%', '80%'];
  
  const renderSprite = () => {
    switch (type) {
      case 'George Washington':
        return (
          <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
            {/* Colonial Coat (Deep Blue) */}
            <path d="M15,135 L85,135 L82,55 Q82,42 70,35 L30,35 Q18,42 18,55 Z" fill="#1e3a8a" stroke="#172554" strokeWidth="1" />
            <path d="M18,55 L35,135 M82,55 L65,135" stroke="#eab308" strokeWidth="2" strokeOpacity="0.5" /> {/* Gold trim */}
            
            {/* White Shirt / Cravat */}
            <path d="M38,35 L62,35 L65,55 L35,55 Z" fill="#ffffff" />
            
            {/* Powdered Wig (White Hair) */}
            <path d="M25,35 Q25,2 50,2 Q75,2 75,35 L25,35" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="28" cy="30" r="5" fill="#f8fafc" />
            <circle cx="72" cy="30" r="5" fill="#f8fafc" />
            
            {/* Ears */}
            <circle cx="23" cy="28" r="6" fill="#fee2e2" />
            <circle cx="77" cy="28" r="6" fill="#fee2e2" />
          </svg>
        );
      case 'Ariana Grande':
        return (
          <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
            {/* Stage Outfit (Sparkly Lavender) */}
            <path d="M20,135 L80,135 L78,60 Q78,50 50,50 Q22,50 22,60 Z" fill="#c084fc" stroke="#a855f7" strokeWidth="1" />
            {/* Sparkles */}
            <circle cx="40" cy="80" r="1.5" fill="white" className="animate-pulse" />
            <circle cx="60" cy="100" r="1.5" fill="white" className="animate-pulse" />
            
            {/* High Ponytail (Signature Look) */}
            <path d="M45,15 Q50,0 55,15 L65,60 Q55,65 45,60 Z" fill="#451a03" /> {/* The tail */}
            <path d="M28,35 Q28,15 50,15 Q72,15 72,35 L28,35" fill="#451a03" stroke="#270e01" strokeWidth="1" />
            
            {/* Ears */}
            <circle cx="25" cy="32" r="5" fill="#fdba74" />
            <circle cx="75" cy="32" r="5" fill="#fdba74" />
          </svg>
        );
      default: // The Patriot
        return (
          <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
            <path d="M15,135 L85,135 L82,55 Q82,42 70,35 L30,35 Q18,42 18,55 Z" fill="#1e3a8a" stroke="#172554" strokeWidth="1" />
            <line x1="50" y1="40" x2="50" y2="135" stroke="#172554" strokeWidth="2" strokeOpacity="0.5" />
            <path d="M38,35 L62,35 L68,48 L32,48 Z" fill="#ffffff" />
            <path d="M46,35 L54,35 L53,50 L47,50 Z" fill="#ef4444" />
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
