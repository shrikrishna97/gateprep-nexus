import React, { useState } from 'react';
import { useApp } from '../AppContext';

const Planner = () => {
  const { 
    studyPlan, 
    completedTasks, 
    toggleDailyTask, 
    customParams, 
    updateScheduleParams 
  } = useApp();

  const [phaseFilter, setPhaseFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Settings states
  const [dailyHours, setDailyHours] = useState(customParams.dailyHours);
  const [examDate, setExamDate] = useState(customParams.examDate);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateScheduleParams(dailyHours, examDate);
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 3000);
  };

  // Filter studyPlan based on Phase and Search query
  const filteredPlan = studyPlan.filter((day) => {
    const matchesPhase = phaseFilter === 'All' || day.phase === phaseFilter;
    const matchesSearch = 
      day.dayNumber.toString().includes(searchQuery) ||
      day.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      day.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPhase && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPlan.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDays = filteredPlan.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1.9fr 1.1fr',
      gap: '32px'
    }} className="planner-layout-grid">
      
      {/* Left Column: Daily Planner Checklist */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Navigation & Search Filters */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <h3 style={{ margin: 0 }}>Preparation Roadmap</h3>
            
            {/* Phase Filters */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['All', 'Concepts & Foundation', 'Deep-Dive Practice', 'Revision & Mock Mastery'].map((phase) => (
                <button
                  key={phase}
                  onClick={() => {
                    setPhaseFilter(phase);
                    setCurrentPage(1);
                  }}
                  className={`btn ${phaseFilter === phase ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: 'var(--radius-sm)' }}
                >
                  {phase === 'All' ? 'All Days' : phase.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type="text"
              placeholder="Search by Day Number, Subject (e.g. Linear Algebra), or Topic..."
              className="form-input"
              style={{ width: '100%', paddingLeft: '40px', fontSize: '0.9rem', height: '42px' }}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              🔍
            </span>
          </div>
        </div>

        {/* Days List */}
        {currentDays.length === 0 ? (
          <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No study days match your search query or phase filter.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {currentDays.map((day) => {
              const dayTasks = completedTasks[day.date] || {};
              const isDayCompleted = !!dayTasks['main-task'];

              return (
                <div 
                  key={day.dayNumber} 
                  className="glass-panel"
                  style={{
                    padding: '20px 24px',
                    borderLeft: `5px solid ${
                      day.phaseNumber === 1 ? 'var(--accent-purple)' :
                      day.phaseNumber === 2 ? 'var(--accent-blue)' : 'var(--accent-emerald)'
                    }`,
                    backgroundColor: isDayCompleted ? 'rgba(16, 185, 129, 0.02)' : 'var(--bg-glass)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        backgroundColor: 'var(--border-color)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        color: 'var(--text-primary)'
                      }}>
                        Day {day.dayNumber}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{day.date}</span>
                    </div>

                    <span className={`badge ${
                      day.phaseNumber === 1 ? 'badge-purple' :
                      day.phaseNumber === 2 ? 'badge-blue' : 'badge-emerald'
                    }`} style={{ fontSize: '0.65rem' }}>
                      Phase {day.phaseNumber}: {day.phase.split(' ')[0]}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    {/* Toggle checkmark */}
                    <div 
                      onClick={() => toggleDailyTask(day.date, 'main-task')}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: `2px solid ${isDayCompleted ? 'var(--accent-emerald)' : 'var(--text-muted)'}`,
                        backgroundColor: isDayCompleted ? 'var(--accent-emerald-glow)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                        marginTop: '4px',
                        transition: 'all 0.15s ease',
                        flexShrink: 0
                      }}
                    >
                      {isDayCompleted ? '✓' : ''}
                    </div>

                    {/* Task Details */}
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {day.subject}
                      </div>
                      <h4 style={{
                        margin: '2px 0 6px',
                        fontSize: '1.1rem',
                        color: isDayCompleted ? 'var(--text-secondary)' : 'var(--text-primary)',
                        textDecoration: isDayCompleted ? 'line-through' : 'none'
                      }}>
                        {day.topic}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', lineHeight: 1.4 }}>
                        {day.task}
                      </p>

                      {/* Sub-topics bullets */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                        {day.subtopics.map((sub, sIdx) => (
                          <span key={sIdx} style={{ fontSize: '0.72rem', padding: '2px 8px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                            • {sub}
                          </span>
                        ))}
                      </div>

                      {/* Resources */}
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        📖 Reference: <span style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>{day.resource}</span>
                      </div>
                    </div>

                    {/* Target Study Hours */}
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{day.durationHours}h</span>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Study Goal</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination navigation controls */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
            <button 
              className="btn btn-secondary" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ padding: '6px 12px', fontSize: '0.8rem', opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
            >
              ◀ Prev
            </button>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Page <strong>{currentPage}</strong> of {totalPages}
            </span>
            <button 
              className="btn btn-secondary" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{ padding: '6px 12px', fontSize: '0.8rem', opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
            >
              Next ▶
            </button>
          </div>
        )}
      </div>

      {/* Right Column: Settings Desk */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Planner Settings */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>⚙️</span> Re-Balance Calendar
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.4 }}>
            Tailor the planner dynamically to match your personal routine. When you change these parameters, the system instantly recalculates your 3-phase calendar!
          </p>

          <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {settingsSuccess && (
              <div style={{
                backgroundColor: 'var(--accent-emerald-glow)',
                color: 'var(--accent-emerald)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 12px',
                fontSize: '0.8rem',
                fontWeight: 500
              }}>
                ✓ Calendar recalculated successfully!
              </div>
            )}

            {/* Target Daily Hours */}
            <div className="form-group">
              <label className="form-label" htmlFor="planner-hours">Target Daily Study Hours</label>
              <input
                id="planner-hours"
                type="number"
                min="1"
                max="16"
                className="form-input"
                value={dailyHours}
                onChange={(e) => setDailyHours(e.target.value)}
              />
            </div>

            {/* Exam Date */}
            <div className="form-group">
              <label className="form-label" htmlFor="planner-exam-date">Target GATE Exam Date</label>
              <input
                id="planner-exam-date"
                type="date"
                className="form-input"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '12px', width: '100%' }}>
              Recalculate Roadmap 🔄
            </button>
          </form>
        </div>

        {/* Study Advice Card */}
        <div className="glass-panel" style={{ padding: '28px', backgroundImage: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(59, 130, 246, 0.05))', border: '1px solid var(--border-color-glow)' }}>
          <h4 style={{ margin: '0 0 10px', fontSize: '1.05rem', fontWeight: 700 }}>💡 Pro GATE Tip: Spaced Repetition</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
            Make sure to utilize the <strong>"Mark Completed"</strong> button daily. In Phase 2, our scheduler will automatically shift your study goals from basic conceptual learning to solving intense past-term GATE papers (PYQs) and drilling core formulas to build high retention.
          </p>
        </div>
      </div>

      {/* Responsive adjustment styles */}
      <style>{`
        @media (max-width: 900px) {
          .planner-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Planner;
