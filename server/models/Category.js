const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: '🧠'
  },
  color: {
    type: String,
    default: 'from-blue-400 to-indigo-600'
  },
  badge: {
    type: String,
    default: 'Explorer'
  }
});

module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema);
