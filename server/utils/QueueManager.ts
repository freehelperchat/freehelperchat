import Chat, { ChatDoc } from '../models/chat/Chat';
import SessionManager from './SessionManager';
import Permissions from './PermissionManager';
import { OperatorDoc, OperatorProps } from '../models/chat/Operator';
import { DepartmentProps } from '../models/chat/Department';
import General from '../custom/general.json';

export enum chatStatus {
  CLOSED,
  PENDING,
  ACTIVE,
  OPERATOR,
}

class ChatQueueManager {
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

  public async assignNextChatToNextOperator(): Promise<boolean> {
    const chat = await this.getNextChatInQueue();
    if (!chat) return false;
    const department = chat.department as DepartmentProps;
    const onlineSessions = await SessionManager.getAllActiveSessions({
      path: 'operator',
      select:
        'fullName allDepartments departmentIds maxActiveChats activeChats hideOnline roles customPermissions',
      populate: {
        path: 'roles',
        select: 'permissions',
      },
    });
    if (!onlineSessions) return false;
    onlineSessions.sort((prev, next) => {
      const prevOperator = prev.operator as OperatorProps;
      const nextOperator = next.operator as OperatorProps;
      if (prevOperator.activeChats > nextOperator.activeChats) return 1;
      if (nextOperator.activeChats > prevOperator.activeChats) return -1;
      if (
        Math.abs(
          (prevOperator.lastActiveChat || 0) -
            (nextOperator.lastActiveChat || 0),
        ) >
        General.chat.queue.chatStartedTimeTolerance * 1000
      ) {
        return (prevOperator.lastActiveChat || 0) <
          (nextOperator.lastActiveChat || 0)
          ? 1
          : -1;
      }
      return Math.round(Math.random()) ? 1 : -1;
    });

    onlineSessions.some(async (session) => {
      const operator = session.operator as OperatorDoc;
      if (operator.hideOnline) return false;
      if (
        !Permissions.has(operator, 'manageChats')
        && !Permissions.has(operator, 'all')
        && operator.departmentIds.indexOf(department._id.toHexString()) === -1
      ) return false;
      if (
        operator.activeChats < operator.maxActiveChats
        || operator.maxActiveChats === 0
      ) {
        if (
          operator.activeChats < department.maxActiveChats
          || department.maxActiveChats === 0
        ) {
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

export default new ChatQueueManager();
