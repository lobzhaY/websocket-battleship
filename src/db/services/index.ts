export { registerPlayer } from './players-service';
export { getWinners, updateWinners } from './winner-service';
export {
  getRooms,
  createRoom,
  addUserToRoom,
  getRoomById,
  deleteRoomById,
} from './rooms-service';
export {
  getPlayerBySocket,
  getConnections,
  addToConnections,
  getPlayerByRoomId,
} from './connections-service';
export {
  getGameById,
  setNewGame,
  setShips,
  changeCurrentPlayer,
} from './game-service';
