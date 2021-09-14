const { extend, concat } = require("lodash");

const getCartItems = async (req, res) => {
  const { cart } = req;
  try {
    await cart.populate("cartItems.product");
    res.json({ response: cart.cartItems });
  } catch (err) {
    res.status(400).json({ response: err.message });
  }
};

const addItemsToCart = async (req, res) => {
  const { product, cart } = req;
  try {
    if (!cart.cartItems.id(product._id)) {
      const newItem = {
        _id: product._id,
        product: product._id,
        quantity: 1,
      };
      const updateCart = extend(cart, {
        cartItems: concat(cart.cartItems, newItem),
      });
      await updateCart.save();
      await updateCart.populate("cartItems.product");
      res.json({ response: cart.cartItems });
    } else {
      res.json({ response: "already exists in cart" });
    }
  } catch (err) {
    res.status(401).json({ response: err.message });
  }
};

const updateQuantityOfCartItems = async (req, res) => {
  const { cart } = req;
  const { productId } = req.params;
  const { quantity } = req.body;
  let updateCartItem = cart.cartItems.id(productId);
  updateCartItem = extend(updateCartItem, { quantity: quantity });
  cart.cartItems = extend(cart.cartItems, { updateCartItem });
  try {
    await cart.save();
    await cart.populate("cartItems.product").execPopulate();
    res.json({ response: cart.cartItems });
  } catch (err) {
    res.json({ success: false, response: err.message });
  }
};

const deleteItemsFromCart = async (req, res) => {
  const { productId } = req.params;
  const { cart } = req;
  try {
    await cart.cartItems.id(productId).remove();
    await cart.save();
    await cart.populate("cartItems.product");
    res.json({ response: cart.cartItems });
  } catch (err) {
    res.status(401).json({ response: err.message });
  }
};

module.exports = {
  getCartItems,
  addItemsToCart,
  deleteItemsFromCart,
  updateQuantityOfCartItems,
};
