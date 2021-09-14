const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  image: {
    type: String,
    required: "Image is required",
  },
  name: {
    type: String,
    required: "Name is required",
  },
  description: {
    type: String,
    required: "Description is required",
  },
  price: {
    type: Number,
    required: "Price is required",
  },
  discountPercentage: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  type: {
    type: String,
  },
  category: {
    type: String,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
