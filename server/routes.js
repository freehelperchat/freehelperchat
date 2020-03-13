const express = require('express');

const routes = express.Router();

const CannedMessage = require('./src/controllers/cannedMessage/CannedMessage');
const ChatController = require('./src/controllers/chat/Chat');
const DepartmentController = require('./src/controllers/department/Department');
const OperatorController = require('./src/controllers/operator/Operator');
const MessageController = require('./src/controllers/message/Message');

// Chat Routes
routes.get('/get/chat', ChatController.index);
routes.get('/get/chat/:id', ChatController.show);
routes.post('/create/chat', ChatController.create);
routes.put('/update/chat/:id', ChatController.update);
routes.delete('/delete/chat/:id', ChatController.destroy);

// Operator Routes
routes.get('/get/operator/:id', OperatorController.show);
routes.post('/create/operator', OperatorController.create);

// Message Routes
routes.get('/get/message/:id', MessageController.chatMessages);
routes.post('/create/message', MessageController.create);

// Department Routes
routes.get('/get/department', DepartmentController.index);
routes.post('/create/department', DepartmentController.create);
routes.delete('/delete/department/:id', DepartmentController.destroy);

// CannedMessage Routes
routes.get('/get/cannedmessage', CannedMessage.index);
routes.put('/update/cannedmessage/:id', CannedMessage.editMsg);
module.exports = routes;
