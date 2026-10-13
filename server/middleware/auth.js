const jwt = require('jsonwebtoken');
const memoryStore = require('../utils/memoryStore');
const { getIsConnected } = require('../config/db');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'quizkids_super_secret_jwt_key_2026';

// Middleware for protecting routes (Strict)
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Please log in to access this feature.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (getIsConnected()) {
      const user = await User.findById(decoded.id).select('-passwordHash');
      if (!user) return res.status(401).json({ success: false, message: 'User account not found.' });
      req.user = user;
    } else {
      const user = memoryStore.findUserById(decoded.id);
      if (!user) return res.status(401).json({ success: false, message: 'User account not found.' });
      req.user = user;
    }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Session expired. Please log in again.' });
  }
};

// Optional auth (populates req.user if token is present, else leaves as guest)
const optionalAuth = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (getIsConnected()) {
        const user = await User.findById(decoded.id).select('-passwordHash');
        if (user) req.user = user;
      } else {
        const user = memoryStore.findUserById(decoded.id);
        if (user) req.user = user;
      }
    } catch (e) {
      // ignore invalid token in optional auth
    }
  }
  next();
};

module.exports = { protect, optionalAuth, JWT_SECRET };
