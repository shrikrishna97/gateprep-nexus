import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { MOCK_TESTS } from '../data/mockData';

const Practice = () => {
  const { user, mockHistory, addMockScore } = useApp();
  
  // Test states
  const [activeTest, setActiveTest] = useState(null);
  const [testMode, setTestMode] = useState(false); // true when test is playing
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [qId]: index | string }
  const [markedForReview, setMarkedForReview] = useState({}); // { [qId]: boolean }
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [testResult, setTestResult] = useState(null); // stores result report

  // Countdown timer effect
  useEffect(() => {
    if (!testMode || secondsLeft <= 0) {
      if (testMode && secondsLeft === 0) {
        handleSubmitTest();
      }
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testMode, secondsLeft]);

  // Typeset mathematical LaTeX equations via MathJax dynamically on changes
  useEffect(() => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      const timer = setTimeout(() => {
        window.MathJax.typesetPromise()
          .catch(err => console.warn('GATEPrep Nexus MathJax Typesetting Warning:', err));
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [testMode, currentQIndex, testResult, activeTest]);

  const handleStartTest = (test) => {
    setActiveTest(test);
    setAnswers({});
    setMarkedForReview({});
    setCurrentQIndex(0);
    setSecondsLeft(test.timeLimit);
    setTestMode(true);
    setTestResult(null);
  };

  const handleAnswerSelect = (qId, optionIdx) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const handleNATChange = (qId, val) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: val
    }));
  };

  const handleToggleReview = (qId) => {
    setMarkedForReview(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  function handleSubmitTest() {
    setTestMode(false);
    
    // Evaluate scores
    let correctCount = 0;
    const questions = activeTest.questions;

    questions.forEach((q) => {
      const userAnswer = answers[q.id];
      if (q.type === 'MCQ') {
        if (userAnswer === q.correctOption) correctCount++;
      } else {
        // NAT comparison (trim and compare string float value)
        if (userAnswer && parseFloat(userAnswer) === parseFloat(q.correctAnswer)) {
          correctCount++;
        }
      }
    });

    // Save score in history
    addMockScore(activeTest.track, activeTest.name, correctCount, questions.length);

    // Set results display
    setTestResult({
      testName: activeTest.name,
      totalQuestions: questions.length,
      correctCount,
      scorePercent: Math.round((correctCount / questions.length) * 100),
      answers,
      questions
    });
  }

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const filteredTests = MOCK_TESTS.filter(test => test.track === user?.track || user?.track === 'Dual');

  // RENDER VIEW 1: Test Result Review
  if (testResult) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <div className="glass-panel" style={{ padding: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem' }}>🏆</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '12px 0 4px' }}>Mock Exam Submitted!</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
            {testResult.testName}
          </p>

          {/* Scores breakdown */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            margin: '0 auto 28px',
            maxWidth: '460px',
            flexWrap: 'wrap'
          }}>
            <div className="glass-panel" style={{ padding: '16px 24px', flexGrow: 1, minWidth: '120px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Score Percentage</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-purple)', marginTop: '4px' }}>{testResult.scorePercent}%</div>
            </div>
            <div className="glass-panel" style={{ padding: '16px 24px', flexGrow: 1, minWidth: '120px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Questions Correct</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '4px' }}>{testResult.correctCount} / {testResult.totalQuestions}</div>
            </div>
          </div>

          <button className="btn btn-primary" onClick={() => setTestResult(null)}>
            Return to Assessment Hub ↩
          </button>
        </div>

        {/* Deep Explanations Review List */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ marginBottom: '24px' }}>📋 Step-by-Step Question Review & Solutions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {testResult.questions.map((q, idx) => {
              const userAnswer = testResult.answers[q.id];
              const isCorrect = q.type === 'MCQ'
                ? userAnswer === q.correctOption
                : !!(userAnswer && parseFloat(userAnswer) === parseFloat(q.correctAnswer));

              return (
                <div key={q.id} style={{
                  padding: '20px',
                  backgroundColor: 'rgba(255,255,255,0.01)',
                  border: `1px solid ${isCorrect ? 'var(--accent-emerald-glow)' : 'var(--accent-rose-glow)'}`,
                  borderRadius: 'var(--radius-md)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)' }}>Question {idx + 1} ({q.type})</span>
                    <span className={`badge ${isCorrect ? 'badge-emerald' : 'badge-rose'}`} style={{ fontSize: '0.65rem' }}>
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <p 
                    style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px', lineHeight: 1.4 }}
                    dangerouslySetInnerHTML={{ __html: q.question }}
                  />

                  {/* Render Choices if MCQ */}
                  {q.type === 'MCQ' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                      {q.options.map((opt, oIdx) => {
                        const isChosen = userAnswer === oIdx;
                        const isCorrectOpt = q.correctOption === oIdx;
                        return (
                          <div key={oIdx} style={{
                            padding: '12px 16px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-color)',
                            fontSize: '0.875rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            backgroundColor: 
                              isCorrectOpt ? 'var(--accent-emerald-glow)' :
                              (isChosen && !isCorrectOpt) ? 'var(--accent-rose-glow)' : 'transparent'
                          }}>
                            <span dangerouslySetInnerHTML={{ __html: opt }} />
                            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                              {isCorrectOpt ? '✓ Correct Option' : (isChosen ? '✗ Your Choice' : '')}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* NAT Feedback */
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
                      <div className="glass-panel" style={{ padding: '10px 16px', flexGrow: 1 }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Your Answer</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                          {userAnswer !== undefined ? userAnswer : 'Not Answered'}
                        </div>
                      </div>
                      <div className="glass-panel" style={{ padding: '10px 16px', flexGrow: 1 }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Correct Numerical Answer</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                          {q.correctAnswer}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Math explanation panel */}
                  <div style={{
                    padding: '14px 18px',
                    backgroundColor: 'rgba(139, 92, 246, 0.03)',
                    border: '1px dashed rgba(139, 92, 246, 0.2)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    color: 'var(--text-secondary)'
                  }}>
                    <strong style={{ color: 'var(--text-primary)' }}>🎓 Solution Explanation:</strong>
                    <br />
                    <p style={{ marginTop: '6px' }} dangerouslySetInnerHTML={{ __html: q.explanation }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // RENDER VIEW 2: FULL MOCK TEST PLAYER
  if (testMode && activeTest) {
    const currentQuestion = activeTest.questions[currentQIndex];
    const isQuestionMarked = !!markedForReview[currentQuestion.id];

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2.1fr 0.9fr',
        gap: '32px'
      }} className="test-player-grid">
        
        {/* Left Hand: Question Display Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Header row with timer */}
          <div className="glass-panel" style={{ padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {activeTest.name}
            </h4>

            {/* Countdown timer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '1.15rem',
              fontWeight: 800,
              color: secondsLeft < 180 ? 'var(--accent-rose)' : 'var(--text-primary)'
            }}>
              <span>⏱️</span>
              <span>{formatTime(secondsLeft)}</span>
            </div>
          </div>

          {/* Core Question Card */}
          <div className="glass-panel" style={{ padding: '32px', minHeight: '360px', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
                  Question {currentQIndex + 1} of {activeTest.questions.length}
                </span>
                <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>
                  {currentQuestion.type === 'MCQ' ? 'Multiple Choice (MCQ)' : 'Numerical Answer (NAT)'}
                </span>
              </div>

              <p 
                style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '28px', lineHeight: 1.5 }}
                dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
              />

              {/* Input details based on MCQ vs NAT */}
              {currentQuestion.type === 'MCQ' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {currentQuestion.options.map((opt, oIdx) => {
                    const isSelected = answers[currentQuestion.id] === oIdx;
                    return (
                      <div 
                        key={oIdx}
                        onClick={() => handleAnswerSelect(currentQuestion.id, oIdx)}
                        style={{
                          padding: '14px 20px',
                          border: `1px solid ${isSelected ? 'var(--accent-purple)' : 'var(--border-color)'}`,
                          backgroundColor: isSelected ? 'var(--accent-purple-glow)' : 'transparent',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        className="option-choice-row"
                      >
                        <span style={{ fontWeight: 700, marginRight: '12px', color: isSelected ? 'var(--accent-purple)' : 'var(--text-muted)' }}>
                          {String.fromCharCode(65 + oIdx)}.
                        </span>
                        <span dangerouslySetInnerHTML={{ __html: opt }} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* NAT text field */
                <div className="form-group" style={{ maxWidth: '300px' }}>
                  <label className="form-label">Input Numerical Answer</label>
                  <input
                    type="number"
                    step="any"
                    className="form-input"
                    placeholder="Enter value (e.g. 28)"
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleNATChange(currentQuestion.id, e.target.value)}
                  />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>*Use the floating scientific calculator on the bottom-right for help!</span>
                </div>
              )}
            </div>

            {/* Bottom Actions Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', flexWrap: 'wrap', gap: '10px' }}>
              <button 
                className="btn btn-secondary"
                onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQIndex === 0}
                style={{ opacity: currentQIndex === 0 ? 0.5 : 1, cursor: currentQIndex === 0 ? 'not-allowed' : 'pointer' }}
              >
                ◀ Previous
              </button>

              <button 
                className="btn btn-secondary"
                onClick={() => handleToggleReview(currentQuestion.id)}
                style={{ color: isQuestionMarked ? 'var(--accent-purple)' : 'inherit', borderColor: isQuestionMarked ? 'var(--accent-purple)' : 'var(--border-color)' }}
              >
                {isQuestionMarked ? '★ Marked' : '☆ Mark for Review'}
              </button>

              <button 
                className="btn btn-primary"
                onClick={() => {
                  if (currentQIndex < activeTest.questions.length - 1) {
                    setCurrentQIndex(prev => prev + 1);
                  } else {
                    if (window.confirm("Are you sure you want to submit your GATE mock assessment?")) {
                      handleSubmitTest();
                    }
                  }
                }}
              >
                {currentQIndex === activeTest.questions.length - 1 ? 'Submit Mock Exam 🚀' : 'Next Question ▶'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Hand: Question Grid sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Legend instructions */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h4 style={{ margin: '0 0 16px' }}>GATE Exam Navigation</h4>
            
            {/* Squares grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '8px',
              marginBottom: '24px'
            }}>
              {activeTest.questions.map((q, idx) => {
                const isSelected = currentQIndex === idx;
                const isMarked = !!markedForReview[q.id];
                const isAnswered = answers[q.id] !== undefined;

                let squareColor = 'rgba(255,255,255,0.05)'; // default unvisited
                let textColor = 'var(--text-secondary)';
                let border = '1px solid var(--border-color)';

                if (isMarked) {
                  squareColor = 'var(--accent-purple-glow)';
                  textColor = '#c084fc';
                  border = '1px solid var(--accent-purple)';
                } else if (isAnswered) {
                  squareColor = 'var(--accent-emerald-glow)';
                  textColor = '#34d399';
                  border = '1px solid var(--accent-emerald)';
                }

                if (isSelected) {
                  border = '2px solid var(--text-primary)';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    style={{
                      aspectRatio: '1',
                      borderRadius: '6px',
                      backgroundColor: squareColor,
                      color: textColor,
                      border,
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem'
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Grid Colors definitions legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.78rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)' }} />
                <span>Gray = Unanswered / Unvisited</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'var(--accent-emerald-glow)', border: '1px solid var(--accent-emerald)' }} />
                <span>Green = Answered</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'var(--accent-purple-glow)', border: '1px solid var(--accent-purple)' }} />
                <span>Purple = Marked for Review</span>
              </div>
            </div>
          </div>

          <button 
            className="btn btn-secondary" 
            onClick={() => {
              if (window.confirm("Quit exam? No score will be saved.")) {
                setTestMode(false);
              }
            }}
            style={{ color: 'var(--accent-rose)', borderColor: 'rgba(244, 63, 94, 0.2)' }}
          >
            Quit Practice Session
          </button>
        </div>

        <style>{`
          .option-choice-row:hover {
            border-color: var(--accent-purple) !important;
            background-color: var(--bg-glass-hover) !important;
          }
          @media (max-width: 900px) {
            .test-player-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    );
  }

  // DEFAULT RENDER VIEW: ASSESSMENT HOME DASHBOARD
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1.8fr 1.2fr',
      gap: '32px'
    }} className="practice-layout-grid">
      
      {/* Left Column: Mock papers selection list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '6px' }}>GATE Practice Sets</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
            Mock tests containing actual previous year GATE questions (PYQs) to test your readiness.
          </p>
        </div>

        {filteredTests.length === 0 ? (
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No mock tests match your active GATE track. Change your track focus in your profile header if needed.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredTests.map((test) => (
              <div 
                key={test.id} 
                className="glass-panel" 
                style={{
                  padding: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                <div>
                  <span className={`badge ${test.track === 'CS' ? 'badge-purple' : 'badge-blue'}`} style={{ fontSize: '0.65rem', marginBottom: '8px' }}>
                    GATE {test.track} Focus
                  </span>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '2px 0 6px' }}>{test.name}</h4>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    <span>⏱️ Time: <strong>{test.timeLimit / 60} mins</strong></span>
                    <span>📋 Size: <strong>{test.questions.length} Questions</strong></span>
                  </div>
                </div>

                <button className="btn btn-primary" onClick={() => handleStartTest(test)} style={{ padding: '10px 24px', fontSize: '0.85rem' }}>
                  Start Simulator 🚀
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Column: Historical logs tracker */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📈</span> Performance Log
          </h3>

          {mockHistory.length === 0 ? (
            <div style={{
              padding: '40px 0',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              border: '1px dashed var(--border-color)',
              borderRadius: 'var(--radius-md)'
            }}>
              No attempts logged yet. Complete a simulator practice test to record scores.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {mockHistory.map((h) => {
                const percent = Math.round((h.score / h.totalQuestions) * 100);
                return (
                  <div 
                    key={h.id}
                    style={{
                      padding: '14px 18px',
                      backgroundColor: 'rgba(255,255,255,0.01)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ textAlign: 'left' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{h.date}</span>
                      <h5 style={{ margin: '2px 0', fontSize: '0.88rem', fontWeight: 700 }}>{h.paperName.split(' ')[0]} Mock</h5>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Score: {h.score}/{h.totalQuestions}</span>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        fontSize: '1rem',
                        fontWeight: 800,
                        color: percent >= 70 ? 'var(--accent-emerald)' : (percent >= 40 ? 'var(--accent-amber)' : 'var(--accent-rose)')
                      }}>
                        {percent}%
                      </span>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        {percent >= 70 ? 'Excellent' : (percent >= 40 ? 'Average' : 'Review')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .practice-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Practice;
