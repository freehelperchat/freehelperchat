const express = require('express');

const routes = express.Router();

const validation = require('./validation');
const Controllers = require('./controllers');

// Chat Routes
routes.get('/chat', Controllers.Chat.index);
routes.get('/chat/:id', validation.idNumberParam, Controllers.Chat.show);
routes.post('/chat', validation.chatValidation.createChat, Controllers.Chat.create);
routes.put(
  '/chat/:id',
  validation.idNumberParam,
  validation.sessionValidation.authHeader,
  validation.sessionValidation.verifySession,
  validation.chatValidation.updateChat,
  Controllers.Chat.update,
);
routes.delete(
  '/chat/:id',
  validation.idNumberParam,
  validation.sessionValidation.authHeader,
  validation.sessionValidation.verifySession,
  Controllers.Chat.destroy,
);
routes.put(
  '/chat/transfer/:id',
  validation.idNumberParam,
  validation.sessionValidation.authHeader,
  validation.sessionValidation.verifySession,
  Controllers.Chat.tranferChat,
);
routes.get('/chat/getbystatus', Controllers.Chat.getChatByStatus);

// Operator Routes
routes.get(
  '/operator/',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.verifySession,
  Controllers.Operator.index,
);
routes.get(
  '/operator/:id',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.verifySession,
  validation.idStringParam,
  Controllers.Operator.show,
);
routes.post(
  '/operator',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.verifySession,
  validation.operatorValidation.createOperator,
  Controllers.Operator.create,
);
routes.delete(
  '/operator/:id',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.verifySession,
  validation.idStringParam,
  Controllers.Operator.destroy,
);

// Message Routes
routes.get('/message/:id', validation.idNumberParam, Controllers.Message.chatMessages);

// Department Routes
routes.get('/department', Controllers.Department.index);
routes.get('/department/names', Controllers.Department.getNames);
routes.post('/department/', Controllers.Department.create);
routes.delete(
  '/department/:id',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.verifySession,
  Controllers.Department.destroy,
);

// CannedMessage Routes
routes.get(
  '/cannedmsg',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.verifySession,
  Controllers.CannedMessage.index,
);
routes.post(
  '/cannedmsg',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.verifySession,
  Controllers.CannedMessage.create,
);
routes.put(
  '/cannedmsg/:id',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.verifySession,
  Controllers.CannedMessage.editMsg,
);
routes.delete(
  '/cannedmsg/:id',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.verifySession,
  Controllers.CannedMessage.destroy,
);

// Session Routes
routes.post('/login', validation.sessionValidation.authHeader, Controllers.Session.create);
routes.delete('/logout', validation.sessionValidation.authHeader, Controllers.Session.delete);

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
  validation.sessionValidation.verifySession,
  Controllers.UserGroup.index,
);
routes.get(
  '/usergroup/:id',
  validation.sessionValidation.authHeader,
  validation.sessionValidation.verifySession,
  Controllers.UserGroup.show,
);
routes.post(
  '/usergroup',
  Controllers.UserGroup.create,
);
routes.delete(
  '/usergroup/:id',
  Controllers.UserGroup.destroy,
);

module.exports = routes;
