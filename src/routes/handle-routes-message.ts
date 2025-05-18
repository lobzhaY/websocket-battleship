import { WS_TYPES, ROUTERS_CONTROLLERS } from '../constants';
import { WebSocket } from 'ws';

export const handleRoutesMessage = (
  message: { type: WS_TYPES; data: any },
  ws: WebSocket,
  wsServer
): unknown => {
  const { type, data } = message;

   const handler = ROUTERS_CONTROLLERS[type as WS_TYPES];

   if (handler) {
    handler(data, ws);
  } else {
    console.log('Что-то пошло не так. Нет такого контроллера');
  }

  return true;
};
