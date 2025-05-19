import { getWinners } from '../db';
import { ws_id, WS_TYPES } from '../constants';
import { WebSocket } from 'ws';

export const updateWinnersController = (ws: WebSocket) => {
  const winners = getWinners();

  ws.send(
    JSON.stringify({
      type: WS_TYPES.UPDATE_WINNERS,
      data: JSON.stringify(winners),
      id: ws_id,
    })
  );

  console.log(`Winners update`);
};
