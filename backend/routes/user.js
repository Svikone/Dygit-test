import express from 'express';
import UserController from '../controllers/user';

class RouteUser extends UserController {
  constructor() {
    super();
    this.router = express.Router();
  }

  init() {
    this.router.post('/test', this.authenticate);
    return this.router;
  }
}
module.exports = new RouteUser();
