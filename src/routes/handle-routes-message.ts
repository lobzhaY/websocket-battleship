import {
  addShipsController,
  addUserToRoomController,
  createRoomController,
  registerPlayerController,
  setRandomAttack,
  setUserAttack,
  startSinglePlayController,
} from '../controllers';
import { WS_TYPES, ROUTERS_CONTROLLERS } from '../constants';
import { WebSocket } from 'ws';

export const handleRoutesMessage = (
  message: { type: string; data: string },
  ws: WebSocket
): unknown => {
  const { type, data } = message;

  console.log('Message type:', type);
  console.log('Message data:', data);

  switch (type) {
    case WS_TYPES.REG:
      registerPlayerController(ws, data);
      break;
    case WS_TYPES.CREATE_ROOM:
      createRoomController(ws);
      break;
    case WS_TYPES.ADD_USER_TO_ROOM:
      addUserToRoomController(ws, data);
      break;
    case WS_TYPES.ADD_SHIPS:
      addShipsController(ws, data);
      break;
    case WS_TYPES.SINGLE_PLAY:
      startSinglePlayController(ws);
      break;
    case WS_TYPES.ATTACK:
      setUserAttack(ws, data);
      break;
    case WS_TYPES.RANDOM_ATTACK:
      setRandomAttack(ws, data);
      break;
    default:
      console.log('Что-то пошло не так. Нет такого контроллера:', type);
  }

  return true;
};
