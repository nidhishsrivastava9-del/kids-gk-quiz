const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database (with automatic fallback to in-memory store)
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Request logger for development
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'QuizKids API',
    tagline: 'Learn • Play • Explore',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/questions', require('./routes/questions'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/auth', require('./routes/auth'));

// Friendly 404 Handler for APIs
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Oops! We couldn't find the page or treasure you're looking for. 🗺️"
  });
});

// Kid-Friendly Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: "Oops! Something went a little wobbly on our end. Please try again! 🎈"
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 QuizKids Server is running at http://localhost:${PORT}`);
    console.log(`🌟 Kid-friendly GK Quiz Platform is ready!`);
    console.log(`======================================================\n`);
  });
}

module.exports = app;

