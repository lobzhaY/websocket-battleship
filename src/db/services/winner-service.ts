import { Winner } from '../../types';
import { winners } from '../winners';

export const getWinners = (): Winner[] => {
  return Array.from(winners.values()).map(({ name, wins }) => ({ name, wins }));
};

export const updateWinners = () => {
 // Добавление победителей в бд
};
