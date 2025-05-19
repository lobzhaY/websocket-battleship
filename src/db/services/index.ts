export { registerPlayer } from './players-service';
export { getWinners, updateWinners } from './winner-service';
export {
  getRooms,
  createRoom,
  addUserToRoom,
  getRoomById,
  deleteRoomById,
  deleteRooms,
} from './rooms-service';
export {
  getPlayerBySocket,
  getConnections,
  addToConnections,
  getPlayerByRoomId,
  deleteConnection,
} from './connections-service';
export {
  getGameById,
  setNewGame,
  setShips,
  changeCurrentPlayer,
} from './game-service';
