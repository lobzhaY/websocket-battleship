import { WS_TYPES, ws_id } from '../constants';
import { sendTurn, updateWinnersController } from '../controllers';
import { feedbackAttack } from '../controllers/attack-controller';
import {
  changeCurrentPlayer,
  getGameById,
  getPlayerBySocket,
  updateWinners,
} from '../db';
import { checkIsGameOver } from './check-is-game-over';
import { getRandomAttack } from './get-random-attack';
import { outputLogs } from './output-logs';
import { processAttack } from './process-attack';
import { WebSocket } from 'ws';

export const makeBotAttack = async (
  gameId: string,
  indexPlayer: string,
  botId: string | undefined,
  ws: WebSocket
) => {
  const currentGame = getGameById(gameId);

  const user = currentGame!.players[indexPlayer];

  const randomAttackPosition = getRandomAttack(user!.board);
  const checkAttack = processAttack(
    currentGame!.players[indexPlayer!]!.ships,
    currentGame!.players[indexPlayer!]!.board,
    randomAttackPosition!.x,
    randomAttackPosition!.y
  );

  feedbackAttack(ws, {
    position: { x: randomAttackPosition!.x, y: randomAttackPosition!.y },
    currentPlayer: botId!,
    status: checkAttack,
  });

  if (checkAttack === 'miss' || checkAttack === 'killed') {
    changeCurrentPlayer(gameId);
    sendTurn(ws, gameId);

    if (checkAttack === 'killed') {
      const isGameOver = checkIsGameOver(
        currentGame!.players[indexPlayer]!.board
      );
      if (isGameOver) {
        const player = getPlayerBySocket(ws);
        updateWinners(player!.playerId);

        ws.send(
          JSON.stringify({
            type: WS_TYPES.FINISH,
            data: JSON.stringify({ winPlayer: player!.playerId }),
            id: ws_id,
          })
        );

        outputLogs({
          command: WS_TYPES.FINISH,
          result: { winPlayer: player!.playerId },
        });
        updateWinnersController(ws);
      }
    }
  }
};
