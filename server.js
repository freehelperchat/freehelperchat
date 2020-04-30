const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const { errors } = require('celebrate');

const routes = require('./server/routes');
const config = require('./server/config/config.json');
const socketMessages = require('./server/functions/SocketMessages');
const session = require('./server/functions/Session');

const app = express();
const server = http.Server(app);
const io = socketio(server);
const port = process.env.PORT || config.server.port;

const dbUserInfo = config.database.username !== '' && config.database.password !== ''
  ? `${config.database.username}:${config.database.password}@`
  : '';

const dbPort = config.database.port !== ''
  ? `:${config.database.port}/${config.database.name}`
  : '';

mongoose.connect(`${config.database.driver}://${dbUserInfo}${config.database.host}${dbPort}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

io.on('connection', async (socket) => {
  const { operatorToken } = socket.handshake.query;
  if (operatorToken) {
    session.updateSession(operatorToken, socket.id);
  }

  socketMessages(io, socket);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use('/api', routes);

app.use('/chat', express.static(path.join(`${__dirname}/client/build`)));

app.get('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

app.use(errors());

server.listen(port, () => console.log(`Listening on port ${port}`));
