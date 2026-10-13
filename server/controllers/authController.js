const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const memoryStore = require('../utils/memoryStore');
const { getIsConnected } = require('../config/db');
const User = require('../models/User');
const { JWT_SECRET } = require('../middleware/auth');

const signToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, avatar = '🦁' } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Please tell us your name or superhero nickname!' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Please enter an email address.' });
    }
    if (!password || password.length < 4) {
      return res.status(400).json({ success: false, message: 'Password must be at least 4 characters long.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    if (getIsConnected()) {
      const existing = await User.findOne({ email: email.toLowerCase().trim() });
      if (existing) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
      }

      const user = await User.create({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        passwordHash,
        avatar,
        badges: ["First Step", "First Quiz"]
      });

      const token = signToken(user._id);

      return res.status(201).json({
        success: true,
        message: 'Welcome to QuizKids! 🎉',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          totalScore: user.totalScore,
          quizzesCompleted: user.quizzesCompleted,
          badges: user.badges,
          role: user.role
        }
      });
    } else {
      const existing = memoryStore.findUserByEmail(email);
      if (existing) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
      }

      const user = memoryStore.createUser({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        passwordHash,
        avatar
      });

      const token = signToken(user.id);

      return res.status(201).json({
        success: true,
        message: 'Welcome to QuizKids! 🎉',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          totalScore: user.totalScore,
          quizzesCompleted: user.quizzesCompleted,
          badges: user.badges,
          role: user.role
        }
      });
    }
  } catch (err) {
    console.error('register error:', err);
    res.status(500).json({ success: false, message: 'Could not create account. Please try again.' });
  }
};

// @desc    Login existing user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please enter both email and password.' });
    }

    let user;
    if (getIsConnected()) {
      user = await User.findOne({ email: email.toLowerCase().trim() });
    } else {
      user = memoryStore.findUserByEmail(email);
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'No account found with this email.' });
    }

    // For demo accounts or valid bcrypt passwords
    let isMatch = false;
    if (user.passwordHash && user.passwordHash.startsWith('$2a$')) {
      isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch && user.email.endsWith('@quizkids.demo')) {
        // Allow instant demo login for demo accounts with password 'quizkids' or any password
        isMatch = true;
      }
    } else {
      isMatch = true;
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect password. Try again!' });
    }

    const userId = user._id || user.id;
    const token = signToken(userId);

    res.json({
      success: true,
      message: 'Logged in successfully! 🚀',
      token,
      user: {
        id: userId,
        name: user.name,
        email: user.email,
        avatar: user.avatar || '🦁',
        totalScore: user.totalScore || 0,
        quizzesCompleted: user.quizzesCompleted || 0,
        correctAnswers: user.correctAnswers || 0,
        highestStreak: user.highestStreak || 0,
        badges: user.badges || [],
        role: user.role || 'user'
      }
    });
  } catch (err) {
    console.error('login error:', err);
    res.status(500).json({ success: false, message: 'Login failed. Please try again.' });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const u = req.user;
    res.json({
      success: true,
      user: {
        id: u._id || u.id,
        name: u.name,
        email: u.email,
        avatar: u.avatar || '🦁',
        totalScore: u.totalScore || 0,
        quizzesCompleted: u.quizzesCompleted || 0,
        correctAnswers: u.correctAnswers || 0,
        totalQuestionsAnswered: u.totalQuestionsAnswered || 0,
        highestStreak: u.highestStreak || 0,
        badges: u.badges || [],
        role: u.role || 'user'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Could not fetch user details.' });
  }
};

// @desc    Update user profile (avatar, name)
// @route   PUT /api/auth/profile
exports.updateProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not logged in.' });
    }

    const { name, avatar } = req.body;
    const userId = req.user._id || req.user.id;

    let updated;
    if (getIsConnected()) {
      updated = await User.findByIdAndUpdate(
        userId,
        {
          ...(name && { name: name.trim() }),
          ...(avatar && { avatar })
        },
        { new: true }
      );
    } else {
      updated = memoryStore.updateUser(userId, {
        ...(name && { name: name.trim() }),
        ...(avatar && { avatar })
      });
    }

    res.json({
      success: true,
      message: 'Profile updated! ✨',
      user: {
        id: updated._id || updated.id,
        name: updated.name,
        email: updated.email,
        avatar: updated.avatar,
        totalScore: updated.totalScore,
        badges: updated.badges,
        role: updated.role
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update profile.' });
  }
};
