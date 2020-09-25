import express from 'express';
import { validate } from 'express-validation';
import UserController from '../controllers/user';
import MyValidation from '../middleware/requestValidation';

class RouteUser extends UserController {
  constructor() {
    super();
    this.router = express.Router();
  }

  init() {
    this.router.post('/signup', validate(MyValidation.signUp, {}, {}), this.signUp);
    this.router.post('/signin', validate(MyValidation.signIn, {}, {}), this.signIn);

    return this.router;
  }
}
module.exports = new RouteUser();
