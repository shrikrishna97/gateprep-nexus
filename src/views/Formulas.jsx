import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { FORMULA_DATA, FLASHCARDS_DATA } from '../data/mockData';

const Formulas = () => {
  const { user } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('formulas'); // 'formulas' or 'flashcards'
  
  // Formula sheet states
  const [formulaSearch, setFormulaSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);

  // Flashcards states
  const [flashcards, setFlashcards] = useState(() => {
    // Try to load flashcard progress from localStorage
    const saved = localStorage.getItem(`gate_flashcards_${user?.email || 'default'}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return FLASHCARDS_DATA.map(f => ({ ...f, status: 'learning' }));
      }
    }
    return FLASHCARDS_DATA.map(f => ({ ...f, status: 'learning' })); // 'learning' | 'mastered'
  });

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcardFilter, setFlashcardFilter] = useState('All'); // 'All' | 'learning' | 'mastered'

  // Sync flashcards state to localStorage
  useEffect(() => {
    localStorage.setItem(`gate_flashcards_${user?.email || 'default'}`, JSON.stringify(flashcards));
  }, [flashcards, user]);

  // Typeset mathematical LaTeX equations via MathJax dynamically on changes
  useEffect(() => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      const timer = setTimeout(() => {
        window.MathJax.typesetPromise()
          .catch(err => console.warn('GATEPrep Nexus MathJax Typesetting Warning:', err));
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [activeSubTab, selectedCategory, formulaSearch, visibleCards, currentCardIndex, isFlipped]);

  const handleCopyFormula = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedId(idx);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter Formulas
  const getFilteredFormulas = () => {
    let result = [];
    
    // Flatten the formula categories
    Object.keys(FORMULA_DATA).forEach((catKey) => {
      const categoryName = 
        catKey === 'LA' ? 'Linear Algebra' :
        catKey === 'Prob' ? 'Probability & Stats' :
        catKey === 'DSA' ? 'Programming & DSA' :
        catKey === 'ML' ? 'Machine Learning' : catKey;

      FORMULA_DATA[catKey].forEach((f, idx) => {
        result.push({
          ...f,
          categoryKey: catKey,
          categoryName,
          globalId: `${catKey}-${idx}`
        });
      });
    });

    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(f => f.categoryName === selectedCategory);
    }

    // Apply search filter
    if (formulaSearch.trim() !== '') {
      const q = formulaSearch.toLowerCase();
      result = result.filter(f => 
        f.title.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.formula.toLowerCase().includes(q)
      );
    }

    return result;
  };

  const filteredFormulas = getFilteredFormulas();

  // Flashcards Filtering & Logic
  const getFilteredFlashcards = () => {
    if (flashcardFilter === 'All') return flashcards;
    return flashcards.filter(c => c.status === flashcardFilter);
  };

  const visibleCards = getFilteredFlashcards();
  const currentCard = visibleCards[currentCardIndex];

  // Adjust card index when list size changes
  useEffect(() => {
    if (currentCardIndex >= visibleCards.length) {
      setCurrentCardIndex(Math.max(0, visibleCards.length - 1));
    }
    setIsFlipped(false);
  }, [visibleCards.length, currentCardIndex]);

  const handleUpdateStatus = (id, newStatus) => {
    setFlashcards(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    setIsFlipped(false);
    
    // Automatically transition to next card after a small delay
    setTimeout(() => {
      if (currentCardIndex < visibleCards.length - 1) {
        setCurrentCardIndex(prev => prev + 1);
      }
    }, 250);
  };

  const handleResetFlashcards = () => {
    if (window.confirm('Reset all active recall flashcards study progress?')) {
      setFlashcards(FLASHCARDS_DATA.map(f => ({ ...f, status: 'learning' })));
      setCurrentCardIndex(0);
      setIsFlipped(false);
    }
  };

  const masteredCount = flashcards.filter(c => c.status === 'mastered').length;
  const masteryPercent = Math.round((masteredCount / flashcards.length) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* View Header with Sub-tab toggles */}
      <div className="glass-panel" style={{
        padding: '24px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>🧠 Formula Sheets & Active Recall</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '4px 0 0' }}>
            High-weightage equations for GATE Computer Science and Data Science & AI.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          backgroundColor: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--border-color)',
          borderRadius: '24px',
          padding: '4px'
        }}>
          <button 
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: activeSubTab === 'formulas' ? 'var(--accent-purple)' : 'transparent',
              color: activeSubTab === 'formulas' ? '#fff' : 'var(--text-secondary)',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setActiveSubTab('formulas')}
          >
            📐 Equations Sheet
          </button>
          <button 
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: activeSubTab === 'flashcards' ? 'var(--accent-purple)' : 'transparent',
              color: activeSubTab === 'flashcards' ? '#fff' : 'var(--text-secondary)',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setActiveSubTab('flashcards')}
          >
            🃏 Active Recall Cards
          </button>
        </div>
      </div>

      {/* SUBTAB 1: FORMULA CHEAT SHEET */}
      {activeSubTab === 'formulas' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Controls Panel */}
          <div className="glass-panel" style={{
            padding: '20px 24px',
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap'
          }}>
            
            {/* Category selection */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['All', 'Linear Algebra', 'Probability & Stats', 'Programming & DSA', 'Machine Learning'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor: selectedCategory === cat ? 'var(--accent-purple-glow)' : 'transparent',
                    color: selectedCategory === cat ? 'var(--accent-purple)' : 'var(--text-secondary)',
                    border: `1px solid ${selectedCategory === cat ? 'var(--accent-purple)' : 'var(--border-color)'}`,
                    transition: 'all 0.15s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', width: '300px', maxWidth: '100%' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Search formulas or concepts..."
                value={formulaSearch}
                onChange={(e) => setFormulaSearch(e.target.value)}
                style={{ paddingRight: '36px', height: '40px' }}
              />
              {formulaSearch && (
                <button 
                  onClick={() => setFormulaSearch('')} 
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    color: 'var(--text-muted)'
                  }}
                >
                  ✕
                </button>
              )}
            </div>

          </div>

          {/* Formulas Grid */}
          {filteredFormulas.length === 0 ? (
            <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
              🔍 No equations match your active search filter. Try another keyword.
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '24px'
            }}>
              {filteredFormulas.map((f) => (
                <div 
                  key={f.globalId}
                  className="glass-panel formula-card-hover" 
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                >
                  <div>
                    {/* Header Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>
                        {f.categoryName}
                      </span>
                      <button 
                        onClick={() => handleCopyFormula(f.formula, f.globalId)}
                        style={{
                          fontSize: '0.75rem',
                          color: copiedId === f.globalId ? 'var(--accent-emerald)' : 'var(--text-muted)',
                          cursor: 'pointer',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        {copiedId === f.globalId ? '✓ Copied!' : '📋 Copy'}
                      </button>
                    </div>

                    {/* Title */}
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 16px' }}>{f.title}</h4>

                    {/* Formula Render Container */}
                    <div className="formula-equation-container" style={{
                      padding: '16px',
                      backgroundColor: 'rgba(255,255,255,0.015)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.05rem',
                      color: 'var(--text-primary)',
                      textAlign: 'center',
                      margin: '0 0 16px',
                      lineHeight: 1.4,
                      overflowX: 'auto',
                      whiteSpace: 'nowrap'
                    }}>
                      <span className="latex-formula" dangerouslySetInnerHTML={{ __html: f.formula }}></span>
                    </div>

                    {/* Description */}
                    <p style={{
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.4,
                      margin: 0
                    }}>
                      {f.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* SUBTAB 2: ACTIVE RECALL FLASHCARDS */}
      {activeSubTab === 'flashcards' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '32px'
        }} className="flashcards-layout-grid">
          
          {/* Left Panel: Card Game Deck */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
            
            {/* Filter controls */}
            <div className="glass-panel" style={{
              padding: '16px 24px',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['All', 'learning', 'mastered'].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setFlashcardFilter(status);
                      setCurrentCardIndex(0);
                    }}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      backgroundColor: flashcardFilter === status ? 'var(--accent-purple-glow)' : 'transparent',
                      color: flashcardFilter === status ? 'var(--accent-purple)' : 'var(--text-muted)',
                      border: `1px solid ${flashcardFilter === status ? 'var(--accent-purple)' : 'var(--border-color)'}`
                    }}
                  >
                    {status === 'All' ? 'All Cards' : (status === 'learning' ? '📚 Studying' : '🏆 Mastered')}
                  </button>
                ))}
              </div>

              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Active Card: {visibleCards.length > 0 ? `${currentCardIndex + 1} of ${visibleCards.length}` : '0 of 0'}
              </span>
            </div>

            {/* FLIP CARD STAGE */}
            {visibleCards.length === 0 ? (
              <div className="glass-panel" style={{
                padding: '60px 40px',
                textAlign: 'center',
                width: '100%',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🎉</div>
                <h4 style={{ margin: '0 0 8px' }}>No flashcards found here!</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '300px', margin: '0 0 20px' }}>
                  {flashcardFilter === 'learning' 
                    ? 'Congratulations! You have mastered all conceptual active recall cards.' 
                    : 'Get started by learning concepts and marking them as mastered!'}
                </p>
                <button className="btn btn-secondary" onClick={handleResetFlashcards}>
                  Reset All Cards ↩
                </button>
              </div>
            ) : (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                
                {/* 3D Flip Card */}
                <div 
                  className={`flashcard-scene ${isFlipped ? 'flipped' : ''}`}
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <div className="flashcard-inner">
                    
                    {/* Card Front Side */}
                    <div className="flashcard-face flashcard-front glass-panel">
                      <div className="card-face-header">
                        <span className="badge badge-purple">{currentCard.category}</span>
                        <span className="study-badge learning">📚 STUDYING</span>
                      </div>
                      <div className="card-face-content">
                        <h3 dangerouslySetInnerHTML={{ __html: currentCard.question }}></h3>
                      </div>
                      <div className="card-face-footer">
                        <span>💡 Tap card to reveal answer</span>
                      </div>
                    </div>

                    {/* Card Back Side */}
                    <div className="flashcard-face flashcard-back glass-panel">
                      <div className="card-face-header">
                        <span className="badge badge-purple">{currentCard.category}</span>
                        <span className={`study-badge ${currentCard.status === 'mastered' ? 'mastered' : 'learning'}`}>
                          {currentCard.status === 'mastered' ? '🏆 MASTERED' : '📚 STUDYING'}
                        </span>
                      </div>
                      <div className="card-face-content">
                        <p dangerouslySetInnerHTML={{ __html: currentCard.answer }}></p>
                      </div>
                      <div className="card-face-footer">
                        <span>↩ Tap card to view question</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Score / Mastery Action Triggers */}
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', width: '100%', maxWidth: '400px' }}>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleUpdateStatus(currentCard.id, 'learning')}
                    disabled={currentCard.status === 'learning'}
                    style={{
                      flex: 1,
                      borderColor: 'var(--accent-rose-glow)',
                      color: 'var(--accent-rose)',
                      fontSize: '0.8rem',
                      padding: '10px 16px',
                      opacity: currentCard.status === 'learning' ? 0.6 : 1
                    }}
                  >
                    ❌ Need Review
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleUpdateStatus(currentCard.id, 'mastered')}
                    disabled={currentCard.status === 'mastered'}
                    style={{
                      flex: 1,
                      backgroundColor: 'var(--accent-emerald)',
                      borderColor: 'var(--accent-emerald)',
                      fontSize: '0.8rem',
                      padding: '10px 16px',
                      opacity: currentCard.status === 'mastered' ? 0.6 : 1
                    }}
                  >
                    ✅ Mastered!
                  </button>
                </div>

                {/* Navigation Controls */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '10px' }}>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => {
                      setCurrentCardIndex(prev => Math.max(0, prev - 1));
                      setIsFlipped(false);
                    }}
                    disabled={currentCardIndex === 0}
                    style={{ padding: '8px 16px', fontSize: '0.8rem', opacity: currentCardIndex === 0 ? 0.5 : 1 }}
                  >
                    ◀ Prev
                  </button>

                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Card {currentCardIndex + 1} / {visibleCards.length}
                  </span>

                  <button 
                    className="btn btn-secondary"
                    onClick={() => {
                      setCurrentCardIndex(prev => Math.min(visibleCards.length - 1, prev + 1));
                      setIsFlipped(false);
                    }}
                    disabled={currentCardIndex === visibleCards.length - 1}
                    style={{ padding: '8px 16px', fontSize: '0.8rem', opacity: currentCardIndex === visibleCards.length - 1 ? 0.5 : 1 }}
                  >
                    Next ▶
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* Right Panel: Flashcards Progress Dashboard */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Progress widget */}
            <div className="glass-panel" style={{ padding: '28px' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '1.2rem', fontWeight: 800 }}>🏆 Active Recall Mastery</h3>
              
              {/* Radial or linear bar */}
              <div style={{ margin: '16px 0 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Conceptual Mastery</span>
                  <span style={{ fontWeight: 'bold' }}>{masteryPercent}%</span>
                </div>
                <div style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${masteryPercent}%`,
                    background: 'linear-gradient(95deg, var(--accent-purple), var(--accent-emerald))',
                    borderRadius: '4px',
                    transition: 'width 0.4s ease'
                  }} />
                </div>
              </div>

              {/* Grid info stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Studying</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-purple)', marginTop: '4px' }}>
                    {flashcards.filter(c => c.status === 'learning').length}
                  </div>
                </div>
                <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Mastered</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '4px' }}>
                    {masteredCount}
                  </div>
                </div>
              </div>

              {/* Help Tips */}
              <div style={{
                padding: '16px',
                backgroundColor: 'rgba(139, 92, 246, 0.02)',
                border: '1px dashed rgba(139, 92, 246, 0.15)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.78rem',
                lineHeight: 1.4,
                color: 'var(--text-secondary)'
              }}>
                <strong style={{ color: 'var(--text-primary)' }}>💡 Learning Science Tip:</strong>
                <p style={{ marginTop: '4px' }}>
                  Use <strong>active recall</strong> by speaking or writing the answer out loud <em>before</em> flipping the card. Re-test incorrect concepts within 24 hours to maximize long-term retention.
                </p>
              </div>

              <button 
                className="btn btn-secondary" 
                onClick={handleResetFlashcards}
                style={{ width: '100%', marginTop: '20px', padding: '10px', fontSize: '0.8rem', color: 'var(--accent-rose)', borderColor: 'rgba(244, 63, 94, 0.15)' }}
              >
                Reset Study Deck Progress
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Global Embedded Styles */}
      <style>{`
        /* Formula card hover */
        .formula-card-hover {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .formula-card-hover:hover {
          transform: translateY(-3px);
          border-color: var(--accent-purple);
          box-shadow: 0 10px 25px -5px var(--accent-purple-glow);
        }

        /* 3D Flip Card Scene */
        .flashcard-scene {
          width: 100%;
          max-width: 480px;
          height: 300px;
          perspective: 1000px;
          cursor: pointer;
        }

        .flashcard-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }

        .flashcard-scene.flipped .flashcard-inner {
          transform: rotateY(180deg);
        }

        .flashcard-face {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: var(--radius-lg);
          padding: 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: var(--shadow-glass);
        }

        .flashcard-front {
          background: var(--bg-glass);
        }

        .flashcard-back {
          background: var(--bg-glass-hover);
          transform: rotateY(180deg);
          border-color: var(--accent-purple);
        }

        .card-face-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .card-face-content {
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 0;
        }

        .card-face-content h3 {
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.4;
          color: var(--text-primary);
          margin: 0;
        }

        .card-face-content p {
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--text-secondary);
          margin: 0;
          text-align: left;
        }

        .card-face-footer {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .study-badge {
          font-size: 0.65rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .study-badge.learning {
          background-color: var(--accent-purple-glow);
          color: var(--accent-purple);
        }

        .study-badge.mastered {
          background-color: var(--accent-emerald-glow);
          color: var(--accent-emerald);
        }

        @media (max-width: 900px) {
          .flashcards-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
};

export default Formulas;
