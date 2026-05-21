import React, { useState } from 'react';
import { useApp, calculateDaysBetween, formatDateLocal } from '../AppContext';
import { GATE_SYLLABUS } from '../data/mockData';

const Dashboard = () => {
  const { 
    user, 
    syllabusProgress, 
    completedTasks, 
    toggleDailyTask, 
    mockHistory, 
    studyHoursHistory, 
    customParams, 
    studyPlan, 
    logStudyHours,
    setActiveTab
  } = useApp();

  const [inputHours, setInputHours] = useState('');
  const [logSuccess, setLogSuccess] = useState(false);

  const today = formatDateLocal(new Date());
  const examDate = customParams.examDate;
  const daysLeft = calculateDaysBetween(today, examDate);

  // 1. Calculate Syllabus Coverage %
  const currentSyllabusTrack = (user && user.track !== 'Dual') ? user.track : 'CS';
  const trackSyllabus = GATE_SYLLABUS[currentSyllabusTrack];
  const trackProgress = syllabusProgress[currentSyllabusTrack] || {};

  let totalTopics = 0;
  let completedTopics = 0;

  trackSyllabus.forEach(sub => {
    sub.topics.forEach(t => {
      totalTopics++;
      if (trackProgress[t.id]) completedTopics++;
    });
  });

  const syllabusPercent = totalTopics > 0 
    ? Math.round((completedTopics / totalTopics) * 100) 
    : 0;

  // 2. Calculate Mock Test Average
  const userMockHistory = mockHistory.filter(h => h.track === user?.track || user?.track === 'Dual');
  const mockAverage = userMockHistory.length > 0
    ? Math.round(userMockHistory.reduce((acc, h) => acc + (h.score / h.totalQuestions * 100), 0) / userMockHistory.length)
    : 0;

  // 3. Logged Study Hours for Today
  const todayHours = studyHoursHistory[today] || 0;
  const targetHours = customParams.dailyHours;
  const hoursPercent = Math.min(100, Math.round((todayHours / targetHours) * 100));

  // Circular progress calculations for study hours ring
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (hoursPercent / 100) * circumference;

  // 4. Fetch Today's Scheduled Task from StudyPlan
  const todayTask = studyPlan.find(day => day.date === today) || null;
  const isTodayCompleted = todayTask ? !!(completedTasks[todayTask.date]?.['main-task']) : false;

  // 5. Fetch Next 3 Days
  const todayIndex = studyPlan.findIndex(day => day.date === today);
  const upcomingTasks = todayIndex !== -1 
    ? studyPlan.slice(todayIndex + 1, todayIndex + 4)
    : [];

  const handleLogHours = (e) => {
    e.preventDefault();
    const hours = parseFloat(inputHours);
    if (!hours || isNaN(hours) || hours <= 0 || hours > 24) return;
    logStudyHours(today, hours);
    setInputHours('');
    setLogSuccess(true);
    setTimeout(() => setLogSuccess(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* SECTION 1: STATISTICS ROW */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '24px'
      }}>
        {/* Days Left Card */}
        <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '1.25rem' }}>⏳</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Days To GATE</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '8px 0 2px', color: 'var(--accent-purple)' }}>
            {daysLeft > 0 ? daysLeft : 0}
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target: {examDate}</span>
        </div>

        {/* Syllabus Covered Card */}
        <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '1.25rem' }}>📈</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Syllabus Covered</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '8px 0 2px', color: 'var(--accent-blue)' }}>
            {syllabusPercent}%
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{completedTopics} / {totalTopics} Topics</span>
        </div>

        {/* Mock Average Card */}
        <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '1.25rem' }}>🎯</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Mock Test Avg</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '8px 0 2px', color: 'var(--accent-cyan)' }}>
            {mockAverage > 0 ? `${mockAverage}%` : 'N/A'}
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {userMockHistory.length > 0 ? `Based on ${userMockHistory.length} tests` : 'Take your first test!'}
          </span>
        </div>

        {/* Today's Study Hours Card */}
        <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '1.25rem' }}>⚡</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Hours Studied</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '8px 0 2px', color: 'var(--accent-emerald)' }}>
            {todayHours}h
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Daily Goal: {targetHours}h</span>
        </div>
      </div>

      {/* SECTION 2: DUAL LAYOUT PANEL */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.7fr 1.3fr',
        gap: '32px'
      }} className="dashboard-layout-grid">
        
        {/* Left Column: Today's study target and upcoming roadmap */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Today's Study Target Widget */}
          <div className="glass-panel" style={{ padding: '28px', borderLeft: '6px solid var(--accent-purple)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.3rem' }}>🎯</span>
                <h3 style={{ margin: 0 }}>Today's Study Focus</h3>
              </div>
              <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                {todayTask ? `Day ${todayTask.dayNumber}` : 'Day Offline'}
              </span>
            </div>

            {todayTask ? (
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                {/* Checkbox */}
                <div 
                  onClick={() => toggleDailyTask(todayTask.date, 'main-task')}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: `2px solid ${isTodayCompleted ? 'var(--accent-emerald)' : 'var(--text-muted)'}`,
                    backgroundColor: isTodayCompleted ? 'var(--accent-emerald-glow)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    transition: 'all 0.15s ease',
                    flexShrink: 0
                  }}
                  title={isTodayCompleted ? "Mark incomplete" : "Mark today's task complete!"}
                >
                  {isTodayCompleted ? '✓' : ''}
                </div>

                {/* Details */}
                <div style={{ flexGrow: 1, minWidth: '200px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {todayTask.subject}
                  </div>
                  <h4 style={{
                    fontSize: '1.25rem',
                    margin: '4px 0 8px',
                    color: isTodayCompleted ? 'var(--text-secondary)' : 'var(--text-primary)',
                    textDecoration: isTodayCompleted ? 'line-through' : 'none'
                  }}>
                    {todayTask.topic}
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.4 }}>
                    {todayTask.task}
                  </p>

                  {/* Curated free study source link */}
                  <div style={{
                    padding: '12px 16px',
                    backgroundColor: 'rgba(0,0,0,0.15)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.85rem'
                  }}>
                    📖 Recommended Lecture: <span 
                      style={{ color: 'var(--accent-purple)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => alert(`Redirecting to free course source:\n"${todayTask.resource}"`)}
                    >
                      {todayTask.resource}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)' }}>
                No active calendar roadmap found. Update parameters in Study Scheduler to generate one!
              </div>
            )}
          </div>

          {/* Upcoming Roadmap Queue */}
          <div className="glass-panel" style={{ padding: '28px' }}>
            <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>🔮</span> Upcoming Milestones
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {upcomingTasks.map((day) => (
                <div 
                  key={day.dayNumber}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 18px',
                    backgroundColor: 'rgba(255,255,255,0.01)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer'
                  }}
                  onClick={() => setActiveTab('planner')}
                  title="Click to view detailed Study Planner"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, backgroundColor: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>
                      Day {day.dayNumber}
                    </span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{day.subject}</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{day.topic}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{day.date}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{day.durationHours}h</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Log study hours card and visual ring */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Study hours progress ring card */}
          <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 16px', alignSelf: 'flex-start' }}>Daily Goal Progress</h3>
            
            {/* SVG Ring */}
            <div style={{ position: 'relative', width: '130px', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <svg width="130" height="130" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                {/* Background gray circle */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="transparent"
                  stroke="var(--border-color)"
                  strokeWidth="8"
                />
                {/* Dynamic colored ring */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="transparent"
                  stroke="url(#purpleBlueGrad)"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                />
                <defs>
                  <linearGradient id="purpleBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--accent-purple)" />
                    <stop offset="100%" stopColor="var(--accent-blue)" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Inner Label */}
              <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800 }}>{hoursPercent}%</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Daily Goal</span>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.4 }}>
              You have studied <strong>{todayHours} hours</strong> out of your target <strong>{targetHours} hours</strong> today.
            </p>

            {/* Input log form */}
            <form onSubmit={handleLogHours} style={{ width: '100%', display: 'flex', gap: '8px' }}>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="24"
                className="form-input"
                placeholder="Log hours (e.g. 2.5)"
                style={{ flexGrow: 1, padding: '8px 12px', fontSize: '0.85rem', background: 'rgba(0,0,0,0.2)' }}
                value={inputHours}
                onChange={(e) => setInputHours(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '0.85rem', borderRadius: 'var(--radius-md)', flexShrink: 0 }}>
                Log Hours ⚡
              </button>
            </form>
            
            {logSuccess && (
              <span style={{ color: 'var(--accent-emerald)', fontSize: '0.75rem', fontWeight: 600, marginTop: '8px' }}>
                ✓ Hours logged successfully!
              </span>
            )}
          </div>

          {/* Quick links shortcut menu */}
          <div className="glass-panel" style={{ padding: '28px' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '1rem', fontWeight: 700 }}>Quick Commands</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button 
                onClick={() => setActiveTab('practice')}
                className="btn btn-secondary" 
                style={{ padding: '10px', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}
              >
                <span>📝</span>
                <span>Practice Mock</span>
              </button>
              <button 
                onClick={() => setActiveTab('formulas')}
                className="btn btn-secondary" 
                style={{ padding: '10px', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}
              >
                <span>🧠</span>
                <span>Formula Sheet</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 900px) {
          .dashboard-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
