import {
  addUserToRoom,
  createRoom,
  getPlayerBySocket,
  getRooms,
  getRoomById,
} from '../db';
import { ws_id, WS_TYPES } from '../constants';
import { randomUUID } from 'node:crypto';
import { gameController } from './game-controller';

export const updateRoomsController = (ws: WebSocket) => {
  const rooms = getRooms();

  ws.send(
    JSON.stringify({
      type: WS_TYPES.UPDATE_ROOM,
      data: JSON.stringify(rooms),
      id: ws_id,
    })
  );

  console.log(`Rooms update`);
};

export const createRoomController = (data: string, ws: WebSocket) => {
  console.log('createRoomController');
  const user = getPlayerBySocket(ws);
  if (!user) {
    console.log(`User not found`);
    return;
  }
  const roomId = randomUUID();
  user!.roomId = roomId;

  createRoom(roomId, user?.playerId);

  updateRoomsController(ws);

  console.log(`Room "${roomId}" created by player "${user.playerId}"`);
};

export const addUserToRoomController = (data: string, ws: WebSocket) => {
  console.log('addUserToRoom');
  const { indexRoom } = JSON.parse(data);
  const { roomUsers } = getRoomById(indexRoom);
  const user = getPlayerBySocket(ws);

  if (roomUsers.length >= 2) {
    console.log('Too match users');
    return;
  }

  addUserToRoom(indexRoom, user?.playerId);

  updateRoomsController(ws);
  gameController(ws);
};
