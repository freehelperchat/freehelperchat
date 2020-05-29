import { Request, Response } from 'express';
import StartChatForm from '../../models/settings/StartChatForm';
// import config = from '../../../config/config.json';

interface IInput {
  name: string;
  label: string;
  inputType: string;
  required: boolean;
  options: string[];
}

class StartChatFormController {
  public async index(req: Request, res: Response): Promise<Response> {
    return StartChatForm.find()
      .then((resp) => res.status(200).json(resp))
      .catch(() => res.status(400).send());
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    return StartChatForm.findByIdAndUpdate(body._id, body)
      .then((resp) => res.status(200).json(resp))
      .catch(() => res.status(400).send());
  }

  public async updateAll(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    if (!Array.isArray(body)) return res.status(400).send();
    return Promise.all(
      body.map((input) => StartChatForm.findByIdAndUpdate(input._id, input)),
    )
      .then((resp) => res.status(200).json(resp))
      .catch(() => res.status(400).send());
  }

  public async create(req: Request, res: Response): Promise<Response> {
    // if (!config.server.installed) {
    const { body }: { body: Array<IInput> } = req;
    const inputs = body.map((input) => ({
      ...input,
      name: input.label.replace(/ /gi, '-').toLowerCase(),
    }));
    return StartChatForm.insertMany(inputs)
      .then((resp) => res.status(201).json(resp))
      .catch(() => res.status(400).send());
    // }
    // return res.status(400).send();
  }

  public async add(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const name = body.label.replace(/ /gi, '-').toLowerCase();
    const input = await StartChatForm.findOne({ name });
    if (input) return res.status(400).send();
    return StartChatForm.create({
      name,
      ...body,
    })
      .then((resp) => res.status(201).json(resp))
      .catch(() => res.status(400).send());
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    if ((await StartChatForm.find()).length > 1) {
      const { id } = req.params;
      await StartChatForm.findByIdAndDelete(id);

      return res.status(204).send();
    }
    return res.status(400).send();
  }
}

export default new StartChatFormController();
