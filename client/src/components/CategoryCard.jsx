import React from 'react';
import { Play, Sparkles, HelpCircle, Award } from 'lucide-react';
import { useSound } from '../context/SoundContext';

export const CategoryCard = ({ category, onStartQuiz, onCustomize }) => {
  const { playClick } = useSound();

  return (
    <div className="card-playful group hover:-translate-y-2 flex flex-col justify-between relative overflow-hidden bg-white border-3 border-slate-100 hover:border-sky-300">
      
      {/* Top Banner Gradient Pill */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-100 to-indigo-100 border-2 border-sky-200 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform">
          {category.icon}
        </div>
        <div className="flex flex-col items-end">
          <span className="bg-sky-100 text-sky-800 text-xs font-black px-2.5 py-1 rounded-full shadow-inner">
            {category.questionCount || category.sampleQuestions || 10}+ Questions
          </span>
          <span className="text-[11px] font-extrabold text-amber-600 flex items-center gap-1 mt-1">
            <Award className="w-3 h-3 text-amber-500" /> {category.badge || 'Badge Award'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 mb-5">
        <h3 className="text-xl font-black text-slate-800 group-hover:text-sky-600 transition-colors">
          {category.name}
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-slate-500 line-clamp-2">
          {category.description}
        </p>
      </div>

      {/* Difficulties available */}
      <div className="flex items-center gap-1.5 mb-4 text-[11px] font-black text-slate-500">
        <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-lg border border-emerald-200">
          🟢 Easy
        </span>
        <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-lg border border-amber-200">
          🟡 Medium
        </span>
        <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded-lg border border-rose-200">
          🔴 Challenge
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
        <button
          onClick={() => {
            playClick();
            onStartQuiz(category.name);
          }}
          className="flex-1 btn-bubbly-primary text-sm py-2.5 shadow-sm"
        >
          <Play className="w-4 h-4 fill-white" /> Quick Play
        </button>
        <button
          onClick={() => {
            playClick();
            onCustomize(category);
          }}
          title="Customize Difficulty & Length"
          className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all"
        >
          ⚙️
        </button>
      </div>

    </div>
  );
};
