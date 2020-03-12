const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
const routes = require('./server/routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);
const port = process.env.PORT || 3001;

const connectedOperators = {};

io.on('connection', (socket) => {
  const { operatorToken } = socket.handshake.query;
  if (operatorToken) {
    connectedOperators[operatorToken] = socket.id;
  }

  socket.on('open_chat', (data) => {
    const { chatId } = data;
    socket.join(chatId);
  });

  socket.on('send_message', (data) => {
    const { chatId, message } = data;
    socket.to(chatId).emit('received_message', message);
    socket.emit('received_message', message);
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.use('/chat', express.static(path.join(`${__dirname}/client/build`)));

app.get('/chat/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

server.listen(port, () => console.log(`Listening on port ${port}`));
