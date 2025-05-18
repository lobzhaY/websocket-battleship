import { Player } from '../../types';
import { players } from '../players';

export const registerPlayer = (
  indexKey: string,
  { name, password }: Player
) => {
  players.set(indexKey, { name, password });
};
