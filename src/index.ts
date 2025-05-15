import { config } from 'dotenv';
import { httpServer } from './http_server/index';
import { createWSServer } from './ws_server';

config();

const HTTP_PORT = Number(process.env.HTTP_PORT ?? 8181);
const WS_PORT = Number(process.env.WS_PORT ?? 3000);

console.log(`Start static http server on the ${HTTP_PORT} port!`);

httpServer.listen(HTTP_PORT);
createWSServer(WS_PORT);
