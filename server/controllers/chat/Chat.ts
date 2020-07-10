import { Response, Request } from 'express';
import Chat, { ChatDoc } from '../../models/chat/Chat';
import Department from '../../models/chat/Department';
import StartChatForm from '../../models/settings/StartChatForm';
import QueueManager from '../../utils/QueueManager';
import Encrypter from '../../utils/Encrypter';

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

  private createChat = async (req: Request, i: number): Promise<ChatDoc> => Chat.create({
    _id: Encrypter.randomStringFromBytes(i),
    clientToken: Encrypter.randomStringFromBytes(64),
    time: { started: new Date().getTime() },
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    ...req.body,
  })
    .then((chat) => chat)
    .catch(() => this.createChat(req, i))

  public create = async (req: Request, res: Response): Promise<Response | void> => {
    const { body }: { body: IBody } = req;
    const department = await Department.findOne({ name: body.department });
    if (!department) return res.status(400).send();
    body.department = department._id;

    await Promise.all(
      body.userData.map(
        async (data: IUserData, i: number): Promise<void> => {
          const field = await StartChatForm.findOne({ name: data.fieldId });
          if (field) body.userData[i].fieldId = field.label;
        },
      ),
    );

    let i = 1;
    const j = await Chat.countDocuments();
    while (j > (256 ** i) * 0.9) i += 1;
    const chat = await this.createChat(req, i);
    QueueManager.assignNextChatToNextOperator();
    res.cookie('clientToken', chat.clientToken, {
      maxAge: 1000 * 60 * 60 * 6,
      httpOnly: true,
      domain: req.hostname,
      path: '/',
    });
    return res.status(201).json(chat);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const chat = await Chat.findById(id).populate(
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
    const chat = await Chat.findByIdAndUpdate(id, body);
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
