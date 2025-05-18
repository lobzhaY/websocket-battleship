import { getRooms } from '../db';
import { ws_id, WS_TYPES } from '../constants';

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
