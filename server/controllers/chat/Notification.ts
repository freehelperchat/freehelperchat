import { Request, Response } from 'express';
import Notification from '../../models/chat/Notification';

interface INewNotification {
  text: string;
  type: string;
  index?: number;
}

interface IUpdateNotification {
    _id: string;
    text?: string;
    type?: string;
    index?: number;
  }

class NotificationController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { text, type }: INewNotification = req.body;
    let { index }: INewNotification = req.body;
    if (!index) index = await Notification.countDocuments();
    return Notification.create({ index, text, type })
      .then(() => res.status(201).send())
      .catch(() => res.status(400).send());
  }

  public async read(req: Request, res: Response): Promise<Response> {
    const notifications = await Notification.find();
    return res.status(200).json(notifications);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { _id, text, type, index }: IUpdateNotification = req.body;
    const notification = await Notification.findByIdAndUpdate(_id, { text, type, index });
    if (notification) return res.status(200).json(notification);
    return res.status(400).send();
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { _id }: IUpdateNotification = req.body;
    return Notification.findByIdAndDelete(_id)
      .then(() => res.status(204).send())
      .catch(() => res.status(400).send());
  }
}

export default new NotificationController();
