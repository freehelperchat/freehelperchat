import { Response, Request } from 'express';
import CannedMessage from '../../models/chat/CannedMessage';

class CannedMessageController {
  public async index(req: Request, res: Response): Promise<Response> {
    return CannedMessage.find()
      .then((resp) => res.json(resp))
      .catch(() => res.status(400).send());
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    return CannedMessage.findById(id)
      .then((resp) => res.json(resp))
      .catch(() => res.status(400).send());
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const cannedMessage = await CannedMessage.create(req.body);

    return res.json({ cannedMessage });
  }

  public async editMsg(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { msg } = req.body;
    const cannedMessage = await CannedMessage.findByIdAndUpdate(id, { msg });
    return res.json({ msg: cannedMessage?.msg });
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await CannedMessage.findByIdAndDelete(id);

    return res.status(204).send();
  }
}

export default new CannedMessageController();
