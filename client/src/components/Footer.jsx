import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, ShieldCheck, Smile, HelpCircle } from 'lucide-react';
import { useSound } from '../context/SoundContext';

export const Footer = () => {
  const { playClick } = useSound();

  return (
    <footer className="bg-white border-t-4 border-sky-100 pt-12 pb-8 mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🌟</span>
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-purple-600 to-pink-500">
                QuizKids
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-500 leading-relaxed">
              Making General Knowledge fun, colorful, and rewarding for curious kids worldwide!
            </p>
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-black border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Kid-Safe & Ad-Free
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-sm font-bold text-slate-600">
              <li>
                <Link to="/" onClick={playClick} className="hover:text-sky-600 transition-colors">
                  🏠 Home
                </Link>
              </li>
              <li>
                <Link to="/categories" onClick={playClick} className="hover:text-sky-600 transition-colors">
                  📂 All Categories
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" onClick={playClick} className="hover:text-sky-600 transition-colors">
                  🏆 Young Achievers
                </Link>
              </li>
              <li>
                <Link to="/progress" onClick={playClick} className="hover:text-sky-600 transition-colors">
                  📊 My Badges & Progress
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-3">
              Popular Topics
            </h4>
            <ul className="space-y-2 text-sm font-bold text-slate-600">
              <li>
                <Link to="/categories" onClick={playClick} className="hover:text-purple-600 transition-colors">
                  🌌 Space & Planets
                </Link>
              </li>
              <li>
                <Link to="/categories" onClick={playClick} className="hover:text-purple-600 transition-colors">
                  🐾 Amazing Animals
                </Link>
              </li>
              <li>
                <Link to="/categories" onClick={playClick} className="hover:text-purple-600 transition-colors">
                  🇮🇳 Incredible India
                </Link>
              </li>
              <li>
                <Link to="/categories" onClick={playClick} className="hover:text-purple-600 transition-colors">
                  🔬 Fun Science
                </Link>
              </li>
            </ul>
          </div>

          {/* Parents & Teachers Info */}
          <div>
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-3">
              For Parents & Teachers
            </h4>
            <p className="text-xs font-semibold text-slate-500 leading-relaxed mb-3">
              Designed with education experts to foster curiosity, critical thinking, and confidence in young minds through encouraging micro-learning.
            </p>
            <Link
              to="/about"
              onClick={playClick}
              className="text-xs font-extrabold text-sky-600 hover:text-sky-700 underline"
            >
              Learn about our safe learning philosophy &rarr;
            </Link>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} QuizKids. Built for young champions everywhere.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> for learning and laughter
          </p>
        </div>
      </div>
    </footer>
  );
};
