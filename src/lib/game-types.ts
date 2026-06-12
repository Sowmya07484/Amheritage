export type Lane = 0 | 1 | 2;

export type CharacterType = 
  | 'Founding Father' 
  | 'Patriotic Superhero' 
  | 'Historical Leader' 
  | 'Pop Star' 
  | 'Action Hero';

export interface GameState {
  score: number;
  coins: number;
  level: number;
  questionsCorrect: number;
  questionsTotal: number;
  hearts: number;
  lastHeartRegenTime: number;
  bestScore: number;
  character: CharacterType;
  unlockedBadges: string[];
}

export interface PowerUp {
  id: string;
  name: string;
  type: 'shield' | 'boost' | 'magnet' | 'star' | 'freeze';
  duration: number; // ms
  active: boolean;
  timeLeft: number;
}

export interface Obstacle {
  id: string;
  type: 'monument' | 'flag' | 'building' | 'roadblock';
  lane: Lane;
  z: number; // position along the track
  passed: boolean;
}

export const THEMATIC_ERAS = [
  "American Revolution",
  "Founding Fathers",
  "Constitution",
  "Civil Rights Movement",
  "National Parks",
  "Famous Monuments",
  "Space Exploration",
  "U.S. Presidents",
  "American Culture",
  "Important Historical Events"
];

export const CHARACTER_PROGRESSION: Record<number, CharacterType> = {
  1: 'Founding Father',
  6: 'Patriotic Superhero',
  11: 'Historical Leader',
  16: 'Pop Star',
  21: 'Action Hero'
};
