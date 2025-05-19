import { handleRoutesMessage } from '../routes';
import { WebSocket } from 'ws';

export const createWSServer = (port: number) => {
  const wsServer = new WebSocket.Server({ port });

  console.log(`WebSocket server started on ws://localhost:${port}`);

  wsServer.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
      let parsedMessage;

      try {
        parsedMessage = JSON.parse(message.toString());
      } catch {
        console.error('Failed to parse message as JSON:', message);
        return;
      }

      try {
        handleRoutesMessage(parsedMessage, ws);
      } catch {
        console.error('Failed to process message:', parsedMessage);
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  process.on('SIGINT', () => {
    console.log('Shutting down server...');
    wsServer.close(() => {
      console.log('WebSocket server closed');
      process.exit(0);
    });
  });
};
