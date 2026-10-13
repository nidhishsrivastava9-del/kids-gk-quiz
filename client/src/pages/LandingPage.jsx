import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Sparkles, 
  BookOpen, 
  Trophy, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  Award,
  Zap,
  Globe,
  Compass,
  Star
} from 'lucide-react';
import { CategoryCard } from '../components/CategoryCard';
import { QuizCustomizerModal } from '../components/QuizCustomizerModal';
import { CATEGORIES_DATA } from '../data/categories';
import { BADGES_DATA } from '../data/badges';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';

export const LandingPage = () => {
  const [modalCategory, setModalCategory] = useState(null);
  const { startQuiz } = useQuiz();
  const { activePlayer } = useAuth();
  const { playClick } = useSound();

  const handleStartQuickQuiz = (category = 'Mixed GK') => {
    playClick();
    startQuiz(category, 'all', 10);
  };

  const handleOpenCustomize = (category) => {
    setModalCategory(category.name);
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* =========================================
          HERO SECTION
          ========================================= */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 rounded-3xl bg-gradient-to-b from-sky-100/80 via-purple-50/50 to-transparent p-4 sm:p-8">
        
        {/* Floating background decorative shapes */}
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-sky-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float"></div>
        <div className="absolute top-20 -right-10 w-56 h-56 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float-slow"></div>
        <div className="absolute -bottom-10 left-1/3 w-48 h-48 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float"></div>

        <div className="max-w-7xl mx-auto px-2 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 bg-white/90 border-2 border-sky-300 shadow-sm px-4 py-1.5 rounded-full">
                <span className="text-xl animate-bounce">🎈</span>
                <span className="text-xs sm:text-sm font-black text-sky-800 tracking-wide uppercase">
                  Fun & Safe GK Quiz For Kids 6–12 Years
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                Test Your Brain. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-purple-600 to-pink-500">
                  Learn Something New!
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-xl font-bold text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Fun quizzes that help kids learn General Knowledge while they play. Answer questions, earn shiny badges, build streaks, and explore the universe!
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => handleStartQuickQuiz('Mixed GK')}
                  className="w-full sm:w-auto btn-bubbly-yellow text-lg sm:text-xl py-4 px-8 shadow-bubbly-yellow group"
                >
                  <Play className="w-6 h-6 fill-slate-900 group-hover:scale-110 transition-transform" />
                  Start Quick Quiz! 🚀
                </button>
                <Link
                  to="/categories"
                  onClick={playClick}
                  className="w-full sm:w-auto btn-bubbly-purple text-lg py-4 px-8 shadow-bubbly-purple"
                >
                  <BookOpen className="w-5 h-5" />
                  Explore 10+ Categories
                </Link>
              </div>

              {/* Kid friendly Trust Metrics */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm font-black text-slate-500">
                <div className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-xl border border-slate-200">
                  <span className="text-base">⭐</span> 100+ Curated Questions
                </div>
                <div className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-xl border border-slate-200">
                  <span className="text-base">🏆</span> 15 Unlockable Badges
                </div>
                <div className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-xl border border-slate-200">
                  <span className="text-base">💡</span> Kid-Friendly Explanations
                </div>
              </div>

            </div>

            {/* Right Hero Illustration Grid */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-square bg-gradient-to-tr from-sky-400 via-indigo-400 to-purple-500 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between border-4 border-white transform hover:rotate-1 transition-transform">
                
                {/* Top Badge on card */}
                <div className="flex justify-between items-center">
                  <span className="bg-white/90 text-slate-800 font-black text-xs px-3 py-1.5 rounded-full shadow-sm">
                    🌟 Daily Challenge Ready!
                  </span>
                  <div className="flex items-center gap-1 bg-amber-400 text-amber-950 font-black text-xs px-2.5 py-1 rounded-full shadow-sm">
                    <Flame className="w-4 h-4 fill-amber-950" /> 5 Streak
                  </div>
                </div>

                {/* Center Question Teaser */}
                <div className="bg-white rounded-2xl p-5 shadow-lg space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-purple-600 uppercase tracking-wide">
                    <span>🌌 Space Quiz</span> • <span>Easy</span>
                  </div>
                  <p className="font-extrabold text-slate-800 text-base sm:text-lg">
                    Which planet is famously known as the Red Planet?
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-bold">
                    <div className="p-2 rounded-xl bg-slate-100 text-slate-700 text-center">Earth</div>
                    <div className="p-2 rounded-xl bg-emerald-100 border-2 border-emerald-500 text-emerald-800 text-center font-black">
                      Mars 🎉
                    </div>
                  </div>
                </div>

                {/* Floating mini badges */}
                <div className="flex justify-around items-center pt-2">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center text-2xl animate-bounce">
                    🌍
                  </div>
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center text-2xl animate-float">
                    🐾
                  </div>
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>
                    🔬
                  </div>
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center text-2xl animate-float" style={{ animationDelay: '0.4s' }}>
                    🇮🇳
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </section>

      {/* =========================================
          HOW IT WORKS (3 Simple Steps)
          ========================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-10">
          <span className="text-xs font-black text-purple-600 uppercase tracking-widest bg-purple-100 px-3 py-1 rounded-full">
            Simple & Exciting
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mt-2">
            How QuizKids Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="card-playful border-2 border-sky-100 hover:border-sky-300">
            <div className="w-16 h-16 rounded-3xl bg-sky-100 text-sky-600 text-3xl mx-auto flex items-center justify-center font-black shadow-inner mb-4">
              1️⃣
            </div>
            <h3 className="text-xl font-extrabold text-slate-800 mb-2">Pick a Topic</h3>
            <p className="text-sm font-semibold text-slate-500">
              Choose from 10 exciting topics like Animals, Space, India, Science, and World wonders.
            </p>
          </div>

          <div className="card-playful border-2 border-purple-100 hover:border-purple-300">
            <div className="w-16 h-16 rounded-3xl bg-purple-100 text-purple-600 text-3xl mx-auto flex items-center justify-center font-black shadow-inner mb-4">
              2️⃣
            </div>
            <h3 className="text-xl font-extrabold text-slate-800 mb-2">Answer & Learn</h3>
            <p className="text-sm font-semibold text-slate-500">
              Tap the large colorful buttons. Get instant cheering feedback and learn with short explanations!
            </p>
          </div>

          <div className="card-playful border-2 border-amber-100 hover:border-amber-300">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 text-3xl mx-auto flex items-center justify-center font-black shadow-inner mb-4">
              3️⃣
            </div>
            <h3 className="text-xl font-extrabold text-slate-800 mb-2">Earn Cool Badges</h3>
            <p className="text-sm font-semibold text-slate-500">
              Score points, maintain answer streaks, and unlock shiny reward badges for your trophy room!
            </p>
          </div>

        </div>
      </section>

      {/* =========================================
          FEATURED CATEGORIES
          ========================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-black text-sky-600 uppercase tracking-widest bg-sky-100 px-3 py-1 rounded-full">
              Explore Topics
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mt-2">
              Popular Quiz Categories
            </h2>
          </div>
          <Link
            to="/categories"
            onClick={playClick}
            className="btn-bubbly-primary text-sm py-2.5 px-5 shadow-sm"
          >
            View All 10 Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_DATA.slice(0, 6).map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onStartQuiz={handleStartQuickQuiz}
              onCustomize={handleOpenCustomize}
            />
          ))}
        </div>
      </section>

      {/* =========================================
          GAMIFICATION & BADGES SPOTLIGHT
          ========================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <span className="bg-yellow-400 text-yellow-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                🏆 Collect All Achievements
              </span>
              <h2 className="text-3xl sm:text-4xl font-black leading-tight">
                Unlock 15+ Awesome Badges as You Learn!
              </h2>
              <p className="text-purple-100 font-semibold text-sm sm:text-base max-w-xl">
                Every quiz you finish helps you earn points, unlock superhero badges, and climb the leaderboard!
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Link
                  to="/progress"
                  onClick={playClick}
                  className="btn-bubbly-yellow text-slate-900 font-extrabold text-sm py-3 px-6 shadow-none"
                >
                  View My Trophy Room 🎖️
                </Link>
                <Link
                  to="/leaderboard"
                  onClick={playClick}
                  className="bg-white/20 hover:bg-white/30 text-white font-extrabold text-sm py-3 px-6 rounded-2xl transition-all"
                >
                  Leaderboard Podium 🥇
                </Link>
              </div>
            </div>

            {/* Badges Carousel Preview */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-3">
              {BADGES_DATA.slice(0, 6).map((badge) => (
                <div
                  key={badge.id}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center border border-white/20 hover:scale-105 transition-transform"
                >
                  <div className="text-3xl mb-1">{badge.icon}</div>
                  <p className="font-extrabold text-xs text-white truncate">{badge.name}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* Quiz Customizer Modal */}
      {modalCategory && (
        <QuizCustomizerModal
          isOpen={!!modalCategory}
          onClose={() => setModalCategory(null)}
          defaultCategory={modalCategory}
        />
      )}

    </div>
  );
};
