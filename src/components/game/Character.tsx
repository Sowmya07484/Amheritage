
"use client";

import React from 'react';

interface CharacterProps {
  isJumping?: boolean;
  isMoving?: boolean;
  isHit?: boolean;
}

/**
 * Character component representing the Patriot Hero from a back-view perspective.
 * Uses inline SVG to ensure visibility and detail without requiring external image files.
 */
export function Character({ isJumping, isMoving, isHit }: CharacterProps) {
  return (
    <div className={`relative w-24 h-32 sm:w-32 sm:h-44 transition-transform duration-300 ${isJumping ? '-translate-y-24' : ''} ${isHit ? 'animate-pulse opacity-50' : ''}`}>
      {/* Dynamic Perspective Shadow */}
      <div 
        className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-black/40 blur-lg rounded-full transition-all duration-300 ${
          isJumping ? 'scale-50 opacity-10' : 'scale-100 opacity-100'
        }`} 
      />

      {/* Hero Body - SVG for high-detail back view */}
      <div className={`w-full h-full relative ${isMoving ? 'animate-bounce' : ''}`} style={{ animationDuration: '0.45s' }}>
        <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]">
          {/* Suit Jacket Back */}
          <path d="M10,130 L90,130 L88,50 Q88,38 72,32 L28,32 Q12,38 12,50 Z" fill="#1e3a8a" />
          
          {/* Center Seam / Details */}
          <line x1="50" y1="35" x2="50" y2="130" stroke="#172554" strokeWidth="1.5" strokeOpacity="0.5" />
          
          {/* White Shirt Collar */}
          <path d="M40,32 L60,32 L65,42 L35,42 Z" fill="#f8fafc" />
          
          {/* Red Tie Knot Detail */}
          <path d="M46,32 L54,32 L53,44 L47,44 Z" fill="#ef4444" />
          
          {/* Back of Head (Signature Blonde Hair) */}
          <path d="M28,32 Q28,2 50,2 Q72,2 72,32 L28,32" fill="#fde047" />
          <path d="M35,18 Q50,8 65,18" fill="none" stroke="#eab308" strokeWidth="2" strokeOpacity="0.6" />
          
          {/* Ears (Back View) */}
          <circle cx="26" cy="24" r="5" fill="#fee2e2" />
          <circle cx="74" cy="24" r="5" fill="#fee2e2" />
        </svg>
        
        {/* Subtle Patriotic Glow */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl -z-10 pointer-events-none opacity-50" />
      </div>
    </div>
  );
}
