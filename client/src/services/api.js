const API_BASE = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('quizkids_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const api = {
  // Categories
  async getCategories() {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      return await res.json();
    } catch (e) {
      console.warn('API getCategories error, fallback to static:', e);
      return { success: false, error: e.message };
    }
  },

  // Questions
  async getQuestions(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/questions?${query}`);
      if (!res.ok) throw new Error('Failed to fetch questions');
      return await res.json();
    } catch (e) {
      console.warn('API getQuestions error:', e);
      return { success: false, error: e.message };
    }
  },

  async createQuestion(questionData) {
    const res = await fetch(`${API_BASE}/questions`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(questionData)
    });
    return await res.json();
  },

  async updateQuestion(id, updateData) {
    const res = await fetch(`${API_BASE}/questions/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData)
    });
    return await res.json();
  },

  async deleteQuestion(id) {
    const res = await fetch(`${API_BASE}/questions/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return await res.json();
  },

  // Quiz
  async generateQuiz({ category = 'Mixed GK', difficulty = 'all', count = 10 }) {
    try {
      const res = await fetch(`${API_BASE}/quiz/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, difficulty, count })
      });
      if (!res.ok) throw new Error('Failed to generate quiz');
      return await res.json();
    } catch (e) {
      console.warn('API generateQuiz error:', e);
      return { success: false, error: e.message };
    }
  },

  async submitQuiz(payload) {
    try {
      const res = await fetch(`${API_BASE}/quiz/submit`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to submit quiz');
      return await res.json();
    } catch (e) {
      console.error('API submitQuiz error:', e);
      return { success: false, error: e.message };
    }
  },

  // Leaderboard
  async getLeaderboard(limit = 10) {
    try {
      const res = await fetch(`${API_BASE}/leaderboard?limit=${limit}`);
      if (!res.ok) throw new Error('Failed to fetch leaderboard');
      return await res.json();
    } catch (e) {
      console.warn('API getLeaderboard error:', e);
      return { success: false, error: e.message };
    }
  },

  // Progress
  async getProgress(guestId) {
    try {
      const url = guestId ? `${API_BASE}/progress?guestId=${guestId}` : `${API_BASE}/progress`;
      const res = await fetch(url, {
        headers: getAuthHeaders()
      });
      if (!res.ok) throw new Error('Failed to fetch progress');
      return await res.json();
    } catch (e) {
      console.warn('API getProgress error:', e);
      return { success: false, error: e.message };
    }
  },

  // Auth
  async register(data) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async login(data) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async getMe() {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: getAuthHeaders()
      });
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  async updateProfile(data) {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return await res.json();
  }
};
