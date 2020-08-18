import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import Message from '../../models/chat/Message';

class Mailer {
  private mailer: Mail;

  constructor() {
    this.mailer = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
    });
  }

  public async sendMail(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const messages = await Message.find({ chatId: id });
    const msg = messages.map((message) => {
      const date = new Date(message.time);
      const time = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      return `<p>[${message.name} @ ${time}]: ${message.message}</p>`;
    });
    return res.json(msg);
  }
}

export default new Mailer();
