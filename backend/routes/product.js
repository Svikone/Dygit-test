import express from 'express';
import ProductController from '../controllers/product';
import AuthMiddleware from '../middleware/auth';

class RouteProduct extends ProductController {
  constructor() {
    super();
    this.router = express.Router();
  }

  init() {
    this.router.put('/', this.updateProduct);
    this.router.get('/', this.getProducts);
    this.router.get('/by/:_id', this.getProductById);
    this.router.delete('/:_id', this.deleteProduct);
    this.router.post('/', AuthMiddleware.authenticate, this.addProduct);
    return this.router;
  }
}
module.exports = new RouteProduct();
