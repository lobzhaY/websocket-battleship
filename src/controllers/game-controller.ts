import { randomUUID } from 'node:crypto';
import { BOT_PREFIX, ws_id, WS_TYPES } from '../constants';
import { getGameById, setNewGame } from '../db';
import { generateUserBoard } from '../utils';

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
};

export const sendTurn = (gameId: string, ws: WebSocket) => {
  const currentGame = getGameById(gameId);

  console.log('sendTurn', gameId, currentGame);

  ws.send(
    JSON.stringify({
      type: WS_TYPES.TURN,
      data: JSON.stringify({ currentPlayer: currentGame!.currentPlayerId }),
      id: ws_id,
    })
  );
};

export const addShipsController = (data: string, ws: WebSocket) => {
  console.log('addShipsController', data);

  const { gameId, indexPlayer, ships } = JSON.parse(data);

  const currentGame = getGameById(gameId);

  if (!currentGame) {
    console.log('Current game absent');
    return;
  }

  const indexCurrentPlayer = Object.keys(currentGame.players)[0];
  const board = generateUserBoard(ships);
  console.log('board', board);
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
    });

    sendTurn(gameId, ws);
  }
};
