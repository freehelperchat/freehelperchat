const express = require('express');

const routes = express.Router();

routes.get('/test', (req, res) => {
  res.send('Hello World!');
});

module.exports = routes;
