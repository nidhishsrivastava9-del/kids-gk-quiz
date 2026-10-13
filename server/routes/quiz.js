const express = require('express');
const router = express.Router();
const { generateQuiz, submitQuiz, getQuizHistory } = require('../controllers/quizController');
const { optionalAuth, protect } = require('../middleware/auth');

router.post('/generate', generateQuiz);
router.post('/submit', optionalAuth, submitQuiz);
router.get('/history', protect, getQuizHistory);

module.exports = router;
