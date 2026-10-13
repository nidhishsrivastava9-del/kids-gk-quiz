const express = require('express');
const router = express.Router();
const { getUserProgress } = require('../controllers/progressController');
const { optionalAuth } = require('../middleware/auth');

router.get('/', optionalAuth, getUserProgress);

module.exports = router;
