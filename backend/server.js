import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
  extended: true,
  limit: '50mb',
}));

const port = process.env.PORT || 9000;
async function start() {
  try {
    const url = process.env.DB_URL;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
      console.log('Database is worked');
    } catch (e) {
      console.log('Database disconnect');
      process.exit(1);
    }

    app.listen(port, () => {
      console.error(`server started ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}
start();
