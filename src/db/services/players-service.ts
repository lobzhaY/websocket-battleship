import { Player } from '../../types';
import { players } from '../players';

export const registerPlayer = (
  indexKey: string,
  { name, password }: Player
) => {
  players.set(indexKey, { name, password });
};

export const getUserById = (id: string): Player | undefined => {
  return players.get(id);
};
