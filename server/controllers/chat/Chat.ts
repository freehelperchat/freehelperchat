import { Response, Request } from 'express';
import Chat from '../../models/chat/Chat';
import Department from '../../models/chat/Department';
import StartChatForm from '../../models/settings/StartChatForm';
import IdCounterManager from '../../utils/IdCounterManager';

interface IUserData {
  fieldId: string;
  value: string | number;
}

interface IBody {
  name: string;
  email: string;
  department: string;
  status: number;
  operator: string;
  userData: Array<IUserData>;
}

class ChatController {
  public async index(req: Request, res: Response): Promise<Response> {
    const chats = await Chat.find();
    return res.status(200).json(chats);
  }

  public async create(req: Request, res: Response): Promise<Response | void> {
    const { body }: { body: IBody } = req;
    const department = await Department.findOne({ name: body.department });
    if (!department) return res.status(400).send();
    body.department = department._id;

    await Promise.all(
      body.userData.map(
        async (data: IUserData, i: number): Promise<void> => {
          const field = await StartChatForm.findOne({ name: data.fieldId });
          if (field) {
            body.userData[i].fieldId = field.label;
          }
        },
      ),
    );
    const chatId: number = await IdCounterManager.getIdCounter(
      IdCounterManager.Models.CHAT,
    );

    return Chat.create({
      chatId,
      time: { started: new Date().getTime() },
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      ...body,
    })
      .then((chat) => res.status(201).json(chat))
      .catch(async (err) => {
        await IdCounterManager.rollbackIdCounter(IdCounterManager.Models.CHAT);
        res.status(400).json({ err });
      });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const chat = await Chat.findOne({ chatId: +id }).populate(
      'department',
      '_id name',
    );
    if (!chat) return res.status(404).send();
    return res.status(200).json(chat);
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await Chat.findByIdAndDelete(id);

    return res.status(204).send();
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { body } = req;
    const chat = await Chat.findOneAndUpdate({ chatId: +id }, body);
    if (!chat) return res.status(404).send();
    return res.status(200).send();
  }

  public async tranferChat(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { operator } = req.body;
    return Chat.findByIdAndUpdate(id, operator)
      .then((resp) => res.status(200).json(resp))
      .catch(() => res.status(400).send());
  }

  public async getChatByStatus(req: Request, res: Response): Promise<Response> {
    const { status } = req.body;
    return Chat.find({ status })
      .then((resp) => res.status(200).json(resp))
      .catch(() => res.status(400).send());
  }
}

export default new ChatController();