import express from 'express';
import { validate } from 'express-validation';
import { signIn, signUp } from '../controllers/user';
import MyValidation from '../middleware/requestValidation';

const routerUsers = express.Router();

routerUsers.post('/signup', validate(MyValidation.signUp, {}, {}), signUp);
routerUsers.post('/signin', validate(MyValidation.signIn, {}, {}), signIn);

export default routerUsers;
