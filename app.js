const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const wishlistRoutes = require("./routes/wishlist");
const cartRoutes = require("./routes/cart");
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/user");
const connectMongoDb = require("./controllers/connectMongoDb");

const PORT = process.env.PORT || 3001;
//Connext to DB
connectMongoDb();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//ROUTES
app.use("/wishlist", wishlistRoutes);
app.use("/cart", cartRoutes);
app.use("/product", productRoutes);
app.use("/", authRoutes);

app.listen(PORT);
