export const getRandomAttack = (
  board: number[][]
): { x: number; y: number } | undefined | null => {
  const possibleTargets: { x: number; y: number }[] = [];

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y]!.length; x++) {
      const cell = board[y]![x];
      if (cell === 0 || cell === 1) {
        possibleTargets.push({ x, y });
      }
    }
  }

  if (possibleTargets.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * possibleTargets.length);
  return possibleTargets[randomIndex];
};
