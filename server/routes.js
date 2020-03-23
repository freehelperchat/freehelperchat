const express = require('express');

const routes = express.Router();

const CannedMessage = require('./src/controllers/cannedMessage/CannedMessage');
const ChatController = require('./src/controllers/chat/Chat');
const DepartmentController = require('./src/controllers/department/Department');
const OperatorController = require('./src/controllers/operator/Operator');
const MessageController = require('./src/controllers/message/Message');
const SessionController = require('./src/controllers/session/Session');
const StartChatForm = require('./src/controllers/settings/StartChatForm');
const UserGroup = require('./src/controllers/userGroup/UserGroup');

// Chat Routes
routes.get('/chat', ChatController.index);
routes.get('/chat/:id', ChatController.show);
routes.post('/chat', ChatController.create);
routes.put('/chat/:id', ChatController.update);
routes.delete('/chat/:id', ChatController.destroy);
routes.put('/chat/transfer/:id', ChatController.tranferChat);
routes.get('/chat/getbystatus', ChatController.getChatByStatus);

// Operator Routes
routes.get('/operator/', OperatorController.index);
routes.get('/operator/:id', OperatorController.show);
routes.post('/operator', OperatorController.create);
routes.delete('/operator/:id', OperatorController.destroy);

// Message Routes
routes.get('/message/:id', MessageController.chatMessages);

// Department Routes
routes.get('/department', DepartmentController.index);
routes.get('/department/names', DepartmentController.getNames);
routes.post('/department/', DepartmentController.create);
routes.delete('/department/:id', DepartmentController.destroy);

// CannedMessage Routes
routes.get('/cannedmsg', CannedMessage.index);
routes.post('/cannedmsg', CannedMessage.create);
routes.put('/cannedmsg/:id', CannedMessage.editMsg);
routes.delete('/cannedmsg/:id', CannedMessage.destroy);

// Session Routes
routes.post('/login', SessionController.create);
routes.delete('/logout', SessionController.delete);

// StartChatForm Routes
routes.get('/startchat', StartChatForm.index);
routes.post('/startchat/create', StartChatForm.create);
routes.post('/startchat/add', StartChatForm.add);
routes.put('/startchat/update', StartChatForm.update);
routes.put('/startchat/updateAll', StartChatForm.updateAll);

// UserGroups Routes
routes.get('/usergroup', UserGroup.index);
routes.get('/usergroup/:id', UserGroup.show);
routes.post('/usergroup', UserGroup.create);
routes.delete('/usergroup/:id', UserGroup.destroy);

module.exports = routes;
