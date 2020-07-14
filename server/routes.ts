import express from 'express';

import * as validation from './validation';
import * as Controllers from './controllers';

const routes = express.Router();

// Chat Routes
routes.get(
  '/chat',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.validateSession,
  Controllers.Chat.index,
);
routes.get(
  '/chat/:id',
  validation.globalValidation.idStringParam,
  validation.sessionValidation.validateSessionOrClientToken,
  Controllers.Chat.show,
);
routes.post(
  '/chat',
  validation.chatValidation.createChat,
  Controllers.Chat.create,
);
routes.put(
  '/chat/:id',
  validation.globalValidation.idStringParam,
  validation.sessionValidation.authHeader,
  validation.sessionValidation.validateSession,
  validation.chatValidation.updateChat,
  Controllers.Chat.update,
);
routes.delete(
  '/chat/:id',
  validation.globalValidation.idStringParam,
  validation.sessionValidation.authHeader,
  validation.sessionValidation.validateSession,
  Controllers.Chat.delete,
);
routes.put(
  '/chat/transfer/:id',
  validation.globalValidation.idStringParam,
  validation.sessionValidation.authHeader,
  validation.sessionValidation.validateSession,
  Controllers.Chat.tranferChat,
);

// Operator Routes
routes.get(
  '/operators/',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.validateSession,
  Controllers.Operator.index,
);
routes.get(
  '/operator',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.validateSession,
  Controllers.Operator.self,
);
routes.get(
  '/operator/:id',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.validateSession,
  validation.globalValidation.idStringParam,
  Controllers.Operator.show,
);
routes.post(
  '/operator',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.tokenHeader,
  validation.sessionValidation.validateTokenHeaderSession,
  validation.operatorValidation.createOperator,
  Controllers.Operator.create,
);
routes.delete(
  '/operator/:id',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.validateSession,
  validation.globalValidation.idStringParam,
  Controllers.Operator.delete,
);

// Message Routes
routes.get(
  '/message/:id',
  validation.globalValidation.idStringParam,
  validation.messageValidation.getMessages,
  validation.sessionValidation.validateSessionOrClientToken,
  Controllers.Message.chatMessages,
);

// Department Routes
routes.get('/department', Controllers.Department.index);
routes.get('/department/names', Controllers.Department.getNames);
routes.post('/department/', Controllers.Department.create);
routes.delete(
  '/department/:id',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.validateSession,
  Controllers.Department.delete,
);

// CannedMessage Routes
routes.get(
  '/cannedmsg',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.validateSession,
  Controllers.CannedMessage.index,
);
routes.post(
  '/cannedmsg',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.validateSession,
  Controllers.CannedMessage.create,
);
routes.put(
  '/cannedmsg/:id',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.validateSession,
  Controllers.CannedMessage.editMsg,
);
routes.delete(
  '/cannedmsg/:id',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.validateSession,
  Controllers.CannedMessage.destroy,
);

// Session Routes
routes.post(
  '/login',
  validation.sessionValidation.authHeader,
  Controllers.Session.create,
);
routes.get(
  '/online',
  validation.sessionValidation.authHeader,
  Controllers.Session.activeSessions,
);
routes.delete(
  '/logout',
  validation.sessionValidation.authHeader,
  Controllers.Session.delete,
);

// StartChatForm Routes
routes.get('/startchat', Controllers.StartChatForm.index);
routes.post('/startchat/create', Controllers.StartChatForm.create);
routes.post('/startchat/add', Controllers.StartChatForm.add);
routes.put('/startchat/update', Controllers.StartChatForm.update);
routes.put('/startchat/updateAll', Controllers.StartChatForm.updateAll);

// UserGroups Routes
routes.get(
  '/usergroup',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.validateSession,
  Controllers.UserGroup.index,
);
routes.get(
  '/usergroup/:id',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.validateSession,
  Controllers.UserGroup.show,
);
routes.post('/usergroup', Controllers.UserGroup.create);
routes.delete('/usergroup/:id', Controllers.UserGroup.delete);

// Role Routes
routes.post(
  '/role',
  validation.roleValidation.createRole,
  validation.sessionValidation.authHeader,
  validation.sessionValidation.validateSession,
  Controllers.Role.create,
);
routes.delete(
  '/role',
  validation.roleValidation.deleteRole,
  validation.sessionValidation.authHeader,
  validation.sessionValidation.validateSession,
  Controllers.Role.delete,
);

// Notification Routes
routes.get('/notification', Controllers.Notification.read);
routes.get('/notification/types', Controllers.Notification.readTypes);
routes.post(
  '/notification/add',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.validateSession,
  validation.notificationValidation.createNotification,
  Controllers.Notification.create,
);
routes.put(
  '/notification/update',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.validateSession,
  Controllers.Notification.update,
);
routes.delete(
  '/notification/delete',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.validateSession,
  Controllers.Notification.delete,
);

export default routes;
