import React, { createContext, useContext, useState, useEffect } from 'react';
import { GATE_SYLLABUS } from './data/mockData';

const AppContext = createContext();

// Helper to calculate days between two dates
export const calculateDaysBetween = (start, end) => {
  const diffTime = new Date(end) - new Date(start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Helper to format date in YYYY-MM-DD local time
export const formatDateLocal = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper to calculate the first Saturday of February for any given year
export const getFirstSaturdayOfFebruary = (year) => {
  const feb1 = new Date(year, 1, 1); // February is 1 (0-indexed)
  const dayOfWeek = feb1.getDay(); // 0 is Sunday, 6 is Saturday
  const daysToAdd = (6 - dayOfWeek + 7) % 7;
  return new Date(year, 1, 1 + daysToAdd);
};

// Helper to get estimated target exam date (first Saturday of February)
// If the reference date is past the first Saturday of February in the current year,
// the target rolls over to the first Saturday of February of the following year.
export const getEstimatedExamDate = (refDateStr) => {
  const refDate = new Date(refDateStr || new Date());
  const refYear = refDate.getFullYear();
  const currentYearExam = getFirstSaturdayOfFebruary(refYear);
  const currentYearExamStr = formatDateLocal(currentYearExam);
  
  if (refDateStr > currentYearExamStr) {
    const nextYearExam = getFirstSaturdayOfFebruary(refYear + 1);
    return formatDateLocal(nextYearExam);
  }
  return currentYearExamStr;
};

export const AppProvider = ({ children }) => {
  // 1. Core user state (null if not authenticated)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('gate_user');
    return saved ? JSON.parse(saved) : null;
  });

  // 2. Theme (default dark)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('gate_theme');
    return saved || 'dark';
  });

  // 3. Navigation active tab
  const [activeTab, setActiveTab] = useState('dashboard');

  // 4. Syllabus checkbox progress
  const [syllabusProgress, setSyllabusProgress] = useState(() => {
    const saved = localStorage.getItem('gate_syllabus_progress');
    return saved ? JSON.parse(saved) : { CS: {}, DA: {} };
  });

  // 5. Calendar completed daily tasks
  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem('gate_completed_tasks');
    return saved ? JSON.parse(saved) : {};
  });

  // 6. Practice score history
  const [mockHistory, setMockHistory] = useState(() => {
    const saved = localStorage.getItem('gate_mock_history');
    return saved ? JSON.parse(saved) : [];
  });

  // 7. Sticky Notes board
  const [stickyNotes, setStickyNotes] = useState(() => {
    const saved = localStorage.getItem('gate_sticky_notes');
    const todayStr = formatDateLocal(new Date());
    return saved ? JSON.parse(saved) : [
      { id: 'note-1', text: 'Revise Eigenvalues & Bayes Theorem this weekend! 🧠', color: '#fef08a', date: todayStr },
      { id: 'note-2', text: 'Practice 10 Linear Algebra questions daily. ⚡', color: '#bae6fd', date: todayStr }
    ];
  });

  // 8. Daily study hours history
  const [studyHoursHistory, setStudyHoursHistory] = useState(() => {
    const saved = localStorage.getItem('gate_study_hours');
    return saved ? JSON.parse(saved) : {};
  });

  // 9. Custom Scheduler configuration (Default to 4 hours daily, dynamically rolled over)
  const [customParams, setCustomParams] = useState(() => {
    const saved = localStorage.getItem('gate_custom_params');
    const todayStr = formatDateLocal(new Date());
    if (saved) {
      const parsed = JSON.parse(saved);
      // Auto-rollover if the stored exam date has already passed today's date
      if (todayStr > parsed.examDate) {
        parsed.examDate = getEstimatedExamDate(todayStr);
      }
      return parsed;
    }
    return {
      dailyHours: 4,
      examDate: getEstimatedExamDate(todayStr)
    };
  });

  // 10. Dynamically generated study plan
  const [studyPlan, setStudyPlan] = useState([]);

  // Sync states to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('gate_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gate_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('gate_theme', theme);
    const bodyClass = document.body.classList;
    if (theme === 'light') {
      bodyClass.add('light-theme');
    } else {
      bodyClass.remove('light-theme');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('gate_syllabus_progress', JSON.stringify(syllabusProgress));
  }, [syllabusProgress]);

  useEffect(() => {
    localStorage.setItem('gate_completed_tasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem('gate_mock_history', JSON.stringify(mockHistory));
  }, [mockHistory]);

  useEffect(() => {
    localStorage.setItem('gate_sticky_notes', JSON.stringify(stickyNotes));
  }, [stickyNotes]);

  useEffect(() => {
    localStorage.setItem('gate_study_hours', JSON.stringify(studyHoursHistory));
  }, [studyHoursHistory]);

  useEffect(() => {
    localStorage.setItem('gate_custom_params', JSON.stringify(customParams));
  }, [customParams]);

  // Dynamic scheduler engine: generates calendar plan based on current track and dates
  useEffect(() => {
    if (!user) return;
    const track = user.track;
    const today = formatDateLocal(new Date()); // Dynamic, current timezone-safe system date
    const examDate = customParams.examDate;
    const totalDays = calculateDaysBetween(today, examDate);
    
    if (totalDays <= 0) {
      setStudyPlan([]);
      return;
    }

    // Determine subjects list
    let subjects;
    if (track === 'CS') {
      subjects = GATE_SYLLABUS.CS;
    } else if (track === 'DA') {
      subjects = GATE_SYLLABUS.DA;
    } else {
      // Dual track: merge them, keeping common subjects grouped
      const allCS = GATE_SYLLABUS.CS;
      const allDA = GATE_SYLLABUS.DA;
      
      // Select CS math & basic Programming as common foundational block
      const common = allCS.filter(s => s.id === 'cs-math' || s.id === 'cs-dsa' || s.id === 'cs-algo' || s.id === 'cs-db');
      const csUnique = allCS.filter(s => !['cs-math', 'cs-dsa', 'cs-algo', 'cs-db'].includes(s.id));
      const daUnique = allDA.filter(s => !['da-la', 'da-prob', 'da-calc', 'da-prog', 'da-db'].includes(s.id));
      
      subjects = [...common, ...csUnique, ...daUnique];
    }

    const generatedDays = [];
    
    // Split days:
    // Phase 1 (Core Concepts): 60% of time
    // Phase 2 (Practice & Revision): 25% of time
    // Phase 3 (Mocks & Recall): 15% of time
    const p1Count = Math.floor(totalDays * 0.6);
    const p2Count = Math.floor(totalDays * 0.25);
    const p3Count = totalDays - p1Count - p2Count;

    // Distribute subjects in Phase 1
    const daysPerSubject = Math.max(1, Math.floor(p1Count / subjects.length));

    let currentDayIndex = 1;
    let subjectIndex = 0;
    
    // Create reference date object
    const start = new Date(today);

    // Phase 1 Day Generation
    for (let i = 0; i < p1Count; i++) {
      const dayDate = new Date(start);
      dayDate.setDate(start.getDate() + i);
      const dateStr = formatDateLocal(dayDate);

      // Rotate through subjects
      const currentSubject = subjects[subjectIndex % subjects.length];
      // Select topic based on rotation within subject
      const topicIndex = Math.floor((i % daysPerSubject) / Math.max(1, daysPerSubject / currentSubject.topics.length)) % currentSubject.topics.length;
      const currentTopic = currentSubject.topics[topicIndex];

      generatedDays.push({
        dayNumber: currentDayIndex,
        date: dateStr,
        phase: 'Concepts & Foundation',
        phaseNumber: 1,
        subject: currentSubject.name,
        topic: currentTopic.name,
        subtopics: currentTopic.subtopics,
        resource: currentTopic.resource,
        durationHours: customParams.dailyHours,
        task: `Watch lectures & read detailed notes for: ${currentTopic.name}. Solves standard textbook questions.`
      });

      if ((i + 1) % daysPerSubject === 0) {
        subjectIndex++;
      }
      currentDayIndex++;
    }

    // Phase 2 Day Generation (Practice & Revision)
    for (let i = 0; i < p2Count; i++) {
      const dayDate = new Date(start);
      dayDate.setDate(start.getDate() + p1Count + i);
      const dateStr = formatDateLocal(dayDate);

      // Rotate through subjects for secondary revision
      const currentSubject = subjects[i % subjects.length];

      generatedDays.push({
        dayNumber: currentDayIndex,
        date: dateStr,
        phase: 'Deep-Dive Practice',
        phaseNumber: 2,
        subject: currentSubject.name,
        topic: 'Subject-wise Tests & Short Notes',
        subtopics: ['Compile critical formula list', 'Solve past 5 years\' GATE questions', 'Take 1 subject-specific quiz'],
        resource: 'GATE PYQ Portal & Formulas Hub',
        durationHours: customParams.dailyHours,
        task: `Solve PYQs for ${currentSubject.name} and review incorrect answers. Finish your formulas cheatsheet.`
      });
      currentDayIndex++;
    }

    // Phase 3 Day Generation (Full-Length Mocks)
    for (let i = 0; i < p3Count; i++) {
      const dayDate = new Date(start);
      dayDate.setDate(start.getDate() + p1Count + p2Count + i);
      const dateStr = formatDateLocal(dayDate);

      const isMockDay = i % 3 === 0;

      generatedDays.push({
        dayNumber: currentDayIndex,
        date: dateStr,
        phase: 'Revision & Mock Mastery',
        phaseNumber: 3,
        subject: 'General GATE Assessment',
        topic: isMockDay ? 'Full Length Mock Exam' : 'Revision & Weak Area Drilling',
        subtopics: isMockDay 
          ? ['Attempt 3-hour comprehensive mock test', 'Review virtual calculator strategies'] 
          : ['Drill flashcards (Active Recall)', 'Revise marked mistakes from previous mock tests'],
        resource: 'Nexus Mock Simulator & Active Recall',
        durationHours: customParams.dailyHours + 1,
        task: isMockDay 
          ? 'Take the full 3-hour practice mock test on the Nexus simulator. Analyze score.'
          : 'Dedicate 4 hours to analyzing your weak areas and practicing active recall flashcards.'
      });
      currentDayIndex++;
    }

    setStudyPlan(generatedDays);
  }, [user, customParams]);

  // Auth Operations
  const login = (name, track, avatar) => {
    setUser({ name, track, avatar: avatar || '👤' });
    setActiveTab('dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gate_user');
  };

  const updateTrack = (track) => {
    if (user) {
      setUser(prev => ({ ...prev, track }));
    }
  };

  // Theme Toggler
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Syllabus tracker checkbox
  const toggleSyllabusTopic = (track, topicId) => {
    setSyllabusProgress(prev => {
      const currentTrack = prev[track] || {};
      const updated = { ...currentTrack, [topicId]: !currentTrack[topicId] };
      return { ...prev, [track]: updated };
    });
  };

  // Tasks calendar checklist
  const toggleDailyTask = (dateStr, taskId) => {
    setCompletedTasks(prev => {
      const dayTasks = prev[dateStr] || {};
      const updated = { ...dayTasks, [taskId]: !dayTasks[taskId] };
      return { ...prev, [dateStr]: updated };
    });
  };

  // Score History
  const addMockScore = (track, paperName, score, totalQuestions) => {
    const newRecord = {
      id: 'score-' + Date.now(),
      track,
      paperName,
      score,
      totalQuestions,
      date: formatDateLocal(new Date())
    };
    setMockHistory(prev => [newRecord, ...prev]);
  };

  // Sticky Notes CRUD
  const addStickyNote = (text, color) => {
    const newNote = {
      id: 'note-' + Date.now(),
      text,
      color: color || '#fef08a',
      date: formatDateLocal(new Date())
    };
    setStickyNotes(prev => [newNote, ...prev]);
  };

  const deleteStickyNote = (id) => {
    setStickyNotes(prev => prev.filter(note => note.id !== id));
  };

  // Study hours logger
  const logStudyHours = (dateStr, hours) => {
    setStudyHoursHistory(prev => ({
      ...prev,
      [dateStr]: (prev[dateStr] || 0) + Number(hours)
    }));
  };

  // Scheduler updates
  const updateScheduleParams = (dailyHours, examDate) => {
    setCustomParams({
      dailyHours: Number(dailyHours),
      examDate
    });
  };

  return (
    <AppContext.Provider value={{
      user,
      theme,
      activeTab,
      syllabusProgress,
      completedTasks,
      mockHistory,
      stickyNotes,
      studyHoursHistory,
      customParams,
      studyPlan,
      setActiveTab,
      login,
      logout,
      updateTrack,
      toggleTheme,
      toggleSyllabusTopic,
      toggleDailyTask,
      addMockScore,
      addStickyNote,
      deleteStickyNote,
      logStudyHours,
      updateScheduleParams
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
