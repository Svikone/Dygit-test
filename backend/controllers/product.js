import Product from '../models/product';
import Expansion from '../shared/expansion';

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
      const product = await Product.findOneAndDelete({ _id });

      if (!product) {
        return res.status(500).json({ message: 'Removal is not possible' });
      }
      Expansion.deleteImg(product.url_img);
      return res.send({ message: 'Product deleted' }).status(200);
    } catch (e) {
      return res.status(500).json({ e });
    }
  }

  async updateProduct(req, res) {
    try {
      const { _id, name, description } = req.body;
      const urlImg = req.files[0].filename;
      const permision = Expansion.fileFilter(req.files[0].mimetype);
      if (!permision) {
        Expansion.deleteImg(urlImg);
        return res.status(500).json({ message: 'Wrong file type' });
      }

      const product = await Product.findOne({ _id });
      if (!product) {
        Expansion.deleteImg(urlImg);
        return res.status(404).json({ message: 'Doc is not exist' });
      }
      const oldImg = product.url_img;
      product.name = name;
      product.description = description;
      product.url_img = req.files.length ? urlImg : oldImg;
      const updateProduct = await product.save();

      if (!updateProduct) {
        Expansion.deleteImg(urlImg);
        return res.status(500).json({ message: 'errr' });
      }
      Expansion.deleteImg(oldImg);
      return res.send({ message: 'Product update' }).status(200);
    } catch (e) {
      return res.status(500).json({ e });
    }
  }
}
