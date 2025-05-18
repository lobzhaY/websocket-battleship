import { randomUUID } from 'node:crypto';
import { ws_id, WS_TYPES } from '../constants';

export const gameController = (ws: WebSocket) => {
  const idGame = randomUUID();
  const gamePlayerId = randomUUID();

  ws.send(
    JSON.stringify({
      type: WS_TYPES.CREATE_GAME,
      data: JSON.stringify({
        idGame,
        idPlayer: gamePlayerId,
      }),
      id: ws_id,
    })
  );
};
