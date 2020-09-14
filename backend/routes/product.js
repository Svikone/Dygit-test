import express from 'express';
import ProductController from '../controllers/product';

class RouteProduct extends ProductController {
  constructor() {
    super();
    this.router = express.Router();
  }

  init() {
    return this.router;
  }
}
module.exports = new RouteProduct();
