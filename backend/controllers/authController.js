const User = require('../models/user'); // User model import
const PersonalInfo = require('../models/personalInfo'); // PersonalInfo model import
const bcrypt = require('bcryptjs'); // Bcrypt for password hashing
const jwt = require('jsonwebtoken'); // JWT for authentication

// Signup Controller
exports.signup = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Save Personal Info Controller
exports.savePersonalInfo = async (req, res) => {
    const { firstName, lastName, email, phone, address } = req.body;
    const userId = req.userId; // This comes from the token middleware
  
    try {
      const personalInfo = new PersonalInfo({
        userId,
        firstName,
        lastName,
        email,
        phone,
        address
      });
  
      await personalInfo.save();
      res.status(200).json({ message: 'Personal info saved successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error saving personal info' });
    }
  };
  