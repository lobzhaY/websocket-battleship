import { WS_TYPES, ws_id } from '../constants';

export type BaseWSType<T> = {
  type: WS_TYPES;
  data: T;
  id: typeof ws_id;
};

export type Player = {
  name: string;
  password: string;
};
