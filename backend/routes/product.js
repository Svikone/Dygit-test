import express from 'express';
import { validate } from 'express-validation';
import {
  addProduct, deleteProduct, getProductById, getProducts, updateProduct,
} from '../controllers/product';
import authenticate from '../middleware/auth';
import MyValidation from '../middleware/requestValidation';

const routerProducts = express.Router();

routerProducts.put('/', validate(MyValidation.update, {}, {}), authenticate, updateProduct);
routerProducts.get('/', authenticate, getProducts);
routerProducts.get('/by/:_id', authenticate, getProductById);
routerProducts.delete('/:_id', authenticate, deleteProduct);
routerProducts.post('/', validate(MyValidation.product, {}, {}), authenticate, addProduct);

export default routerProducts;
