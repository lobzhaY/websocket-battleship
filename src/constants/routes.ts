import {
  createRoomController,
  registerPlayerController,
  updateRoomsController,
  updateWinnersController,
  addUserToRoomController,
  addShipsController,
  sendTurn,
  startSinglePlayController,
} from '../controllers';
import { WS_TYPES } from './ws-types';

export const ROUTERS_CONTROLLERS: Record<
  WS_TYPES,
  (data: string, ws: WebSocket) => void
> = {
  [WS_TYPES.REG]: registerPlayerController,
  [WS_TYPES.UPDATE_WINNERS]: updateWinnersController,
  [WS_TYPES.UPDATE_ROOM]: updateRoomsController,
  [WS_TYPES.CREATE_ROOM]: createRoomController,
  [WS_TYPES.ADD_USER_TO_ROOM]: addUserToRoomController,
  [WS_TYPES.ADD_SHIPS]: addShipsController,
  [WS_TYPES.TURN]: sendTurn,
  [WS_TYPES.SINGLE_PLAY]: startSinglePlayController,
};
