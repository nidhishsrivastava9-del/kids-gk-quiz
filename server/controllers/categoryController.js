const memoryStore = require('../utils/memoryStore');
const { getIsConnected } = require('../config/db');
const Question = require('../models/Question');
const Category = require('../models/Category');

// @desc    Get all categories with active question counts
// @route   GET /api/categories
exports.getCategories = async (req, res) => {
  try {
    if (getIsConnected()) {
      const dbCategories = await Category.find();
      const counts = await Question.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]);
      const countMap = {};
      counts.forEach(c => {
        countMap[c._id.toLowerCase()] = c.count;
      });

      const totalQuestions = await Question.countDocuments();

      const result = dbCategories.map(cat => ({
        id: cat._id,
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        description: cat.description,
        color: cat.color,
        badge: cat.badge,
        questionCount: cat.name === 'Mixed GK' ? totalQuestions : (countMap[cat.name.toLowerCase()] || 0)
      }));

      return res.json({ success: true, count: result.length, data: result });
    } else {
      const categories = memoryStore.getCategories();
      return res.json({ success: true, count: categories.length, data: categories });
    }
  } catch (err) {
    console.error('getCategories error:', err);
    res.status(500).json({ success: false, message: 'Could not load categories.' });
  }
};
