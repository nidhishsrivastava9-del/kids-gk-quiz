const BADGE_DEFINITIONS = [
  {
    id: "first-quiz",
    name: "First Quiz",
    icon: "🏆",
    description: "Completed your very first GK quiz!",
    category: "General"
  },
  {
    id: "perfect-score",
    name: "Perfect Score",
    icon: "🌟",
    description: "Scored 100% on any quiz!",
    category: "Mastery"
  },
  {
    id: "streak-master",
    name: "Streak Master",
    icon: "🔥",
    description: "Answered 5 questions correctly in a row!",
    category: "Streak"
  },
  {
    id: "10-correct",
    name: "10 Correct Answers",
    icon: "⭐",
    description: "Answered 10 total questions correctly!",
    category: "Milestone"
  },
  {
    id: "world-explorer",
    name: "World Explorer",
    icon: "🌍",
    description: "Completed a World Geography quiz!",
    category: "Category"
  },
  {
    id: "animal-expert",
    name: "Animal Expert",
    icon: "🐾",
    description: "Completed an Animals quiz!",
    category: "Category"
  },
  {
    id: "space-explorer",
    name: "Space Explorer",
    icon: "🌌",
    description: "Completed a Space & Universe quiz!",
    category: "Category"
  },
  {
    id: "science-star",
    name: "Science Star",
    icon: "🔬",
    description: "Completed a Science quiz!",
    category: "Category"
  },
  {
    id: "history-hero",
    name: "History Hero",
    icon: "🏛️",
    description: "Completed a History quiz!",
    category: "Category"
  },
  {
    id: "nature-guardian",
    name: "Nature Guardian",
    icon: "🌱",
    description: "Completed a Nature & Earth quiz!",
    category: "Category"
  },
  {
    id: "sports-champ",
    name: "Sports Champ",
    icon: "⚽",
    description: "Completed a Sports quiz!",
    category: "Category"
  },
  {
    id: "india-expert",
    name: "India Expert",
    icon: "🇮🇳",
    description: "Completed an India quiz!",
    category: "Category"
  },
  {
    id: "creative-artist",
    name: "Creative Artist",
    icon: "🎨",
    description: "Completed an Arts & Culture quiz!",
    category: "Category"
  },
  {
    id: "gk-master",
    name: "GK Master",
    icon: "🧠",
    description: "Completed 5 or more quizzes!",
    category: "Mastery"
  },
  {
    id: "speedy-learner",
    name: "Speedy Learner",
    icon: "⚡",
    description: "Completed a quiz in under 60 seconds with great accuracy!",
    category: "Speed"
  }
];

function evaluateNewBadges({
  currentBadges = [],
  category,
  percentage,
  correctAnswers,
  totalQuestions,
  streak,
  timeTaken,
  totalQuizzesCompleted = 1,
  totalCorrectAllTime = 0
}) {
  const earned = new Set(currentBadges);
  const newlyUnlocked = [];

  const grant = (badgeName) => {
    if (!earned.has(badgeName)) {
      earned.add(badgeName);
      const def = BADGE_DEFINITIONS.find(b => b.name === badgeName);
      if (def) newlyUnlocked.push(def);
    }
  };

  // 1. First Quiz
  if (totalQuizzesCompleted >= 1) grant("First Quiz");

  // 2. Perfect Score
  if (percentage === 100 && totalQuestions >= 5) grant("Perfect Score");

  // 3. Streak Master
  if (streak >= 5) grant("Streak Master");

  // 4. 10 Correct Answers
  if (totalCorrectAllTime + correctAnswers >= 10) grant("10 Correct Answers");

  // 5. Category specific
  if (category) {
    const cat = category.toLowerCase();
    if (cat === 'world') grant("World Explorer");
    if (cat === 'animals') grant("Animal Expert");
    if (cat === 'space') grant("Space Explorer");
    if (cat === 'science') grant("Science Star");
    if (cat === 'history') grant("History Hero");
    if (cat === 'nature') grant("Nature Guardian");
    if (cat === 'sports') grant("Sports Champ");
    if (cat === 'india') grant("India Expert");
    if (cat === 'arts & culture' || cat === 'arts') grant("Creative Artist");
  }

  // 6. GK Master (5+ quizzes)
  if (totalQuizzesCompleted >= 5) grant("GK Master");

  // 7. Speedy Learner
  if (timeTaken > 0 && timeTaken <= 60 && percentage >= 80 && totalQuestions >= 5) {
    grant("Speedy Learner");
  }

  return {
    allBadges: Array.from(earned),
    newlyUnlocked
  };
}

module.exports = {
  BADGE_DEFINITIONS,
  evaluateNewBadges
};
