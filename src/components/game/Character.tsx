
"use client";

import React from 'react';

interface CharacterProps {
  isJumping?: boolean;
  isMoving?: boolean;
  isHit?: boolean;
}

/**
 * Character component representing the Patriot Hero from a back-view perspective.
 * Includes a fallback background color to ensure visibility even if the sprite image is missing.
 */
export function Character({ isJumping, isMoving, isHit }: CharacterProps) {
  return (
    <div className={`relative w-28 h-28 sm:w-40 sm:h-40 transition-transform duration-300 ${isJumping ? '-translate-y-24' : ''} ${isHit ? 'animate-pulse opacity-50' : ''}`}>
      {/* Dynamic Perspective Shadow */}
      <div 
        className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black/60 blur-xl rounded-[100%] transition-all duration-300 ${
          isJumping ? 'scale-50 opacity-10' : 'scale-100 opacity-100'
        }`} 
      />

      {/* Hero Sprite Container - Back View */}
      <div 
        className="relative w-full h-full overflow-hidden drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)] rounded-2xl"
        style={{
          backgroundImage: 'url(/trump-sprite.png)',
          backgroundColor: '#1e3a8a', // Deep Blue Fallback
          backgroundSize: '400% 100%',
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
          animation: isMoving ? 'trump-run-back 0.45s steps(4) infinite' : 'none',
          backgroundPosition: '0% 0%',
          transform: 'scale(1.2)', // Larger for better visibility
          border: '2px solid rgba(255,255,255,0.1)'
        }}
      >
        {/* Glow effect to make the character pop against the dark road */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-60 pointer-events-none" />
        
        {/* If image fails, this label helps identify the hero */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <span className="text-[8px] font-black text-white/20 uppercase tracking-tighter">Patriot Hero</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes trump-run-back {
          from { background-position: 0% 0%; }
          to { background-position: 400% 0%; }
        }
      `}</style>
      
      {/* Hidden preloader */}
      <div className="hidden">
        <img src="/trump-sprite.png" alt="Hero Preload" />
      </div>
    </div>
  );
}
