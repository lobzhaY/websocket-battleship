import WebSocket from 'ws';

export const wsSend = <T>(ws: WebSocket, type: string, payload: T): void => {
  ws.send(JSON.stringify({ type, payload }));
};
