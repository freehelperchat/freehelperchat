import { Response, Request } from 'express';
import basicAuth from 'basic-auth';
import Encrypter from '../../functions/Encrypter';
import SessionManager from '../../functions/SessionManager';
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
    const sessions = await SessionManager.getAllActiveSessions();
    return res.json(sessions);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const token = req.headers.authorization;
    if (!token) return res.status(403).send();
    return res
      .status((await SessionManager.deleteSession(token)) ? 204 : 400)
      .send();
  }
}

export default new SessionController();
