"use client";

import React from 'react';

interface CharacterProps {
  isJumping?: boolean;
  isMoving?: boolean;
  isHit?: boolean;
}

/**
 * Character component representing the Patriot Hero from a back-view perspective.
 * This perspective is essential for the 3D endless runner feel.
 * It uses a 4-frame spritesheet optimized for a "running away" animation.
 */
export function Character({ isJumping, isMoving, isHit }: CharacterProps) {
  return (
    <div className={`relative w-28 h-28 sm:w-36 sm:h-36 transition-transform duration-300 ${isJumping ? '-translate-y-24' : ''} ${isHit ? 'animate-pulse opacity-50' : ''}`}>
      {/* Dynamic Perspective Shadow */}
      <div 
        className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-black/60 blur-md rounded-[100%] transition-all duration-300 ${
          isJumping ? 'scale-50 opacity-10' : 'scale-100 opacity-100'
        }`} 
      />

      {/* Hero Sprite Container - Back View */}
      <div 
        className="relative w-full h-full overflow-hidden drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]"
        style={{
          backgroundImage: 'url(/trump-sprite.png)',
          backgroundSize: '400% 100%',
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
          animation: isMoving ? 'trump-run-back 0.45s steps(4) infinite' : 'none',
          backgroundPosition: '0% 0%',
          transform: 'scale(1.1)', // Slightly larger to emphasize foreground presence
        }}
      >
        {/* Glow effect for high-tier feeling */}
        <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
      </div>

      <style jsx>{`
        @keyframes trump-run-back {
          from { background-position: 0% 0%; }
          to { background-position: 400% 0%; }
        }
      `}</style>
      
      {/* Hidden preloader */}
      <div className="hidden">
        <img src="/trump-sprite.png" alt="Patriot Hero Running Away" />
      </div>
    </div>
  );
}
