const jwt = require('jsonwebtoken');
const User = require('../models/authModel');

const SECRET_KEY = 'my_very_secret_key'; // ✅ thêm dòng này

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    SECRET_KEY,
    { expiresIn: '1d' }
  );
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const user = new User({ username, password });
    await user.save();

    const token = createToken(user);
    res.status(201).json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    console.error('❌ Registration error:', err.message); // thêm dòng log
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Username does not exist' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }


    const token = createToken(user);
    res.status(200).json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
