const memoryStore = require('../utils/memoryStore');
const { getIsConnected } = require('../config/db');
const Question = require('../models/Question');
const QuizAttempt = require('../models/QuizAttempt');
const User = require('../models/User');
const { evaluateNewBadges } = require('../utils/badgeEvaluator');

// @desc    Generate a randomized quiz
// @route   POST /api/quiz/generate
exports.generateQuiz = async (req, res) => {
  try {
    const { category = 'Mixed GK', difficulty = 'all', count = 10 } = req.body;
    const requestedCount = Math.min(Math.max(Number(count) || 10, 5), 20);

    if (getIsConnected()) {
      let query = {};
      if (category && category.toLowerCase() !== 'all' && category.toLowerCase() !== 'mixed gk') {
        query.category = new RegExp(`^${category}$`, 'i');
      }
      if (difficulty && difficulty.toLowerCase() !== 'all') {
        query.difficulty = new RegExp(`^${difficulty}$`, 'i');
      }

      let questions = await Question.find(query);
      if (questions.length === 0 && query.difficulty) {
        // Fallback to all difficulties for that category if specific difficulty has no questions
        delete query.difficulty;
        questions = await Question.find(query);
      }

      // Shuffle questions
      const shuffled = questions.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, requestedCount);

      // Send sanitized questions with answers & explanations for seamless instant feedback
      const sanitized = selected.map(q => {
        const optionsShuffled = [...q.options].sort(() => 0.5 - Math.random());
        return {
          id: q._id.toString(),
          question: q.question,
          category: q.category,
          difficulty: q.difficulty,
          options: optionsShuffled,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          points: q.points || 10
        };
      });

      return res.json({
        success: true,
        category,
        difficulty,
        count: sanitized.length,
        questions: sanitized
      });
    } else {
      const generated = memoryStore.generateQuiz({ category, difficulty, count: requestedCount });
      return res.json({
        success: true,
        category,
        difficulty,
        count: generated.length,
        questions: generated
      });
    }
  } catch (err) {
    console.error('generateQuiz error:', err);
    res.status(500).json({ success: false, message: 'We could not generate the quiz right now. Please try again!' });
  }
};

