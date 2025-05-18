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

export const addToConnections = (connection: PlayerConnection): void => {
  connections.push(connection);
};

