import { Request, Response } from 'express';
import RoleModel from '../../models/chat/Role';

class RoleController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, permissions } = req.body;
    return RoleModel.create({ _id: name, permissions })
      .then((role) => res.status(201).json(role))
      .catch((err) => res.status(400).json(err));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    return RoleModel.deleteOne({ _id: name })
      .then(() => res.status(204).send())
      .catch((err) => res.status(400).json(err));
  }
}

export default new RoleController();
