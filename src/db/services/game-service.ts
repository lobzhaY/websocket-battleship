import { games } from '../games';
import type { Game } from '../../types';

export const getGameById = (id: string): Game | undefined => {
  return games.get(id);
};

export const setNewGame = (idGame: string, indexPlayer: string) => {
  const playersGame = {
    [indexPlayer]: {
      ships: [],
    },
  };
  games.set(idGame, playersGame);
};
