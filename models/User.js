const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "name is required"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      validate: {
        validator: function (v) {
          return /[a-z][0-9]*@gmail.com/.test(v);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    password: {
      type: String,
      require: [true, "password is required"],
      validate: {
        validator: function (v) {
          return v.length > 6 && /\d+/.test(v);
        },
        message: () =>
          `password must be 6 characters long and must contain a number`,
      },
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  },
  { timetamps: true }
);

module.exports = mongoose.model("User", UserSchema);
