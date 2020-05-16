import Chat, { ChatDoc } from '../models/chat/Chat';
import SessionManager from './SessionManager';
// import PermissionManager from './PermissionManager';
import { OperatorDoc, OperatorProps } from '../models/chat/Operator';
import { DepartmentProps } from '../models/chat/Department';

enum chatStatus {
  CLOSED,
  PENDING,
  ACTIVE,
  OPERATOR,
}

class ChatQueue {
  public async getQueue(): Promise<ChatDoc[]> {
    return Chat.find({
      status: chatStatus.PENDING,
      operator: undefined,
    }).populate({ path: 'department', select: 'maxActiveChats pendingMax' });
  }

  public async getNextChatInQueue(): Promise<ChatDoc | undefined> {
    const queue = await this.getQueue();
    return queue.shift();
  }

  public async asignNextChatToNextOperator(): Promise<boolean> {
    const chat = await this.getNextChatInQueue();
    if (!chat) return false;
    const department = chat.department as DepartmentProps;
    const onlineSessions = await SessionManager.getAllActiveSessions({
      path: 'operator',
      select:
        'fullName allDepartments departmentIds maxActiveChats activeChats roles customPermissions',
      populate: {
        path: 'roles',
        select: 'maxActiveChats permissions',
      },
    });
    if (!onlineSessions) return false;
    onlineSessions.sort((prev, next) => {
      const prevChats = (prev.operator as OperatorProps).activeChats;
      const nextChats = (next.operator as OperatorProps).activeChats;
      if (prevChats > nextChats) return 1;
      if (nextChats > prevChats) return -1;
      return 0;
    });
    onlineSessions.some(async (session) => {
      const operator = session.operator as OperatorDoc;
      if (
        operator.departmentIds.indexOf(department._id.toHexString()) === -1 &&
        !operator.allDepartments
      ) {
        return false;
      }
      if (
        operator.activeChats < operator.maxActiveChats ||
        operator.maxActiveChats === 0
      ) {
        if (
          operator.activeChats < department.maxActiveChats ||
          department.maxActiveChats === 0
        ) {
          chat.depopulate('operator');
          chat.operator = operator._id;
          operator.activeChats += 1;
          await operator.save();
          await chat.save();
          return true;
        }
      }
      return false;
    });
    if (chat.operator) return true;
    return false;
  }
}

export default new ChatQueue();
