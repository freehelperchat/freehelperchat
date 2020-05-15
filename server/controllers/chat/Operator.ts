import { Response, Request } from 'express';
import basicAuth from 'basic-auth';
import Operator from '../../models/chat/Operator';
import Encrypter from '../../utils/Encrypter';

class OperatorController {
  public async index(req: Request, res: Response): Promise<Response> {
    return Operator.find()
      .then((resp) => res.json(resp))
      .catch(() => res.status(400));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    return Operator.findById(id)
      .then((resp) => res.json(resp))
      .catch(() => res.status(400));
  }

  public async self(req: Request, res: Response): Promise<Response> {
    return res.status(200).json(req.session?.operator);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const auth = basicAuth(req);
    const { body } = req;

    if (auth) {
      const { name: username, pass: password } = auth;
      let operator = await Operator.findOne({ username });

      if (!operator) {
        operator = await Operator.create({
          username,
          password: Encrypter.hashPassword(password),
          ...body,
        });
        return res.status(201).json({ userId: operator._id });
      }
    }

    return res.status(400).send();
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await Operator.findByIdAndDelete(id);

    return res.status(204).send();
  }
}

export default new OperatorController();
