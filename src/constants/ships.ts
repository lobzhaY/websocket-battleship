import { Ship } from '../types';

export const SHIP_TYPES: {
  type: Ship['type'];
  length: number;
  count: number;
}[] = [
  { type: 'huge', length: 4, count: 1 },
  { type: 'large', length: 3, count: 2 },
  { type: 'medium', length: 2, count: 3 },
  { type: 'small', length: 1, count: 4 },
];

export const BOARD_SIZE = 10;
