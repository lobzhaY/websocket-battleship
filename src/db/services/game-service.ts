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
      board: [],
    },
  };
  games.set(idGame, {
    players: playersGame,
    currentPlayerId: currentPlayerId ?? '',
  });
};

export const changeCurrentPlayer = (gameId: string) => {
  const currentGame = getGameById(gameId);
  const usersGameId = Object.keys(currentGame!.players);

  const newCurrentPlayerId = usersGameId.find(
    (id) => id !== currentGame?.currentPlayerId
  );

  currentGame!.currentPlayerId = newCurrentPlayerId as string;
};

export const setShips = (
  idGame: string,
  indexPlayer: string,
  newShips: Ship[]
) => {
  const currentGame = getGameById(idGame);
  currentGame!.players[indexPlayer]!.ships = newShips;

  currentGame!.players[indexPlayer]!.board = [];
};
