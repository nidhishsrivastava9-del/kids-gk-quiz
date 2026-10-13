const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: null
  },
  guestName: {
    type: String,
    default: 'Explorer'
  },
  category: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    default: 'Mixed'
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    required: true
  },
  incorrectAnswers: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  highestStreak: {
    type: Number,
    default: 0
  },
  timeTaken: {
    type: Number, // in seconds
    default: 0
  },
  badgesUnlocked: {
    type: [String],
    default: []
  },
  answersReview: [
    {
      questionId: String,
      question: String,
      selectedAnswer: String,
      correctAnswer: String,
      isCorrect: Boolean,
      explanation: String
    }
  ],
  completedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.QuizAttempt || mongoose.model('QuizAttempt', quizAttemptSchema);
