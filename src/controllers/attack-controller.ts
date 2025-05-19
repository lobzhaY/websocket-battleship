import { AttackStatus } from '../types';
import { BOT_PREFIX, ws_id, WS_TYPES } from '../constants';
import { changeCurrentPlayer, getGameById } from '../db';
import { getRandomAttack, makeBotAttack, processAttack } from '../utils';
import { sendTurn } from './game-controller';

export const feedbackAttack = (
  ws: WebSocket,
  ship: {
    position: { x: number; y: number };
    currentPlayer: string;
    status: AttackStatus;
  }
) => {
  ws.send(
    JSON.stringify({
      type: WS_TYPES.ATTACK,
      data: JSON.stringify(ship),
      id: ws_id,
    })
  );
};

export const setUserAttack = (data: string, ws: WebSocket) => {
  const { gameId, x, y, indexPlayer } = JSON.parse(data);
  const currentGame = getGameById(gameId);

  if (!currentGame) {
    return;
  }
  const enemyId = Object.keys(currentGame.players).find(
    (id) => id !== indexPlayer
  );

  const checkAttack = processAttack(
    currentGame.players[enemyId!]!.ships,
    currentGame.players[enemyId!]!.board,
    x,
    y
  );

  feedbackAttack(ws, {
    position: { x: x, y: y },
    currentPlayer: indexPlayer,
    status: checkAttack,
  });

  if (checkAttack === 'miss' || checkAttack === 'killed') {
    changeCurrentPlayer(gameId);
    sendTurn(gameId, ws);

    if (currentGame.currentPlayerId.startsWith(BOT_PREFIX)) {
      setTimeout(() => {
        makeBotAttack(gameId, indexPlayer, enemyId, ws);
      }, 500);
    }
  }
};

export const setRandomAttack = (data: string, ws: WebSocket) => {
  const { gameId, indexPlayer } = JSON.parse(data);

  const currentGame = getGameById(gameId);

  if (!currentGame) {
    return;
  }

  const enemyId = Object.keys(currentGame.players).find(
    (id) => id !== indexPlayer
  );
  const enemy = currentGame.players[enemyId!];
  const randomAttackPosition = getRandomAttack(enemy!.board);

  const checkAttack = processAttack(
    currentGame.players[enemyId!]!.ships,
    currentGame.players[enemyId!]!.board,
    randomAttackPosition!.x,
    randomAttackPosition!.y
  );

  feedbackAttack(ws, {
    position: { x: randomAttackPosition!.x, y: randomAttackPosition!.y },
    currentPlayer: indexPlayer,
    status: checkAttack,
  });

  if (checkAttack === 'miss' || checkAttack === 'killed') {
    changeCurrentPlayer(gameId);
    sendTurn(gameId, ws);

    if (currentGame.currentPlayerId.startsWith(BOT_PREFIX)) {
      setTimeout(() => {
        makeBotAttack(gameId, indexPlayer, enemyId, ws);
      }, 500);
    }
  }
};
