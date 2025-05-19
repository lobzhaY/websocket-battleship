import { Winner } from '../../types';
import { winners } from '../winners';

export const getWinners = (): Winner[] => {
  return Array.from(winners.values()).map(({ name, wins }) => ({ name, wins }));
};

export const updateWinners = (winnerId: string) => {
  const winner = winners.get(winnerId);
  const newCount = winner!.wins + 1;
  winner!.wins = newCount;
};
