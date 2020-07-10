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

  public async validateSession(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const token = req.headers.authorization;
    if (token) {
      if (!(await Session.getSession(token))) {
        return res.status(401).send();
      }
      return next();
    }
    return res.status(400).send();
  }

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
    return res.status(400).send();
  }

  public async validateAndGetSession(
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
    return res.status(400).send();
  }

  public validateSessionOrHash = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { authorization } = req.headers;
    const { hash } = req.headers;
    if (authorization) {
      return this.validateSession(req, res, next);
    }
    if (typeof hash !== 'undefined') {
      const clientToken = req.params.id;
      const chat = await Chat.findById(hash);
      if (!chat || chat.clientToken !== +clientToken) {
        return res.status(401).send();
      }
      return next();
    }
    return res.status(400).send();
  };
}

export default new SessionValidation();
