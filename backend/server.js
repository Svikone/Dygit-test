import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import cors from 'cors';
import MongoDB from './db';

class Server extends MongoDB {
  constructor() {
    super();
    this.app = express();
    this.port = process.env.PORT || 9000;
  }

  init() {
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({
      extended: true,
      limit: '50mb',
    }));
    this.connect();
    this.app.listen(this.port, () => {
      console.error(`server started ${this.port}`);
    });
  }
}

new Server().init();
