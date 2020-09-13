import mongoose from 'mongoose';

export default class MongoDB {
  constructor() {
    this.mongoose = mongoose;
    this.url = process.env.DB_URL;
  }

  isConnected() {
    return this.mongoose.connection.readyState;
  }

  async connect() {
    try {
      await this.mongoose.connect(this.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Database is worked', this.isConnected());
    } catch (e) {
      console.log(e);
      console.log('Database disconnect', this.isConnected());
      process.exit(1);
    }
  }
}
