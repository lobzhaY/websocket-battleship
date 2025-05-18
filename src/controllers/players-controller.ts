import { ws_id, WS_TYPES } from '../constants';
import { addToConnections, registerPlayer } from '../db';
import { randomUUID } from 'node:crypto';
import { updateWinnersController } from './winners-controller';
import { updateRoomsController } from './rooms-controller';

export const registerPlayerController = (data: string, ws: WebSocket) => {
  console.log('registerPlayerController');
  const { name, password } = JSON.parse(data);

  /* 
  !Нужно проверить, существует ли пользователь в бд!
   if (players.has(name)) {
    ws.send(
      JSON.stringify({
        type: 'reg',
        data:  JSON.stringify({
        name: name,
        index: playersId,
        error: true,
        errorText: 'User Exist',
      })
      })
    );
    return;
  } */

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

  console.log(`Player "${name}" registered`);

  updateRoomsController(ws);
  updateWinnersController(ws);
};
