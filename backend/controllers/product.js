import fs from 'fs';
import Product from '../models/product';

export default class ProductController {
  async addProduct(req, res) {
    try {
      const { name, description } = req.body;
      const product = new Product({
        name, description, url_img: req.files[0].filename,
      });
      await product.save();
      res.send(product).status(200);
    } catch (e) {
      return res.status(500).json({ e });
    }
  }

  async getProducts(req, res) {
    try {
      const products = await Product.find();
      res.send(products).status(200);
    } catch (e) {
      return res.status(500).json({ e });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { _id } = req.params;
      const product = await Product.findOne({ _id });
      if (!product) {
        return res.status(500).json({ message: 'No such entry found' });
      }
      fs.unlinkSync(`file/uploads/${product.url_img}`);
      await Product.deleteOne({ _id });
      res.send({ message: 'Product deleted' }).status(200);
    } catch (e) {
      return res.status(500).json({ e });
    }
  }

  async updateProduct(req, res) {
    try {
      const { _id, name, description } = req.body;
      const newProduct = {
        name, description,
      };
      const url_img = req.files[0].filename;
      const product = await Product.findOne({ _id });
      if (req.files.length) {
        newProduct.url_img = url_img;
      }
      const updateProduct = await Product.findOneAndUpdate({ _id }, newProduct, {
        new: true,
      });
      if (!updateProduct) {
        fs.unlinkSync(`file/uploads/${url_img}`);
        return res.status(500).json({ message: 'errr' });
      }
      fs.unlinkSync(`file/uploads/${product.url_img}`);
      return res.send({ message: 'Product update' }).status(200);
    } catch (e) {
      return res.status(500).json({ e });
    }
  }
}
