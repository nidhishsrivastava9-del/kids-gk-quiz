const seedQuestions = require('../data/seedQuestions');
const seedCategories = require('../data/categories');

class MemoryStore {
  constructor() {
    this.questions = JSON.parse(JSON.stringify(seedQuestions));
    this.categories = JSON.parse(JSON.stringify(seedCategories));
    this.quizAttempts = [];
    this.users = [
      {
        id: "user-demo-1",
        name: "Aarav Sharma",
        email: "aarav@quizkids.demo",
        passwordHash: "$2a$10$demoHashForDemoUser123456",
        avatar: "🦁",
        totalScore: 980,
        quizzesCompleted: 14,
        correctAnswers: 112,
        totalQuestionsAnswered: 125,
        highestStreak: 9,
        badges: ["First Quiz", "World Explorer", "Space Explorer", "10 Correct", "Streak Master"],
        role: "user",
        createdAt: new Date(Date.now() - 7 * 86400000).toISOString()
      },
      {
        id: "user-demo-2",
        name: "Anaya Patel",
        email: "anaya@quizkids.demo",
        passwordHash: "$2a$10$demoHashForDemoUser123456",
        avatar: "🦉",
        totalScore: 920,
        quizzesCompleted: 12,
        correctAnswers: 104,
        totalQuestionsAnswered: 115,
        highestStreak: 8,
        badges: ["First Quiz", "Animal Expert", "Science Star", "GK Master"],
        role: "user",
        createdAt: new Date(Date.now() - 5 * 86400000).toISOString()
      },
      {
        id: "user-demo-3",
        name: "Rahul Verma",
        email: "rahul@quizkids.demo",
        passwordHash: "$2a$10$demoHashForDemoUser123456",
        avatar: "🚀",
        totalScore: 880,
        quizzesCompleted: 11,
        correctAnswers: 96,
        totalQuestionsAnswered: 110,
        highestStreak: 7,
        badges: ["First Quiz", "India Expert", "Sports Champ"],
        role: "user",
        createdAt: new Date(Date.now() - 4 * 86400000).toISOString()
      },
      {
        id: "user-demo-4",
        name: "Saanvi Rao",
        email: "saanvi@quizkids.demo",
        passwordHash: "$2a$10$demoHashForDemoUser123456",
        avatar: "🐼",
        totalScore: 810,
        quizzesCompleted: 10,
        correctAnswers: 88,
        totalQuestionsAnswered: 100,
        highestStreak: 6,
        badges: ["First Quiz", "Creative Artist", "Nature Guardian"],
        role: "user",
        createdAt: new Date(Date.now() - 3 * 86400000).toISOString()
      },
      {
        id: "user-demo-5",
        name: "Leo King",
        email: "leo@quizkids.demo",
        passwordHash: "$2a$10$demoHashForDemoUser123456",
        avatar: "🤖",
        totalScore: 750,
        quizzesCompleted: 9,
        correctAnswers: 80,
        totalQuestionsAnswered: 95,
        highestStreak: 5,
        badges: ["First Quiz", "Science Star"],
        role: "user",
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString()
      }
    ];
  }

  // --- Questions Methods ---
  getQuestions({ category, difficulty, search } = {}) {
    let list = [...this.questions];
    if (category && category.toLowerCase() !== 'all' && category.toLowerCase() !== 'mixed gk') {
      list = list.filter(q => q.category.toLowerCase() === category.toLowerCase());
    }
    if (difficulty && difficulty.toLowerCase() !== 'all') {
      list = list.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
    }
    if (search && search.trim()) {
      const s = search.toLowerCase();
      list = list.filter(q => 
        q.question.toLowerCase().includes(s) || 
        q.explanation.toLowerCase().includes(s) ||
        q.options.some(opt => opt.toLowerCase().includes(s))
      );
    }
    return list;
  }

  getQuestionById(id) {
    return this.questions.find(q => q.id === id || q._id === id);
  }

