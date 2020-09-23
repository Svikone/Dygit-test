import mongoose from 'mongoose';
import Product from '../models/product';
import Expansion from '../shared/expansion';

export default class ProductController {
  async addProduct(req, res) {
    try {
      const { name, description } = req.body;
      const { userId } = req.user;
      const product = {
        name, description, userId,
      };
      if (req.files.length > 0) {
        product.url_img = req.files[0].filename;
      } else {
        product.url_img = '404.png';
      }
      await Product(product).save();
      res.send(product).status(200);
    } catch (e) {
      return res.status(500).json({ e });
    }
  }

  async getProducts(req, res) {
    try {
      const { userId } = req.user;
      const products = await Product.find({ userId });
      res.send(products).status(200);
    } catch (e) {
      return res.status(500).json({ e });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { _id } = req.params;
      const product = await Product.findOneAndDelete({ _id });

      if (!product) {
        return res.status(500).json({ message: 'Removal is not possible' });
      }
      if (product.url_img !== '404.png') {
        Expansion.deleteImg(product.url_img);
      }
      return res.send({ message: 'Product deleted' }).status(200);
    } catch (e) {
      return res.status(500).json({ e });
    }
  }

  async updateProduct(req, res) {
    try {
      const { _id, name, description } = req.body;
      const filesLength = req.files.length;
      const product = await Product.findOne(mongoose.Types.ObjectId(_id));
      if (!product) {
        if (filesLength) {
          const urlImg = req.files[0].filename;
          Expansion.deleteImg(urlImg);
        }
        return res.status(404).json({ message: 'Doc is not exist' });
      }
      let urlImg = '';
      if (filesLength) {
        urlImg = req.files[0].filename;
        const permision = Expansion.fileFilter(req.files[0].mimetype);
        if (!permision) {
          Expansion.deleteImg(urlImg);
          return res.status(500).json({ message: 'Wrong file type' });
        }
      }
      const oldImg = product.url_img;
      product.name = name;
      product.description = description;
      product.url_img = filesLength ? urlImg : oldImg;
      const updateProduct = await product.save();
      if (!updateProduct) {
        if (filesLength) {
          Expansion.deleteImg(urlImg);
        }
        return res.status(500).json({ message: 'errr' });
      }
      if (filesLength && oldImg !== '404.png') {
        Expansion.deleteImg(oldImg);
      }
      return res.send({ message: 'Product update' }).status(200);
    } catch (e) {
      return res.status(500).json({ e });
    }
  }

  async getProductById(req, res) {
    try {
      const { _id } = req.params;
      const product = await Product.findOne({ _id });
      if (!product) {
        return res.status(500).json({ message: 'Product not found' });
      }
      res.send(product).status(200);
    } catch (e) {
      return res.status(500).json({ e });
    }
  }
}
