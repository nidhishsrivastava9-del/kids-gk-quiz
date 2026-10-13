import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Filter, Play } from 'lucide-react';
import { CategoryCard } from '../components/CategoryCard';
import { QuizCustomizerModal } from '../components/QuizCustomizerModal';
import { CATEGORIES_DATA } from '../data/categories';
import { api } from '../services/api';
import { useQuiz } from '../context/QuizContext';
import { useSound } from '../context/SoundContext';

export const CategoriesPage = () => {
  const [categories, setCategories] = useState(CATEGORIES_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [modalCategory, setModalCategory] = useState(null);

  const { startQuiz } = useQuiz();
  const { playClick } = useSound();

  useEffect(() => {
    // Fetch live question counts from backend if available
    const loadCategories = async () => {
      const res = await api.getCategories();
      if (res && res.success && res.data) {
        // Merge counts with local visual themes
        const updated = CATEGORIES_DATA.map(localCat => {
          const remote = res.data.find(r => r.name.toLowerCase() === localCat.name.toLowerCase() || r.slug === localCat.slug);
          return {
            ...localCat,
            questionCount: remote ? remote.questionCount : localCat.sampleQuestions
          };
        });
        setCategories(updated);
      }
    };
    loadCategories();
  }, []);

  const handleStartQuickQuiz = (categoryName) => {
    playClick();
    startQuiz(categoryName, 'all', 10);
  };

  const handleOpenCustomize = (category) => {
    setModalCategory(category.name);
  };

  const filterTabs = ['All', 'Nature & Earth', 'Space & Science', 'History & World', 'India & Culture'];

  const filteredCategories = categories.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Nature & Earth') return ['Animals', 'Nature'].includes(cat.name);
    if (selectedFilter === 'Space & Science') return ['Space', 'Science'].includes(cat.name);
    if (selectedFilter === 'History & World') return ['World', 'History', 'Sports'].includes(cat.name);
    if (selectedFilter === 'India & Culture') return ['India', 'Arts & Culture', 'Mixed GK'].includes(cat.name);

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-black text-sky-600 uppercase tracking-widest bg-sky-100 px-3.5 py-1 rounded-full">
          📂 Discover General Knowledge Topics
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Choose Your Quiz Adventure!
        </h1>
        <p className="text-base sm:text-lg font-bold text-slate-500">
          Pick any topic below to test your smarts, learn fascinating facts, and win cool trophies!
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-bubbly border-2 border-slate-100 space-y-4">
        
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search topics (e.g. Animals, Planets, India, Science)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-sky-400 focus:bg-white focus:outline-none font-bold text-sm sm:text-base text-slate-800 placeholder:text-slate-400 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider pl-1 hidden sm:inline">
            Filter:
          </span>
          {filterTabs.map(tab => (
            <button
              key={tab}
              onClick={() => {
                playClick();
                setSelectedFilter(tab);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all ${
                selectedFilter === tab
                  ? 'bg-sky-500 text-white shadow-bubbly-primary'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

      </div>

      {/* Categories Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onStartQuiz={handleStartQuickQuiz}
              onCustomize={handleOpenCustomize}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border-2 border-slate-100 p-8">
          <span className="text-5xl mb-3 block">🔍</span>
          <h3 className="text-xl font-black text-slate-800 mb-1">No matching topics found!</h3>
          <p className="text-sm font-bold text-slate-400 mb-4">Try searching for something else like "Space" or "Animals".</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedFilter('All');
            }}
            className="btn-bubbly-primary text-sm py-2 px-5"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Customizer Modal */}
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
