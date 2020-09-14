import Product from '../models/product';

export default class ProductController {
  async addProduct(req, res) {
    try {
      const { name, description } = req.body;
      const product = new Product({
        name, description, url_img: req.files[0].filename,
      });
      if (req.files.length === 0) {
        product.url_img = '404.png';
      }
      await product.save();
      res.send(product).status(200);
    } catch (e) {
      return res.status(500).json({ e });
    }
  }
}
