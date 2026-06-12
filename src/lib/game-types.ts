export type Lane = 0 | 1 | 2;

export type CharacterType = 
  | 'The Patriot' 
  | 'Founding Father' 
  | 'Historical Leader' 
  | 'Liberty Belle' 
  | 'Action Hero';

export interface GameState {
  score: number;
  coins: number;
  level: number;
  questionsCorrect: number;
  questionsTotal: number;
  bestScore: number;
  character: CharacterType;
  unlockedBadges: string[];
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
  "Important Historical Events",
  "American Geography",
  "State Capitals"
];

export const CHARACTER_PROGRESSION: Record<number, CharacterType> = {
  1: 'The Patriot',
  6: 'Founding Father',
  11: 'Historical Leader',
  16: 'Liberty Belle',
  21: 'Action Hero'
};
