export const checkIsGameOver = (board: number[][]): boolean => {
  for (const row of board) {
    if (row.includes(1)) {
      return false;
    }
  }
  return true;
};
