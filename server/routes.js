const express = require('express');

const routes = express.Router();

const CannedMessage = require('./src/controllers/cannedMessage/CannedMessage');
const ChatController = require('./src/controllers/chat/Chat');
const DepartmentController = require('./src/controllers/department/Department');
const OperatorController = require('./src/controllers/operator/Operator');
const MessageController = require('./src/controllers/message/Message');

// Chat Routes
routes.get('/chat/get', ChatController.index);
routes.get('/chat/get/:id', ChatController.show);
routes.post('/chat/create', ChatController.create);
routes.put('/chat/update/:id', ChatController.update);
routes.delete('/chat/delete/:id', ChatController.destroy);
routes.put('/chat/transfer/:id', ChatController.tranferChat);

// Operator Routes
routes.get('/operator/get', OperatorController.index);
routes.get('/operator/get/:id', OperatorController.show);
routes.post('/operator/create', OperatorController.create);
routes.delete('/operator/delete/:id', OperatorController.destroy);

// Message Routes
routes.get('/message/get/:id', MessageController.chatMessages);
routes.post('/message/create', MessageController.create);

// Department Routes
routes.get('/department/get', DepartmentController.index);
routes.post('/department/create', DepartmentController.create);
routes.delete('/department/delete/:id', DepartmentController.destroy);

// CannedMessage Routes
routes.get('/cannedmsg/get', CannedMessage.index);
routes.post('/cannedmsg/create', CannedMessage.create);
routes.put('/cannedmsg/update/:id', CannedMessage.editMsg);
routes.delete('/cannedmsg/delete/:id', CannedMessage.destroy);

module.exports = routes;
