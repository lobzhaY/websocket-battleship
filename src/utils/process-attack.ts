import { AttackStatus, Ship } from '../types';

const findShipByCoord = (ships: Ship[], x: number, y: number): Ship | null => {
  return (
    ships.find(({ position, direction, length }) => {
      for (let i = 0; i < length; i++) {
        const xi = direction ? position.x + i : position.x;
        const yi = direction ? position.y : position.y + i;
        if (xi === x && yi === y) return true;
      }
      return false;
    }) ?? null
  );
};

const isShipKilled = (ship: Ship, board: number[][]): boolean => {
  const { position, direction, length } = ship;

  for (let i = 0; i < length; i++) {
    const xi = direction ? position.x + i : position.x;
    const yi = direction ? position.y : position.y + i;
    if (board[xi]![yi] !== 2) {
      return false;
    }
  }

  return true;
};

const markShipAsKilled = (ship: Ship, board: number[][]): void => {
  const { position, direction, length } = ship;

  for (let i = 0; i < length; i++) {
    const xi = direction ? position.x + i : position.x;
    const yi = direction ? position.y : position.y + i;
    board[xi]![yi] = 3;
  }
};

export const processAttack = (
  ships: Ship[],
  board: number[][],
  x: number,
  y: number
): AttackStatus => {
  const cell = board[y]?.[x];

  if (cell === 0) {
    board[x]![y] = -1;
    return 'miss';
  }

  if (cell === 1) {
    board[x]![y] = 2;

    const ship = findShipByCoord(ships, x, y);
    if (ship && isShipKilled(ship, board)) {
      markShipAsKilled(ship, board);
      return 'killed';
    }

    return 'shot';
  }

  return 'miss';
};
