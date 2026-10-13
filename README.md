# 🌟 QuizKids — Kids General Knowledge Quiz Platform
> **Learn • Play • Explore**

A modern, colorful, interactive Full-Stack Kids General Knowledge Quiz Web Application designed specifically for children aged **6–12 years old**. QuizKids turns learning into a joyful educational game with 10+ categories, 100+ curated factually accurate questions, instant cheerful feedback, reward badges, visual progress dashboards, and an administrative question portal.

---

## ✨ Key Features

- 🎨 **Kid-Friendly Modern UI/UX**: Playful bubbly cards, colorful gradients, accessible high-contrast fonts (Nunito), and responsive layouts for mobile, tablet, and desktop.
- 🌍 **10+ Educational Categories**:
  1. 🌍 **World** (Continents, oceans, world-famous landmarks)
  2. 🐾 **Animals** (Habitats, superpowers, sounds, diets)
  3. 🌌 **Space** (Planets, Moon, Sun, galaxy, astronauts)
  4. 🔬 **Science** (Everyday physics, human body, chemistry, matter)
  5. 🏛️ **History** (Ancient civilizations, famous inventors, explorers)
  6. 🌱 **Nature** (Weather, water cycle, forests, volcanoes, seasons)
  7. ⚽ **Sports** (Olympics, football, cricket, rules, equipment)
  8. 🇮🇳 **India** (National symbols, states, culture, monuments, heritage)
  9. 🎨 **Arts & Culture** (Music instruments, painting, books, festivals)
  10. 🧠 **Mixed GK** (Dynamic blend of all categories)
- 🟢🟡🔴 **3 Difficulty Levels**: `Easy` (Ages 6-8), `Medium` (Ages 8-10), and `Challenge` (Ages 10-12).
- 🎮 **Interactive Quiz Arena**:
  - Live progress tracker & score counter (+10 points).
  - Streak multiplier flames (`🔥 5 Streak!`).
  - Large tap-friendly answer choices (A, B, C, D) with keyboard navigation (`1-4`, `Enter`).
  - **Instant Positive Feedback**: Cheering message ("🎉 Great Job!"), confetti fanfare, and concise child-friendly explanations.
  - Encouraging wrong answer handling ("💡 Almost! Keep Learning!") that highlights the correct answer in soothing green without penalizing or shaming.
- 🔊 **Web Audio Synthesizer**: Built-in sound effects (chimes, error boops, victory fanfare, badge shimmers) with a visible **🔊 Sound On/Off** control.
- 🏆 **Gamification Suite**:
  - **15+ Unlockable Badges** (World Explorer, Space Explorer, Science Star, Streak Master, etc.).
  - **Leaderboard Podium** with friendly kid avatars (Lion, Robot, Astronaut, Owl, Panda, Fox).
- 📊 **Progress Dashboard**:
  - Category mastery percentage bars.
  - Overall accuracy SVG donut ring.
  - Quiz history and milestones.
- ⚙️ **Admin Dashboard**:
  - Search, filter, add, edit, and delete questions with full input validations.
- 👤 **Guest Mode + Authentication**:
  - Instant 1-click play for kids without any account barrier.
  - Optional JWT signup/login to sync progress across devices.
- ⚡ **Dual-Mode Database Engine**:
  - Works with **MongoDB** via Mongoose.
  - **Automatic In-Memory Fallback**: Runs instantly out of the box with zero external database configuration required!

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js 18 (Vite)
- **Styling**: Tailwind CSS with custom kid-friendly utilities and shadows
- **Icons**: Lucide React
- **Animations & Effects**: Framer Motion, Canvas-Confetti, Web Audio API Sound Synthesizer
- **Routing**: React Router v6

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose) with instant high-performance in-memory fallback
- **Auth**: JWT (JSON Web Tokens) & bcryptjs
- **Security**: CORS protection, sanitized queries, input validation

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- *(Optional)* MongoDB running locally or MongoDB Atlas connection string.

### 2. Installation
Clone the repository and install all dependencies:

```bash
# Install root, server, and client dependencies
npm run install:all
```

Or install manually:
```bash
# Root
npm install

# Backend
cd server && npm install

# Frontend
cd ../client && npm install
```

### 3. Environment Configuration
Create a `.env` file in the root or `server/` directory (refer to `.env.example`):

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=quizkids_super_secret_jwt_key_2026
CLIENT_URL=http://localhost:5173

# Optional: If omitted, QuizKids runs automatically in high-speed In-Memory data mode!
# MONGODB_URI=mongodb://localhost:27017/quizkids
```

### 4. Running the Development Server
From the root directory, start both the backend API and frontend client with a single command:

```bash
npm run dev
```

- **Frontend Client**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

---

## 📂 Project Structure

```
quizkids/
├── client/                     # React + Vite Frontend
│   ├── src/
│   │   ├── components/         # Navbar, Footer, CategoryCard, CustomizerModal, etc.
│   │   ├── context/            # AuthContext, QuizContext, SoundContext
│   │   ├── data/               # Categories, Badges, Character Avatars
│   │   ├── pages/              # LandingPage, Categories, Quiz, Results, Leaderboard, Progress, Admin, Profile, About
│   │   ├── services/           # api.js API client service
│   │   ├── utils/              # soundSynth.js Web Audio synthesizer
│   │   ├── App.jsx             # Route definitions
│   │   ├── main.jsx            # React root mount
│   │   └── index.css           # Tailwind custom styles & playful keyframes
│   ├── index.html              # HTML entry point with Google Fonts & SEO
│   ├── tailwind.config.js      # Color theme & shadows configuration
│   └── vite.config.js          # Vite config & dev server proxy
│
├── server/                     # Node.js + Express Backend
│   ├── config/                 # db.js connection & in-memory fallback
│   ├── controllers/            # questionController, quizController, authController, etc.
│   ├── data/                   # seedQuestions.js (105+ verified GK questions)
│   ├── middleware/             # auth.js JWT validation
│   ├── models/                 # Question, User, QuizAttempt, Category
│   ├── routes/                 # REST API routes
│   ├── utils/                  # memoryStore.js, badgeEvaluator.js
│   └── server.js               # Express entry point
│
├── .env.example
├── .gitignore
├── README.md
└── package.json                # Root concurrent workspace scripts
```

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server health check & status |
| `GET` | `/api/categories` | Retrieve all categories with dynamic question counts |
| `GET` | `/api/questions` | Search & filter questions (category, difficulty, text) |
| `POST` | `/api/questions` | Create a new question (Admin) |
| `PUT` | `/api/questions/:id` | Update an existing question (Admin) |
| `DELETE` | `/api/questions/:id` | Delete a question (Admin) |
| `POST` | `/api/quiz/generate` | Generate randomized quiz with shuffled choices |
| `POST` | `/api/quiz/submit` | Evaluate answers, score streak bonuses, unlock badges |
| `GET` | `/api/leaderboard` | Get top player rankings & podium |
| `GET` | `/api/progress` | Get player statistics & category mastery |
| `POST` | `/api/auth/register` | Register player account |
| `POST` | `/api/auth/login` | Log in existing player |
| `GET` | `/api/auth/me` | Fetch authenticated player profile |
| `PUT` | `/api/auth/profile` | Update player display name and avatar |

---

## 🏗️ Production Build & Deployment

### Build the frontend:
```bash
npm run build
```
The optimized production bundle will be generated in `client/dist/`.

### Run production server:
```bash
npm run start
```

---

## 📜 License
This project is licensed under the MIT License — feel free to use, enhance, and share for educational purposes! 🎈
