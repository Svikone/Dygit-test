import express from 'express';
import ProductController from '../controllers/product';

class RouteProduct extends ProductController {
  constructor() {
    super();
    this.router = express.Router();
  }

  init() {
    this.router.put('/', this.updateProduct);
    this.router.get('/', this.getProducts);
    this.router.delete('/by/:_id', this.deleteProduct);
    this.router.post('/add', this.addProduct);
    return this.router;
  }
}
module.exports = new RouteProduct();
