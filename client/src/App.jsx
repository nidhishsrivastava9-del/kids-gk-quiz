import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModals } from './pages/AuthModals';
import { LandingPage } from './pages/LandingPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { QuizScreen } from './pages/QuizScreen';
import { QuizResultScreen } from './pages/QuizResultScreen';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ProgressDashboard } from './pages/ProgressDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f0f9ff]">
      <Navbar />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/quiz" element={<QuizScreen />} />
          <Route path="/results" element={<QuizResultScreen />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/progress" element={<ProgressDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
      <AuthModals />
    </div>
  );
}

export default App;
