import {
  createRoomController,
  registerPlayerController,
  addUserToRoomController,
  addShipsController,
  startSinglePlayController,
  setUserAttack,
  setRandomAttack,
} from '../controllers';
import { WS_TYPES } from './ws-types';
import { WebSocket } from 'ws';

export const ROUTERS_CONTROLLERS: Partial<
  Record<WS_TYPES, (ws: WebSocket, data?: string) => void>
> = {
  [WS_TYPES.REG]: registerPlayerController,
  [WS_TYPES.CREATE_ROOM]: createRoomController,
  [WS_TYPES.ADD_USER_TO_ROOM]: addUserToRoomController,
  [WS_TYPES.ADD_SHIPS]: addShipsController,
  [WS_TYPES.SINGLE_PLAY]: startSinglePlayController,
  [WS_TYPES.ATTACK]: setUserAttack,
  [WS_TYPES.RANDOM_ATTACK]: setRandomAttack,
};
