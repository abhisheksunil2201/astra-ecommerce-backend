const User = require("../models/User");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.json({ message: "User Already exists" });
    }
    const newUser = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    res.json({
      token,
      username: newUser.firstName,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User does not exist, Signup to enter");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Email and password does not match");
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    res.json({
      token,
      username: user.firstName,
    });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

module.exports = {
  signUp,
  login,
};
