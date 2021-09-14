const express = require("express");
const {
  getCartItems,
  addItemsToCart,
  updateQuantityOfCartItems,
  deleteItemsFromCart,
} = require("../controllers/cart");
const {
  getCartById,
  findProductById,
  isAuthorized,
} = require("../controllers/param");

const router = express.Router();

router.param("productId", findProductById);

router.get("/", isAuthorized, getCartById, getCartItems);
router.post("/:productId", isAuthorized, getCartById, addItemsToCart);
router.put("/:productId", isAuthorized, getCartById, updateQuantityOfCartItems);
router.delete("/:productId", isAuthorized, getCartById, deleteItemsFromCart);

module.exports = router;
