import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import mongoose from 'mongoose';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
  extended: true,
  limit: '50mb',
}));

const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`server started ${port}`);
});
