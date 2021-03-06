const _ = require("lodash");

const getWishlistItems = async (req, res) => {
  const { wishlist } = req;
  try {
    await wishlist.populate("wishlistItems.product");
    res.json({ response: wishlist.wishlistItems });
  } catch (error) {
    res.status(401).json({ response: error.message });
  }
};

const addItemToWishlist = async (req, res) => {
  const { productId } = req.params;
  const { wishlist } = req;
  try {
    if (!wishlist.wishlistItems.id(productId)) {
      const addProductToWishlist = _.extend(wishlist, {
        wishlistItems: _.concat(wishlist.wishlistItems, {
          _id: productId,
          product: productId,
        }),
      });
      await addProductToWishlist.save();
      await addProductToWishlist.populate("wishlistItems.product");
      res.json({ response: addProductToWishlist.wishlistItems });
    } else throw Error("Item already exists in wishlist");
  } catch (err) {
    res.status(401).json({ response: err.message });
  }
};

const deleteItemFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const { wishlist } = req;
  try {
    await wishlist.wishlistItems.id(productId).remove();
    await wishlist.save();
    await wishlist.populate("wishlistItems.product");
    res.json({ response: wishlist.wishlistItems });
  } catch (err) {
    res.status(401).json({ response: err.message });
  }
};

module.exports = {
  getWishlistItems,
  addItemToWishlist,
  deleteItemFromWishlist,
};
