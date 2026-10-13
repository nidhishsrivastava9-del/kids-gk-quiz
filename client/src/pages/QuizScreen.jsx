import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, 
  Clock, 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  HelpCircle,
  Award
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { useSound } from '../context/SoundContext';

export const QuizScreen = () => {
  const {
    category,
    difficulty,
    currentQuestion,
    currentIndex,
    totalQuestions,
    currentScore,
    currentStreak,
    selectedOption,
    isAnswered,
    isCurrentCorrect,
    revealedExplanation,
    correctOptionRevealed,
    timerSeconds,
    handleSelectOption,
    checkAnswer,
    nextQuestion,
    exitQuiz,
    isQuizActive
  } = useQuiz();

  const { isMuted, toggleSound, playClick } = useSound();
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const navigate = useNavigate();

  // Redirect if no active quiz
  useEffect(() => {
    if (!isQuizActive && !currentQuestion) {
      navigate('/categories');
    }
  }, [isQuizActive, currentQuestion, navigate]);

  // Keyboard navigation support (1, 2, 3, 4 or A, B, C, D, and Enter to proceed)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!currentQuestion) return;

      if (!isAnswered) {
        if (e.key === '1' || e.key.toUpperCase() === 'A') {
          handleSelectOption(currentQuestion.options[0]);
        } else if (e.key === '2' || e.key.toUpperCase() === 'B') {
          handleSelectOption(currentQuestion.options[1]);
        } else if (e.key === '3' || e.key.toUpperCase() === 'C') {
          handleSelectOption(currentQuestion.options[2]);
        } else if (e.key === '4' || e.key.toUpperCase() === 'D') {
          handleSelectOption(currentQuestion.options[3]);
        } else if (e.key === 'Enter' && selectedOption) {
          checkAnswer();
        }
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          nextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, isAnswered, selectedOption, handleSelectOption, checkAnswer, nextQuestion]);

  if (!currentQuestion) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl animate-bounce mb-3">🎈</div>
        <p className="font-extrabold text-slate-600 text-lg">Loading your exciting quiz...</p>
      </div>
    );
  }

  // Format timer into MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const optionLetters = ['A', 'B', 'C', 'D'];
  const optionColors = [
    'hover:border-sky-400 focus:ring-sky-200',
    'hover:border-purple-400 focus:ring-purple-200',
    'hover:border-amber-400 focus:ring-amber-200',
    'hover:border-emerald-400 focus:ring-emerald-200'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10 space-y-6">
      
      {/* =========================================
          TOP QUIZ BAR (Category, Progress, Streak, Score, Timer, Exit)
          ========================================= */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-bubbly border-2 border-slate-100 space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Category Pill */}
          <div className="flex items-center gap-2">
            <span className="bg-purple-100 text-purple-900 font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-sm">
              <span>🎯 {category}</span>
              <span className="text-purple-400">•</span>
              <span className="text-purple-600 font-bold">{difficulty === 'all' ? 'All Levels' : difficulty}</span>
            </span>
          </div>

          {/* Center: Live Streak & Points Counter */}
          <div className="flex items-center gap-2.5">
            
            {/* Live Streak Flame */}
            {currentStreak > 1 && (
              <div className="bg-orange-50 border-2 border-orange-300 text-orange-600 font-black text-xs sm:text-sm px-3 py-1 rounded-2xl flex items-center gap-1 animate-bounce shadow-sm">
                <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
                <span>{currentStreak} Streak! 🔥</span>
              </div>
            )}

            {/* Score pill */}
            <div className="bg-amber-50 border-2 border-amber-300 text-amber-900 font-black text-xs sm:text-sm px-3 py-1 rounded-2xl flex items-center gap-1 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{currentScore} pts</span>
            </div>

            {/* Timer */}
            <div className="bg-slate-100 text-slate-600 font-extrabold text-xs sm:text-sm px-2.5 py-1 rounded-2xl flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(timerSeconds)}</span>
            </div>

          </div>

          {/* Sound & Exit buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleSound}
              title={isMuted ? 'Turn Sound On' : 'Turn Sound Off'}
              className="p-2 rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-500" />}
            </button>
            <button
              onClick={() => setShowExitConfirm(true)}
              title="Exit Quiz"
              className="p-2 rounded-2xl bg-slate-100 text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Progress Bar & Question Step */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-black text-slate-500">
            <span>Question {currentIndex + 1} of {totalQuestions}</span>
            <span className="text-sky-600 font-black">{progressPercent}% Completed</span>
          </div>
          <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div 
              className="h-full bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500 rounded-full transition-all duration-300 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

      </div>

      {/* =========================================
          QUESTION CARD
          ========================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-bubbly-lg border-3 border-sky-100 space-y-6 relative overflow-hidden">
        
        {/* Category & Difficulty Tag */}
        <div className="flex items-center justify-between text-xs font-black">
          <span className="text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <HelpCircle className="w-4 h-4 text-sky-500" /> Question #{currentIndex + 1}
          </span>
          <span className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full border border-sky-200">
            +{currentQuestion.points || 10} Points
          </span>
        </div>

        {/* Question Text */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-snug tracking-tight">
          {currentQuestion.question}
        </h2>

        {/* =========================================
            4 LARGE ANSWER CHOICE BUTTONS
            ========================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          {currentQuestion.options.map((option, idx) => {
            const letter = optionLetters[idx];
            const isSelected = selectedOption === option;

            // Determine styling states after answer
            let buttonStyle = 'bg-white border-2 border-slate-200 text-slate-800 hover:bg-sky-50/50';
            let badgeStyle = 'bg-slate-100 text-slate-700';

            if (!isAnswered) {
              if (isSelected) {
                buttonStyle = 'bg-sky-50 border-3 border-sky-500 text-sky-950 shadow-md scale-[1.01]';
                badgeStyle = 'bg-sky-500 text-white';
              }
            } else {
              // Answer is submitted
              const isOptionCorrect = (correctOptionRevealed || '').trim().toLowerCase() === option.trim().toLowerCase();

              if (isOptionCorrect) {
                buttonStyle = 'bg-emerald-100 border-3 border-emerald-500 text-emerald-950 shadow-bubbly-green scale-[1.01]';
                badgeStyle = 'bg-emerald-500 text-white';
              } else if (isSelected && !isCurrentCorrect) {
                buttonStyle = 'bg-rose-50 border-3 border-rose-400 text-rose-950 opacity-80';
                badgeStyle = 'bg-rose-500 text-white';
              } else {
                buttonStyle = 'bg-slate-50 border-2 border-slate-200 text-slate-400 opacity-60';
                badgeStyle = 'bg-slate-200 text-slate-400';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isAnswered}
                onClick={() => {
                  playClick();
                  handleSelectOption(option);
                }}
                className={`p-4 sm:p-5 rounded-2xl font-black text-left text-base sm:text-lg flex items-center gap-3.5 transition-all active:translate-y-0.5 focus:outline-none ${buttonStyle}`}
              >
                <span className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-black text-sm sm:text-base shrink-0 shadow-sm transition-colors ${badgeStyle}`}>
                  {letter}
                </span>
                <span className="flex-1 leading-snug">{option}</span>

                {isAnswered && (correctOptionRevealed || '').trim().toLowerCase() === option.trim().toLowerCase() && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 animate-bounce" />
                )}
              </button>
            );
          })}
        </div>

        {/* =========================================
            INSTANT EDUCATIONAL FEEDBACK CARD
            ========================================= */}
        {isAnswered && (
          <div className={`p-5 rounded-2xl border-3 animate-pop space-y-2 ${
            isCurrentCorrect
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                {isCurrentCorrect ? '🎉' : '💡'}
              </span>
              <h4 className="text-lg font-black">
                {isCurrentCorrect
                  ? 'Great Job! That is 100% correct!'
                  : 'Almost! Keep Learning & Growing!'}
              </h4>
            </div>

            {/* Explanation */}
            <p className="text-sm sm:text-base font-bold leading-relaxed pl-8">
              {revealedExplanation || "Every question you answer makes your brain stronger and smarter!"}
            </p>
          </div>
        )}

        {/* =========================================
            BOTTOM ACTION BUTTONS
            ========================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          
          <p className="text-xs font-extrabold text-slate-400 text-center sm:text-left">
            {!isAnswered ? '💡 Tip: Select an answer, then click "Check Answer"' : '🌟 Read the explanation above at your own speed!'}
          </p>

          {!isAnswered ? (
            <button
              onClick={checkAnswer}
              disabled={!selectedOption}
              className={`w-full sm:w-auto text-base sm:text-lg py-3.5 px-8 font-black rounded-2xl shadow-bubbly-primary transition-all ${
                selectedOption
                  ? 'btn-bubbly-primary'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              Check Answer ✨
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="w-full sm:w-auto btn-bubbly-yellow text-base sm:text-lg py-3.5 px-8 font-black text-slate-900 shadow-bubbly-yellow animate-bounce"
            >
              {currentIndex + 1 < totalQuestions ? (
                <>Next Question <ArrowRight className="w-5 h-5 inline ml-1" /></>
              ) : (
                <>See Final Results 🏆</>
              )}
            </button>
          )}

        </div>

      </div>

      {/* =========================================
          EXIT QUIZ CONFIRMATION MODAL
          ========================================= */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-pop">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border-4 border-rose-200 space-y-4">
            <span className="text-5xl block">🛑</span>
            <h3 className="text-2xl font-black text-slate-800">Exit this Quiz?</h3>
            <p className="text-sm font-bold text-slate-500">
              Your progress in this quiz will not be saved if you leave now.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 font-extrabold text-slate-700 rounded-2xl text-sm"
              >
                Keep Playing
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  exitQuiz();
                }}
                className="flex-1 py-3 bg-rose-500 hover:bg-rose-600 font-extrabold text-white rounded-2xl text-sm shadow-sm"
              >
                Yes, Exit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
