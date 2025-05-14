import { WS_TYPES } from '../constants';

type outputLogsProps = {
  command: WS_TYPES;
  result: unknown;
};

export const outputLogs = ({ command, result }: outputLogsProps): void => {
  console.log(`Received command: ${command} and the result: ${result}`);
};
