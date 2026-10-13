const memoryStore = require('../utils/memoryStore');
const { getIsConnected } = require('../config/db');
const User = require('../models/User');

// @desc    Get leaderboard rankings
// @route   GET /api/leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 10, 50);

    if (getIsConnected()) {
      const topUsers = await User.find({ role: 'user' })
        .sort({ totalScore: -1 })
        .limit(limit)
        .select('name avatar totalScore quizzesCompleted highestStreak badges');

      const formatted = topUsers.map((u, index) => ({
        rank: index + 1,
        id: u._id,
        name: u.name,
        avatar: u.avatar || '🦁',
        totalScore: u.totalScore || 0,
        quizzesCompleted: u.quizzesCompleted || 0,
        highestStreak: u.highestStreak || 0,
        badgeCount: (u.badges || []).length,
        badges: u.badges || []
      }));

      return res.json({ success: true, count: formatted.length, data: formatted });
    } else {
      const leaderboard = memoryStore.getLeaderboard({ limit });
      return res.json({ success: true, count: leaderboard.length, data: leaderboard });
    }
  } catch (err) {
    console.error('getLeaderboard error:', err);
    res.status(500).json({ success: false, message: 'Could not load leaderboard.' });
  }
};
