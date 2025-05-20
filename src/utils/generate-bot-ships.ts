import { BOARD_SIZE, SHIP_TYPES } from '../constants';
import { Ship } from '../types';

const createEmptyBoard = (): number[][] => {
  return Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));
};

const isValid = (
  board: number[][],
  x: number,
  y: number,
  dir: boolean,
  len: number
): boolean => {
  for (let i = 0; i < len; i++) {
    const xi = dir ? x + i : x;
    const yi = dir ? y : y + i;

    if (xi >= BOARD_SIZE || yi >= BOARD_SIZE || board[yi]?.[xi] === 1) {
      return false;
    }

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const nx = xi + dx;
        const ny = yi + dy;
        if (
          nx >= 0 &&
          nx < BOARD_SIZE &&
          ny >= 0 &&
          ny < BOARD_SIZE &&
          board[ny]?.[nx] === 1
        ) {
          return false;
        }
      }
    }
  }

  return true;
};

const placeOnBoard = (
  board: number[][],
  x: number,
  y: number,
  dir: boolean,
  len: number
): void => {
  for (let i = 0; i < len; i++) {
    const xi = dir ? x + i : x;
    const yi = dir ? y : y + i;
    board[xi]![yi] = 1;
  }
};

export const generateRandomShips = (): { ships: Ship[]; board: number[][] } => {
  const ships: Ship[] = [];
  const board = createEmptyBoard();

  for (const { type, length, count } of SHIP_TYPES) {
    for (let i = 0; i < count; i++) {
      let placed = false;

      while (!placed) {
        const direction = Math.random() < 0.5;
        const x = Math.floor(Math.random() * BOARD_SIZE);
        const y = Math.floor(Math.random() * BOARD_SIZE);

        if (isValid(board, x, y, direction, length)) {
          placeOnBoard(board, x, y, direction, length);
          ships.push({
            position: { x, y },
            direction,
            length,
            type,
          });
          placed = true;
        }
      }
    }
  }

  return {
    ships,
    board,
  };
};

export const generateUserBoard = (ships: Ship[]): number[][] => {
  console.log('generateUserBoard');
  const board = createEmptyBoard();
  for (const { position, direction, length } of ships) {
    const { x, y } = position;
    placeOnBoard(board, x, y, direction, length);
  }
  return board;
};
