"use client";

import React, { useEffect, useState } from 'react';

export function BubbleCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <div 
      className="bubble-cursor" 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
        borderColor: isPointer ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255, 255, 255, 0.5)',
        background: isPointer ? 'rgba(239, 68, 68, 0.3)' : 'rgba(37, 99, 235, 0.3)'
      }}
    >
      <div className="bubble-cursor-inner" />
    </div>
  );
}
