
"use client";

import React from 'react';

interface CharacterProps {
  isJumping?: boolean;
  isMoving?: boolean;
}

/**
 * Character component using a spritesheet for animation.
 * The spritesheet should be saved as public/trump-sprite.png
 */
export function Character({ isJumping, isMoving }: CharacterProps) {
  return (
    <div className={`relative w-32 h-32 transition-transform duration-200 ${isJumping ? '-translate-y-20' : ''}`}>
      {/* Shadow Effect */}
      <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 shadow-oval transition-opacity duration-300 ${isJumping ? 'opacity-20 scale-75' : 'opacity-100 scale-100'}`} />

      {/* Sprite Container */}
      <div 
        className="relative w-full h-full overflow-hidden"
        style={{
          // We use the image provided. Since it's a 4-frame strip, 
          // we animate the background position.
          backgroundImage: 'url(/trump-sprite.png)',
          backgroundSize: '400% 100%',
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
          animation: isMoving ? 'sprite-run 0.5s steps(4) infinite' : 'none',
          backgroundPosition: '0% 0%'
        }}
      />

      <style jsx>{`
        @keyframes sprite-run {
          from { background-position: 0% 0%; }
          to { background-position: 133.33% 0%; }
        }
      `}</style>
      
      {/* Fallback Label if image missing */}
      <div className="hidden">
        <img src="/trump-sprite.png" alt="Patriot Runner" />
      </div>
    </div>
  );
}
