import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { Server } from 'http';
import socketio from 'socket.io';
import { errors } from 'celebrate';

import routes from './routes';
import config from './config/config.json';
import socketMessages from './utils/SocketMessages';

class App {
  public server: Server;

  private express: express.Application;

  private io: socketio.Server;

  private dbUserInfo: string;

  private dbPort: string;

  public constructor() {
    this.express = express();
    this.server = new Server(this.express);
    this.io = socketio(this.server);
    socketMessages.setSocketMessages(this.io);

    this.dbUserInfo =
      config.database.username !== '' && config.database.password !== ''
        ? `${config.database.username}:${config.database.password}@`
        : '';
    this.dbPort =
      config.database.port !== ''
        ? `:${config.database.port}/${config.database.name}`
        : '';

    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private database(): void {
    mongoose.connect(
      `${config.database.driver}://${this.dbUserInfo}${config.database.host}${this.dbPort}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      (err) => {
        if (!err) {
          console.log('Database conection succeeded.');
        } else {
          console.log(`Error in DB connection: ${JSON.stringify(err, undefined, 2)}`);
        }
      },
    );
  }

  private routes(): void {
    this.express.use((req, res, next) => {
      req.io = this.io;
      return next();
    });

    this.express.use('/api', routes);

    this.express.use('/images', express.static(path.resolve(`${__dirname}/images`)));

    this.express.use(
      '/translations',
      express.static(path.resolve(`${__dirname}/translations`)),
    );

    this.express.get('/translations/*', (req, res) => res.status(404).send());

    this.express.use('/chat', express.static(path.resolve(`${__dirname}/../build`)));

    this.express.get('/chat/*', (req, res) => {
      res.sendFile(path.resolve(`${__dirname}/../build/index.html`));
    });

    this.express.get('/*', (req, res) => {
      res.redirect('/chat');
    });

    this.express.use(errors());
  }
}

export default new App().server;
