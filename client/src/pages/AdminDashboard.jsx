import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  X, 
  Filter, 
  Database, 
  HelpCircle,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { api } from '../services/api';
import { CATEGORIES_DATA } from '../data/categories';
import { useSound } from '../context/SoundContext';

export const AdminDashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState(CATEGORIES_DATA);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  // Form states
  const [formQuestion, setFormQuestion] = useState('');
  const [formCategory, setFormCategory] = useState('World');
  const [formDifficulty, setFormDifficulty] = useState('Easy');
  const [formOptionA, setFormOptionA] = useState('');
  const [formOptionB, setFormOptionB] = useState('');
  const [formOptionC, setFormOptionC] = useState('');
  const [formOptionD, setFormOptionD] = useState('');
  const [formCorrectAnswer, setFormCorrectAnswer] = useState('');
  const [formExplanation, setFormExplanation] = useState('');
  const [formPoints, setFormPoints] = useState(10);
  const [formError, setFormError] = useState('');

  const { playClick } = useSound();

  const loadAllData = async () => {
    setLoading(true);
    const [qRes, cRes] = await Promise.all([
      api.getQuestions(),
      api.getCategories()
    ]);
    if (qRes && qRes.success && qRes.data) {
      setQuestions(qRes.data);
    }
    if (cRes && cRes.success && cRes.data) {
      setCategories(cRes.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const openAddModal = () => {
    playClick();
    setEditingQuestion(null);
    setFormQuestion('');
    setFormCategory('World');
    setFormDifficulty('Easy');
    setFormOptionA('');
    setFormOptionB('');
    setFormOptionC('');
    setFormOptionD('');
    setFormCorrectAnswer('');
    setFormExplanation('');
    setFormPoints(10);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (q) => {
    playClick();
    setEditingQuestion(q);
    setFormQuestion(q.question);
    setFormCategory(q.category);
    setFormDifficulty(q.difficulty || 'Easy');
    setFormOptionA(q.options[0] || '');
    setFormOptionB(q.options[1] || '');
    setFormOptionC(q.options[2] || '');
    setFormOptionD(q.options[3] || '');
    setFormCorrectAnswer(q.correctAnswer);
    setFormExplanation(q.explanation);
    setFormPoints(q.points || 10);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSaveQuestion = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validations
    if (!formQuestion.trim()) return setFormError('Question text cannot be empty.');
    if (!formOptionA.trim() || !formOptionB.trim() || !formOptionC.trim() || !formOptionD.trim()) {
      return setFormError('All 4 options (A, B, C, D) are required.');
    }
    if (!formCorrectAnswer.trim()) {
      return setFormError('Please select the correct answer.');
    }
    const options = [formOptionA.trim(), formOptionB.trim(), formOptionC.trim(), formOptionD.trim()];
    if (!options.includes(formCorrectAnswer.trim())) {
      return setFormError('The correct answer must match one of the 4 options exactly.');
    }
    if (!formExplanation.trim()) {
      return setFormError('Please provide a child-friendly explanation.');
    }

    const payload = {
      question: formQuestion.trim(),
      category: formCategory,
      difficulty: formDifficulty,
      options,
      correctAnswer: formCorrectAnswer.trim(),
      explanation: formExplanation.trim(),
      points: Number(formPoints) || (formDifficulty === 'Challenge' ? 20 : formDifficulty === 'Medium' ? 15 : 10)
    };

    if (editingQuestion) {
      const qId = editingQuestion.id || editingQuestion._id;
      const res = await api.updateQuestion(qId, payload);
      if (res && res.success) {
        setAlertMessage('✨ Question updated successfully!');
        setIsModalOpen(false);
        loadAllData();
      } else {
        setFormError(res?.message || 'Failed to update question.');
      }
    } else {
      const res = await api.createQuestion(payload);
      if (res && res.success) {
        setAlertMessage('🎉 New question added to QuizKids!');
        setIsModalOpen(false);
        loadAllData();
      } else {
        setFormError(res?.message || 'Failed to create question.');
      }
    }
  };

  const handleDelete = async (id) => {
    playClick();
    const res = await api.deleteQuestion(id);
    if (res && res.success) {
      setAlertMessage('🗑️ Question deleted.');
      setDeleteConfirmId(null);
      loadAllData();
    } else {
      alert('Could not delete question.');
    }
  };

  const filteredQuestions = questions.filter(q => {
    const s = search.toLowerCase();
    const matchesSearch = q.question.toLowerCase().includes(s) || 
      q.explanation.toLowerCase().includes(s) ||
      (q.options && q.options.some(o => o.toLowerCase().includes(s)));

    if (!matchesSearch) return false;
    if (selectedCategory !== 'All' && q.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    if (selectedDifficulty !== 'All' && (q.difficulty || 'Easy').toLowerCase() !== selectedDifficulty.toLowerCase()) return false;

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black text-sky-600 bg-sky-100 px-3.5 py-1 rounded-full uppercase tracking-wider">
            ⚙️ Admin Question Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            Quiz Database Management
          </h1>
          <p className="text-sm font-bold text-slate-500">
            Add, update, filter, and inspect the question database in real time.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="btn-bubbly-primary text-sm py-3 px-6 shadow-sm"
        >
          <Plus className="w-5 h-5" /> Add New Question
        </button>
      </div>

      {/* Alert toast */}
      {alertMessage && (
        <div className="bg-emerald-100 border-2 border-emerald-300 text-emerald-900 font-extrabold text-sm p-4 rounded-2xl flex items-center justify-between animate-pop">
          <span>{alertMessage}</span>
          <button onClick={() => setAlertMessage(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card-playful p-4 bg-sky-50/50 border-sky-200">
          <p className="text-xs font-black text-sky-600 uppercase">Total Questions</p>
          <p className="text-3xl font-black text-sky-950 mt-1">{questions.length}</p>
        </div>
        <div className="card-playful p-4 bg-purple-50/50 border-purple-200">
          <p className="text-xs font-black text-purple-600 uppercase">Categories</p>
          <p className="text-3xl font-black text-purple-950 mt-1">{categories.length}</p>
        </div>
        <div className="card-playful p-4 bg-emerald-50/50 border-emerald-200">
          <p className="text-xs font-black text-emerald-600 uppercase">Easy Level</p>
          <p className="text-3xl font-black text-emerald-950 mt-1">
            {questions.filter(q => (q.difficulty || 'Easy') === 'Easy').length}
          </p>
        </div>
        <div className="card-playful p-4 bg-amber-50/50 border-amber-200">
          <p className="text-xs font-black text-amber-600 uppercase">Storage Status</p>
          <p className="text-lg font-black text-amber-950 mt-2 flex items-center gap-1.5">
            <Database className="w-4 h-4 text-emerald-600" /> Active & Synced
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-3xl p-5 shadow-bubbly border-2 border-slate-100 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-6 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions or answers..."
            className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-sky-400"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full py-2.5 px-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none"
          >
            <option value="All">All Categories</option>
            {CATEGORIES_DATA.map(c => (
              <option key={c.id} value={c.name}>{c.icon} {c.name}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full py-2.5 px-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">🟢 Easy</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Challenge">🔴 Challenge</option>
          </select>
        </div>
      </div>

      {/* Questions List Table */}
      <div className="bg-white rounded-3xl p-6 shadow-bubbly border-2 border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-black text-slate-800">
            Questions ({filteredQuestions.length})
          </h3>
        </div>

        {filteredQuestions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-bold">
              <thead>
                <tr className="border-b-2 border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-3">#</th>
                  <th className="py-3 px-3">Question</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Difficulty</th>
                  <th className="py-3 px-3">Correct Answer</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredQuestions.map((q, idx) => (
                  <tr key={q.id || q._id || idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3 text-slate-400 font-extrabold text-xs">
                      {idx + 1}
                    </td>
                    <td className="py-3.5 px-3 font-extrabold text-slate-900 max-w-xs sm:max-w-md">
                      <p className="truncate">{q.question}</p>
                      <p className="text-[11px] font-semibold text-slate-400 truncate mt-0.5">
                        💡 {q.explanation}
                      </p>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="bg-sky-100 text-sky-800 text-xs font-black px-2.5 py-1 rounded-lg">
                        {q.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${
                        (q.difficulty || 'Easy') === 'Challenge' ? 'bg-rose-100 text-rose-800' :
                        (q.difficulty || 'Easy') === 'Medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {q.difficulty || 'Easy'}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-emerald-700 font-black whitespace-nowrap">
                      ✅ {q.correctAnswer}
                    </td>
                    <td className="py-3.5 px-3 text-right whitespace-nowrap space-x-1">
                      <button
                        onClick={() => openEditModal(q)}
                        className="p-2 text-sky-600 hover:bg-sky-50 rounded-xl transition-colors"
                        title="Edit Question"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(q.id || q._id)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        title="Delete Question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400">
            <span className="text-4xl block mb-2">🔍</span>
            <p className="font-bold">No questions found matching your filter.</p>
          </div>
        )}
      </div>

      {/* =========================================
          ADD / EDIT QUESTION MODAL
          ========================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-pop">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-sky-200 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black text-slate-800 mb-1">
              {editingQuestion ? 'Edit GK Question' : 'Add New GK Question'}
            </h3>
            <p className="text-xs font-bold text-slate-500 mb-5">
              Ensure the question is factually accurate, child-safe, and clear.
            </p>

            {formError && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-bold text-xs">
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleSaveQuestion} className="space-y-4">
              
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                  Question Text:
                </label>
                <textarea
                  rows={2}
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  placeholder="e.g. Which planet is closest to the Sun?"
                  className="w-full p-3 rounded-2xl bg-slate-50 border-2 border-slate-200 font-bold text-sm focus:border-sky-400 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Category:</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-slate-50 border-2 border-slate-200 font-bold text-sm focus:outline-none"
                  >
                    {CATEGORIES_DATA.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Difficulty:</label>
                  <select
                    value={formDifficulty}
                    onChange={(e) => setFormDifficulty(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-slate-50 border-2 border-slate-200 font-bold text-sm focus:outline-none"
                  >
                    <option value="Easy">🟢 Easy</option>
                    <option value="Medium">🟡 Medium</option>
                    <option value="Challenge">🔴 Challenge</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Points:</label>
                  <input
                    type="number"
                    value={formPoints}
                    onChange={(e) => setFormPoints(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-slate-50 border-2 border-slate-200 font-bold text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* 4 Choices */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-black text-slate-700 uppercase">
                  4 Multiple Choice Options:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs text-sky-600 bg-sky-100 w-7 h-7 rounded-lg flex items-center justify-center">A</span>
                    <input
                      type="text"
                      value={formOptionA}
                      onChange={(e) => setFormOptionA(e.target.value)}
                      placeholder="Option A"
                      className="flex-1 p-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-sm font-bold focus:outline-none focus:border-sky-400"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs text-purple-600 bg-purple-100 w-7 h-7 rounded-lg flex items-center justify-center">B</span>
                    <input
                      type="text"
                      value={formOptionB}
                      onChange={(e) => setFormOptionB(e.target.value)}
                      placeholder="Option B"
                      className="flex-1 p-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-sm font-bold focus:outline-none focus:border-purple-400"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs text-amber-600 bg-amber-100 w-7 h-7 rounded-lg flex items-center justify-center">C</span>
                    <input
                      type="text"
                      value={formOptionC}
                      onChange={(e) => setFormOptionC(e.target.value)}
                      placeholder="Option C"
                      className="flex-1 p-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-sm font-bold focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs text-emerald-600 bg-emerald-100 w-7 h-7 rounded-lg flex items-center justify-center">D</span>
                    <input
                      type="text"
                      value={formOptionD}
                      onChange={(e) => setFormOptionD(e.target.value)}
                      placeholder="Option D"
                      className="flex-1 p-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-sm font-bold focus:outline-none focus:border-emerald-400"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Correct answer choice selector */}
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                  Select Correct Answer:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[formOptionA, formOptionB, formOptionC, formOptionD].map((opt, i) => {
                    const label = ['A', 'B', 'C', 'D'][i];
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormCorrectAnswer(opt)}
                        disabled={!opt}
                        className={`p-2.5 rounded-xl text-xs font-black border-2 transition-all ${
                          formCorrectAnswer === opt && opt
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        {label}: {opt ? opt.slice(0, 14) : '(empty)'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation */}
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                  Educational Explanation:
                </label>
                <textarea
                  rows={2}
                  value={formExplanation}
                  onChange={(e) => setFormExplanation(e.target.value)}
                  placeholder="Explain why this answer is correct in friendly language..."
                  className="w-full p-3 rounded-2xl bg-slate-50 border-2 border-slate-200 font-bold text-sm focus:border-sky-400 focus:outline-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-2xl text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-bubbly-primary text-sm py-3.5 shadow-none"
                >
                  Save Question ✨
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* =========================================
          DELETE CONFIRM MODAL
          ========================================= */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-pop">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border-4 border-rose-200 space-y-4">
            <span className="text-4xl block">🗑️</span>
            <h3 className="text-xl font-black text-slate-800">Delete this Question?</h3>
            <p className="text-xs font-bold text-slate-500">
              This question will be permanently removed from all quizzes.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 bg-slate-100 font-bold text-slate-700 rounded-xl text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 bg-rose-500 font-bold text-white rounded-xl text-sm shadow-sm hover:bg-rose-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
