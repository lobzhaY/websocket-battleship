import { registerPlayerController } from '../controllers';
import { WS_TYPES } from './ws-types';

export const ROUTERS_CONTROLLERS: Record<
  WS_TYPES,
  (data: any, ws: WebSocket) => void
> = {
  [WS_TYPES.REG]: registerPlayerController,
};
