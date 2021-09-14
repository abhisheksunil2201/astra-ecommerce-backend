const mongoose = require("mongoose");

const WishlistItemSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const WishlistSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    wishlistItems: [WishlistItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", WishlistSchema);
