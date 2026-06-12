export type Lane = 0 | 1 | 2;

export type CharacterType = 
  | 'The Patriot' 
  | 'George Washington' 
  | 'Ariana Grande';

export interface GameState {
  score: number;
  coins: number;
  level: number;
  questionsInLevel: number;
  questionsCorrect: number;
  questionsTotal: number;
  character: CharacterType;
  unlockedCharacters: CharacterType[];
  starsByLevel: Record<number, number>;
}

export interface Collectible {
  id: string;
  type: 'coin' | 'powerup';
  lane: Lane;
  z: number;
  collected: boolean;
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

export const MAX_LEVELS = 10;
export const QUESTIONS_PER_LEVEL = 10;
export const CHARACTER_PRICE = 300;
