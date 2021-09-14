const express = require("express");
const { findProductById } = require("../controllers/param");
const {
  getProducts,
  getProductById,
  deleteProduct,
  addProduct,
} = require("../controllers/product");
const router = express.Router();

router.param("productId", findProductById);

router.get("/", getProducts);
router.post("/", addProduct);
router.get("/:productId", getProductById);
router.delete("/:productId", deleteProduct);

module.exports = router;
