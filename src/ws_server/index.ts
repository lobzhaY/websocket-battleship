import { WebSocket } from 'ws';

export const createWSServer = (port: number) => {
  const wsServer = new WebSocket.Server({ port });

  console.log(`WebSocket server started on ws://localhost:${port}`);

  wsServer.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
      try {
        console.log(message);
      } catch (err) {
        console.error('Failed to process message:', err.message);
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
};
