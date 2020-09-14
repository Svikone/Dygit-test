import express from 'express';
import ProductController from '../controllers/product';

class RouteProduct extends ProductController {
  constructor() {
    super();
    this.router = express.Router();
  }

  init() {
    this.router.get('/', this.getProducts);
    this.router.post('/add', this.addProduct);
    return this.router;
  }
}
module.exports = new RouteProduct();
