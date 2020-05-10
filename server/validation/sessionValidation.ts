import { celebrate, Joi, Segments } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import Session from '../functions/SessionManager';
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

  public async validateSession(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const token = req.headers.authorization;
    if (!(await Session.sessionExists(token))) return res.status(401).send();
    return next();
  }

  public async validateTokenHeaderSession(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { token } = req.headers;
    if (!(await Session.sessionExists(token?.toString()))) {
      return res.status(401).send();
    }
    return next();
  }

  public async validateAndGetSession(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const token = req.headers.authorization;
    if (!(await Session.sessionExists(token))) return res.status(401).send();
    const session = await Session.getSession(token);
    req.session = session;
    return next();
  }

  public async validateSessionOrHash(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { authorization } = req.headers;
    const { hash } = req.headers;
    if (authorization) {
      return this.validateSession(req, res, next);
    }
    if (typeof hash !== 'undefined') {
      const chatId = req.params.id;
      const chat = await Chat.findById(hash);
      if (!chat || chat.chatId !== +chatId) {
        return res.status(401).send();
      }
      return next();
    }
    return res.status(400).send();
  }
}

export default new SessionValidation();
