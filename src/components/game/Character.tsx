"use client";

import React from 'react';
import { CharacterType } from '@/lib/game-types';

interface CharacterProps {
  type: CharacterType;
  isJumping?: boolean;
  isMoving?: boolean;
}

export function Character({ type, isJumping, isMoving }: CharacterProps) {
  // Enhanced Cartoon Trump-style Avatar with running animations
  const runningClass = isMoving ? "animate-run-body-bob" : "";
  const leftLegClass = isMoving ? "animate-run-left-leg" : "";
  const rightLegClass = isMoving ? "animate-run-right-leg" : "";
  const capeClass = isMoving ? "animate-run-cape-flap" : "";

  return (
    <div className={`relative w-28 h-36 transition-transform duration-200 ${isJumping ? '-translate-y-16' : ''}`}>
      {/* Ground Shadow */}
      <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-4 shadow-oval transition-opacity duration-300 ${isJumping ? 'opacity-20 scale-75' : 'opacity-100 scale-100'}`} />

      {/* Cape */}
      <div 
        className={`absolute -z-10 top-20 left-1/2 -translate-x-1/2 w-24 h-28 bg-red-600 rounded-b-3xl opacity-90 border-t-4 border-red-700 ${capeClass}`}
        style={{ transformOrigin: 'top center' }}
      >
        <div className="w-full h-full flex items-center justify-center opacity-20">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white fill-white">
            <path d="M12 1L9 9H1L7 14L4 22L12 17L20 22L17 14L23 9H15L12 1Z" />
          </svg>
        </div>
      </div>

      <div className={`relative w-full h-full ${runningClass}`}>
        <svg viewBox="0 0 100 130" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]">
          {/* Arms - Behind */}
          <g className={rightLegClass}>
             <rect x="75" y="70" width="10" height="25" rx="5" fill="#1E3A8A" transform="rotate(-15 80 70)" />
             <circle cx="85" cy="95" r="6" fill="#FED7AA" />
          </g>

          {/* Left Leg */}
          <g className={leftLegClass}>
            <path d="M35,110 L25,130 L45,130 L45,110 Z" fill="#1E3A8A" />
            <rect x="25" y="125" width="22" height="8" rx="2" fill="black" />
          </g>

          {/* Right Leg */}
          <g className={rightLegClass}>
            <path d="M65,110 L55,130 L75,130 L65,110 Z" fill="#1E3A8A" />
            <rect x="55" y="125" width="22" height="8" rx="2" fill="black" />
          </g>

          {/* Hair - Iconic swoop */}
          <path d="M15,30 Q50,-10 95,30 Q70,45 15,30" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
          
          {/* Face */}
          <ellipse cx="50" cy="55" rx="32" ry="38" fill="#FED7AA" />
          
          {/* Details */}
          <circle cx="38" cy="50" r="3.5" fill="black" />
          <circle cx="62" cy="50" r="3.5" fill="black" />
          <path d="M40,78 Q50,88 60,78" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Suit Torso */}
          <path d="M15,90 Q50,80 85,90 L90,115 Q50,120 10,115 Z" fill="#1E3A8A" />
          
          {/* Shirt and Tie */}
          <path d="M42,90 L58,90 L62,115 L38,115 Z" fill="white" />
          <path d="M47,90 L53,90 L56,120 L44,120 Z" fill="#EF4444" />
          
          {/* Arms - Front */}
          <g className={leftLegClass}>
             <rect x="15" y="70" width="10" height="25" rx="5" fill="#1E3A8A" transform="rotate(15 20 70)" />
             <circle cx="10" cy="95" r="6" fill="#FED7AA" />
          </g>
        </svg>
      </div>
    </div>
  );
}