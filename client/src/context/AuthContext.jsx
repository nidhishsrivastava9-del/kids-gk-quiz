import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [guest, setGuest] = useState(() => {
    const saved = localStorage.getItem('quizkids_guest');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      id: `guest-${Date.now()}`,
      name: 'Super Explorer',
      avatar: '🦁',
      totalScore: 0,
      quizzesCompleted: 0,
      correctAnswers: 0,
      badges: ['First Step'],
      streak: 0
    };
  });
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // Persist guest data
  useEffect(() => {
    localStorage.setItem('quizkids_guest', JSON.stringify(guest));
  }, [guest]);

  // Check logged in user on mount
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('quizkids_token');
      if (token) {
        const res = await api.getMe();
        if (res && res.success && res.user) {
          setUser(res.user);
        } else {
          localStorage.removeItem('quizkids_token');
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    if (res.success && res.token) {
      localStorage.setItem('quizkids_token', res.token);
      setUser(res.user);
      setAuthModalOpen(false);
      return { success: true };
    }
    return { success: false, message: res.message || 'Login failed' };
  };

  const register = async (name, email, password, avatar) => {
    const res = await api.register({ name, email, password, avatar });
    if (res.success && res.token) {
      localStorage.setItem('quizkids_token', res.token);
      setUser(res.user);
      setAuthModalOpen(false);
      return { success: true };
    }
    return { success: false, message: res.message || 'Registration failed' };
  };

  const logout = () => {
    localStorage.removeItem('quizkids_token');
    setUser(null);
  };

  const updateProfile = async (name, avatar) => {
    if (user) {
      const res = await api.updateProfile({ name, avatar });
      if (res.success && res.user) {
        setUser(res.user);
        return true;
      }
    } else {
      setGuest(prev => ({ ...prev, name, avatar }));
      return true;
    }
    return false;
  };

  const recordGuestQuizResult = (resultData) => {
    if (!user) {
      setGuest(prev => {
        const newScore = (prev.totalScore || 0) + (resultData.score || 0);
        const newQuizzes = (prev.quizzesCompleted || 0) + 1;
        const newCorrect = (prev.correctAnswers || 0) + (resultData.correctAnswers || 0);
        const newStreak = Math.max(prev.streak || 0, resultData.highestStreak || 0);
        const newBadges = Array.from(new Set([...(prev.badges || []), ...(resultData.newBadgesUnlocked || []).map(b => b.name)]));

        return {
          ...prev,
          totalScore: newScore,
          quizzesCompleted: newQuizzes,
          correctAnswers: newCorrect,
          streak: newStreak,
          badges: newBadges
        };
      });
    }
  };

  const openLogin = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthMode('register');
    setAuthModalOpen(true);
  };

  const activePlayer = user || guest;

  return (
    <AuthContext.Provider value={{
      user,
      guest,
      activePlayer,
      isLoggedIn: !!user,
      loading,
      login,
      register,
      logout,
      updateProfile,
      recordGuestQuizResult,
      authModalOpen,
      setAuthModalOpen,
      authMode,
      setAuthMode,
      openLogin,
      openRegister
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
