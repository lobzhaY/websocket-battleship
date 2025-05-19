import { randomUUID } from 'node:crypto';
import { getGameById, setNewGame } from '../db';
import { Game } from '../types';
import { BOT_PREFIX, ws_id, WS_TYPES } from '../constants';
import { generateRandomShips } from '../utils';

export const startSinglePlayController = (data: string, ws: WebSocket) => {
  console.log('startSinglePlayController');

  const gameId = randomUUID();
  const userPlayerId = randomUUID();
  const botPlayerId = `${BOT_PREFIX}-${randomUUID()}`;

  if (!userPlayerId) return;

  setNewGame(gameId, userPlayerId, userPlayerId);

  const currentGame = getGameById(gameId);
  const botRandomShips = generateRandomShips();

  (currentGame as Game).players[botPlayerId] = {
    ships: botRandomShips,
  };

  ws.send(
    JSON.stringify({
      type: WS_TYPES.CREATE_GAME,
      data: JSON.stringify({
        idGame: gameId,
        idPlayer: userPlayerId,
      }),
      id: ws_id,
    })
  );
};
