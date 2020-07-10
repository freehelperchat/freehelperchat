import { Response, Request } from 'express';
import Message from '../../models/chat/Message';

class MessageController {
  public async index(req: Request, res: Response): Promise<Response> {
    return Message.find()
      .then((resp) => res.json(resp))
      .catch(() => res.status(400));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    return Message.findById(id)
      .then((resp) => res.json(resp))
      .catch(() => res.status(400));
  }

  public async chatMessages(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    return Message.find({ chatId: id })
      .then((resp) => res.json(resp))
      .catch(() => res.status(400).send());
  }
}

export default new MessageController();
