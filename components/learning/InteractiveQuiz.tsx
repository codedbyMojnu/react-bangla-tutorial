import React, { useState, useEffect } from 'react';
import { useLearning } from './LearningContext';
import styles from './InteractiveQuiz.module.css';

interface QuizOption {
  id: string;
  text: string;
  textBn: string;
  isCorrect: boolean;
  explanation?: string;
  explanationBn?: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  questionBn: string;
  options: QuizOption[];
  code?: string;
  hint?: string;
  hintBn?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points: number;
}

interface InteractiveQuizProps {
  questions: QuizQuestion[];
  lessonId: string;
  title?: string;
  titleBn?: string;
  onComplete?: (score: number, totalQuestions: number) => void;
}

export default function InteractiveQuiz({ 
  questions, 
  lessonId, 
  title = "Quiz Time!",
  titleBn = "কুইজের সময়!",
  onComplete 
}: InteractiveQuizProps) {
  const { completeLesson } = useLearning();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasSelectedAnswer = selectedAnswers[currentQuestion.id];

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach(question => {
      const selectedOptionId = selectedAnswers[question.id];
      const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
      if (selectedOption?.isCorrect) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  };

  const handleOptionSelect = (optionId: string) => {
    if (isSubmitted) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const finalScore = calculateScore();
      setScore(finalScore);
      setShowResults(true);
      setIsSubmitted(true);
      
      // Award points based on performance
      const percentage = (finalScore / questions.length) * 100;
      let points = 0;
      if (percentage >= 90) points = 100;
      else if (percentage >= 80) points = 80;
      else if (percentage >= 70) points = 60;
      else if (percentage >= 60) points = 40;
      else points = 20;
      
      completeLesson(`${lessonId}-quiz`, points);
      onComplete?.(finalScore, questions.length);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowHint(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowHint(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setShowHint(false);
    setScore(0);
    setIsSubmitted(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return { en: 'Beginner', bn: 'শুরুর স্তর' };
      case 'intermediate': return { en: 'Intermediate', bn: 'মাঝারি স্তর' };
      case 'advanced': return { en: 'Advanced', bn: 'উন্নত স্তর' };
      default: return { en: 'Unknown', bn: 'অজানা' };
    }
  };

  if (showResults) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className={styles.quizContainer}>
        <div className={styles.resultsContainer}>
          <div className={styles.resultsHeader}>
            <div className={styles.scoreCircle}>
              <div className={styles.scoreText}>
                {score}/{questions.length}
              </div>
              <div className={styles.percentageText}>
                {Math.round(percentage)}%
              </div>
            </div>
            <h2 className={styles.resultsTitle}>
              {percentage >= 80 ? '🎉 চমৎকার!' : percentage >= 60 ? '👏 ভাল!' : '💪 আরো চেষ্টা!'} 
              <span className={styles.titleEn}>
                {percentage >= 80 ? ' (Excellent!)' : percentage >= 60 ? ' (Good!)' : ' (Keep Trying!)'}
              </span>
            </h2>
          </div>

          <div className={styles.resultsSummary}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryIcon}>✅</span>
              <span>সঠিক উত্তর: {score}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryIcon}>❌</span>
              <span>ভুল উত্তর: {questions.length - score}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryIcon}>🏆</span>
              <span>স্কোর: {Math.round(percentage)}%</span>
            </div>
          </div>

          <div className={styles.resultActions}>
            <button onClick={handleRestart} className={styles.retryButton}>
              🔄 আবার চেষ্টা করুন
            </button>
          </div>

          {/* Detailed Review */}
          <div className={styles.reviewSection}>
            <h3 className={styles.reviewTitle}>
              📝 বিস্তারিত পর্যালোচনা <span className={styles.titleEn}>(Detailed Review)</span>
            </h3>
            <div className={styles.reviewList}>
              {questions.map((question, index) => {
                const selectedOptionId = selectedAnswers[question.id];
                const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
                const correctOption = question.options.find(opt => opt.isCorrect);
                const isCorrect = selectedOption?.isCorrect || false;

                return (
                  <div key={question.id} className={`${styles.reviewItem} ${isCorrect ? styles.correct : styles.incorrect}`}>
                    <div className={styles.reviewHeader}>
                      <span className={styles.questionNumber}>প্রশ্ন {index + 1}</span>
                      <span className={isCorrect ? styles.correctBadge : styles.incorrectBadge}>
                        {isCorrect ? '✅ সঠিক' : '❌ ভুল'}
                      </span>
                    </div>
                    <div className={styles.reviewQuestion}>{question.questionBn}</div>
                    <div className={styles.reviewAnswers}>
                      <div className={styles.answerRow}>
                        <strong>আপনার উত্তর:</strong> {selectedOption?.textBn || 'কোনো উত্তর দেওয়া হয়নি'}
                      </div>
                      {!isCorrect && (
                        <div className={styles.answerRow}>
                          <strong>সঠিক উত্তর:</strong> {correctOption?.textBn}
                        </div>
                      )}
                      {correctOption?.explanationBn && (
                        <div className={styles.explanation}>
                          <strong>ব্যাখ্যা:</strong> {correctOption.explanationBn}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizHeader}>
        <h2 className={styles.quizTitle}>
          {titleBn} <span className={styles.titleEn}>({title})</span>
        </h2>
        <div className={styles.progressInfo}>
          <div className={styles.questionCounter}>
            প্রশ্ন {currentQuestionIndex + 1} / {questions.length}
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className={styles.questionCard}>
        <div className={styles.questionHeader}>
          <div 
            className={styles.difficultyBadge}
            style={{ backgroundColor: getDifficultyColor(currentQuestion.difficulty) }}
          >
            {getDifficultyText(currentQuestion.difficulty).bn}
          </div>
          <div className={styles.pointsBadge}>
            🏆 {currentQuestion.points} পয়েন্ট
          </div>
        </div>

        <div className={styles.questionContent}>
          <h3 className={styles.questionText}>{currentQuestion.questionBn}</h3>
          
          {currentQuestion.code && (
            <div className={styles.codeBlock}>
              <pre><code>{currentQuestion.code}</code></pre>
            </div>
          )}

          <div className={styles.optionsContainer}>
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`${styles.optionButton} ${
                  selectedAnswers[currentQuestion.id] === option.id ? styles.selected : ''
                } ${isSubmitted && option.isCorrect ? styles.correct : ''} ${
                  isSubmitted && selectedAnswers[currentQuestion.id] === option.id && !option.isCorrect ? styles.incorrect : ''
                }`}
                disabled={isSubmitted}
              >
                <span className={styles.optionLetter}>
                  {String.fromCharCode(65 + currentQuestion.options.indexOf(option))}
                </span>
                <span className={styles.optionText}>{option.textBn}</span>
              </button>
            ))}
          </div>

          {currentQuestion.hintBn && (
            <div className={styles.hintSection}>
              <button 
                onClick={() => setShowHint(!showHint)}
                className={styles.hintButton}
              >
                💡 {showHint ? 'ইঙ্গিত লুকান' : 'ইঙ্গিত দেখুন'}
              </button>
              {showHint && (
                <div className={styles.hintContent}>
                  {currentQuestion.hintBn}
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.navigationButtons}>
          <button 
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={styles.navButton}
          >
            ← পূর্ববর্তী
          </button>
          
          <button 
            onClick={handleNext}
            disabled={!hasSelectedAnswer}
            className={`${styles.navButton} ${styles.nextButton}`}
          >
            {isLastQuestion ? 'ফলাফল দেখুন' : 'পরবর্তী →'}
          </button>
        </div>
      </div>
    </div>
  );
}