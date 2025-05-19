import { games } from '../games';
import type { Game, Ship } from '../../types';

export const getGameById = (id: string): Game | undefined => {
  return games.get(id);
};

export const setNewGame = (
  idGame: string,
  indexPlayer: string,
  currentPlayerId?: string
) => {
  const playersGame = {
    [indexPlayer]: {
      ships: [],
    },
  };
  games.set(idGame, {
    players: playersGame,
    currentPlayerId: currentPlayerId ?? '',
  });
};

export const setShips = (
  idGame: string,
  indexPlayer: string,
  newShips: Ship[]
) => {
  const currentGame = getGameById(idGame);
  currentGame!.players[indexPlayer]!.ships = newShips;

  games.set(idGame, {
    ...currentGame,
    players: {
      ...currentGame?.players,
      [indexPlayer]: newShips,
    }
  })
};
