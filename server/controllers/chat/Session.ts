import { Response, Request } from 'express';
import basicAuth from 'basic-auth';
import Encrypter from '../../utils/Encrypter';
import SessionManager from '../../utils/SessionManager';
import Operator from '../../models/chat/Operator';

class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const auth = basicAuth(req);
    if (auth) {
      const { name: username, pass: password } = auth;
      const operator = await Operator.findOne({ username });
      if (operator) {
        SessionManager.deleteSessionByOperator(operator._id);
        if (
          Encrypter.sha256(password, operator.password.salt) ===
          operator.password.hash
        ) {
          const token = await SessionManager.addSession(operator);
          return res.status(200).json({ token });
        }
        return res.status(401).send();
      }
    }
    return res.status(404).send();
  }

  public async activeSessions(req: Request, res: Response): Promise<Response> {
    const { excludeSelf } = req.query;
    let sessions = await SessionManager.getAllActiveSessions();
    if (excludeSelf && sessions) {
      sessions = sessions.filter((session) => session._id !== req.session?._id);
    }
    return res.json(sessions);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const token = req.headers.authorization;
    if (!token) return res.status(403).send();
    const result = await SessionManager.deleteSession(token);
    if (!result) return res.status(400).send();
    const activeSessions = await SessionManager.getAllActiveSessions();
    if (activeSessions) {
      activeSessions.forEach((s) => req.io
          ?.emit('online_operators', activeSessions)
          .to(s.socket || ''));
    }
    return res.status(204).send();
  }
}

export default new SessionController();
