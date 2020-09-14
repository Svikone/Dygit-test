import express from 'express';
import UserController from '../controllers/user';

class RouteUser extends UserController {
  constructor() {
    super();
    this.router = express.Router();
  }

  init() {
    this.router.post('/signup', this.signUp);
    this.router.post('/signin', this.signIn);

    return this.router;
  }
}
module.exports = new RouteUser();
