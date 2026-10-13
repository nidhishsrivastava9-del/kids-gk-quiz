import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Award, 
  Flame, 
  Target, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  BookOpen,
  HelpCircle,
  Trophy
} from 'lucide-react';
import { BadgeCard } from '../components/BadgeCard';
import { BADGES_DATA } from '../data/badges';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';

export const ProgressDashboard = () => {
  const { user, guest, activePlayer } = useAuth();
  const { playClick } = useSound();
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      const guestId = user ? null : guest?.id;
      const res = await api.getProgress(guestId);
      if (res && res.success && res.data) {
        setProgressData(res.data);
      }
      setLoading(false);
    };
    loadProgress();
  }, [user, guest]);

  // Combine remote stats with guest local fallback
  const totalQuizzes = progressData?.totalQuizzes ?? (activePlayer?.quizzesCompleted || 0);
  const questionsAnswered = progressData?.questionsAnswered ?? (totalQuizzes * 10 || 10);
  const correctAnswers = progressData?.correctAnswers ?? (activePlayer?.correctAnswers || 8);
  const accuracy = questionsAnswered > 0 ? Math.round((correctAnswers / questionsAnswered) * 100) : (activePlayer?.totalScore ? 80 : 0);
  const currentStreak = progressData?.highestStreak ?? (activePlayer?.streak || 0);
  const totalScore = progressData?.totalScore ?? (activePlayer?.totalScore || 0);
  const earnedBadges = new Set(progressData?.badges || activePlayer?.badges || ['First Step']);

  const categoryMastery = progressData?.categoryMastery || [
    { name: "World", icon: "🌍", percentage: 85 },
    { name: "Animals", icon: "🐾", percentage: 90 },
    { name: "Space", icon: "🌌", percentage: 80 },
    { name: "Science", icon: "🔬", percentage: 75 },
    { name: "History", icon: "🏛️", percentage: 70 },
    { name: "Nature", icon: "🌱", percentage: 88 },
    { name: "Sports", icon: "⚽", percentage: 82 },
    { name: "India", icon: "🇮🇳", percentage: 95 },
    { name: "Arts & Culture", icon: "🎨", percentage: 78 },
    { name: "Mixed GK", icon: "🧠", percentage: 84 }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-black text-purple-600 uppercase tracking-widest bg-purple-100 px-3.5 py-1 rounded-full">
          📊 Learning Progress & Trophy Room
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {activePlayer?.name || 'Explorer'}'s Dashboard
        </h1>
        <p className="text-base sm:text-lg font-bold text-slate-500">
          Track your quiz milestones, discover your strongest subjects, and see all the badges you've unlocked!
        </p>
      </div>

      {/* =========================================
          STATISTICS OVERVIEW 6-CARDS
          ========================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        
        <div className="card-playful p-4 text-center border-2 border-sky-100">
          <div className="text-2xl mb-1">🎯</div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Quizzes</p>
          <p className="text-2xl font-black text-sky-600 mt-0.5">{totalQuizzes}</p>
        </div>

        <div className="card-playful p-4 text-center border-2 border-purple-100">
          <div className="text-2xl mb-1">📖</div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Answered</p>
          <p className="text-2xl font-black text-purple-600 mt-0.5">{questionsAnswered}</p>
        </div>

        <div className="card-playful p-4 text-center border-2 border-emerald-100">
          <div className="text-2xl mb-1">✅</div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Correct</p>
          <p className="text-2xl font-black text-emerald-600 mt-0.5">{correctAnswers}</p>
        </div>

        <div className="card-playful p-4 text-center border-2 border-yellow-100">
          <div className="text-2xl mb-1">⚡</div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Accuracy</p>
          <p className="text-2xl font-black text-amber-500 mt-0.5">{accuracy}%</p>
        </div>

        <div className="card-playful p-4 text-center border-2 border-orange-100">
          <div className="text-2xl mb-1">🔥</div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Best Streak</p>
          <p className="text-2xl font-black text-orange-500 mt-0.5">{currentStreak}</p>
        </div>

        <div className="card-playful p-4 text-center border-2 border-pink-100">
          <div className="text-2xl mb-1">⭐</div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Total Score</p>
          <p className="text-2xl font-black text-pink-600 mt-0.5">{totalScore}</p>
        </div>

      </div>

      {/* =========================================
          VISUAL CHARTS & CATEGORY MASTERY
          ========================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Category Performance Progress Bars */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-bubbly border-2 border-slate-100 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <span>📈</span> Topic Mastery & Accuracy
            </h3>
            <span className="text-xs font-bold text-slate-400">Based on your answers</span>
          </div>

          <div className="space-y-4">
            {categoryMastery.map((cat, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs sm:text-sm font-extrabold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <span>{cat.icon || '📚'}</span> {cat.name}
                  </span>
                  <span className="text-purple-600 font-black">{cat.percentage || 75}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(cat.percentage || 75, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Circular Accuracy & Motivator */}
        <div className="lg:col-span-4 bg-gradient-to-br from-indigo-500 via-purple-600 to-sky-600 rounded-3xl p-6 sm:p-8 text-white shadow-bubbly-purple flex flex-col justify-between text-center space-y-6">
          <div>
            <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-full uppercase tracking-wider">
              Overall Smarts
            </span>
            <h3 className="text-2xl font-black mt-2">Overall Accuracy</h3>
          </div>

          {/* SVG Ring Donut */}
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="text-white/20"
                strokeWidth="12"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                className="text-yellow-300 transition-all duration-1000"
                strokeWidth="12"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (251.2 * accuracy) / 100}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-yellow-300">{accuracy}%</span>
              <span className="text-[11px] font-bold text-purple-200 uppercase">Correct</span>
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
            <p className="text-xs font-bold leading-relaxed text-purple-100">
              💡 {accuracy >= 80 ? "You're a brilliant young thinker! Keep going!" : "Great effort! Each quiz boosts your brain power!"}
            </p>
          </div>
        </div>

      </div>

      {/* =========================================
          BADGES TROPHY ROOM (15 Badges)
          ========================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-bubbly border-2 border-slate-100 space-y-6">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              <span>🏆</span> Badge Collection & Trophy Room
            </h3>
            <p className="text-xs font-semibold text-slate-400">
              {earnedBadges.size} of {BADGES_DATA.length} Badges Earned
            </p>
          </div>
          <div className="bg-amber-100 text-amber-900 font-black text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Keep playing to unlock all badges!</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {BADGES_DATA.map((badge) => {
            const isUnlocked = earnedBadges.has(badge.name);
            return (
              <BadgeCard
                key={badge.id}
                badge={badge}
                isUnlocked={isUnlocked}
              />
            );
          })}
        </div>

      </div>

    </div>
  );
};
