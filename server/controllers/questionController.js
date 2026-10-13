const memoryStore = require('../utils/memoryStore');
const { getIsConnected } = require('../config/db');
const Question = require('../models/Question');

// @desc    Get all questions with optional filters (search, category, difficulty)
// @route   GET /api/questions
exports.getQuestions = async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;

    if (getIsConnected()) {
      let query = {};
      if (category && category.toLowerCase() !== 'all' && category.toLowerCase() !== 'mixed gk') {
        query.category = new RegExp(`^${category}$`, 'i');
      }
      if (difficulty && difficulty.toLowerCase() !== 'all') {
        query.difficulty = new RegExp(`^${difficulty}$`, 'i');
      }
      if (search && search.trim()) {
        query.$or = [
          { question: { $regex: search, $options: 'i' } },
          { explanation: { $regex: search, $options: 'i' } }
        ];
      }
      const questions = await Question.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: questions.length, data: questions });
    } else {
      const questions = memoryStore.getQuestions({ category, difficulty, search });
      return res.json({ success: true, count: questions.length, data: questions });
    }
  } catch (err) {
    console.error('getQuestions error:', err);
    res.status(500).json({ success: false, message: 'Could not load questions. Please try again!' });
  }
};

// @desc    Get single question by ID
// @route   GET /api/questions/:id
exports.getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    let question;

    if (getIsConnected()) {
      question = await Question.findById(id);
    } else {
      question = memoryStore.getQuestionById(id);
    }

    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    res.json({ success: true, data: question });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving question.' });
  }
};

// @desc    Create new question
// @route   POST /api/questions
exports.createQuestion = async (req, res) => {
  try {
    const { question, category, difficulty, options, correctAnswer, explanation, points } = req.body;

    // Validation
    if (!question || !question.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide the question text.' });
    }
    if (!category || !category.trim()) {
      return res.status(400).json({ success: false, message: 'Please select a category.' });
    }
    if (!options || !Array.isArray(options) || options.length !== 4) {
      return res.status(400).json({ success: false, message: 'Please provide exactly 4 answer options.' });
    }
    if (options.some(opt => !opt || !opt.trim())) {
      return res.status(400).json({ success: false, message: 'All 4 options must have text.' });
    }
    if (!correctAnswer || !correctAnswer.trim()) {
      return res.status(400).json({ success: false, message: 'Please select the correct answer.' });
    }
    if (!options.includes(correctAnswer)) {
      return res.status(400).json({ success: false, message: 'The correct answer must match one of the 4 options exactly.' });
    }
    if (!explanation || !explanation.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide an educational explanation for kids.' });
    }

    const calculatedPoints = Number(points) || (difficulty === 'Challenge' ? 20 : difficulty === 'Medium' ? 15 : 10);

    let created;
    if (getIsConnected()) {
      created = await Question.create({
        question: question.trim(),
        category: category.trim(),
        difficulty: difficulty || 'Easy',
        options: options.map(o => o.trim()),
        correctAnswer: correctAnswer.trim(),
        explanation: explanation.trim(),
        points: calculatedPoints
      });
    } else {
      created = memoryStore.createQuestion({
        question: question.trim(),
        category: category.trim(),
        difficulty: difficulty || 'Easy',
        options: options.map(o => o.trim()),
        correctAnswer: correctAnswer.trim(),
        explanation: explanation.trim(),
        points: calculatedPoints
      });
    }

    res.status(201).json({
      success: true,
      message: '🎉 Question created successfully!',
      data: created
    });
  } catch (err) {
    console.error('createQuestion error:', err);
    res.status(500).json({ success: false, message: 'Failed to create question. Please check the inputs.' });
  }
};

// @desc    Update question
// @route   PUT /api/questions/:id
exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, category, difficulty, options, correctAnswer, explanation, points } = req.body;

    if (options && (!Array.isArray(options) || options.length !== 4)) {
      return res.status(400).json({ success: false, message: 'Options must contain exactly 4 choices.' });
    }
    if (options && correctAnswer && !options.includes(correctAnswer)) {
      return res.status(400).json({ success: false, message: 'Correct answer must be one of the choices.' });
    }

    let updated;
    if (getIsConnected()) {
      updated = await Question.findByIdAndUpdate(
        id,
        {
          ...(question && { question: question.trim() }),
          ...(category && { category: category.trim() }),
          ...(difficulty && { difficulty }),
          ...(options && { options: options.map(o => o.trim()) }),
          ...(correctAnswer && { correctAnswer: correctAnswer.trim() }),
          ...(explanation && { explanation: explanation.trim() }),
          ...(points && { points: Number(points) })
        },
        { new: true, runValidators: true }
      );
    } else {
      updated = memoryStore.updateQuestion(id, {
        ...(question && { question: question.trim() }),
        ...(category && { category: category.trim() }),
        ...(difficulty && { difficulty }),
        ...(options && { options: options.map(o => o.trim()) }),
        ...(correctAnswer && { correctAnswer: correctAnswer.trim() }),
        ...(explanation && { explanation: explanation.trim() }),
        ...(points && { points: Number(points) })
      });
    }

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Question not found.' });
    }

    res.json({
      success: true,
      message: 'Question updated successfully!',
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update question.' });
  }
};

// @desc    Delete question
// @route   DELETE /api/questions/:id
exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    let success = false;

    if (getIsConnected()) {
      const q = await Question.findByIdAndDelete(id);
      success = !!q;
    } else {
      success = memoryStore.deleteQuestion(id);
    }

    if (!success) {
      return res.status(404).json({ success: false, message: 'Question not found.' });
    }

    res.json({ success: true, message: 'Question deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Could not delete question.' });
  }
};
