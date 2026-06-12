export type Lane = 0 | 1 | 2;

export type CharacterType = 
  | 'The Patriot' 
  | 'Founding Father' 
  | 'Historical Leader' 
  | 'Liberty Belle' 
  | 'Action Hero'
  | 'Chief of State'
  | 'Legendary Hero';

export interface GameState {
  score: number;
  coins: number;
  level: number;
  questionsInLevel: number;
  questionsCorrect: number;
  questionsTotal: number;
  bestScore: number;
  character: CharacterType;
  unlockedBadges: string[];
  starsByLevel: Record<number, number>;
  totalStars: number;
}

export interface Collectible {
  id: string;
  type: 'coin' | 'powerup';
  lane: Lane;
  z: number;
  collected: boolean;
}

export interface Obstacle {
  id: string;
  type: 'monument' | 'flag' | 'building' | 'roadblock';
  lane: Lane;
  z: number; 
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
  "Important Historical Events",
  "American Geography",
  "State Capitals"
];

export const CHARACTER_PROGRESSION: Record<number, CharacterType> = {
  1: 'The Patriot',
  3: 'Founding Father',
  5: 'Historical Leader',
  7: 'Liberty Belle',
  9: 'Chief of State',
  10: 'Legendary Hero'
};

export const MAX_LEVELS = 10;
export const QUESTIONS_PER_LEVEL = 10;
