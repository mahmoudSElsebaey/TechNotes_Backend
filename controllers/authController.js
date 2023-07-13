const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const generateToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.username,
    roles: user.roles,
  };

  return jwt.sign(payload, "secret_key");
};

// Login
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).exec();

  if (!user) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const token = generateToken(user);

  res.json({ token });
});

// Refresh
const refresh = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "secret_key");

    const user = await User.findById(decoded.userId).exec();

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const newToken = generateToken(user);

    res.json({ token: newToken });
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
});

// Logout
const logout = asyncHandler(async (req, res) => {
  res.json({ message: "Logged out successfully" });
});

module.exports = {
  login,
  refresh,
  logout,
};
