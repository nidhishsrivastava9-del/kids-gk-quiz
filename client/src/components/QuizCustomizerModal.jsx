import React, { useState } from 'react';
import { X, Play, Clock, Sparkles, Target, Zap } from 'lucide-react';
import { useSound } from '../context/SoundContext';
import { useQuiz } from '../context/QuizContext';

export const QuizCustomizerModal = ({ isOpen, onClose, defaultCategory = 'Mixed GK' }) => {
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCount, setSelectedCount] = useState(10);
  const { playClick } = useSound();
  const { startQuiz, isLoading } = useQuiz();

  if (!isOpen) return null;

  const handleStart = async () => {
    playClick();
    onClose();
    await startQuiz(selectedCategory, selectedDifficulty, selectedCount);
  };

  const difficulties = [
    { id: 'all', name: '🌈 All Levels', desc: 'A fun balanced mix of questions' },
    { id: 'Easy', name: '🟢 Easy', desc: 'Great for younger learners (Ages 6-8)' },
    { id: 'Medium', name: '🟡 Medium', desc: 'Good challenge for curious minds (Ages 8-10)' },
    { id: 'Challenge', name: '🔴 Challenge', desc: 'Extra brain workout! (Ages 10-12)' }
  ];

  const counts = [
    { count: 5, label: '5 Questions', time: '~2 mins', icon: Zap },
    { count: 10, label: '10 Questions', time: '~5 mins', icon: Target },
    { count: 20, label: '20 Questions', time: '~10 mins', icon: Sparkles }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-pop">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-sky-200 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => {
            playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-yellow-500 rounded-3xl mx-auto flex items-center justify-center text-3xl shadow-bubbly-yellow mb-3">
            🎯
          </div>
          <h3 className="text-2xl font-black text-slate-800">
            Customize Your Quiz!
          </h3>
          <p className="text-sm font-bold text-slate-500">
            Playing: <span className="text-purple-600">{selectedCategory}</span>
          </p>
        </div>

        {/* Difficulty Selection */}
        <div className="mb-6">
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
            Select Difficulty:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {difficulties.map(diff => (
              <button
                key={diff.id}
                type="button"
                onClick={() => {
                  playClick();
                  setSelectedDifficulty(diff.id);
                }}
                className={`p-3 rounded-2xl text-left border-2 transition-all ${
                  selectedDifficulty === diff.id
                    ? 'bg-sky-50 border-sky-500 shadow-sm'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <p className="font-black text-sm text-slate-800">{diff.name}</p>
                <p className="text-[11px] font-semibold text-slate-500 mt-0.5">{diff.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Question Count Selection */}
        <div className="mb-8">
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
            Number of Questions:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {counts.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.count}
                  type="button"
                  onClick={() => {
                    playClick();
                    setSelectedCount(item.count);
                  }}
                  className={`p-3 rounded-2xl text-center border-2 transition-all flex flex-col items-center justify-center ${
                    selectedCount === item.count
                      ? 'bg-purple-50 border-purple-500 text-purple-900 shadow-sm'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-1 text-purple-600" />
                  <p className="font-extrabold text-sm">{item.count} Questions</p>
                  <p className="text-[11px] font-bold text-slate-400">{item.time}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={isLoading}
          className="w-full btn-bubbly-yellow text-lg py-4 shadow-bubbly-yellow"
        >
          <Play className="w-5 h-5 fill-slate-900" />
          {isLoading ? 'Preparing Quiz...' : 'Start Playing Now! 🚀'}
        </button>

      </div>
    </div>
  );
};
