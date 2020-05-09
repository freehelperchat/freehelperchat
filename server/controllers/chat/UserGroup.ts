import { Response, Request } from 'express';
import UserGroup from '../../models/chat/UserGroup';

export default {
  async index(req: Request, res: Response): Promise<Response> {
    return UserGroup.find()
      .then((resp) => res.json(resp))
      .catch(() => res.status(400).send());
  },

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    return UserGroup.findById(id)
      .then((resp) => res.json(resp))
      .catch(() => res.status(400).send());
  },

  async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const usergroup = await UserGroup.create(body);
    return res.json(usergroup);
  },

  async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await UserGroup.findByIdAndDelete(id);

    return res.status(204).send();
  },
};
