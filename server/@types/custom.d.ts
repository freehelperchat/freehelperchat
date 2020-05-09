/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SessionDoc } from '../models/chat/Session';

declare global {
  namespace Express {
    export interface Request {
      io?: SocketIO.Server;
      session?: SessionDoc | null;
    }
  }
}
