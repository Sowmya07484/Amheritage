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
      z: 2500,
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
      z: 2500,
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

      if (dt > 100) { 
        frameId = requestAnimationFrame(render);
        return;
      }

      // Update logic
      const moveStep = (speed * (dt / 16)) * 1.2;
      distanceRef.current += moveStep;
      
      // Update obstacles
      obstaclesRef.current.forEach(obs => {
        obs.z -= moveStep;
        if (!obs.passed && obs.z < 200 && obs.z > 80 && obs.lane === lane) {
          obs.passed = true;
          onCollision();
        }
        if (obs.z < 0) obs.passed = true;
      });

      // Update collectibles
      collectiblesRef.current.forEach(col => {
        col.z -= moveStep;
        if (!col.collected && col.z < 250 && col.z > 50 && Math.abs(col.lane - lane) < 0.6) {
          col.collected = true;
          onCoinCollected();
        }
      });

      // Cleanup
      obstaclesRef.current = obstaclesRef.current.filter(obs => obs.z > -100);
      collectiblesRef.current = collectiblesRef.current.filter(col => col.z > -100 && !col.collected);

      // Spawning frequency adjusted for level feel
      if (Math.random() < 0.015) spawnObstacle();
      if (Math.random() < 0.035) spawnCoin();

      // Checkpoint trigger
      if (distanceRef.current >= nextCheckpointRef.current) {
        nextCheckpointRef.current += 2000;
        onCheckpoint();
      }

      // Draw logic
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // 3D Road Perspective Sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.45);
      skyGrad.addColorStop(0, '#020617');
      skyGrad.addColorStop(1, '#0F172A');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h * 0.45);

      // Road background (3D perspective)
      const roadGrad = ctx.createLinearGradient(0, h * 0.45, 0, h);
      roadGrad.addColorStop(0, '#1E1B4B');
      roadGrad.addColorStop(1, '#0F172A');
      ctx.fillStyle = roadGrad;
      ctx.fillRect(0, h * 0.45, w, h * 0.55);

      const horizon = h * 0.45;
      
      // Perspective Grid Lines (Patriotic Neon)
      ctx.strokeStyle = '#2563EB22';
      ctx.lineWidth = 2;
      for (let i = -10; i <= 10; i++) {
        const xAtBottom = (w / 2) + i * (w * 0.5);
        const xAtHorizon = (w / 2) + i * 20;
        ctx.beginPath();
        ctx.moveTo(xAtHorizon, horizon);
        ctx.lineTo(xAtBottom, h);
        ctx.stroke();
      }

      // 3 Main Lanes
      ctx.strokeStyle = '#2563EB88';
      ctx.lineWidth = 6;
      for (let i = 0; i <= 3; i++) {
        const xAtBottom = (w / 2) + (i - 1.5) * (w * 0.6);
        const xAtHorizon = (w / 2) + (i - 1.5) * 20;
        ctx.beginPath();
        ctx.moveTo(xAtHorizon, horizon);
        ctx.lineTo(xAtBottom, h);
        ctx.stroke();
      }

      // Speed Stripes
      ctx.strokeStyle = '#FFFFFF11';
      const lineSpacing = 150;
      const offset = (distanceRef.current % lineSpacing);
      for (let z = offset; z < 3000; z += lineSpacing) {
        const factor = 1 - (z / 3000);
        const y = horizon + (h - horizon) * (1 - Math.pow(factor, 2.5));
        const currentWidth = (w * 0.1) + (w * 2.5) * (1 - factor);
        ctx.beginPath();
        ctx.moveTo((w / 2) - currentWidth / 2, y);
        ctx.lineTo((w / 2) + currentWidth / 2, y);
        ctx.stroke();
      }

      // Draw Collectibles
      collectiblesRef.current.forEach(col => {
        const factor = 1 - (col.z / 2500);
        if (factor < 0) return;
        const colY = horizon + (h - horizon) * Math.pow(factor, 2.8);
        const colScale = Math.pow(factor, 2) * 2.5;
        const laneX = (w / 2) + (col.lane - 1) * (w * 0.45) * factor;

        ctx.fillStyle = '#FBBF24';
        ctx.shadowBlur = 25 * colScale;
        ctx.shadowColor = '#F59E0B';
        ctx.beginPath();
        ctx.arc(laneX, colY - 30 * colScale, 18 * colScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Obstacles
      obstaclesRef.current.forEach(obs => {
        const factor = 1 - (obs.z / 2500);
        if (factor < 0) return;
        const obsY = horizon + (h - horizon) * Math.pow(factor, 2.8);
        const obsScale = Math.pow(factor, 2) * 3.2;
        const laneX = (w / 2) + (obs.lane - 1) * (w * 0.45) * factor;

        if (obs.type === 'roadblock') {
          ctx.fillStyle = '#EF4444';
          ctx.fillRect(laneX - 35 * obsScale, obsY - 45 * obsScale, 70 * obsScale, 45 * obsScale);
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2 * obsScale;
          ctx.strokeRect(laneX - 35 * obsScale, obsY - 45 * obsScale, 70 * obsScale, 45 * obsScale);
        } else if (obs.type === 'flag') {
          ctx.fillStyle = '#334155';
          ctx.fillRect(laneX - 5 * obsScale, obsY - 120 * obsScale, 5 * obsScale, 120 * obsScale);
          ctx.fillStyle = '#EF4444';
          ctx.fillRect(laneX, obsY - 120 * obsScale, 60 * obsScale, 40 * obsScale);
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(laneX, obsY - 100 * obsScale, 60 * obsScale, 10 * obsScale);
        } else {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(laneX - 30 * obsScale, obsY - 60 * obsScale, 60 * obsScale, 60 * obsScale);
        }
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
      
      {/* Character Hero - Center-aligned within its container which moves with lane */}
      <div 
        className="absolute bottom-24 left-0 w-full transition-transform duration-300 ease-out flex justify-center items-end pointer-events-none z-20"
        style={{
          transform: `translateX(${(lane - 1) * 33.33}%)`
        }}
      >
        <Character isMoving={!isPaused} />
      </div>

      {/* Speed Lines Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white/40"
            style={{
              width: '1px',
              height: Math.random() * 300 + 'px',
              left: Math.random() * 100 + '%',
              top: '-400px',
              animation: `fall ${Math.random() * 0.3 + 0.1}s linear infinite`,
              opacity: Math.random()
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
