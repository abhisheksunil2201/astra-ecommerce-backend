const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products: products, success: true });
  } catch (err) {
    res.json({ success: false, error });
  }
};

const getProductById = async (req, res) => {
  const { product } = req;
  try {
    res.json({ response: product, success: true });
  } catch (error) {
    res.json({ succes: false, error });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    await Product.remove({ _id: productId });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(400).json({
      error: "Failed to delete product",
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json({ message: "Product added successfully" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  addProduct,
};
