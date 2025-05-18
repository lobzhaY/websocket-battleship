import { rooms } from '../rooms';
import { Room } from '../../types';
import { getUserById } from './players-service';

export const getRooms = (): Room[] => {
  return Array.from(rooms.values()).filter(
    ({ roomUsers }) => roomUsers.length <= 1
  );
};

export const createRoom = (roomId: string, playerId: string | undefined) => {
  const currentUser = getUserById(playerId!);
  if (!currentUser) {
    console.log(`User with ID ${playerId} not found`);
    return;
  }

  const room = {
    roomId: roomId,
    roomUsers: [
      {
        name: currentUser!.name as string,
        index: playerId as string,
      },
    ],
  };

  rooms.set(roomId, room);
};

/* export const addUserToRoom = (indexRoom: string, ) => {

}; */
