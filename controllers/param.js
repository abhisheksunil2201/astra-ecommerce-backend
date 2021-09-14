const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Wishlist = require("../models/Wishlist");
const jwt = require("jsonwebtoken");

const getCartById = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.userId);
    if (!cart) {
      const userCart = new Cart({
        _id: req.userId,
      });
      await userCart.save();
      return res.json({ response: userCart.cartItems });
    }
    req.cart = cart;
    next();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const findProductById = async (req, res, next, id) => {
  await Product.findById(id).exec((err, product) => {
    if (err) {
      res.status(400).json({
        message: "Product not found",
      });
    }
    req.product = product;
    next();
  });
};

const isAuthorized = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Unauthorised access, please add the token" });
  }
};

const getWishlistById = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findById(req.userId);
    if (!wishlist) {
      const userWishlist = new Wishlist({
        _id: req.userId,
      });
      await userWishlist.save();
      return res.json({ response: userWishlist.wishlistItems });
    }
    req.wishlist = wishlist;
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCartById,
  findProductById,
  isAuthorized,
  getWishlistById,
};
