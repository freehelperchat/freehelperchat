const express = require('express');

const routes = express.Router();

routes.post('/create/chat', (req, res) => {
  res.send('Hello World!');
});

routes.get('/get/chat/:chatId', (req, res) => {
  res.send('Hello World!');
});

routes.put('/update/chat/:chatId', (req, res) => {
  res.send('Hello World!');
});

routes.delete('/delete/chat/:chatId', (req, res) => {
  res.send('Hello World!');
});

module.exports = routes;
