import { sendTurn } from '../controllers';
import { feedbackAttack } from '../controllers/attack-controller';
import { changeCurrentPlayer, getGameById } from '../db';
import { getRandomAttack } from './get-random-attack';
import { processAttack } from './process-attack';

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
    sendTurn(gameId, ws);
  }
};
