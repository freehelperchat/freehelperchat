import { Response, Request } from 'express';
import Message from '../../models/chat/Message';
import Permissions from '../../utils/PermissionManager';
import { OperatorProps } from '../../models/chat/Operator';
import Chat from '../../models/chat/Chat';
import { chatStatus } from '../../utils/QueueManager';

class MessageController {
  public async chatMessages(req: Request, res: Response): Promise<Response> {
    const { session } = req;
    const { clientToken }: { clientToken: string } = req.cookies;
    const { id } = req.params;

    if (session) {
      const operator = session.operator as OperatorProps;
      const chat = await Chat.findById(id);
      if (chat) {
        if ((Permissions.has(operator, 'readAssignedChats')
              && chat?.operator === operator._id)
            || ((chat.status === chatStatus.PENDING ?
              Permissions.and(operator, 'readDepartmentChats', 'readPendingChats') :
              chat.status === chatStatus.ACTIVE
                && Permissions.has(operator, 'readDepartmentChats'))
              && operator.departmentIds.includes(chat?.department))
            || Permissions.or(operator, 'readAllMessages', 'all')) {
          return Message.find({ chatId: id })
            .then((resp) => res.json(resp))
            .catch(() => res.status(400).send());
        }
      }
    } else if (clientToken) {
      return Message.find({ chatId: id })
        .then((resp) => res.json(resp))
        .catch(() => res.status(400).send());
    }
    return res.status(400).send();
  }
}

export default new MessageController();
