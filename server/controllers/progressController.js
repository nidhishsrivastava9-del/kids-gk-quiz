const memoryStore = require('../utils/memoryStore');
const { getIsConnected } = require('../config/db');
const User = require('../models/User');
const QuizAttempt = require('../models/QuizAttempt');
const { BADGE_DEFINITIONS } = require('../utils/badgeEvaluator');

// @desc    Get user progress, statistics, and category mastery
// @route   GET /api/progress
exports.getUserProgress = async (req, res) => {
  try {
    const userId = req.user ? (req.user._id || req.user.id) : req.query.guestId;

    let userStats = {
      totalQuizzes: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      accuracy: 0,
      highestStreak: 0,
      totalScore: 0,
      badges: [],
      categoryMastery: [],
      recentAttempts: []
    };

    let attempts = [];

    if (userId) {
      if (getIsConnected()) {
        const user = await User.findById(userId);
        attempts = await QuizAttempt.find({ userId }).sort({ completedAt: -1 }).limit(10);
        if (user) {
          const totalQ = user.totalQuestionsAnswered || 0;
          const correctQ = user.correctAnswers || 0;
          userStats = {
            name: user.name,
            avatar: user.avatar,
            totalQuizzes: user.quizzesCompleted || 0,
            questionsAnswered: totalQ,
            correctAnswers: correctQ,
            accuracy: totalQ > 0 ? Math.round((correctQ / totalQ) * 100) : 0,
            highestStreak: user.highestStreak || 0,
            totalScore: user.totalScore || 0,
            badges: user.badges || [],
            categoryMastery: [],
            recentAttempts: attempts
          };
        }
      } else {
        const user = memoryStore.findUserById(userId);
        attempts = memoryStore.quizAttempts.filter(a => a.userId === userId);
        if (user) {
          const totalQ = user.totalQuestionsAnswered || 0;
          const correctQ = user.correctAnswers || 0;
          userStats = {
            name: user.name,
            avatar: user.avatar,
            totalQuizzes: user.quizzesCompleted || 0,
            questionsAnswered: totalQ,
            correctAnswers: correctQ,
            accuracy: totalQ > 0 ? Math.round((correctQ / totalQ) * 100) : 0,
            highestStreak: user.highestStreak || 0,
            totalScore: user.totalScore || 0,
            badges: user.badges || [],
            categoryMastery: [],
            recentAttempts: attempts.slice(0, 10)
          };
        }
      }
    }

    // Default sample/initial category mastery structure
    const defaultCategories = [
      { name: "World", icon: "🌍", total: 0, correct: 0, percentage: 85 },
      { name: "Animals", icon: "🐾", total: 0, correct: 0, percentage: 90 },
      { name: "Space", icon: "🌌", total: 0, correct: 0, percentage: 80 },
      { name: "Science", icon: "🔬", total: 0, correct: 0, percentage: 75 },
      { name: "History", icon: "🏛️", total: 0, correct: 0, percentage: 70 },
      { name: "Nature", icon: "🌱", total: 0, correct: 0, percentage: 88 },
      { name: "Sports", icon: "⚽", total: 0, correct: 0, percentage: 82 },
      { name: "India", icon: "🇮🇳", total: 0, correct: 0, percentage: 95 },
      { name: "Arts & Culture", icon: "🎨", total: 0, correct: 0, percentage: 78 },
      { name: "Mixed GK", icon: "🧠", total: 0, correct: 0, percentage: 84 }
    ];

    // Compute actual category mastery if attempts exist
    if (attempts.length > 0) {
      const catMap = {};
      attempts.forEach(att => {
        const cat = att.category || 'Mixed GK';
        if (!catMap[cat]) catMap[cat] = { total: 0, correct: 0 };
        catMap[cat].total += att.totalQuestions || 0;
        catMap[cat].correct += att.correctAnswers || 0;
      });

      userStats.categoryMastery = defaultCategories.map(c => {
        const recorded = catMap[c.name];
        if (recorded && recorded.total > 0) {
          return {
            ...c,
            total: recorded.total,
            correct: recorded.correct,
            percentage: Math.round((recorded.correct / recorded.total) * 100)
          };
        }
        return c;
      });
    } else {
      userStats.categoryMastery = defaultCategories;
    }

    // Complete badge definitions with unlocked status
    const allBadgesWithStatus = BADGE_DEFINITIONS.map(badge => ({
      ...badge,
      unlocked: (userStats.badges || []).includes(badge.name)
    }));

    res.json({
      success: true,
      data: {
        ...userStats,
        badgeDefinitions: allBadgesWithStatus
      }
    });
  } catch (err) {
    console.error('getUserProgress error:', err);
    res.status(500).json({ success: false, message: 'Could not load learning progress.' });
  }
};
