import express from 'express';
import { validate } from 'express-validation';
import ProductController from '../controllers/product';
import AuthMiddleware from '../middleware/auth';
import MyValidation from '../middleware/requestValidation';

class RouteProduct extends ProductController {
  constructor() {
    super();
    this.router = express.Router();
  }

  init() {
    this.router.put('/', validate(MyValidation.update, {}, {}), AuthMiddleware.authenticate, this.updateProduct);
    this.router.get('/', AuthMiddleware.authenticate, this.getProducts);
    this.router.get('/by/:_id', AuthMiddleware.authenticate, this.getProductById);
    this.router.delete('/:_id', AuthMiddleware.authenticate, this.deleteProduct);
    this.router.post('/', validate(MyValidation.product, {}, {}), AuthMiddleware.authenticate, this.addProduct);
    return this.router;
  }
}
module.exports = new RouteProduct();
