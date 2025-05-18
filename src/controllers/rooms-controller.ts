import { createRoom, getPlayerBySocket, getRooms } from '../db';
import { ws_id, WS_TYPES } from '../constants';
import { randomUUID } from 'node:crypto';

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
