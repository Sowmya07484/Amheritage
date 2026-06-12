"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Lane, Obstacle } from '@/lib/game-types';

interface GameWorldProps {
  lane: Lane;
  speed: number;
  isPaused: boolean;
  onCollision: () => void;
  onCheckpoint: () => void;
}

export function GameWorld({ lane, speed, isPaused, onCollision, onCheckpoint }: GameWorldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const distanceRef = useRef(0);
  const nextCheckpointRef = useRef(1000); // Trigger quiz every 1000 units
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
      z: 1000, // Spawn far away
      passed: false
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

      if (dt > 100) { // Catch-up protection
        frameId = requestAnimationFrame(render);
        return;
      }

      // Update logic
      distanceRef.current += speed * (dt / 16);
      
      // Update obstacles
      obstaclesRef.current.forEach(obs => {
        obs.z -= speed * (dt / 16);

        // Collision Check
        if (!obs.passed && obs.z < 50 && obs.z > 20 && obs.lane === lane) {
          obs.passed = true;
          onCollision();
        }

        if (obs.z < 0) obs.passed = true;
      });

      // Cleanup passed obstacles
      obstaclesRef.current = obstaclesRef.current.filter(obs => obs.z > -100);

      // Spawn new obstacles periodically
      if (Math.random() < 0.02) spawnObstacle();

      // Checkpoint check
      if (distanceRef.current >= nextCheckpointRef.current) {
        nextCheckpointRef.current += 1000;
        onCheckpoint();
      }

      // Draw logic
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Draw Road (Pseudo-3D)
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, w, h);

      // Perspective Grid
      ctx.strokeStyle = '#2563EB33';
      ctx.lineWidth = 1;
      const horizon = h * 0.4;
      
      // Vertical Lines (Lanes)
      for (let i = 0; i <= 3; i++) {
        const xAtBottom = (w / 2) + (i - 1.5) * (w * 0.4);
        const xAtHorizon = (w / 2) + (i - 1.5) * 10;
        ctx.beginPath();
        ctx.moveTo(xAtHorizon, horizon);
        ctx.lineTo(xAtBottom, h);
        ctx.stroke();
      }

      // Horizontal Moving Lines
      const lineSpacing = 100;
      const offset = (distanceRef.current % lineSpacing);
      for (let z = offset; z < 2000; z += lineSpacing) {
        const factor = 1 - (z / 2000);
        const y = horizon + (h - horizon) * (1 - Math.pow(factor, 2));
        const currentWidth = (w * 0.1) + (w * 1.1) * (1 - factor);
        ctx.beginPath();
        ctx.moveTo((w / 2) - currentWidth / 2, y);
        ctx.lineTo((w / 2) + currentWidth / 2, y);
        ctx.stroke();
      }

      // Draw Player Shadow
      const playerX = (w / 2) + (lane - 1) * (w * 0.25);
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.beginPath();
      ctx.ellipse(playerX, h - 100, 40, 15, 0, 0, Math.PI * 2);
      ctx.fill();

      // Draw Obstacles
      obstaclesRef.current.forEach(obs => {
        const obsFactor = 1 - (obs.z / 1000);
        if (obsFactor < 0) return;
        
        const obsY = horizon + (h - horizon) * Math.pow(obsFactor, 3);
        const obsScale = Math.pow(obsFactor, 2) * 2;
        const laneX = (w / 2) + (obs.lane - 1) * (w * 0.25) * obsFactor;

        ctx.fillStyle = obs.type === 'roadblock' ? '#EF4444' : '#FFFFFF';
        ctx.shadowBlur = 10 * obsScale;
        ctx.shadowColor = ctx.fillStyle;
        
        const size = 30 * obsScale;
        ctx.fillRect(laneX - size/2, obsY - size, size, size);
        ctx.shadowBlur = 0;
      });

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused, lane, speed, onCollision, onCheckpoint, spawnObstacle]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-background">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={1200} 
        className="w-full h-full object-cover"
      />
      
      {/* Visual Lane Guides */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute left-1/3 top-0 bottom-0 w-px bg-primary" />
        <div className="absolute right-1/3 top-0 bottom-0 w-px bg-primary" />
      </div>

      {/* Speed Lines Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white/20 animate-pulse"
            style={{
              width: '1px',
              height: Math.random() * 100 + 'px',
              left: Math.random() * 100 + '%',
              top: '-100px',
              transform: `scale(${Math.random() * 2})`,
              opacity: Math.random() * 0.5
            }}
          />
        ))}
      </div>
    </div>
  );
}
