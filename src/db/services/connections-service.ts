import { PlayerConnection } from '../../types';
import { connections } from '../connections';

export const getConnections = (): PlayerConnection[] => {
  return connections;
};

export const getPlayerBySocket = (
  ws: WebSocket
): PlayerConnection | undefined => {
  return connections.find((conn) => conn.ws === ws);
};

export const getPlayerByRoomId = (
  roomId: string
): PlayerConnection | undefined => {
  return connections.find((conn) => conn.roomId === roomId);
};

export const addToConnections = (connection: PlayerConnection): void => {
  connections.push(connection);
};

