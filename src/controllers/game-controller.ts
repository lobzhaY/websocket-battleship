import { randomUUID } from 'node:crypto';
import { ws_id, WS_TYPES } from '../constants';
import { getGameById, setNewGame } from '../db';

export const createGameController = (ws: WebSocket) => {
  const idGame = randomUUID();
  const gamePlayerId = randomUUID();

  ws.send(
    JSON.stringify({
      type: WS_TYPES.CREATE_GAME,
      data: JSON.stringify({
        idGame,
        idPlayer: gamePlayerId,
      }),
      id: ws_id,
    })
  );

  setNewGame(idGame, gamePlayerId);
};

export const addShipsController = (data: string, ws: WebSocket) => {
  const { gameId, indexPlayer, ships } = JSON.parse(data);

  const currentGame = getGameById(gameId);

  if (!currentGame) {
    console.log('Current game absent');
    return;
  }

  currentGame[indexPlayer] = { ships };

 // if (Object.keys(currentGame).length === 2) {
    const startGamePosition = {
      ships: JSON.stringify(ships),
      currentPlayerIndex: indexPlayer,
    };

    ws.send(
      JSON.stringify({
        type: WS_TYPES.START_GAME,
        data: JSON.stringify(startGamePosition),
        id: ws_id,
      })
    );
  //}
};

