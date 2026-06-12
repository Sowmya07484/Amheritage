"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
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
  const nextCheckpointRef = useRef(1500); 
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
      z: 2000,
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
      z: 2000,
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
      const moveStep = speed * (dt / 16);
      distanceRef.current += moveStep;
      
      // Update obstacles
      obstaclesRef.current.forEach(obs => {
        obs.z -= moveStep;
        if (!obs.passed && obs.z < 80 && obs.z > 30 && obs.lane === lane) {
          obs.passed = true;
          onCollision();
        }
        if (obs.z < 0) obs.passed = true;
      });

      // Update collectibles
      collectiblesRef.current.forEach(col => {
        col.z -= moveStep;
        if (!col.collected && col.z < 80 && col.z > 30 && col.lane === lane) {
          col.collected = true;
          onCoinCollected();
        }
      });

      // Cleanup
      obstaclesRef.current = obstaclesRef.current.filter(obs => obs.z > -100);
      collectiblesRef.current = collectiblesRef.current.filter(col => col.z > -100 && !col.collected);

      // Spawning
      if (Math.random() < 0.02) spawnObstacle();
      if (Math.random() < 0.05) spawnCoin();

      // Checkpoint
      if (distanceRef.current >= nextCheckpointRef.current) {
        nextCheckpointRef.current += 1500;
        onCheckpoint();
      }

      // Draw logic
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Road background (3D perspective)
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, '#0F172A');
      gradient.addColorStop(1, '#1E1B4B');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Perspective Grid Lines
      ctx.strokeStyle = '#2563EB44';
      ctx.lineWidth = 2;
      const horizon = h * 0.45;
      
      for (let i = 0; i <= 3; i++) {
        const xAtBottom = (w / 2) + (i - 1.5) * (w * 0.5);
        const xAtHorizon = (w / 2) + (i - 1.5) * 15;
        ctx.beginPath();
        ctx.moveTo(xAtHorizon, horizon);
        ctx.lineTo(xAtBottom, h);
        ctx.stroke();
      }

      // Moving road stripes
      const lineSpacing = 150;
      const offset = (distanceRef.current % lineSpacing);
      for (let z = offset; z < 2500; z += lineSpacing) {
        const factor = 1 - (z / 2500);
        const y = horizon + (h - horizon) * (1 - Math.pow(factor, 2));
        const currentWidth = (w * 0.1) + (w * 1.5) * (1 - factor);
        ctx.beginPath();
        ctx.moveTo((w / 2) - currentWidth / 2, y);
        ctx.lineTo((w / 2) + currentWidth / 2, y);
        ctx.stroke();
      }

      // Draw Collectibles (Coins)
      collectiblesRef.current.forEach(col => {
        const factor = 1 - (col.z / 2000);
        if (factor < 0) return;
        const colY = horizon + (h - horizon) * Math.pow(factor, 2.5);
        const colScale = Math.pow(factor, 2) * 2;
        const laneX = (w / 2) + (col.lane - 1) * (w * 0.3) * factor;

        ctx.fillStyle = '#FBBF24';
        ctx.shadowBlur = 15 * colScale;
        ctx.shadowColor = '#F59E0B';
        ctx.beginPath();
        ctx.arc(laneX, colY - 20 * colScale, 15 * colScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Obstacles
      obstaclesRef.current.forEach(obs => {
        const factor = 1 - (obs.z / 2000);
        if (factor < 0) return;
        const obsY = horizon + (h - horizon) * Math.pow(factor, 2.5);
        const obsScale = Math.pow(factor, 2) * 2.5;
        const laneX = (w / 2) + (obs.lane - 1) * (w * 0.3) * factor;

        ctx.fillStyle = obs.type === 'roadblock' ? '#EF4444' : '#FFFFFF';
        if (obs.type === 'flag') {
          // American Flag Obstacle
          ctx.fillStyle = '#1E3A8A';
          ctx.fillRect(laneX - 25 * obsScale, obsY - 60 * obsScale, 50 * obsScale, 30 * obsScale);
          ctx.fillStyle = '#EF4444';
          ctx.fillRect(laneX - 25 * obsScale, obsY - 30 * obsScale, 50 * obsScale, 10 * obsScale);
        } else {
          ctx.fillRect(laneX - 20 * obsScale, obsY - 40 * obsScale, 40 * obsScale, 40 * obsScale);
        }
      });

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused, lane, speed, onCollision, onCheckpoint, onCoinCollected, spawnObstacle, spawnCoin]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={1200} 
        className="w-full h-full object-cover"
      />
      
      {/* Character Overlay */}
      <div 
        className="absolute bottom-16 left-1/2 -translate-x-1/2 transition-all duration-300 flex justify-center items-end"
        style={{
          transform: `translateX(calc(-50% + ${(lane - 1) * 33}%))`
        }}
      >
        <Character type="The Patriot" isMoving={!isPaused} />
      </div>

      {/* Speed lines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white animate-pulse"
            style={{
              width: '1px',
              height: Math.random() * 200 + 'px',
              left: Math.random() * 100 + '%',
              top: '-300px',
              animation: `fall ${Math.random() * 0.4 + 0.1}s linear infinite`,
              opacity: Math.random()
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(0); }
          100% { transform: translateY(1500px); }
        }
      `}</style>
    </div>
  );
}