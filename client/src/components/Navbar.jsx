import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  BookOpen, 
  Trophy, 
  BarChart3, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  User, 
  Settings, 
  Info,
  LogOut,
  Flame,
  Gamepad2
} from 'lucide-react';
import { useSound } from '../context/SoundContext';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMuted, toggleSound, playClick } = useSound();
  const { user, guest, activePlayer, isLoggedIn, logout, openLogin } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Sparkles },
    { name: 'Categories', path: '/categories', icon: BookOpen },
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { name: 'Progress', path: '/progress', icon: BarChart3 },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Admin', path: '/admin', icon: Settings }
  ];

  const handleNavClick = () => {
    playClick();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-4 border-sky-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link 
            to="/" 
            onClick={playClick}
            className="flex items-center gap-3 group focus:outline-none focus:ring-4 focus:ring-sky-200 rounded-2xl p-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-bubbly transform group-hover:rotate-6 group-hover:scale-105 transition-transform duration-200">
              <span className="text-2xl">🌟</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-purple-600 to-pink-500">
                  QuizKids
                </span>
                <span className="bg-amber-400 text-amber-950 font-black text-xs px-2 py-0.5 rounded-full shadow-sm">
                  GK
                </span>
              </div>
              <p className="text-[11px] font-bold text-slate-400 -mt-1 tracking-wider uppercase">
                Learn • Play • Explore
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={playClick}
                  className={`flex items-center gap-2 px-3 py-2 rounded-2xl font-extrabold text-sm lg:text-base transition-all duration-150 ${
                    isActive 
                      ? 'bg-sky-100 text-sky-700 shadow-inner' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-purple-600'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Sound Toggle Button */}
            <button
              onClick={toggleSound}
              aria-label={isMuted ? 'Turn Sound On' : 'Turn Sound Off'}
              title={isMuted ? 'Turn Sound On' : 'Turn Sound Off'}
              className={`p-2.5 rounded-2xl font-bold border-2 transition-all duration-150 flex items-center gap-1.5 text-sm ${
                isMuted 
                  ? 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200' 
                  : 'bg-amber-100 border-amber-300 text-amber-700 hover:bg-amber-200 shadow-sm'
              }`}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-5 h-5 text-slate-400" />
                  <span className="text-xs">Sound Off</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-5 h-5 text-amber-600 animate-pulse" />
                  <span className="text-xs font-black">Sound On</span>
                </>
              )}
            </button>

            {/* User Profile / Guest Badge */}
            <Link
              to="/profile"
              onClick={playClick}
              className="flex items-center gap-2 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 px-3 py-1.5 rounded-2xl transition-all shadow-sm group"
            >
              <span className="text-xl group-hover:scale-125 transition-transform">
                {activePlayer?.avatar || '🦁'}
              </span>
              <div className="text-left">
                <p className="text-xs font-black text-purple-900 leading-tight">
                  {activePlayer?.name || 'Explorer'}
                </p>
                <div className="flex items-center gap-1 text-[11px] font-bold text-purple-600">
                  <span>⭐ {activePlayer?.totalScore || 0} pts</span>
                  {activePlayer?.streak > 2 && (
                    <span className="text-orange-500 flex items-center font-extrabold">
                      <Flame className="w-3 h-3 fill-orange-500 inline" /> {activePlayer.streak}
                    </span>
                  )}
                </div>
              </div>
            </Link>

            {/* Login / Logout */}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  playClick();
                  logout();
                }}
                title="Log out"
                className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
              >
                <LogOut className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  playClick();
                  openLogin();
                }}
                className="btn-bubbly-primary text-sm py-2 px-4 shadow-sm"
              >
                <User className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleSound}
              aria-label="Sound Toggle"
              className="p-2 rounded-xl bg-slate-100 text-slate-600"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-amber-500" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-2xl bg-sky-100 text-sky-700 hover:bg-sky-200 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b-4 border-sky-200 px-4 pt-3 pb-6 space-y-3 animate-pop shadow-xl">
          
          {/* User info card on mobile */}
          <div className="flex items-center justify-between bg-purple-50 p-3 rounded-2xl border border-purple-200">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">{activePlayer?.avatar || '🦁'}</span>
              <div>
                <p className="font-extrabold text-purple-950 text-sm">{activePlayer?.name || 'Explorer'}</p>
                <p className="text-xs font-bold text-purple-600">⭐ {activePlayer?.totalScore || 0} Total Points</p>
              </div>
            </div>
            <Link
              to="/profile"
              onClick={handleNavClick}
              className="text-xs font-bold bg-purple-600 text-white px-3 py-1.5 rounded-xl shadow-sm"
            >
              Profile
            </Link>
          </div>

          {/* Links list */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={handleNavClick}
                  className={`flex items-center gap-2 p-3 rounded-2xl font-bold text-sm ${
                    isActive ? 'bg-sky-500 text-white shadow-bubbly-primary' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Auth button */}
          <div className="pt-2">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  logout();
                  handleNavClick();
                }}
                className="w-full py-2.5 text-center text-sm font-bold text-red-600 bg-red-50 rounded-2xl"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={() => {
                  openLogin();
                  setMobileMenuOpen(false);
                }}
                className="w-full btn-bubbly-primary text-sm py-2.5 shadow-none"
              >
                <User className="w-4 h-4" /> Sign In / Save Progress
              </button>
            )}
          </div>

        </div>
      )}
    </header>
  );
};
