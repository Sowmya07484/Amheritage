
"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import { Lane, Obstacle, Collectible } from '@/lib/game-types';
import { Character } from './Character';

interface GameWorldProps {
  lane: Lane;
  speed: number;
  isPaused: boolean;
  onCollision: () => void;
  onCheckpoint: () => void;
  onCoinCollected: () => void;
}

export function GameWorld({ lane, speed, isPaused, onCollision, onCheckpoint, onCoinCollected }: GameWorldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const collectiblesRef = useRef<Collectible[]>([]);
  const distanceRef = useRef(0);
  const nextCheckpointRef = useRef(2000); 
  const lastFrameTimeRef = useRef(0);

  const spawnObstacle = useCallback(() => {
    const types: Obstacle['type'][] = ['monument', 'flag', 'building', 'roadblock'];
    const id = Math.random().toString(36).substring(7);
    const type = types[Math.floor(Math.random() * types.length)];
    const obstacleLane = Math.floor(Math.random() * 3) as Lane;
    
    obstaclesRef.current.push({
      id,
      type,
      lane: obstacleLane,
      z: 3000,
      passed: false
    });
  }, []);

  const spawnCoin = useCallback(() => {
    const id = Math.random().toString(36).substring(7);
    const coinLane = Math.floor(Math.random() * 3) as Lane;
    
    collectiblesRef.current.push({
      id,
      type: 'coin',
      lane: coinLane,
      z: 3000,
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

      // Prevent negative or extreme jumps on tab focus/unpause
      if (dt > 100 || dt < 0) { 
        frameId = requestAnimationFrame(render);
        return;
      }

      const moveStep = (speed * (dt / 16)) * 1.5;
      distanceRef.current += moveStep;
      
      obstaclesRef.current.forEach(obs => {
        obs.z -= moveStep;
        // Adjusted collision box for better "snappy" feel
        if (!obs.passed && obs.z < 250 && obs.z > 100 && obs.lane === lane) {
          obs.passed = true;
          onCollision();
        }
        if (obs.z < 0) obs.passed = true;
      });

      collectiblesRef.current.forEach(col => {
        col.z -= moveStep;
        // Increased collection hitbox width for easier coin pickup on click
        if (!col.collected && col.z < 350 && col.z > 50 && Math.abs(col.lane - lane) < 0.8) {
          col.collected = true;
          onCoinCollected();
        }
      });

      obstaclesRef.current = obstaclesRef.current.filter(obs => obs.z > -100);
      collectiblesRef.current = collectiblesRef.current.filter(col => col.z > -100 && !col.collected);

      if (Math.random() < 0.02) spawnObstacle();
      if (Math.random() < 0.04) spawnCoin();

      if (distanceRef.current >= nextCheckpointRef.current) {
        nextCheckpointRef.current += 2000;
        onCheckpoint();
      }

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const horizon = h * 0.45;
      
      const skyGrad = ctx.createLinearGradient(0, 0, 0, horizon);
      skyGrad.addColorStop(0, '#020617');
      skyGrad.addColorStop(1, '#0F172A');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, horizon);

      const roadGrad = ctx.createLinearGradient(0, horizon, 0, h);
      roadGrad.addColorStop(0, '#1E1B4B');
      roadGrad.addColorStop(1, '#020617');
      ctx.fillStyle = roadGrad;
      ctx.fillRect(0, horizon, w, h - horizon);

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

      collectiblesRef.current.forEach(col => {
        const factor = 1 - (col.z / 3000);
        if (factor < 0) return;
        const colY = horizon + (h - horizon) * Math.pow(factor, 2.5);
        const colScale = Math.pow(factor, 2) * 2.5;
        const laneX = (w / 2) + (col.lane - 1) * (w * 0.5) * factor;

        ctx.fillStyle = '#FBBF24';
        ctx.shadowBlur = 20 * colScale;
        ctx.shadowColor = '#F59E0B';
        ctx.beginPath();
        ctx.arc(laneX, colY - 20 * colScale, 15 * colScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      obstaclesRef.current.forEach(obs => {
        const factor = 1 - (obs.z / 3000);
        if (factor < 0) return;
        const obsY = horizon + (h - horizon) * Math.pow(factor, 2.5);
        const obsScale = Math.pow(factor, 2) * 3.5;
        const laneX = (w / 2) + (obs.lane - 1) * (w * 0.5) * factor;

        ctx.save();
        ctx.translate(laneX, obsY);
        
        if (obs.type === 'roadblock') {
          ctx.fillStyle = '#EF4444';
          ctx.fillRect(-30 * obsScale, -40 * obsScale, 60 * obsScale, 40 * obsScale);
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2 * obsScale;
          ctx.strokeRect(-30 * obsScale, -40 * obsScale, 60 * obsScale, 40 * obsScale);
        } else if (obs.type === 'flag') {
          ctx.fillStyle = '#64748b';
          ctx.fillRect(-2 * obsScale, -100 * obsScale, 4 * obsScale, 100 * obsScale);
          ctx.fillStyle = '#EF4444';
          ctx.fillRect(0, -100 * obsScale, 50 * obsScale, 30 * obsScale);
        } else {
          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(-25 * obsScale, -50 * obsScale, 50 * obsScale, 50 * obsScale);
        }
        ctx.restore();
      });

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused, lane, speed, onCollision, onCheckpoint, onCoinCollected, spawnObstacle, spawnCoin]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#020617]">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={1200} 
        className="w-full h-full object-cover"
      />
      
      {/* Character Hero - Visual shift synced to buttons with discrete lane positioning */}
      <div 
        className="absolute bottom-24 inset-x-0 h-40 transition-all duration-200 ease-out flex justify-center items-end pointer-events-none z-20"
        style={{
          transform: `translateX(${(lane - 1) * 33.33}%)`
        }}
      >
        <Character isMoving={!isPaused} />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white/20"
            style={{
              width: '2px',
              height: Math.random() * 200 + 100 + 'px',
              left: Math.random() * 100 + '%',
              top: '-300px',
              animation: `fall ${Math.random() * 0.2 + 0.1}s linear infinite`,
              opacity: Math.random() * 0.5
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
