import { Response, Request } from 'express';
import Department from '../../models/chat/Department';

class DepartmentController {
  public async index(req: Request, res: Response): Promise<Response> {
    return Department.find()
      .then((resp) => res.status(200).json(resp))
      .catch(() => res.status(400).send());
  }

  public async getNames(req: Request, res: Response): Promise<Response | void> {
    return Department.find()
      .then((resp) => {
        const names = resp.map((r) => r.name);
        res.status(200).json(names);
      })
      .catch(() => res.status(400).send());
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    return Department.findById(id)
      .then((resp) => res.json(resp))
      .catch(() => res.status(400).send());
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const department = await Department.create(body);
    return res.json(department);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await Department.findByIdAndDelete(id);

    return res.status(204).send();
  }
}

export default new DepartmentController();