// @desc    Submit quiz answers and calculate results
// @route   POST /api/quiz/submit
exports.submitQuiz = async (req, res) => {
  try {
    const {
      answers = [], // Array of { questionId, selectedAnswer }
      category = 'Mixed GK',
      difficulty = 'Easy',
      timeTaken = 0,
      guestName = 'Explorer'
    } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ success: false, message: 'No answers provided for submission.' });
    }

    let correctCount = 0;
    let totalScore = 0;
    let currentStreak = 0;
    let maxStreak = 0;
    const review = [];

    // Evaluate each question
    for (const ans of answers) {
      let q;
      if (getIsConnected()) {
        q = await Question.findById(ans.questionId);
      } else {
        q = memoryStore.getQuestionById(ans.questionId);
      }

      if (!q) continue;

      const isCorrect = (ans.selectedAnswer || '').trim().toLowerCase() === (q.correctAnswer || '').trim().toLowerCase();
      const points = q.points || 10;

      if (isCorrect) {
        correctCount++;
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
        
        // Add streak bonus points
        const streakBonus = currentStreak >= 5 ? 5 : currentStreak >= 3 ? 2 : 0;
        totalScore += points + streakBonus;
      } else {
        currentStreak = 0;
      }

      review.push({
        questionId: q.id || q._id,
        question: q.question,
        selectedAnswer: ans.selectedAnswer || '(No answer)',
        correctAnswer: q.correctAnswer,
        isCorrect,
        points: isCorrect ? points : 0,
        explanation: q.explanation,
        category: q.category,
        difficulty: q.difficulty
      });
    }

    const totalQuestions = review.length || answers.length;
    const incorrectCount = totalQuestions - correctCount;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    // Motivational message based on percentage
    let motivationalMessage = '';
    let emoji = '🌟';
    if (percentage >= 90) {
      motivationalMessage = "Amazing! You're a GK Superstar! 🌟 You did an extraordinary job!";
      emoji = '🌟';
    } else if (percentage >= 70) {
      motivationalMessage = "Great Job! Keep Learning! 🚀 You have awesome knowledge!";
      emoji = '🚀';
    } else if (percentage >= 50) {
      motivationalMessage = "Good Effort! You Can Do Even Better! 💪 Every day makes you smarter!";
      emoji = '💪';
    } else {
      motivationalMessage = "Keep Practicing! Every Quiz Makes You Smarter! 🧠 You tried your best, keep going!";
      emoji = '🧠';
    }

    // Evaluate badges
    const currentUserId = req.user ? (req.user._id || req.user.id) : null;
    let userBadges = [];
    let quizzesCount = 1;
    let totalCorrectAll = 0;

    if (currentUserId && req.user) {
      userBadges = req.user.badges || [];
      quizzesCount = (req.user.quizzesCompleted || 0) + 1;
      totalCorrectAll = (req.user.correctAnswers || 0);
    }

    const badgeResult = evaluateNewBadges({
      currentBadges: userBadges,
      category,
      percentage,
      correctAnswers: correctCount,
      totalQuestions,
      streak: maxStreak,
      timeTaken,
      totalQuizzesCompleted: quizzesCount,
      totalCorrectAllTime: totalCorrectAll
    });

    const attemptData = {
      userId: currentUserId,
      guestName: req.user ? req.user.name : (guestName || 'Explorer'),
      category,
      difficulty,
      totalQuestions,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      score: totalScore,
      percentage,
      highestStreak: maxStreak,
      timeTaken: Number(timeTaken) || 0,
      badgesUnlocked: badgeResult.newlyUnlocked.map(b => b.name),
      answersReview: review
    };

    let savedAttempt;
    if (getIsConnected()) {
      savedAttempt = await QuizAttempt.create(attemptData);
      if (currentUserId) {
        await User.findByIdAndUpdate(currentUserId, {
          $inc: {
            quizzesCompleted: 1,
            totalScore: totalScore,
            correctAnswers: correctCount,
            totalQuestionsAnswered: totalQuestions
          },
          $set: {
            badges: badgeResult.allBadges
          }
        });
      }
    } else {
      savedAttempt = memoryStore.recordQuizAttempt({
        ...attemptData,
        newBadges: badgeResult.newlyUnlocked.map(b => b.name)
      });
    }

    res.json({
      success: true,
      data: {
        id: savedAttempt.id || savedAttempt._id,
        totalQuestions,
        correctAnswers: correctCount,
        incorrectAnswers: incorrectCount,
        score: totalScore,
        percentage,
        accuracy: `${percentage}%`,
        highestStreak: maxStreak,
        timeTaken: Number(timeTaken) || 0,
        motivationalMessage,
        emoji,
        newBadgesUnlocked: badgeResult.newlyUnlocked,
        allBadges: badgeResult.allBadges,
        review
      }
    });
  } catch (err) {
    console.error('submitQuiz error:', err);
    res.status(500).json({ success: false, message: 'Could not process quiz results. Please try again.' });
  }
};

// @desc    Get user quiz history
// @route   GET /api/quiz/history
exports.getQuizHistory = async (req, res) => {
  try {
    const userId = req.user ? (req.user._id || req.user.id) : null;
    if (!userId) {
      return res.json({ success: true, count: 0, data: [] });
    }

    if (getIsConnected()) {
      const history = await QuizAttempt.find({ userId }).sort({ completedAt: -1 }).limit(20);
      return res.json({ success: true, count: history.length, data: history });
    } else {
      const history = memoryStore.quizAttempts
        .filter(a => a.userId === userId)
        .slice(0, 20);
      return res.json({ success: true, count: history.length, data: history });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Could not load quiz history.' });
  }
};
