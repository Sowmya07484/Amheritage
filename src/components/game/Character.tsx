
"use client";

import React from 'react';

interface CharacterProps {
  isJumping?: boolean;
  isMoving?: boolean;
  isHit?: boolean;
  lane: number;
}

/**
 * Character component representing the Patriot Hero from a back-view perspective.
 * Uses inline SVG to ensure visibility and detail without requiring external image files.
 */
export function Character({ isJumping, isMoving, isHit, lane }: CharacterProps) {
  // Map lane 0, 1, 2 to horizontal percentages
  const lanePositions = ['20%', '50%', '80%'];
  
  return (
    <div 
      className={`absolute bottom-24 left-1/2 -translate-x-1/2 w-32 h-44 transition-all duration-300 ease-out z-30 pointer-events-none`}
      style={{ 
        left: lanePositions[lane],
        transform: `translate(-50%, 0) scale(${isJumping ? 1.2 : 1})`,
        filter: isHit ? 'brightness(2) contrast(2)' : 'none'
      }}
    >
      {/* Dynamic Perspective Shadow */}
      <div 
        className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-black/40 blur-xl rounded-full transition-all duration-300 ${
          isJumping ? 'scale-50 opacity-10' : 'scale-100 opacity-100'
        }`} 
      />

      {/* Hero Body - High visibility back view */}
      <div className={`w-full h-full relative ${isMoving ? 'animate-bounce' : ''}`} style={{ animationDuration: '0.4s' }}>
        <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
          {/* Suit Jacket Back (Patriotic Blue) */}
          <path d="M15,135 L85,135 L82,55 Q82,42 70,35 L30,35 Q18,42 18,55 Z" fill="#1e3a8a" stroke="#172554" strokeWidth="1" />
          
          {/* Center Seam */}
          <line x1="50" y1="40" x2="50" y2="135" stroke="#172554" strokeWidth="2" strokeOpacity="0.5" />
          
          {/* White Shirt Collar */}
          <path d="M38,35 L62,35 L68,48 L32,48 Z" fill="#ffffff" />
          
          {/* Iconic Red Tie Knot */}
          <path d="M46,35 L54,35 L53,50 L47,50 Z" fill="#ef4444" />
          
          {/* Back of Head (Signature Blonde Hair) */}
          <path d="M25,35 Q25,2 50,2 Q75,2 75,35 L25,35" fill="#fde047" stroke="#eab308" strokeWidth="1" />
          
          {/* Hair Detail Lines */}
          <path d="M35,15 Q50,5 65,15" fill="none" stroke="#ca8a04" strokeWidth="2" strokeOpacity="0.6" />
          <path d="M30,25 Q50,15 70,25" fill="none" stroke="#ca8a04" strokeWidth="2" strokeOpacity="0.4" />
          
          {/* Ears */}
          <circle cx="23" cy="28" r="6" fill="#fee2e2" />
          <circle cx="77" cy="28" r="6" fill="#fee2e2" />
        </svg>
        
        {/* Glow Aura */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-[40px] -z-10 opacity-60 animate-pulse" />
      </div>
    </div>
  );
}
