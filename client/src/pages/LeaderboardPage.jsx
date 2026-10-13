import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Flame, Star, Sparkles, Search, Award } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';

export const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { activePlayer } = useAuth();
  const { playClick } = useSound();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await api.getLeaderboard(20);
      if (res && res.success && res.data) {
        setLeaderboard(res.data);
      }
      setLoading(false);
    };
    fetchLeaderboard();
  }, []);

  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  const filteredRest = rest.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-black text-amber-700 uppercase tracking-widest bg-amber-100 px-3.5 py-1 rounded-full">
          🏆 Young Achievers Podium
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          QuizKids Leaderboard
        </h1>
        <p className="text-base sm:text-lg font-bold text-slate-500">
          Celebrate our superstar young learners! Play quizzes, score points, and climb to the top of the podium!
        </p>
      </div>

      {/* =========================================
          TOP 3 PODIUM DISPLAY
          ========================================= */}
      {top3.length >= 3 && (
        <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end pt-8 pb-4 max-w-3xl mx-auto">
          
          {/* 2nd Place Silver */}
          <div className="card-playful border-2 border-slate-200 text-center flex flex-col items-center justify-between p-3 sm:p-6 bg-gradient-to-b from-slate-50 to-white transform hover:-translate-y-1">
            <span className="text-3xl sm:text-4xl">🥈</span>
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl my-2 shadow-inner">
              {top3[1].avatar || '🦉'}
            </div>
            <h4 className="font-black text-sm sm:text-base text-slate-800 truncate w-full">
              {top3[1].name}
            </h4>
            <p className="text-xs sm:text-sm font-black text-slate-600">
              {top3[1].totalScore} pts
            </p>
            <div className="mt-2 text-[10px] sm:text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              2nd Rank
            </div>
          </div>

          {/* 1st Place Gold Champion */}
          <div className="card-playful border-3 border-amber-300 text-center flex flex-col items-center justify-between p-4 sm:p-8 bg-gradient-to-b from-amber-50 to-white shadow-bubbly-yellow -translate-y-4 hover:-translate-y-5">
            <div className="flex items-center gap-1 text-amber-500 font-black text-xs">
              <Sparkles className="w-4 h-4" /> CHAMPION
            </div>
            <span className="text-4xl sm:text-5xl my-1">🥇</span>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-4xl my-2 shadow-inner animate-wiggle">
              {top3[0].avatar || '🦁'}
            </div>
            <h4 className="font-black text-base sm:text-lg text-amber-950 truncate w-full">
              {top3[0].name}
            </h4>
            <p className="text-sm sm:text-lg font-black text-amber-600">
              {top3[0].totalScore} pts
            </p>
            <div className="mt-2 text-xs font-black text-amber-900 bg-amber-200 px-3 py-1 rounded-full shadow-sm">
              🏆 #1 Superstar
            </div>
          </div>

          {/* 3rd Place Bronze */}
          <div className="card-playful border-2 border-amber-100 text-center flex flex-col items-center justify-between p-3 sm:p-6 bg-gradient-to-b from-orange-50/50 to-white transform hover:-translate-y-1">
            <span className="text-3xl sm:text-4xl">🥉</span>
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl my-2 shadow-inner">
              {top3[2].avatar || '🚀'}
            </div>
            <h4 className="font-black text-sm sm:text-base text-slate-800 truncate w-full">
              {top3[2].name}
            </h4>
            <p className="text-xs sm:text-sm font-black text-slate-600">
              {top3[2].totalScore} pts
            </p>
            <div className="mt-2 text-[10px] sm:text-xs font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
              3rd Rank
            </div>
          </div>

        </div>
      )}

      {/* =========================================
          ACTIVE PLAYER STANDING BANNER
          ========================================= */}
      <div className="bg-purple-600 rounded-3xl p-5 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-bubbly-purple">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner">
            {activePlayer?.avatar || '🦁'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black bg-yellow-400 text-slate-900 px-2.5 py-0.5 rounded-full">
                Your Player Profile
              </span>
            </div>
            <h3 className="text-xl font-black">{activePlayer?.name || 'Explorer'}</h3>
            <p className="text-xs font-semibold text-purple-200">
              Keep answering quizzes to climb the global ranks!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/10 px-5 py-3 rounded-2xl border border-white/20 text-center">
          <div>
            <p className="text-xs text-purple-200 font-bold">Total Points</p>
            <p className="text-xl font-black text-yellow-300">⭐ {activePlayer?.totalScore || 0}</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div>
            <p className="text-xs text-purple-200 font-bold">Quizzes Done</p>
            <p className="text-xl font-black">{activePlayer?.quizzesCompleted || 0}</p>
          </div>
        </div>
      </div>

      {/* =========================================
          FULL LEADERBOARD TABLE
          ========================================= */}
      <div className="bg-white rounded-3xl p-6 shadow-bubbly border-2 border-slate-100 space-y-4">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <span>🎖️</span> Full Rankings Table
          </h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search player name..."
              className="w-full pl-10 pr-3 py-2 bg-slate-50 border-2 border-slate-200 focus:border-purple-400 focus:bg-white rounded-xl text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-bold">
            <thead>
              <tr className="border-b-2 border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                <th className="py-3 px-3">Rank</th>
                <th className="py-3 px-3">Player</th>
                <th className="py-3 px-3">Score</th>
                <th className="py-3 px-3">Quizzes</th>
                <th className="py-3 px-3">Best Streak</th>
                <th className="py-3 px-3">Badges</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leaderboard.map((player, idx) => (
                <tr key={player.id || idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-3">
                    <span className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center ${
                      idx === 0 ? 'bg-amber-100 text-amber-900' :
                      idx === 1 ? 'bg-slate-200 text-slate-800' :
                      idx === 2 ? 'bg-orange-100 text-orange-900' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      #{player.rank || idx + 1}
                    </span>
                  </td>
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{player.avatar || '🦁'}</span>
                      <span className="font-black text-slate-800">{player.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-3 font-black text-purple-600">
                    {player.totalScore} pts
                  </td>
                  <td className="py-4 px-3 text-slate-600">
                    {player.quizzesCompleted}
                  </td>
                  <td className="py-4 px-3 text-orange-500">
                    🔥 {player.highestStreak || 0}
                  </td>
                  <td className="py-4 px-3">
                    <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded-lg border border-amber-200 text-xs font-black">
                      ⭐ {player.badgeCount || (player.badges ? player.badges.length : 0)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