  createQuestion(questionData) {
    const newQuestion = {
      id: `q-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      question: questionData.question,
      category: questionData.category,
      difficulty: questionData.difficulty || 'Easy',
      options: questionData.options,
      correctAnswer: questionData.correctAnswer,
      explanation: questionData.explanation,
      points: questionData.points || (questionData.difficulty === 'Challenge' ? 20 : questionData.difficulty === 'Medium' ? 15 : 10),
      createdAt: new Date().toISOString()
    };
    this.questions.unshift(newQuestion);
    return newQuestion;
  }

  updateQuestion(id, updateData) {
    const idx = this.questions.findIndex(q => q.id === id || q._id === id);
    if (idx === -1) return null;
    this.questions[idx] = {
      ...this.questions[idx],
      ...updateData,
      id: this.questions[idx].id
    };
    return this.questions[idx];
  }

  deleteQuestion(id) {
    const idx = this.questions.findIndex(q => q.id === id || q._id === id);
    if (idx === -1) return false;
    this.questions.splice(idx, 1);
    return true;
  }

  // --- Categories Methods ---
  getCategories() {
    return this.categories.map(cat => {
      let count = 0;
      if (cat.name === 'Mixed GK') {
        count = this.questions.length;
      } else {
        count = this.questions.filter(q => q.category.toLowerCase() === cat.name.toLowerCase()).length;
      }
      return {
        ...cat,
        questionCount: count
      };
    });
  }

  // --- Quiz Generator ---
  generateQuiz({ category = 'Mixed GK', difficulty = 'all', count = 10 } = {}) {
    let pool = [];
    if (!category || category === 'Mixed GK' || category.toLowerCase() === 'all' || category.toLowerCase() === 'mixed') {
      pool = [...this.questions];
    } else {
      pool = this.questions.filter(q => q.category.toLowerCase() === category.toLowerCase());
    }

    if (difficulty && difficulty.toLowerCase() !== 'all') {
      const diffPool = pool.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
      if (diffPool.length >= 3) {
        pool = diffPool;
      }
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(Number(count) || 10, shuffled.length));

    // Shuffle options for each question and provide answer info for instant feedback
    return selected.map(q => {
      const shuffledOptions = [...q.options].sort(() => 0.5 - Math.random());
      return {
        id: q.id,
        question: q.question,
        category: q.category,
        difficulty: q.difficulty,
        options: shuffledOptions,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        points: q.points || 10
      };
    });
  }

  // --- Quiz Submission & Progress ---
  recordQuizAttempt(attemptData) {
    const attempt = {
      id: `attempt-${Date.now()}`,
      ...attemptData,
      completedAt: new Date().toISOString()
    };
    this.quizAttempts.unshift(attempt);

    // Update user stats if userId exists
    if (attemptData.userId) {
      const user = this.users.find(u => u.id === attemptData.userId);
      if (user) {
        user.quizzesCompleted = (user.quizzesCompleted || 0) + 1;
        user.totalScore = (user.totalScore || 0) + (attemptData.score || 0);
        user.correctAnswers = (user.correctAnswers || 0) + (attemptData.correctAnswers || 0);
        user.totalQuestionsAnswered = (user.totalQuestionsAnswered || 0) + (attemptData.totalQuestions || 0);
        user.highestStreak = Math.max(user.highestStreak || 0, attemptData.highestStreak || 0);
        
        if (attemptData.newBadges && attemptData.newBadges.length) {
          user.badges = Array.from(new Set([...(user.badges || []), ...attemptData.newBadges]));
        }
      }
    }

    return attempt;
  }

  // --- Leaderboard ---
  getLeaderboard({ limit = 10 } = {}) {
    return [...this.users]
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, limit)
      .map((u, index) => ({
        rank: index + 1,
        id: u.id,
        name: u.name,
        avatar: u.avatar || '🦁',
        totalScore: u.totalScore || 0,
        quizzesCompleted: u.quizzesCompleted || 0,
        highestStreak: u.highestStreak || 0,
        badgeCount: (u.badges || []).length,
        badges: u.badges || []
      }));
  }

  // --- Users & Auth ---
  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.users.find(u => u.id === id);
  }

  createUser(userData) {
    const user = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email.toLowerCase(),
      passwordHash: userData.passwordHash,
      avatar: userData.avatar || '🦁',
      totalScore: 0,
      quizzesCompleted: 0,
      correctAnswers: 0,
      totalQuestionsAnswered: 0,
      highestStreak: 0,
      badges: ["First Step"],
      role: userData.role || 'user',
      createdAt: new Date().toISOString()
    };
    this.users.push(user);
    return user;
  }

  updateUser(id, updateData) {
    const user = this.findUserById(id);
    if (!user) return null;
    Object.assign(user, updateData);
    return user;
  }
}

const memoryStore = new MemoryStore();
module.exports = memoryStore;
