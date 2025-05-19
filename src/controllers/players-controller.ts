import { ws_id, WS_TYPES } from '../constants';
import { addToConnections, players, registerPlayer } from '../db';
import { randomUUID } from 'node:crypto';
import { updateWinnersController } from './winners-controller';
import { updateRoomsController } from './rooms-controller';
import { WebSocket } from 'ws';
import { outputLogs } from '../utils';

export const registerPlayerController = (
  ws: WebSocket,
  data: string | undefined
) => {
  const { name, password } = JSON.parse(data!);

  if (players.has(name)) {
    ws.send(
      JSON.stringify({
        type: 'reg',
        data: JSON.stringify({
          name: name,
          error: true,
          errorText: 'User Exist',
        }),
      })
    );
    console.log('User Exist');
    return;
  }

  const playerId = randomUUID();

  registerPlayer(playerId, { name, password });

  addToConnections({ ws, playerId });

  ws.send(
    JSON.stringify({
      type: WS_TYPES.REG,
      data: JSON.stringify({
        name: name,
        index: playerId,
        error: false,
        errorText: '',
      }),
      id: ws_id,
    })
  );

  outputLogs({
    command: WS_TYPES.REG,
    result: { name: name, index: playerId, error: false, errorText: '' },
  });

  console.log(`Player "${name}" registered`);

  updateRoomsController(ws);
  updateWinnersController(ws);
};
