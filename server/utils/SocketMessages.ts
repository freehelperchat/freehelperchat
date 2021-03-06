import path from 'path';
import fs from 'fs';
import { Types } from 'mongoose';
import Message from '../models/chat/Message';
import Chat, { ChatDoc } from '../models/chat/Chat';
import Operator, { OperatorProps } from '../models/chat/Operator';
import SessionManager from './SessionManager';
import Permissions from './PermissionManager';
import QueueManager, { chatStatus } from './QueueManager';
import config from '../config/config.json';

class SocketMessages {
  public setSocketMessages(io: SocketIO.Server): void {
    io.on('connection', (socket) => {
      this.login(socket, io);
      this.logout(socket, io);
      this.openChat(socket, io);
      this.transferChat(socket, io);
      this.closeChat(socket, io);
      this.sendMessage(socket, io);
      this.uploadFile(socket);
    });
  }

  private login(socket: SocketIO.Socket, io: SocketIO.Server): void {
    socket.on('login', async (data) => {
      await QueueManager.assignNextChatToNextOperator();
      const { token } = data;
      if (token) {
        const session = await SessionManager.getSession(token);
        if (session) {
          await SessionManager.updateSession(token, socket.id);
          await this.sendInfoToOperators(io);
        } else return socket.emit('login_failed', 'Unauthorized');
      }
    });
  }

  private logout(socket: SocketIO.Socket, io: SocketIO.Server): void {
    socket.on('disconnect', async () => {
      await SessionManager.deleteSessionSocket(socket.id);
      await this.sendInfoToOperators(io);
    });
  }

  private openChat(socket: SocketIO.Socket, io: SocketIO.Server): void {
    socket.on('open_chat', async (data) => {
      const { chatId, token, clientToken } = data;
      const chat = await Chat.findById(chatId);
      if (!chat) return socket.emit('error_opening_chat', 'Chat not found');

      if (token) {
        const session = await SessionManager.getSession(token);
        if (!session) return socket.emit('error_opening_chat', 'Unauthorized');
        if (session.operator) {
          const operator = session.operator as OperatorProps;
          const operatorDoc = await Operator.findById((session.operator as OperatorProps)._id);
          if (chat && operatorDoc) {
            switch (chat.status) {
              case chatStatus.PENDING:
                if (chat?.operator === operator._id
                  || (Permissions.has(operator, 'handleDeptChats')
                  && operator.departmentIds.includes(chat?.department))
                  || Permissions.has(operator, 'manageChats', 'all')) {
                  if (!chat.operator
                      || (chat.operator as Types.ObjectId).toHexString()
                      !== operator._id.toHexString()) {
                    const prevOperator = await Operator.findById(chat.operator);
                    if (prevOperator) {
                      prevOperator.activeChats -= 1;
                      await prevOperator.save();
                    }
                    operatorDoc.activeChats += 1;
                    chat.operator = operator._id;
                  }
                  operatorDoc.lastActiveChat = new Date().getTime();
                  await operatorDoc.save();
                  chat.status = chatStatus.ACTIVE;
                  chat.time.pending = new Date().getTime();
                  await chat.save();
                  await this.sendInfoToOperators(io);
                  return socket.join(chatId);
                }
                break;
              case chatStatus.ACTIVE:
                if (chat?.operator === operator._id
                  || (Permissions.has(operator, 'readDeptChats')
                  && operator.departmentIds.includes(chat?.department))
                  || Permissions.has(operator, 'manageChats', 'all')) {
                  return socket.join(chatId);
                }
                break;
              default:
                break;
            }
            if (chat?.operator === operator._id
              || ((chat.status === chatStatus.PENDING ?
                Permissions.has(operator, 'handleDeptChats') :
                chat.status === chatStatus.ACTIVE
                  && Permissions.has(operator, 'readDeptChats'))
                && operator.departmentIds.includes(chat?.department))
              || Permissions.has(operator, 'manageChats', 'all')) {
              return socket.join(chatId);
            }
          }
          return socket.emit('error_opening_chat', 'Unauthorized');
        }
      } else if (clientToken) {
        if (chat.clientToken !== clientToken || chat.status === chatStatus.CLOSED) {
          return socket.emit('error_opening_chat', 'Unauthorized');
        }
        this.sendInfoToOperators(io);
        return socket.join(chatId);
      }
      return socket.emit('error_opening_chat', 'Unauthorized');
    });
  }

  private async sendInfoToOperators(io: SocketIO.Server): Promise<void> {
    const activeSessions = await SessionManager.getAllActiveSessions({
      path: 'operator',
      select:
        'fullName allDepartments departmentIds maxActiveChats activeChats hideOnline roles customPermissions',
      populate: {
        path: 'roles',
        select: 'permissions',
      },
    });
    if (!activeSessions) return;
    activeSessions.forEach(async (session) => {
      if (!session.socket) return;
      const yourChats = await Chat.find({
        operator: (session.operator as OperatorProps)._id,
        status: { $in: [chatStatus.ACTIVE, chatStatus.PENDING] },
      });
      let otherChats = [] as ChatDoc[];
      const filter = [chatStatus.ACTIVE];
      if (Permissions.has(session.operator as OperatorProps,
        'manageDeptChats',
        'manageChats',
        'all')) {
        filter.push(chatStatus.PENDING);
      }
      if (Permissions.has(session.operator as OperatorProps, 'manageChats', 'all')) {
        otherChats = await Chat.find({
          operator: { $ne: (session.operator as OperatorProps)._id },
          status: { $in: filter },
        });
      } else if (Permissions.has(session.operator as OperatorProps, 'readDeptChats')) {
        otherChats = await Chat.find({
          operator: { $ne: (session.operator as OperatorProps)._id },
          status: { $in: filter },
          department: { $in: (session.operator as OperatorProps).departmentIds },
        });
      }
      io.emit('', '').to(session.socket);
      io.emit('operators', activeSessions).to(session.socket);
      io.emit('your_chats', yourChats).to(session.socket);
      io.emit('other_chats', otherChats).to(session.socket);
    });
  }

