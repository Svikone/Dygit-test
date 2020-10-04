import mongoose from 'mongoose';
import Product from '../models/product';
import { deleteImg, fileFilter, pagination } from '../shared/expansion';

export async function addProduct(req, res) {
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
  return null;
}

export async function getProducts(req, res) {
  const { userId } = req.user;
  const {
    page, collections, pages, skip,
  } = await pagination(req.query.page, Product, userId);
  try {
    const products = await Product.find({ userId }).skip(skip).limit(10);
    res.send({
      products,
      collections,
      pages,
      page,
    }).status(200);
  } catch (e) {
    return res.status(500).json({ e });
  }
  return null;
}

export async function deleteProduct(req, res) {
  try {
    const { _id } = req.params;
    const product = await Product.findOneAndDelete({ _id });

    if (!product) {
      return res.status(500).json({ message: 'Removal is not possible' });
    }
    if (product.url_img !== '404.png') {
      deleteImg(product.url_img);
    }
    return res.send({ message: 'Product deleted' }).status(200);
  } catch (e) {
    return res.status(500).json({ e });
  }
}

export async function updateProduct(req, res) {
  try {
    const { _id, name, description } = req.body;
    const filesLength = req.files.length;
    let urlImg = '';
    const product = await Product.findOne(mongoose.Types.ObjectId(_id));

    if (!product) {
      if (filesLength) {
        deleteImg(req.files[0].filename);
      }
      return res.status(404).json({ message: 'Doc is not exist' });
    }

    if (filesLength) {
      urlImg = req.files[0].filename;
      const permision = fileFilter(req.files[0].mimetype);
      if (!permision) {
        deleteImg(urlImg);
        return res.status(500).json({ message: 'Wrong file type' });
      }
    }
    const oldImg = product.url_img;
    product.name = name;
    product.description = description;
    product.url_img = filesLength ? urlImg : oldImg;
    const updatingProduct = await product.save();
    if (!updatingProduct) {
      if (filesLength) {
        deleteImg(urlImg);
      }
      return res.status(500).json({ message: 'errr' });
    }
    if (filesLength && oldImg !== '404.png') {
      deleteImg(oldImg);
    }
    return res.send({ message: 'Product update' }).status(200);
  } catch (e) {
    return res.status(500).json({ e });
  }
}

export async function getProductById(req, res) {
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
  return null;
}
