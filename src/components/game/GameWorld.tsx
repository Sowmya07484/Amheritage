"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import { Lane, Collectible } from '@/lib/game-types';

interface GameWorldProps {
  lane: Lane;
  speed: number;
  isPaused: boolean;
  onCoinCollected: () => void;
}

export function GameWorld({ lane, speed, isPaused, onCoinCollected }: GameWorldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const collectiblesRef = useRef<Collectible[]>([]);
  const lastFrameTimeRef = useRef(0);
  const currentLaneXRef = useRef(1); 

  const spawnCoin = useCallback(() => {
    const id = Math.random().toString(36).substring(7);
    const coinLane = Math.floor(Math.random() * 3) as Lane;
    
    collectiblesRef.current.push({
      id,
      type: 'coin',
      lane: coinLane,
      z: 4000,
      collected: false
    });
  }, []);

  useEffect(() => {
    if (isPaused) return;

    let frameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = (time: number) => {
      const dt = time - lastFrameTimeRef.current;
      lastFrameTimeRef.current = time;

      if (dt > 100 || dt < 0) { 
        frameId = requestAnimationFrame(render);
        return;
      }

      const moveStep = (speed * (dt / 16)) * 1.5;
      
      const targetLaneX = lane;
      currentLaneXRef.current += (targetLaneX - currentLaneXRef.current) * 0.2;

      collectiblesRef.current.forEach(col => {
        col.z -= moveStep;
        // Collision detection for coins
        if (!col.collected && col.z < 450 && col.z > 100 && Math.abs(col.lane - currentLaneXRef.current) < 0.7) {
          col.collected = true;
          onCoinCollected();
        }
      });

      // Cleanup off-screen or collected items
      collectiblesRef.current = collectiblesRef.current.filter(col => col.z > -100 && !col.collected);

      // Spawn coins frequently
      if (Math.random() < 0.08) spawnCoin();

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const horizon = h * 0.45;
      
      // Sky - Dark Patriotic Night
      const skyGrad = ctx.createLinearGradient(0, 0, 0, horizon);
      skyGrad.addColorStop(0, '#020617');
      skyGrad.addColorStop(1, '#0F172A');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, horizon);

      // Road - Deep Indigo
      const roadGrad = ctx.createLinearGradient(0, horizon, 0, h);
      roadGrad.addColorStop(0, '#1E1B4B');
      roadGrad.addColorStop(1, '#020617');
      ctx.fillStyle = roadGrad;
      ctx.fillRect(0, horizon, w, h - horizon);

      // Lane Lines - Glowing Blue
      ctx.strokeStyle = '#2563EB44';
      ctx.lineWidth = 4;
      for (let i = 0; i <= 3; i++) {
        const xAtBottom = (w / 2) + (i - 1.5) * (w * 0.7);
        const xAtHorizon = (w / 2) + (i - 1.5) * 30;
        ctx.beginPath();
        ctx.moveTo(xAtHorizon, horizon);
        ctx.lineTo(xAtBottom, h);
        ctx.stroke();
      }

      // Draw Collectibles (Coins)
      collectiblesRef.current.forEach(col => {
        const factor = 1 - (col.z / 4000);
        if (factor < 0) return;
        const colY = horizon + (h - horizon) * Math.pow(factor, 2.5);
        const colScale = Math.pow(factor, 2) * 2.5;
        const laneX = (w / 2) + (col.lane - 1) * (w * 0.6) * factor;

        // Golden Coin Visuals
        ctx.fillStyle = '#FBBF24';
        ctx.shadowBlur = 20 * colScale;
        ctx.shadowColor = '#F59E0B';
        ctx.beginPath();
        ctx.arc(laneX, colY - 20 * colScale, 15 * colScale, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner detail
        ctx.strokeStyle = '#92400E';
        ctx.lineWidth = 2 * colScale;
        ctx.beginPath();
        ctx.arc(laneX, colY - 20 * colScale, 10 * colScale, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.shadowBlur = 0;
      });

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused, lane, speed, onCoinCollected, spawnCoin]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#020617]">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={1200} 
        className="w-full h-full object-cover"
      />
      
      {/* Dynamic Speed Lines for Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white/10"
            style={{
              width: '1px',
              height: Math.random() * 300 + 100 + 'px',
              left: Math.random() * 100 + '%',
              top: '-400px',
              animation: `fall ${Math.random() * 0.2 + 0.05}s linear infinite`,
              opacity: Math.random() * 0.3
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(0); }
          100% { transform: translateY(1600px); }
        }
      `}</style>
    </div>
  );
}
