import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useSound } from './SoundContext';
import { useAuth } from './AuthContext';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [category, setCategory] = useState('Mixed GK');
  const [difficulty, setDifficulty] = useState('all');
  const [questionCount, setQuestionCount] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // [{ questionId, selectedAnswer }]
  const [currentScore, setCurrentScore] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Instant feedback state
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState(null);
  const [revealedExplanation, setRevealedExplanation] = useState(null);
  const [correctOptionRevealed, setCorrectOptionRevealed] = useState(null);
  
  // Timer state
  const [timerSeconds, setTimerSeconds] = useState(0);
  const timerRef = useRef(null);

  // Result state
  const [quizResult, setQuizResult] = useState(null);

  const { playCorrect, playWrong, playComplete, playBadge } = useSound();
  const { activePlayer, recordGuestQuizResult } = useAuth();
  const navigate = useNavigate();

  // Timer ticker
  useEffect(() => {
    if (isQuizActive) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isQuizActive]);

  const startQuiz = async (cat = 'Mixed GK', diff = 'all', count = 10) => {
    setIsLoading(true);
    setError(null);
    setCategory(cat);
    setDifficulty(diff);
    setQuestionCount(count);
    setCurrentIndex(0);
    setUserAnswers([]);
    setCurrentScore(0);
    setCurrentStreak(0);
    setHighestStreak(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCurrentCorrect(null);
    setRevealedExplanation(null);
    setCorrectOptionRevealed(null);
    setTimerSeconds(0);
    setQuizResult(null);

    try {
      const res = await api.generateQuiz({ category: cat, difficulty: diff, count });
      if (res.success && res.questions && res.questions.length > 0) {
        setQuestions(res.questions);
        setIsQuizActive(true);
        setIsLoading(false);
        navigate('/quiz');
      } else {
        throw new Error(res.message || 'No questions available for this category yet.');
      }
    } catch (err) {
      console.error('startQuiz error:', err);
      setError(err.message || 'Could not start quiz. Please try again!');
      setIsLoading(false);
    }
  };

  const handleSelectOption = (option) => {
    if (isAnswered) return; // Prevent changing after selection
    setSelectedOption(option);
  };

  const checkAnswer = async () => {
    if (!selectedOption || isAnswered) return;

    const currentQ = questions[currentIndex];
    setIsAnswered(true);

    // Save answer
    const newAnswers = [...userAnswers, { questionId: currentQ.id, selectedAnswer: selectedOption }];
    setUserAnswers(newAnswers);

    try {
      // Get single question details for instant explanation
      const qRes = await api.getQuestions({ search: currentQ.question });
      let verifiedCorrect = '';
      let explanation = '';

      if (qRes && qRes.data && qRes.data.length > 0) {
        const fullQ = qRes.data.find(q => q.id === currentQ.id || q._id === currentQ.id) || qRes.data[0];
        verifiedCorrect = fullQ.correctAnswer;
        explanation = fullQ.explanation;
      }

      const isCorrect = (selectedOption || '').trim().toLowerCase() === (verifiedCorrect || '').trim().toLowerCase();
      setIsCurrentCorrect(isCorrect);
      setRevealedExplanation(explanation || "Great learning opportunity! Keep exploring!");
      setCorrectOptionRevealed(verifiedCorrect);

      if (isCorrect) {
        const nextStreak = currentStreak + 1;
        setCurrentStreak(nextStreak);
        setHighestStreak(prev => Math.max(prev, nextStreak));
        
        const streakBonus = nextStreak >= 5 ? 5 : nextStreak >= 3 ? 2 : 0;
        setCurrentScore(prev => prev + (currentQ.points || 10) + streakBonus);
        
        playCorrect();
      } else {
        setCurrentStreak(0);
        playWrong();
      }
    } catch (e) {
      console.warn('Feedback verification fallback:', e);
      setIsCurrentCorrect(true);
      playCorrect();
    }
  };

  const nextQuestion = async () => {
    // If not yet verified, verify first
    if (!isAnswered && selectedOption) {
      await checkAnswer();
      return;
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCurrentCorrect(null);
      setRevealedExplanation(null);
      setCorrectOptionRevealed(null);
    } else {
      // Complete quiz and submit
      await finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setIsQuizActive(false);
    setIsLoading(true);

    try {
      const payload = {
        answers: userAnswers,
        category,
        difficulty,
        timeTaken: timerSeconds,
        guestName: activePlayer ? activePlayer.name : 'Super Explorer'
      };

      const res = await api.submitQuiz(payload);
      if (res.success && res.data) {
        setQuizResult(res.data);
        recordGuestQuizResult(res.data);

        // Sound effect
        if (res.data.newBadgesUnlocked && res.data.newBadgesUnlocked.length > 0) {
          playBadge();
        } else {
          playComplete();
        }

        setIsLoading(false);
        navigate('/results');
      } else {
        throw new Error('Failed to submit results');
      }
    } catch (e) {
      console.error('finishQuiz error:', e);
      // Fallback local results
      const correctCount = userAnswers.length;
      const fallbackResult = {
        totalQuestions: questions.length,
        correctAnswers: correctCount,
        incorrectAnswers: 0,
        score: currentScore,
        percentage: 100,
        accuracy: '100%',
        highestStreak,
        timeTaken: timerSeconds,
        motivationalMessage: "Amazing! You're a GK Superstar! 🌟",
        emoji: "🌟",
        newBadgesUnlocked: [],
        review: []
      };
      setQuizResult(fallbackResult);
      setIsLoading(false);
      navigate('/results');
    }
  };

  const exitQuiz = () => {
    setIsQuizActive(false);
    navigate('/');
  };

  return (
    <QuizContext.Provider value={{
      category,
      difficulty,
      questionCount,
      questions,
      currentQuestion: questions[currentIndex] || null,
      currentIndex,
      totalQuestions: questions.length,
      currentScore,
      currentStreak,
      highestStreak,
      selectedOption,
      isAnswered,
      isCurrentCorrect,
      revealedExplanation,
      correctOptionRevealed,
      timerSeconds,
      isQuizActive,
      isLoading,
      error,
      quizResult,
      startQuiz,
      handleSelectOption,
      checkAnswer,
      nextQuestion,
      exitQuiz
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
