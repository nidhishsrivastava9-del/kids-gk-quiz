import React from 'react';
import { Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export const BadgeCard = ({ badge, isUnlocked = false }) => {
  return (
    <div className={`p-4 rounded-3xl border-2 transition-all relative overflow-hidden flex flex-col items-center text-center ${
      isUnlocked
        ? 'bg-gradient-to-b from-white to-amber-50/50 border-amber-300 shadow-bubbly group hover:scale-105'
        : 'bg-slate-50 border-slate-200 opacity-60 grayscale'
    }`}>
      
      {/* Status Pill */}
      <div className="absolute top-3 right-3">
        {isUnlocked ? (
          <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-500" /> Unlocked
          </span>
        ) : (
          <span className="bg-slate-200 text-slate-600 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
            <Lock className="w-3 h-3 text-slate-500" /> Locked
          </span>
        )}
      </div>

      {/* Badge Icon Medallion */}
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-3 shadow-inner ${
        isUnlocked 
          ? 'bg-gradient-to-tr from-amber-200 via-yellow-300 to-amber-400 border-2 border-amber-300 animate-wiggle' 
          : 'bg-slate-200 text-slate-400'
      }`}>
        {badge.icon}
      </div>

      {/* Badge Name & Desc */}
      <h4 className="font-extrabold text-sm text-slate-800 mb-1">
        {badge.name}
      </h4>
      <p className="text-xs font-semibold text-slate-500 line-clamp-2 leading-tight">
        {badge.description}
      </p>

      {/* Category tag */}
      <div className="mt-3 pt-2 border-t border-slate-100 w-full text-[10px] font-black text-slate-400 uppercase tracking-wider">
        {badge.category}
      </div>

    </div>
  );
};
