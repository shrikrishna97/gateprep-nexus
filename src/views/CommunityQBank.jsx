import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../AppContext';
import { 
  IITM_QBANK_OFFLINE_SEED, 
  parseIITMSidebar, 
  parseIITMQuestionPage 
} from '../data/mockData';

const categoriesList = [
  { id: 'all', name: 'All Categories', type: 'all' },
  { id: 'linear_algebra', name: 'Linear Algebra', type: 'shared' },
  { id: 'prob_stats', name: 'Probability & Stats', type: 'shared' },
  { id: 'machine_learning', name: 'Machine Learning', type: 'da_only' },
  { id: 'calculus', name: 'Calculus & Optimization', type: 'shared' },
  { id: 'dbms', name: 'Database Management', type: 'shared' },
  { id: 'pdsa', name: 'Programming & DSA', type: 'shared' },
  { id: 'ai', name: 'Artificial Intelligence', type: 'da_only' },
  { id: 'aptitude', name: 'General Aptitude', type: 'shared' },
  { id: 'gate_2025', name: 'GATE-2025 Past Paper', type: 'da_only' },
  { id: 'gate_2024', name: 'GATE-2024 Past Paper', type: 'da_only' }
];

export default function CommunityQBank() {
  const { user } = useApp();
  const [baseUrl, setBaseUrl] = useState('https://iitmbsc-student-projects.github.io/gate-da/');
  
  // Scraper & Sync State
  const [syncMode, setSyncMode] = useState('syncing'); // 'syncing' | 'online' | 'offline'
  const [questionsIndex, setQuestionsIndex] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Selected Question State
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [activeQuestionData, setActiveQuestionData] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [mobileView, setMobileView] = useState('list'); // 'list' | 'question'
  
  // User Attempt & Grade State
  const [userSelection, setUserSelection] = useState([]); // indices for MCQ/MSQ
  const [userNatInput, setUserNatInput] = useState(''); // text for NAT
  const [isGraded, setIsGraded] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isPartiallyCorrect, setIsPartiallyCorrect] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  // Local storage persistence
  const [savedProgress, setSavedProgress] = useState(() => {
    try {
      const local = localStorage.getItem('nexus_iitm_progress');
      return local ? JSON.parse(local) : { solved: {}, answers: {} };
    } catch {
      return { solved: {}, answers: {} };
    }
  });

  // Active Category Filtering
  const [activeTab, setActiveTab] = useState('all');

  // 1. Initial crawler to fetch the sidebar links index
  useEffect(() => {
    const fetchSidebar = async () => {
      try {
        setSyncMode('syncing');
        
        const BASE_URLS = [
          'https://iitmbsc-student-projects.github.io/gate-da/',
          'https://raw.githubusercontent.com/IITMBSC-Student-Projects/gate-da/main/',
          'https://raw.githubusercontent.com/IITMBSC-Student-Projects/gate-da/master/'
        ];

        let indexHtml = '';
        let resolvedBaseUrl = '';

        for (const url of BASE_URLS) {
          try {
            const indexResponse = await fetch(`${url}index.html`);
            if (indexResponse.ok) {
              indexHtml = await indexResponse.text();
              resolvedBaseUrl = url;
              break;
            }
          } catch (e) {
            console.warn(`GATEPrep QBank: Failed to fetch index from ${url}`, e);
          }
        }

        if (!indexHtml || !resolvedBaseUrl) {
          throw new Error('All index endpoints failed');
        }

        const parsedIndex = parseIITMSidebar(indexHtml);
        
        if (parsedIndex && parsedIndex.length > 0) {
          setQuestionsIndex(parsedIndex);
          setBaseUrl(resolvedBaseUrl);
          setSyncMode('online');
        } else {
          throw new Error('No question links discovered in the homepage HTML.');
        }
      } catch (err) {
        console.warn('GATEPrep Nexus Live Scraper: Falling back to offline seed Q-Bank due to:', err.message);
        // Fallback to offline seeds
        const localSeeds = IITM_QBANK_OFFLINE_SEED.map(q => ({
          relativePath: q.relativePath,
          title: q.title,
          category: q.categories[0] || 'linear_algebra',
          categoryName: categoriesList.find(c => c.id === q.categories[0])?.name || 'Linear Algebra',
          isOfflineSeed: true
        }));
        
        setQuestionsIndex(localSeeds);
        setSyncMode('offline');
        setErrorMsg(err.message || 'CORS or network error. Loaded high-fidelity offline seed bank.');
      }
    };

    fetchSidebar();
  }, []);

  // 2. Save progress to localstorage on changes
  useEffect(() => {
    localStorage.setItem('nexus_iitm_progress', JSON.stringify(savedProgress));
  }, [savedProgress]);

  // 3. Close and reset active question states cleanly when switching subject/category tabs
  useEffect(() => {
    setSelectedQuestion(null);
    setActiveQuestionData(null);
    setIsGraded(false);
    setShowSolution(false);
    setShowHint(false);
    setUserSelection([]);
    setUserNatInput('');
    setIsCorrect(false);
    setIsPartiallyCorrect(false);
  }, [activeTab]);

  // 4. Typeset mathematical LaTeX equations via MathJax dynamically on content changes
  useEffect(() => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      const timer = setTimeout(() => {
        try {
          window.MathJax.typesetClear();
          window.MathJax.typesetPromise()
            .catch(err => console.warn('GATEPrep Nexus MathJax Typesetting Warning:', err));
        } catch (e) {
          console.warn('GATEPrep Nexus MathJax error:', e);
        }
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [activeQuestionData, showSolution, showHint, userSelection, userNatInput, isGraded, activeTab]);

  // 3. Fetch detailed question contents dynamically when a question is clicked
  const handleSelectQuestion = async (qItem) => {
    setSelectedQuestion(qItem);
    setActiveQuestionData(null);
    setIsGraded(false);
    setShowSolution(false);
    setShowHint(false);
    setUserSelection([]);
    setUserNatInput('');
    setIsCorrect(false);
    setIsPartiallyCorrect(false);
    setMobileView('question'); // Auto-switch mobile view to question canvas for fluid UX
    
    // Check if we already have progress for this question
    const storedAns = savedProgress.answers[qItem.relativePath];
    if (storedAns !== undefined) {
      if (Array.isArray(storedAns)) {
        setUserSelection(storedAns);
      } else {
        setUserNatInput(storedAns);
      }
      setIsGraded(true);
      const solvedVal = savedProgress.solved[qItem.relativePath];
      setIsCorrect(solvedVal === true);
      setIsPartiallyCorrect(solvedVal === 'partial');
      setShowSolution(true);
    }

    // If it is an offline seed question, load immediately
    if (qItem.isOfflineSeed) {
      const seedObj = IITM_QBANK_OFFLINE_SEED.find(s => s.relativePath === qItem.relativePath);
      setActiveQuestionData(seedObj);
      return;
    }

    // Dynamic Live Scraping
    setIsPageLoading(true);
    try {
      const fullUrl = `${baseUrl}${qItem.relativePath}`;
      const response = await fetch(fullUrl);
      if (!response.ok) {
        throw new Error(`Failed to load question subpage: ${response.status}`);
      }
      const htmlText = await response.text();
      const questionData = parseIITMQuestionPage(htmlText, qItem.relativePath);
      setActiveQuestionData(questionData);
    } catch (err) {
      console.error('Error fetching question subpage:', err);
      // If live scraping fails, try to see if it matches an offline seed
      const seedObj = IITM_QBANK_OFFLINE_SEED.find(s => s.relativePath === qItem.relativePath);
      if (seedObj) {
        setActiveQuestionData(seedObj);
      } else {
        setActiveQuestionData({
          title: qItem.title,
          questionHtml: `<p class="text-rose-400">Failed to sync this question dynamically from the IIT Madras portal. Please verify your internet connection or check if the page exists at <a href="${baseUrl}${qItem.relativePath}" target="_blank" class="underline text-purple-300">${qItem.relativePath}</a>.</p>`,
          questionText: 'Failed to sync question.',
          options: [],
          type: 'MCQ',
          correctIdxs: [],
          natAnswer: '',
          solutionHtml: '<p>Unavailable due to sync failure.</p>'
        });
      }
    } finally {
      setIsPageLoading(false);
    }
  };

  // 4. Form grading & verification
  const handleCheckAnswer = () => {
    if (!activeQuestionData) return;
    
    let gradedAsCorrect = false;
    let gradedAsPartiallyCorrect = false;
    
    if (activeQuestionData.type === 'MCQ') {
      if (userSelection.length === 1 && userSelection[0] === activeQuestionData.correctIdx) {
        gradedAsCorrect = true;
      }
    } else if (activeQuestionData.type === 'MSQ') {
      const corrects = activeQuestionData.correctIdxs || [];
      const userAnswers = [...userSelection].sort();
      const correctSorted = [...corrects].sort();
      if (
        userAnswers.length === correctSorted.length && 
        userAnswers.every((val, index) => val === correctSorted[index])
      ) {
        gradedAsCorrect = true;
      } else if (
        userAnswers.length > 0 &&
        userAnswers.length < correctSorted.length &&
        userAnswers.every(val => correctSorted.includes(val))
      ) {
        gradedAsPartiallyCorrect = true;
      }
    } else if (activeQuestionData.type === 'NAT') {
      const userAnsClean = userNatInput.trim().toLowerCase();
      const correctAnsClean = activeQuestionData.natAnswer.trim().toLowerCase();
      
      // Exact match, or float equivalence match
      if (userAnsClean === correctAnsClean) {
        gradedAsCorrect = true;
      } else {
        const userNum = parseFloat(userAnsClean);
        const correctNum = parseFloat(correctAnsClean);
        if (!isNaN(userNum) && !isNaN(correctNum) && Math.abs(userNum - correctNum) < 0.05) {
          gradedAsCorrect = true;
        }
      }
    }

    setIsCorrect(gradedAsCorrect);
    setIsPartiallyCorrect(gradedAsPartiallyCorrect);
    setIsGraded(true);
    setShowSolution(true);

    // Save progress to state/localStorage
    setSavedProgress(prev => {
      const newSolved = { 
        ...prev.solved, 
        [selectedQuestion.relativePath]: gradedAsCorrect ? true : (gradedAsPartiallyCorrect ? 'partial' : false) 
      };
      const newAnswers = { 
        ...prev.answers, 
        [selectedQuestion.relativePath]: activeQuestionData.type === 'NAT' ? userNatInput : userSelection 
      };
      return { solved: newSolved, answers: newAnswers };
    });
  };

  // 5. Multi-select toggle for options
  const handleToggleOption = (idx) => {
    if (isGraded) return; // locked after checking
    
    if (activeQuestionData.type === 'MCQ') {
      setUserSelection([idx]);
    } else if (activeQuestionData.type === 'MSQ') {
      if (userSelection.includes(idx)) {
        setUserSelection(userSelection.filter(i => i !== idx));
      } else {
        setUserSelection([...userSelection, idx]);
      }
    }
  };

  // 6. Reset question attempt
  const handleResetQuestion = () => {
    setIsGraded(false);
    setIsCorrect(false);
    setIsPartiallyCorrect(false);
    setShowSolution(false);
    setShowHint(false);
    setUserSelection([]);
    setUserNatInput('');
    
    setSavedProgress(prev => {
      const newSolved = { ...prev.solved };
      const newAnswers = { ...prev.answers };
      delete newSolved[selectedQuestion.relativePath];
      delete newAnswers[selectedQuestion.relativePath];
      return { solved: newSolved, answers: newAnswers };
    });
  };

  // Filtered list of questions based on category tab
  const filteredQuestions = questionsIndex.filter(q => {
    if (activeTab === 'all') return true;
    return q.category === activeTab;
  });

  // Solve statistics helper
  const getStats = (catId) => {
    const questions = questionsIndex.filter(q => catId === 'all' || q.category === catId);
    if (questions.length === 0) return { total: 0, solved: 0, pct: 0 };
    
    let solvedCount = 0;
    questions.forEach(q => {
      if (savedProgress.solved[q.relativePath] === true) {
        solvedCount++;
      }
    });

    return {
      total: questions.length,
      solved: solvedCount,
      pct: Math.round((solvedCount / questions.length) * 100)
    };
  };

  const overallStats = getStats('all');

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '48px' }}>
      {/* 1. Header Banner */}
      <div className="qbank-header-banner">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
              <span className="badge badge-purple">
                IITM BS Project Hub
              </span>
              
              {syncMode === 'syncing' && (
                <span className="badge badge-blue" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-blue)', animation: 'pulse 1.5s infinite' }}></span>
                  Connecting Portal...
                </span>
              )}
              
              {syncMode === 'online' && (
                <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-emerald)' }}></span>
                  Live Portal Synced
                </span>
              )}
              
              {syncMode === 'offline' && (
                <span className="badge badge-amber" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }} title={errorMsg}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-amber)' }}></span>
                  Offline Seed Mode
                </span>
              )}
            </div>
            
            <h1 style={{ margin: '12px 0 6px', fontSize: '2rem', fontWeight: '800', letterSpacing: '-0.02em', background: 'linear-gradient(to right, #ffffff, #e2e8f0, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              IIT Madras GATE-DA Q-Bank
            </h1>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '680px', margin: 0 }}>
              Explore 300+ community-curated GATE Data Science & AI practice questions. Every question, choice, and detailed mathematical solution is synced directly in real-time from the official IITM project portal.
            </p>

            {/* Syllabus Overlap Advisor Banner */}
            {user?.track === 'CS' && (
              <div style={{
                marginTop: '16px',
                padding: '12px 16px',
                backgroundColor: 'rgba(139, 92, 246, 0.04)',
                border: '1px solid rgba(139, 92, 246, 0.15)',
                borderRadius: '8px',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                lineHeight: '1.5',
                maxWidth: '680px'
              }}>
                <span style={{ fontSize: '1.1rem', lineHeight: '1' }}>🌟</span>
                <div>
                  <strong style={{ color: 'var(--accent-purple)' }}>GATE CS Overlap Alert:</strong> As a Computer Science candidate, focus on the categories marked with <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>🌟 (Shared)</span>. Linear Algebra, Probability, Calculus, DBMS, DSA, and General Aptitude are <strong style={{ color: 'var(--text-primary)' }}>100% applicable</strong> to your syllabus. Machine Learning, AI, and past DA papers are outside the GATE CS scope.
                </div>
              </div>
            )}

            {user?.track === 'Dual' && (
              <div style={{
                marginTop: '16px',
                padding: '12px 16px',
                backgroundColor: 'rgba(16, 185, 129, 0.04)',
                border: '1px solid rgba(16, 185, 129, 0.15)',
                borderRadius: '8px',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                lineHeight: '1.5',
                maxWidth: '680px'
              }}>
                <span style={{ fontSize: '1.1rem', lineHeight: '1' }}>🔥</span>
                <div>
                  <strong style={{ color: 'var(--accent-emerald)' }}>Dual CS & DA Track:</strong> Excellent! You can practice <strong style={{ color: 'var(--text-primary)' }}>every single question</strong> in this bank. The categories marked with <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>🌟 (Shared)</span> represent high-value core subjects shared across both CS and DA examinations.
                </div>
              </div>
            )}

            {user?.track === 'DA' && (
              <div style={{
                marginTop: '16px',
                padding: '12px 16px',
                backgroundColor: 'rgba(59, 130, 246, 0.04)',
                border: '1px solid rgba(59, 130, 246, 0.15)',
                borderRadius: '8px',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                lineHeight: '1.5',
                maxWidth: '680px'
              }}>
                <span style={{ fontSize: '1.1rem', lineHeight: '1' }}>📊</span>
                <div>
                  <strong style={{ color: 'var(--accent-blue)' }}>GATE DA Syllabus Focus:</strong> All questions in this bank are highly relevant to your exam. The categories marked with <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>🌟 (Shared)</span> are also part of the GATE CS syllabus (making them great for cross-referencing CS practice papers).
                </div>
              </div>
            )}
          </div>

          {/* Stats widget */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '16px 24px', backdropFilter: 'blur(8px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em', fontWeight: 'bold' }}>solved progress</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-purple)' }}>{overallStats.solved}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/ {overallStats.total}</span>
              </div>
            </div>
            
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px' }}>
              <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.03)" strokeWidth="5" fill="transparent" />
                <circle cx="32" cy="32" r="26" stroke="url(#purpleGradient)" strokeWidth="5" fill="transparent"
                  strokeDasharray={2 * Math.PI * 26}
                  strokeDashoffset={2 * Math.PI * 26 * (1 - overallStats.pct / 100)}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                />
                <defs>
                  <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
              <span style={{ position: 'absolute', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{overallStats.pct}%</span>
            </div>
          </div>
        </div>
        
        {syncMode === 'offline' && (
          <div style={{ marginTop: '20px', padding: '12px 16px', backgroundColor: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.15)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', gap: '8px', lineHeight: '1.5' }}>
            <svg style={{ width: '20px', height: '20px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>
              <strong>Note:</strong> We encountered a network restriction/CORS roadblock trying to fetch dynamically. To ensure uninterrupted studying, we've loaded a curated seed of 10 core questions with pristine math typesetting.
            </span>
          </div>
        )}
      </div>

      {/* 2. Mobile View Mode Switcher (Tab segmented switcher visible only on mobile/tablet) */}
      <div className="mobile-only-toggle" style={{
        display: 'none', // Overridden by CSS under 1024px
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '4px',
        width: '100%',
        boxSizing: 'border-box',
        gap: '4px'
      }}>
        <button
          onClick={() => setMobileView('list')}
          style={{
            flex: 1,
            padding: '10px 16px',
            borderRadius: 'var(--radius-sm)',
            background: mobileView === 'list' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
            border: 'none',
            color: mobileView === 'list' ? '#c084fc' : 'var(--text-secondary)',
            fontWeight: '700',
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          📋 Browse Questions
        </button>
        <button
          onClick={() => setMobileView('question')}
          style={{
            flex: 1,
            padding: '10px 16px',
            borderRadius: 'var(--radius-sm)',
            background: mobileView === 'question' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
            border: 'none',
            color: mobileView === 'question' ? '#c084fc' : 'var(--text-secondary)',
            fontWeight: '700',
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          📝 Question Canvas {selectedQuestion ? '•' : ''}
        </button>
      </div>

      {/* 3. Main Content Grid */}
      <div className="qbank-grid">
        
        {/* Left Side: Navigation Sidebar & Lists */}
        <div className={`qbank-sidebar ${mobileView === 'question' ? 'mobile-hide' : ''}`}>
          
          {/* Scrollable Category Filter Chips */}
          <div className="qbank-panel" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--accent-purple)', letterSpacing: '0.05em' }}>
              Filter Categories
            </h3>
            
            <div className="qbank-category-list">
              {categoriesList.map(cat => {
                const stats = getStats(cat.id);
                if (stats.total === 0 && cat.id !== 'all') return null;
                
                const isSelected = activeTab === cat.id;
                const isShared = cat.type === 'shared';
                const isDaOnly = cat.type === 'da_only';
                
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`qbank-category-btn ${isSelected ? 'active' : ''}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                      width: '100%'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                      {cat.id !== 'all' && (
                        <span 
                          style={{
                            fontSize: '0.72rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            opacity: isSelected ? 1 : 0.7
                          }}
                          title={isShared ? 'Shared Category (Tested in both GATE CS & DA)' : 'DA-Specific Category (Not tested in GATE CS)'}
                        >
                          {isShared ? '🌟' : '🤖'}
                        </span>
                      )}
                      <span style={{ 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: isSelected ? 'normal' : 'nowrap',
                        fontSize: '0.85rem'
                      }}>
                        {cat.name}
                      </span>
                    </div>
                    <span className="qbank-category-badge" style={{ flexShrink: 0 }}>
                      {stats.solved}/{stats.total}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Index Drawer */}
          <div className="qbank-panel" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--accent-emerald)', letterSpacing: '0.05em', margin: 0 }}>
                Discovered Questions ({filteredQuestions.length})
              </h3>
            </div>

            <div className="qbank-questions-container">
              {filteredQuestions.length === 0 ? (
                <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  No questions found in this category.
                </div>
              ) : (
                filteredQuestions.map((q) => {
                  const isSelected = selectedQuestion?.relativePath === q.relativePath;
                  const solvedVal = savedProgress.solved[q.relativePath];
                  const isSolved = solvedVal === true;
                  const isPartial = solvedVal === 'partial';
                  const isAttempted = savedProgress.answers[q.relativePath] !== undefined;
                  const isWrong = isAttempted && !isSolved && !isPartial;
                  
                  return (
                    <button
                      key={q.relativePath}
                      onClick={() => handleSelectQuestion(q)}
                      className={`qbank-question-btn ${isSelected ? 'selected' : ''}`}
                    >
                      <div style={{ minWidth: 0, flex: 1, paddingRight: '8px' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '4px' }}>
                          {q.title}
                        </div>
                        <span style={{ display: 'inline-block', fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                          {q.categoryName || 'Practice'}
                        </span>
                      </div>
                      
                      {/* Solved Status Indicator Badge */}
                      <div style={{ flexShrink: 0 }}>
                        {isSolved && (
                          <span className="qbank-status-badge qbank-status-solved">
                            ✓
                          </span>
                        )}
                        {isPartial && (
                          <span className="qbank-status-badge qbank-status-partial">
                            ⚠
                          </span>
                        )}
                        {isWrong && (
                          <span className="qbank-status-badge qbank-status-wrong">
                            ✗
                          </span>
                        )}
                        {!isAttempted && (
                          <span className="qbank-status-badge qbank-status-unattempted">
                            —
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Question Panel */}
        <div className={`qbank-canvas-container ${mobileView === 'list' ? 'mobile-hide' : ''}`} style={{ minWidth: 0 }}>
          
          {!selectedQuestion ? (
            /* 1. Landing state */
            <div className="qbank-canvas" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '400px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', animation: 'float 3s ease-in-out infinite' }}>
                💡
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '16px' }}>
                Ready to Practice?
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '380px', fontSize: '0.9rem', lineHeight: '1.6', margin: '8px 0 20px' }}>
                Select any question from the categories on the left. The compiler will pull live data, format equations, and grade your responses automatically.
              </p>
              <div>
                <button 
                  onClick={() => handleSelectQuestion(questionsIndex[0])}
                  className="btn btn-primary"
                >
                  Start with Question 1
                </button>
              </div>
            </div>
          ) : isPageLoading ? (
            /* 2. Frosted Shimmer Skeleton Loading */
            <div className="qbank-canvas" style={{ gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ height: '24px', width: '96px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '9999px' }}></div>
                <div style={{ height: '24px', width: '128px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '9999px' }}></div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ height: '32px', width: '75%', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '6px' }}></div>
                <div style={{ height: '16px', width: '100%', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '4px' }}></div>
                <div style={{ height: '16px', width: '85%', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '4px' }}></div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '16px' }}>
                {[1, 2, 3, 4].map(n => (
                  <div key={n} style={{ height: '48px', width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}></div>
                ))}
              </div>

              <div style={{ height: '40px', width: '144px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '8px', marginTop: '16px' }}></div>
            </div>
          ) : activeQuestionData ? (
            /* 3. Loaded Question Canvas */
            <div className="qbank-canvas animate-fade-in">
              
              {/* Type Badge & Metadata */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={`badge ${
                    activeQuestionData.type === 'MCQ' ? 'badge-purple' :
                    activeQuestionData.type === 'MSQ' ? 'badge-emerald' :
                    'badge-blue'
                  }`}>
                    {activeQuestionData.type}
                  </span>
                  
                  {activeQuestionData.type === 'MSQ' && (
                    <span style={{ fontSize: '11px', color: 'var(--accent-emerald)', opacity: 0.8, fontWeight: '500' }}>
                      (Multiple options can be correct)
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Source: IITM Student Projects
                  </span>
                  <a 
                    href={`${baseUrl}${selectedQuestion.relativePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', textDecoration: 'underline', fontWeight: '500' }}
                  >
                    View Original
                  </a>
                </div>
              </div>

              {/* Title & Question text */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
                  {selectedQuestion.title}
                </h2>
                
                {/* Render parsed question prompt */}
                <div 
                  className="dynamic-q-content"
                  style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.6' }}
                  dangerouslySetInnerHTML={{ __html: activeQuestionData.questionHtml }}
                />
              </div>

              {/* Options Section */}
              <div style={{ paddingTop: '12px' }}>
                {activeQuestionData.type === 'NAT' ? (
                  /* Numerical Answer Type Input */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '360px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                      Enter your numerical or exact answer:
                    </label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={userNatInput}
                        onChange={(e) => !isGraded && setUserNatInput(e.target.value)}
                        disabled={isGraded}
                        placeholder="Type answer here..."
                        className="qbank-nat-input"
                      />
                      {isGraded && (
                        <div style={{ position: 'absolute', right: '16px', fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          Correct: <span style={{ color: 'var(--accent-emerald)', fontWeight: 'bold' }}>{activeQuestionData.natAnswer}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* MCQ or MSQ Options list */
                  <div className="qbank-options-list">
                    {activeQuestionData.options.map((opt, idx) => {
                      const isSelected = userSelection.includes(idx);
                      const isOptionCorrect = activeQuestionData.type === 'MCQ' 
                        ? idx === activeQuestionData.correctIdx 
                        : (activeQuestionData.correctIdxs || []).includes(idx);
                      
                      let btnClass = 'qbank-option-btn';
                      if (isSelected && !isGraded) {
                        btnClass += ' selected';
                      } else if (isGraded) {
                        if (isSelected && isOptionCorrect) {
                          btnClass += ' correct-selected';
                        } else if (isSelected && !isOptionCorrect) {
                          btnClass += ' wrong-selected';
                        } else if (isOptionCorrect) {
                          btnClass += ' correct-unselected';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isGraded}
                          onClick={() => handleToggleOption(idx)}
                          className={btnClass}
                        >
                          {/* Circle checkmark box */}
                          <div className={`qbank-option-indicator ${
                            activeQuestionData.type === 'MCQ' ? 'radio' : ''
                          }`}>
                            {isSelected && (activeQuestionData.type === 'MCQ' ? '•' : '✓')}
                            {!isSelected && isGraded && isOptionCorrect && '✓'}
                          </div>

                          <div style={{ fontWeight: '500', fontSize: '0.95rem', lineHeight: '1.4' }}>
                            {opt}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {!isGraded ? (
                    <button
                      onClick={handleCheckAnswer}
                      disabled={
                        activeQuestionData.type === 'NAT'
                          ? !userNatInput.trim()
                          : userSelection.length === 0
                      }
                      className="btn btn-primary"
                      style={{
                        opacity: (activeQuestionData.type === 'NAT' ? !userNatInput.trim() : userSelection.length === 0) ? 0.5 : 1,
                        cursor: (activeQuestionData.type === 'NAT' ? !userNatInput.trim() : userSelection.length === 0) ? 'not-allowed' : 'pointer'
                      }}
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleResetQuestion}
                      className="btn btn-secondary"
                    >
                      Reset Attempt
                    </button>
                  )}

                  {activeQuestionData.hintHtml && !isGraded && (
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="btn btn-secondary"
                      style={{
                        borderColor: showHint ? 'rgba(245, 158, 11, 0.4)' : 'var(--border-color)',
                        backgroundColor: showHint ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255,255,255,0.03)',
                        color: showHint ? 'var(--accent-amber)' : 'var(--text-secondary)'
                      }}
                    >
                      {showHint ? 'Hide Hint' : 'Show Hint'}
                    </button>
                  )}
                </div>

                {isGraded && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ 
                      fontSize: '0.9rem', 
                      fontWeight: '700', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.05em', 
                      color: isCorrect 
                        ? 'var(--accent-emerald)' 
                        : (isPartiallyCorrect ? 'var(--accent-amber)' : 'var(--accent-rose)') 
                    }}>
                      {isCorrect 
                        ? 'Correct Answer!' 
                        : (isPartiallyCorrect ? 'Partially Correct!' : 'Incorrect Answer')}
                    </span>
                  </div>
                )}
              </div>

              {/* Hint Expandable Container */}
              {showHint && activeQuestionData.hintHtml && (
                <div className="animate-slide-down" style={{
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                  backgroundColor: 'rgba(245, 158, 11, 0.05)',
                  backdropFilter: 'blur(8px)',
                  color: 'rgba(245, 158, 11, 0.9)',
                  fontSize: '0.9rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-amber)' }}>
                    <span>💡</span> Study Hint:
                  </div>
                  <div 
                    className="dynamic-q-content"
                    style={{ fontSize: '0.85rem', lineHeight: '1.5' }}
                    dangerouslySetInnerHTML={{ __html: activeQuestionData.hintHtml }}
                  />
                </div>
              )}

              {/* Solution Drawer Panel */}
              {showSolution && activeQuestionData.solutionHtml && (
                <div className="animate-slide-down" style={{
                  padding: '20px',
                  borderRadius: 'var(--radius-md)',
                  border: isCorrect 
                    ? '1px solid rgba(16, 185, 129, 0.2)' 
                    : (isPartiallyCorrect ? '1px solid rgba(245, 158, 11, 0.2)' : '1px solid rgba(244, 63, 94, 0.1)'),
                  backgroundColor: isCorrect 
                    ? 'rgba(16, 185, 129, 0.05)' 
                    : (isPartiallyCorrect ? 'rgba(245, 158, 11, 0.05)' : 'rgba(244, 63, 94, 0.02)'),
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                    <h3 style={{ fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                      <span>⚡</span> Mathematical Solution & Derivation
                    </h3>
                  </div>

                  <div 
                    className="solution-html-container"
                    style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-primary)' }}
                    dangerouslySetInnerHTML={{ __html: activeQuestionData.solutionHtml }}
                  />
                </div>
              )}

            </div>
          ) : (
            <div className="qbank-panel" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
              Failed to load question canvas.
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
