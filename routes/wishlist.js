const express = require("express");

const {
  getWishlistItems,
  addItemToWishlist,
  deleteItemFromWishlist,
} = require("../Controllers/wishlist");
const { getWishlistById, isAuthorized } = require("../Controllers/param");
const router = express.Router();

router.get("/", isAuthorized, getWishlistById, getWishlistItems);
router.post("/:productId", isAuthorized, getWishlistById, addItemToWishlist);
router.delete(
  "/:productId",
  isAuthorized,
  getWishlistById,
  deleteItemFromWishlist
);

module.exports = router;
