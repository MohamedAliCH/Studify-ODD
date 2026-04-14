import { useState } from 'react';

export default function QuizOverlay({ quizzes, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const finished = currentIndex >= quizzes.length;

  const handleSelect = (optIndex) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optIndex);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCurrentIndex((i) => i + 1);
  };

  if (!quizzes || quizzes.length === 0) return null;

  return (
    <div className="quiz-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="glass-panel quiz-modal">
        <div className="quiz-modal-header">
          <h3>
            <i className="fa-solid fa-clipboard-question" /> Quiz du Cours
          </h3>
          <button className="icon-btn" onClick={onClose} style={{ width: 32, height: 32 }}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {finished ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-6) 0' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎉</p>
            <h3 style={{ marginBottom: '0.5rem' }}>Quiz terminé !</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Excellent travail.</p>
            <button className="primary-btn" onClick={onClose} style={{ marginTop: '1.5rem' }}>
              Fermer
            </button>
          </div>
        ) : (
          <>
            <div className="quiz-status">
              Question {currentIndex + 1}/{quizzes.length}
            </div>
            <p className="question-text">{quizzes[currentIndex].text}</p>
            <div className="options-container">
              {quizzes[currentIndex].options.map((opt, i) => {
                let cls = 'quiz-option';
                if (selectedAnswer !== null) {
                  if (i === selectedAnswer && opt.correct) cls += ' correct';
                  else if (i === selectedAnswer && !opt.correct) cls += ' wrong';
                  else if (opt.correct) cls += ' correct';
                }
                return (
                  <button
                    key={i}
                    className={cls}
                    disabled={selectedAnswer !== null}
                    onClick={() => handleSelect(i)}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div
                className={`quiz-feedback ${
                  quizzes[currentIndex].options[selectedAnswer]?.correct ? 'correct' : 'wrong'
                }`}
              >
                {quizzes[currentIndex].options[selectedAnswer]?.correct ? (
                  <>
                    <i className="fa-solid fa-circle-check" /> Bonne réponse !
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-circle-xmark" /> Mauvaise réponse.
                  </>
                )}
              </div>
            )}

            {showFeedback && (
              <button
                className="primary-btn"
                onClick={handleNext}
                style={{ marginTop: 'var(--space-4)', alignSelf: 'flex-start' }}
              >
                Suivant <i className="fa-solid fa-arrow-right" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
