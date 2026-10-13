import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles, BookOpen, Smile, Award, Play } from 'lucide-react';
import { useSound } from '../context/SoundContext';

export const AboutPage = () => {
  const { playClick } = useSound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-black text-sky-600 bg-sky-100 px-3.5 py-1 rounded-full uppercase tracking-wider">
          ℹ️ Our Mission & Philosophy
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          About QuizKids
        </h1>
        <p className="text-base sm:text-lg font-bold text-slate-500">
          Learn • Play • Explore — Designed specifically for young learners aged 6–12.
        </p>
      </div>

      {/* Main Philosophy Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-bubbly border-2 border-slate-100 space-y-6">
        
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-400 to-purple-500 flex items-center justify-center text-3xl text-white shadow-bubbly">
            🌟
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Why We Built QuizKids</h2>
            <p className="text-xs font-bold text-purple-600">Educational games that inspire confidence</p>
          </div>
        </div>

        <div className="space-y-4 text-sm sm:text-base font-semibold text-slate-600 leading-relaxed">
          <p>
            General Knowledge is the key that unlocks curiosity about how our world, nature, science, history, and the universe work. However, traditional exams often feel stressful or tedious for young children.
          </p>
          <p>
            <strong className="text-slate-900 font-extrabold">QuizKids</strong> transforms GK learning into a cheerful, game-like adventure. With vibrant visuals, immediate positive cheering, friendly explanations, and exciting reward badges, every quiz feels like an achievement rather than a test.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-1.5">
            <div className="flex items-center gap-2 font-black text-sky-950 text-base">
              <ShieldCheck className="w-5 h-5 text-sky-600" /> 100% Safe & Age-Appropriate
            </div>
            <p className="text-xs font-bold text-slate-500">
              No ads, no external trackers, no violence, and no inappropriate content. Pure educational fun.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
            <div className="flex items-center gap-2 font-black text-emerald-950 text-base">
              <Smile className="w-5 h-5 text-emerald-600" /> Positive & Encouraging
            </div>
            <p className="text-xs font-bold text-slate-500">
              We never penalize or shame children for wrong answers. We celebrate curiosity with gentle guidance.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-1.5">
            <div className="flex items-center gap-2 font-black text-purple-950 text-base">
              <BookOpen className="w-5 h-5 text-purple-600" /> Educational Explanations
            </div>
            <p className="text-xs font-bold text-slate-500">
              Every single question includes a bite-sized child-friendly explanation to foster genuine learning.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5">
            <div className="flex items-center gap-2 font-black text-amber-950 text-base">
              <Award className="w-5 h-5 text-amber-600" /> Fun Gamification
            </div>
            <p className="text-xs font-bold text-slate-500">
              Unlockable badges, answer streaks, and level progression keep children motivated to learn daily.
            </p>
          </div>

        </div>

        {/* CTA banner inside */}
        <div className="pt-6 text-center">
          <Link
            to="/categories"
            onClick={playClick}
            className="btn-bubbly-primary text-base py-3.5 px-8 shadow-bubbly-primary"
          >
            <Play className="w-5 h-5 fill-white" /> Start Exploring Quizzes Now! 🚀
          </Link>
        </div>

      </div>

    </div>
  );
};
