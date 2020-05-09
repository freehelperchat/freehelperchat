import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import socketio from 'socket.io';
import http from 'http';
import cors from 'cors';
import { errors } from 'celebrate';

import routes from './server/routes';
import config from './server/config/config.json';
import socketMessages from './server/functions/SocketMessages';
import session from './server/functions/SessionManager';

const app = express();
const server = new http.Server(app);
const io = socketio(server);
const port = process.env.PORT || config.server.port;

const dbUserInfo =
  config.database.username !== '' && config.database.password !== ''
    ? `${config.database.username}:${config.database.password}@`
    : '';

const dbPort =
  config.database.port !== ''
    ? `:${config.database.port}/${config.database.name}`
    : '';

mongoose.connect(
  `${config.database.driver}://${dbUserInfo}${config.database.host}${dbPort}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
);

io.on('connection', async (socket) => {
  const { operatorToken } = socket.handshake.query;
  if (operatorToken) {
    session.updateSession(operatorToken, socket.id);
  }

  socketMessages(io, socket);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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
