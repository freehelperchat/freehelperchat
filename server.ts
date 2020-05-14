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

socketMessages.setSocketMessages(io);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use('/api', routes);

app.use('/images', express.static(path.resolve(`${__dirname}/server/images`)));

app.use(
  '/translations',
  express.static(path.resolve(`${__dirname}/server/translations`)),
);

app.get('/translations/*', (req, res) => res.status(400).send());

app.use('/chat', express.static(path.resolve(`${__dirname}/build`)));

app.get('/chat/*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/build/index.html`));
});

app.get('/*', (req, res) => {
  res.redirect('/chat');
});

app.use(errors());

server.listen(port, () => console.log(`Listening on port ${port}`));
