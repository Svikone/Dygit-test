import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import cors from 'cors';
import multer from 'multer';
import { ValidationError } from 'express-validation';
import MongoDB from './db';
import routerUsers from './routes/user';
import routerProducts from './routes/product';

class Server extends MongoDB {
  constructor() {
    super();
    this.app = express();
    this.port = process.env.PORT || 9000;
  }

  init() {
    this.app.use('/file', express.static('file'));
    this.app.use(multer({ dest: `${__dirname}/file/uploads/` }).any());
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({
      extended: true,
      limit: '50mb',
    }));
    this.app.use('/api/user', routerUsers);
    this.app.use('/api/product', routerProducts);
    this.app.use((err, req, res) => {
      if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err);
      }
      return res.status(500).json(err);
    });

    this.connect();
    this.app.listen(this.port, () => {
      console.error(`server started ${this.port}`);
    });
  }
}

new Server().init();
