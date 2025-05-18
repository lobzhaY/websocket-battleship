import { rooms } from '../rooms';
import { Room } from '../../types';

export const getRooms = (): Room[] => {
  return Array.from(rooms.values()).filter(
    ({ roomUsers }) => roomUsers.length <= 1
  );
};

/* export const createRoom = (indexKey: string, data: BaseWSType<string>) => {
  rooms.set(indexKey, { ...data });
}; */

/* export const addUserToRoom = (indexRoom: string, ) => {

}; */
