import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  RotateCcw, 
  BookOpen, 
  Home, 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Clock, 
  Flame, 
  ChevronDown, 
  ChevronUp, 
  Award,
  Share2
} from 'lucide-react';
import { ConfettiEffect } from '../components/ConfettiEffect';
import { useQuiz } from '../context/QuizContext';
import { useSound } from '../context/SoundContext';
import { useAuth } from '../context/AuthContext';

export const QuizResultScreen = () => {
  const { quizResult, category, difficulty, startQuiz } = useQuiz();
  const { playClick, playComplete } = useSound();
  const { activePlayer } = useAuth();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!quizResult) {
      navigate('/categories');
    }
  }, [quizResult, navigate]);

  if (!quizResult) return null;

  const {
    totalQuestions = 10,
    correctAnswers = 8,
    incorrectAnswers = 2,
    score = 80,
    percentage = 80,
    timeTaken = 45,
    highestStreak = 3,
    motivationalMessage = "Great Job! Keep Learning! 🚀",
    emoji = "🌟",
    newBadgesUnlocked = [],
    review = []
  } = quizResult;

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const handlePlayAgain = () => {
    playClick();
    startQuiz(category, difficulty, totalQuestions);
  };

  const toggleReviewItem = (idx) => {
    playClick();
    setExpandedIndex(prev => prev === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      
      {/* Confetti Fanfare for passing scores */}
      <ConfettiEffect active={percentage >= 60} />

      {/* =========================================
          RESULT HEADER CELEBRATION
          ========================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-bubbly-lg border-3 border-sky-200 text-center relative overflow-hidden space-y-5">
        
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-300 via-yellow-400 to-amber-500 mx-auto flex items-center justify-center text-5xl sm:text-6xl shadow-bubbly-yellow animate-pop">
          {emoji}
        </div>

        <div className="space-y-2">
          <span className="text-xs sm:text-sm font-black text-purple-600 bg-purple-100 px-3.5 py-1 rounded-full uppercase tracking-wider">
            🎉 Quiz Complete!
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {motivationalMessage}
          </h1>
          <p className="text-sm sm:text-base font-bold text-slate-500">
            Great work, <span className="text-purple-600 font-extrabold">{activePlayer?.name || 'Explorer'}</span>! Here is how you performed:
          </p>
        </div>

        {/* =========================================
            SCORECARD STATS GRID
            ========================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          
          <div className="bg-sky-50 rounded-2xl p-4 border border-sky-200">
            <p className="text-xs font-black text-sky-600 uppercase tracking-wider mb-1">Score</p>
            <p className="text-2xl sm:text-3xl font-black text-sky-950">+{score} <span className="text-xs">pts</span></p>
          </div>

          <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200">
            <p className="text-xs font-black text-purple-600 uppercase tracking-wider mb-1">Accuracy</p>
            <p className="text-2xl sm:text-3xl font-black text-purple-950">{percentage}%</p>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
            <p className="text-xs font-black text-emerald-600 uppercase tracking-wider mb-1">Correct</p>
            <p className="text-2xl sm:text-3xl font-black text-emerald-950">{correctAnswers} / {totalQuestions}</p>
          </div>

          <div className="bg-orange-50 rounded-2xl p-4 border border-orange-200">
            <p className="text-xs font-black text-orange-600 uppercase tracking-wider mb-1">Best Streak</p>
            <p className="text-2xl sm:text-3xl font-black text-orange-950 flex items-center justify-center gap-1">
              <Flame className="w-5 h-5 fill-orange-500" /> {highestStreak}
            </p>
          </div>

        </div>

        {/* Time Taken pill */}
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-400">
          <Clock className="w-4 h-4" /> Time taken: {formatTime(timeTaken)}
        </div>

      </div>

      {/* =========================================
          NEW BADGES UNLOCKED BANNER
          ========================================= */}
      {newBadgesUnlocked && newBadgesUnlocked.length > 0 && (
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-3xl p-6 shadow-bubbly-yellow border-3 border-white text-slate-900 space-y-4 animate-pop">
          <div className="flex items-center gap-2 font-black text-lg">
            <Award className="w-6 h-6 fill-slate-900" />
            <span>🌟 New Achievement Badge Unlocked!</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {newBadgesUnlocked.map((b, i) => (
              <div key={i} className="bg-white/90 rounded-2xl p-3 flex items-center gap-3 shadow-sm">
                <span className="text-3xl">{b.icon || '🏆'}</span>
                <div>
                  <p className="font-extrabold text-sm text-slate-900">{b.name || b}</p>
                  <p className="text-[11px] font-bold text-slate-500">{b.description || 'Badge unlocked!'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================
          QUESTION-BY-QUESTION REVIEW
          ========================================= */}
      {review && review.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-bubbly border-2 border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <span>📖</span> Question Review & Explanations
            </h3>
            <span className="text-xs font-bold text-slate-400">
              Tap any question to see details
            </span>
          </div>

          <div className="space-y-3">
            {review.map((item, idx) => {
              const isOpen = expandedIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border-2 transition-all overflow-hidden ${
                    item.isCorrect ? 'border-emerald-200 bg-emerald-50/40' : 'border-rose-200 bg-rose-50/40'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleReviewItem(idx)}
                    className="w-full p-4 flex items-center justify-between text-left gap-3 focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      {item.isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-6 h-6 text-rose-500 shrink-0" />
                      )}
                      <div>
                        <p className="font-extrabold text-sm sm:text-base text-slate-900">
                          {idx + 1}. {item.question}
                        </p>
                        <p className="text-xs font-bold text-slate-500 mt-0.5">
                          Your answer: <span className={item.isCorrect ? 'text-emerald-700 font-black' : 'text-rose-700 font-black'}>{item.selectedAnswer}</span>
                        </p>
                      </div>
                    </div>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </button>

                  {/* Expanded Explanation */}
                  {isOpen && (
                    <div className="p-4 pt-0 border-t border-slate-200/60 text-xs sm:text-sm font-semibold space-y-2 bg-white/80">
                      {!item.isCorrect && (
                        <p className="text-emerald-800 font-bold">
                          ✅ Correct Answer: <span className="underline font-black">{item.correctAnswer}</span>
                        </p>
                      )}
                      <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                        💡 <span className="font-bold text-slate-800">Why?</span> {item.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================
          NAVIGATION ACTION BUTTONS
          ========================================= */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={handlePlayAgain}
          className="w-full sm:w-auto btn-bubbly-primary text-base py-3.5 px-6 shadow-bubbly-primary"
        >
          <RotateCcw className="w-5 h-5" /> Play Again
        </button>

        <Link
          to="/categories"
          onClick={playClick}
          className="w-full sm:w-auto btn-bubbly-purple text-base py-3.5 px-6 shadow-bubbly-purple"
        >
          <BookOpen className="w-5 h-5" /> Try Another Category
        </Link>

        <Link
          to="/progress"
          onClick={playClick}
          className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 font-black text-slate-700 text-base py-3.5 px-6 rounded-2xl transition-all"
        >
          <BarChart3 className="w-5 h-5 inline mr-1 text-slate-500" /> View My Progress
        </Link>

        <Link
          to="/"
          onClick={playClick}
          className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 font-black text-slate-700 text-base py-3.5 px-6 rounded-2xl transition-all"
        >
          <Home className="w-5 h-5 inline mr-1 text-slate-500" /> Home
        </Link>
      </div>

    </div>
  );
};
