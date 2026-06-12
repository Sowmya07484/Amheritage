"use client";

import React from 'react';

interface CharacterProps {
  isJumping?: boolean;
  isMoving?: boolean;
  isHit?: boolean;
}

/**
 * Character component representing the Patriot Hero (Trump).
 * It uses a 4-frame spritesheet for the running animation.
 */
export function Character({ isJumping, isMoving, isHit }: CharacterProps) {
  return (
    <div className={`relative w-28 h-28 sm:w-36 sm:h-36 transition-transform duration-300 ${isJumping ? '-translate-y-24' : ''} ${isHit ? 'animate-pulse opacity-50' : ''}`}>
      {/* Dynamic Shadow */}
      <div 
        className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/40 blur-md rounded-[100%] transition-all duration-300 ${
          isJumping ? 'scale-50 opacity-20' : 'scale-100 opacity-100'
        }`} 
      />

      {/* Hero Sprite Container */}
      <div 
        className="relative w-full h-full overflow-hidden drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
        style={{
          backgroundImage: 'url(/trump-sprite.png)',
          backgroundSize: '400% 100%',
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
          animation: isMoving ? 'trump-run 0.4s steps(4) infinite' : 'none',
          backgroundPosition: '0% 0%'
        }}
      >
        {/* If image fails, show a patriotic placeholder silhouette */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
           <div className="w-full h-full bg-primary/20 rounded-full blur-2xl" />
        </div>
      </div>

      <style jsx>{`
        @keyframes trump-run {
          from { background-position: 0% 0%; }
          to { background-position: 400% 0%; }
        }
      `}</style>
      
      {/* Hidden preloader for the sprite */}
      <div className="hidden">
        <img src="/trump-sprite.png" alt="Patriot Hero Runner" />
      </div>
    </div>
  );
}
