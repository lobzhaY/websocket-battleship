import { rooms } from '../rooms';
import { BaseWSType } from '../../types';

export const createRoom = (indexKey: string, data: BaseWSType<string>) => {
  rooms.set(indexKey, { ...data });
};

/* export const addUserToRoom = (indexRoom: string, ) => {

}; */
