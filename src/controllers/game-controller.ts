import { randomUUID } from 'node:crypto';
import { BOT_PREFIX, ws_id, WS_TYPES } from '../constants';
import { getGameById, setNewGame } from '../db';
import { generateUserBoard, outputLogs } from '../utils';
import { WebSocket } from 'ws';

export const createGameController = (ws: WebSocket) => {
  const idGame = randomUUID();
  const gamePlayerId = randomUUID();

  setNewGame(idGame, gamePlayerId);

  ws.send(
    JSON.stringify({
      type: WS_TYPES.CREATE_GAME,
      data: JSON.stringify({
        idGame: idGame,
        idPlayer: gamePlayerId,
      }),
      id: ws_id,
    })
  );
  outputLogs({
    command: WS_TYPES.CREATE_GAME,
    result: { idGame: idGame, idPlayer: gamePlayerId },
  });
};

export const sendTurn = (ws: WebSocket, gameId: string | undefined) => {
  const currentGame = getGameById(gameId!);

  ws.send(
    JSON.stringify({
      type: WS_TYPES.TURN,
      data: JSON.stringify({ currentPlayer: currentGame!.currentPlayerId }),
      id: ws_id,
    })
  );

  outputLogs({
    command: WS_TYPES.TURN,
    result: { currentPlayer: currentGame!.currentPlayerId },
  });
};

export const addShipsController = (ws: WebSocket, data: string | undefined) => {
  const { gameId, indexPlayer, ships } = JSON.parse(data!);

  const currentGame = getGameById(gameId);

  if (!currentGame) {
    console.log('Current game absent');
    return;
  }

  const indexCurrentPlayer = Object.keys(currentGame.players)[0];
  const board = generateUserBoard(ships);

  currentGame.players[indexPlayer] = { ships, board };

  if (Object.keys(currentGame.players).length === 2) {
    Object.keys(currentGame.players).forEach((userGameId) => {
      const isBot = userGameId.startsWith(BOT_PREFIX);
      if (isBot) {
        return;
      }

      const startGamePosition = {
        ships: JSON.stringify(ships),
        currentPlayerIndex: indexCurrentPlayer,
      };

      ws.send(
        JSON.stringify({
          type: WS_TYPES.START_GAME,
          data: JSON.stringify(startGamePosition),
          id: ws_id,
        })
      );

      outputLogs({
        command: WS_TYPES.START_GAME,
        result: startGamePosition,
      });
    });

    sendTurn(ws, gameId);
  }
};