  private transferChat(socket: SocketIO.Socket, io: SocketIO.Server): void {
    socket.on('transfer_chat', async (data) => {
      const { token, operatorId, chatId } = data;
      const session = await SessionManager.getSession(token);
      if (session) {
        const chat = await Chat.findById(chatId);
        const senderOperator = await Operator.findById((session.operator as OperatorProps)._id);
        const targetOperator = await Operator.findById(operatorId);
        if (chat && targetOperator && senderOperator) {
          if ((chat.operator as Types.ObjectId).toHexString() === senderOperator._id.toHexString()
            || (Permissions.has(senderOperator, 'handleDeptChats')
              && senderOperator.departmentIds.indexOf(chat.department) >= 0)
            || Permissions.has(senderOperator, 'handleChats', 'all')) {
            if (senderOperator.departmentIds.indexOf(chat.department) >= 0
            || Permissions.has(senderOperator, 'handleChats', 'all')) {
              chat.operator = operatorId;
              await chat.save();
              senderOperator.activeChats -= 1;
              targetOperator.activeChats += 1;
              await senderOperator.save();
              await targetOperator.save();
              await this.sendInfoToOperators(io);
            }
          }
        }
      }
    });
  }

  private closeChat(socket: SocketIO.Socket, io: SocketIO.Server): void {
    socket.on('close_chat', async (data) => {
      const { chatId, token } = data;
      const session = await SessionManager.getSession(token);
      const operator = await Operator.findById(
        (session?.operator as OperatorProps)._id,
      );
      if (operator) {
        const chat = await Chat.findById(chatId);
        if (chat) {
          if ((chat.operator as Types.ObjectId).toHexString()
              === (operator._id as Types.ObjectId).toHexString()
              || (Permissions.has(operator, 'handleDeptChats')
              && operator.departmentIds.includes(chat.department))
              || Permissions.has(operator, 'manageChats', 'all')) {
            if (chat.operator !== operator._id) {
              const actualOperator = await Operator.findById(chat.operator);
              if (actualOperator) {
                actualOperator.activeChats =
                    actualOperator.activeChats < 0 ? 0 : actualOperator.activeChats - 1;
                await actualOperator.save();
              }
            } else {
              operator.activeChats =
                  operator.activeChats < 0 ? 0 : operator.activeChats - 1;
              await operator.save();
            }
            chat.status = chatStatus.CLOSED;
            chat.time.closed = new Date().getTime();
            await chat.save();
          }
        }
      }
      await QueueManager.assignNextChatToNextOperator();
      await this.sendInfoToOperators(io);
      socket.leave(chatId);
    });
  }

  private sendMessage(socket: SocketIO.Socket, io: SocketIO.Server): void {
    socket.on('send_message', async (data) => {
      const { chatId, clientToken, token, message, file } = data;
      const chat = await Chat.findById(chatId);
      if (chat?.status === chatStatus.CLOSED) {
        return socket.emit('error_sending_message', 'Unauthorized');
      }
      if (token) {
        const session = await SessionManager.getSession(token);
        if (!session) {
          return socket.emit('error_sending_message', 'Unauthorized');
        }
        if (session.operator) {
          const operator = session.operator as OperatorProps;
          if (chat) {
            if (chat?.operator === operator._id
            || (Permissions.has(operator, 'handleDeptChats')
              && operator.departmentIds.includes(chat?.department))
            || Permissions.has(operator, 'manageChats', 'all')) {
              data.operator = true;
            } else {
              return socket.emit('error_sending_message', 'Unauthorized');
            }
          }
        } else {
          return socket.emit('error_sending_message', 'Unauthorized');
        }
      } else if (clientToken) {
        if (!chat || chat.clientToken !== clientToken) {
          return socket.emit('error_sending_message', 'Unauthorized');
        }
        data.operator = false;
      } else return socket.emit('error_sending_message', 'Unauthorized');
      if ((!message || (message as string).length === 0)
      && (!file || (file as string).length === 0)) {
        return socket.emit('error_sending_message', 'Unauthorized');
      }
      Message.create({ ...data, time: new Date().getTime() })
        .then((res) => io.to(chatId).emit('received_message', res))
        .catch((err) => socket.emit('error_sending_message', err));
    });
  }

  private uploadFile(socket: SocketIO.Socket): void {
    socket.on('upload_file', (data: { file: string, filename: string }) => {
      const file = data.file.split(',');
      const fileName = `${new Date().getTime()}-${data.filename}`;
      const filePath = path.resolve(
        __dirname,
        '..',
        '..',
        'uploads',
        fileName,
      );
      fs.writeFile(filePath, file[1], 'base64', (err) => {
        if (!err) {
          socket.emit('file_uploaded', `${config.server.url}/uploads/${fileName}`);
        } else {
          socket.emit('file_upload_failed', err);
          console.log(err);
        }
      });
    });
  }
}

export default new SocketMessages();
