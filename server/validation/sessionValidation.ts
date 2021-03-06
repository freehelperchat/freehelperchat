import { celebrate, Joi, Segments } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import Session from '../utils/SessionManager';
import Chat from '../models/chat/Chat';

class SessionValidation {
  public readonly authHeader = celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  });

  public readonly tokenHeader = celebrate({
    [Segments.HEADERS]: Joi.object({
      token: Joi.string().required(),
    }).unknown(),
  });

  public async validateTokenHeaderSession(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { token } = req.headers;
    if (token) {
      if (!(await Session.getSession(token.toString()))) {
        return res.status(401).send();
      }
      return next();
    }
    return res.status(401).send();
  }

  public async validateSession(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const token = req.headers.authorization;
    if (token) {
      const session = await Session.getSession(token);
      if (!session) {
        return res.status(401).send();
      }
      req.session = session;
      return next();
    }
    return res.status(401).send();
  }

  public validateSessionOrClientToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { authorization } = req.headers;
    const { clientToken }: { clientToken: string } = req.cookies;
    if (authorization) {
      return this.validateSession(req, res, next);
    }
    if (typeof clientToken !== 'undefined') {
      const { id } = req.params;
      const chat = await Chat.findById(id);
      if (!chat || chat.clientToken !== clientToken) {
        return res.status(401).send();
      }
      return next();
    }
    return res.status(401).send();
  };
}

export default new SessionValidation();
