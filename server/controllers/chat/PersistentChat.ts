import { Response, Request } from 'express';
import { Types } from 'mongoose';
import PersistentChat from '../../models/chat/PersistentChat';
import IdCounterManager from '../../utils/IdCounterManager';
import { OperatorProps } from '../../models/chat/Operator';

class PersistentChatController {
  public async index(req: Request, res: Response): Promise<Response> {
    const chats = await PersistentChat.find();
    return res.json(chats);
  }

  public async create(req: Request, res: Response): Promise<Response | void> {
    const { operators }: { operators: string[] } = req.body;
    const { session } = req;
    const creator = (session?.operator as OperatorProps)._id.toHexString();
    operators.push(creator);
    const clientToken = await IdCounterManager.getIdCounter(IdCounterManager.Models.PERSITENT_CHAT);
    PersistentChat.create({ clientToken, time: new Date().getTime(), operators, owners: [creator] })
      .then(() => res.status(201).send())
      .catch(() => {
        IdCounterManager.rollbackIdCounter(IdCounterManager.Models.PERSITENT_CHAT);
        return res.status(400).send();
      });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { operators }: { operators: string[] } = req.body;
    const { session } = req;
    const chat = await PersistentChat.findById(id);
    if (chat) {
      if (chat.owners?.includes((session?.operator as OperatorProps)._id)) {
        operators.forEach((operator) => {
          const operatorId = new Types.ObjectId(operator);
          if (chat.operators?.includes(new Types.ObjectId(operatorId))) {
            chat.owners = chat.owners?.filter((o) => o !== operatorId);
            chat.operators = chat.operators?.filter((o) => o !== operatorId);
          } else if (chat.operators) {
            chat.operators.push(operatorId);
          }
        });
        await chat.save();
        return res.status(200).send();
      }
    }
    return res.status(400).send();
  }

  public async updateOwner(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { operators }: { operators: string[] } = req.body;
    const { session } = req;
    const chat = await PersistentChat.findById(id);
    if (chat) {
      if (chat.owners?.includes((session?.operator as OperatorProps)._id)) {
        operators.forEach((operator) => {
          const operatorId = new Types.ObjectId(operator);
          if (chat.operators?.includes(new Types.ObjectId(operatorId))) {
            if (chat.owners?.includes(new Types.ObjectId(operatorId))) {
              chat.owners = chat.owners?.filter((o) => o !== operatorId);
            } else if (chat.owners) {
              chat.owners.push(operatorId);
            }
          }
        });
        await chat.save();
        return res.status(200).send();
      }
    }
    return res.status(400).send();
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { session } = req;
    const chat = await PersistentChat.findById(id);
    if (chat?.owners?.includes((session?.operator as OperatorProps)._id)) {
      await PersistentChat.findByIdAndDelete(id);
      return res.status(204).send();
    }
    return res.status(400).send();
  }
}

export default new PersistentChatController();
