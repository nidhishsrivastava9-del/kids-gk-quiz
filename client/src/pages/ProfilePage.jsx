import React, { useState } from 'react';
import { 
  User, 
  Sparkles, 
  Save, 
  Award, 
  Flame, 
  LogOut, 
  CheckCircle2 
} from 'lucide-react';
import { AvatarPicker } from '../components/AvatarPicker';
import { BadgeCard } from '../components/BadgeCard';
import { BADGES_DATA } from '../data/badges';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';

export const ProfilePage = () => {
  const { user, guest, activePlayer, isLoggedIn, updateProfile, logout, openLogin } = useAuth();
  const { playClick, playCorrect } = useSound();

  const [name, setName] = useState(activePlayer?.name || 'Explorer');
  const [avatar, setAvatar] = useState(activePlayer?.avatar || '🦁');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    playClick();
    const ok = await updateProfile(name, avatar);
    if (ok) {
      playCorrect();
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const earnedBadges = new Set(activePlayer?.badges || ['First Step']);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-black text-purple-600 bg-purple-100 px-3.5 py-1 rounded-full uppercase tracking-wider">
          🌟 Your Player Identity
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Player Profile & Settings
        </h1>
        <p className="text-sm font-bold text-slate-500">
          Customize your nickname and pick your favorite character avatar!
        </p>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-100 border-2 border-emerald-300 text-emerald-900 font-extrabold text-sm p-4 rounded-2xl flex items-center justify-center gap-2 animate-pop">
          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          <span>Profile saved successfully! ✨</span>
        </div>
      )}

      {/* Profile Card & Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-bubbly border-2 border-slate-100 space-y-6">
        
        {/* Avatar Showcase */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <div className="w-24 h-24 rounded-3xl bg-purple-100 border-3 border-purple-300 flex items-center justify-center text-5xl shadow-inner animate-wiggle">
            {avatar}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h3 className="text-2xl font-black text-slate-800">{name}</h3>
            <p className="text-xs font-bold text-purple-600">
              {isLoggedIn ? `Logged In • ${user?.email}` : 'Playing in Guest Mode (Progress saved on this device)'}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2 text-xs font-black">
              <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg">
                ⭐ {activePlayer?.totalScore || 0} Total Score
              </span>
              <span className="bg-orange-100 text-orange-900 px-2.5 py-1 rounded-lg">
                🔥 {activePlayer?.streak || 0} Best Streak
              </span>
              <span className="bg-purple-100 text-purple-900 px-2.5 py-1 rounded-lg">
                🏆 {earnedBadges.size} Badges
              </span>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-6">
          
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase mb-1">
              Change Your Display Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-bold focus:border-purple-400 focus:outline-none"
              required
            />
          </div>

          <AvatarPicker selectedAvatar={avatar} onSelect={setAvatar} />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={() => {
                  playClick();
                  logout();
                }}
                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4" /> Log out of account
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  playClick();
                  openLogin();
                }}
                className="text-xs font-bold text-sky-600 hover:underline"
              >
                💡 Want to sync to another device? Sign in here
              </button>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto btn-bubbly-primary text-sm py-3 px-8 shadow-sm"
            >
              <Save className="w-4 h-4" /> Save Profile
            </button>
          </div>

        </form>

      </div>

      {/* Badges Earned Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-bubbly border-2 border-slate-100 space-y-4">
        <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
          <span>🎖️</span> Your Unlocked Badges
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {BADGES_DATA.filter(b => earnedBadges.has(b.name)).map(badge => (
            <BadgeCard key={badge.id} badge={badge} isUnlocked={true} />
          ))}
        </div>
      </div>

    </div>
  );
};
