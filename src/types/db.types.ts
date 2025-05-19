import { WS_TYPES, ws_id } from '../constants';

export type BaseWSType<T> = {
  type: WS_TYPES;
  data: T;
  id: typeof ws_id;
};

export type PlayerConnection = {
  ws: WebSocket;
  playerId: string;
  roomId?: string;
};

export type Player = {
  name: string;
  password: string;
};

export type Winner = {
  name: string;
  wins: number;
};

export type Room = {
  roomId: number | string;
  roomUsers: {
    name: string;
    index: number | string;
  }[];
};

export type Ship = {
  position: { x: number; y: number };
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
};

export type Game = {
  players: Record<string, { ships?: Ship[] }>;
  currentPlayerId: string;
};
