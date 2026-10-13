import React, { useState } from 'react';
import { X, Sparkles, User, Lock, Mail, ArrowRight } from 'lucide-react';
import { AvatarPicker } from '../components/AvatarPicker';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';

export const AuthModals = () => {
  const { authModalOpen, setAuthModalOpen, authMode, setAuthMode, login, register } = useAuth();
  const { playClick, playCorrect } = useSound();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('🦁');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!authModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (authMode === 'login') {
      const res = await login(email, password);
      if (!res.success) {
        setError(res.message);
      } else {
        playCorrect();
      }
    } else {
      const res = await register(name, email, password, avatar);
      if (!res.success) {
        setError(res.message);
      } else {
        playCorrect();
      }
    }
    setLoading(false);
  };

  const handleSwitchMode = (mode) => {
    playClick();
    setError('');
    setAuthMode(mode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-pop">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-4 border-sky-200 relative max-h-[95vh] overflow-y-auto">
        
        <button
          onClick={() => {
            playClick();
            setAuthModalOpen(false);
          }}
          className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-sky-400 to-purple-500 rounded-3xl mx-auto flex items-center justify-center text-3xl shadow-bubbly mb-3">
            {authMode === 'login' ? '🚀' : '🎈'}
          </div>
          <h3 className="text-2xl font-black text-slate-800">
            {authMode === 'login' ? 'Welcome Back, Explorer!' : 'Join QuizKids Family!'}
          </h3>
          <p className="text-xs sm:text-sm font-bold text-slate-500 mt-1">
            {authMode === 'login'
              ? 'Log in to sync your badges and scores across devices.'
              : 'Create your account to save your learning journey!'}
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-bold text-xs">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                Your Name / Superhero Nickname:
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Leo The Great"
                  className="w-full pl-10 pr-3 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-bold focus:border-sky-400 focus:outline-none"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-black text-slate-700 uppercase mb-1">
              Email Address:
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="parent-or-kid@example.com"
                className="w-full pl-10 pr-3 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-bold focus:border-sky-400 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-700 uppercase mb-1">
              Password:
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-bold focus:border-sky-400 focus:outline-none"
                required
              />
            </div>
          </div>

          {authMode === 'register' && (
            <AvatarPicker selectedAvatar={avatar} onSelect={setAvatar} />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-bubbly-primary text-base py-3.5 shadow-bubbly-primary mt-2"
          >
            {loading ? 'Please wait...' : authMode === 'login' ? 'Log In & Play! 🚀' : 'Create My Profile 🎉'}
          </button>

        </form>

        {/* Switch mode */}
        <div className="mt-6 text-center text-xs font-bold text-slate-500 border-t border-slate-100 pt-4">
          {authMode === 'login' ? (
            <p>
              New here?{' '}
              <button
                type="button"
                onClick={() => handleSwitchMode('register')}
                className="text-purple-600 font-extrabold hover:underline"
              >
                Create an account
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => handleSwitchMode('login')}
                className="text-sky-600 font-extrabold hover:underline"
              >
                Log In
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
