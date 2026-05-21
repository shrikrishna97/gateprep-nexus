import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { GATE_SYLLABUS } from '../data/mockData';

const Syllabus = () => {
  const { user, syllabusProgress, toggleSyllabusTopic } = useApp();
  
  // Default tab based on user track
  const [activeSyllabusTrack, setActiveSyllabusTrack] = useState(() => {
    return (user && user.track !== 'Dual') ? user.track : 'CS';
  });

  // Keep track of which subject accordion is open
  const [openSubjects, setOpenSubjects] = useState({});

  const toggleSubjectCollapse = (subjectId) => {
    setOpenSubjects(prev => ({
      ...prev,
      [subjectId]: !prev[subjectId]
    }));
  };

  const currentSyllabus = GATE_SYLLABUS[activeSyllabusTrack];
  const trackProgress = syllabusProgress[activeSyllabusTrack] || {};

  // Calculate statistics
  let totalTopicsCount = 0;
  let completedTopicsCount = 0;

  currentSyllabus.forEach(sub => {
    sub.topics.forEach(topic => {
      totalTopicsCount++;
      if (trackProgress[topic.id]) {
        completedTopicsCount++;
      }
    });
  });

  const percentCompleted = totalTopicsCount > 0 
    ? Math.round((completedTopicsCount / totalTopicsCount) * 100) 
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* SECTION 1: Header Tracker Progress */}
      <div className="glass-panel" style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.4rem' }}>Syllabus Coverage</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '4px 0 0' }}>
            Check off completed topics as you study to watch your progress fill up!
          </p>
        </div>

        {/* Progress Display */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', minWidth: '260px', flexGrow: 1, justifySelf: 'flex-end', justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: '80px' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-purple)' }}>{percentCompleted}%</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{completedTopicsCount} / {totalTopicsCount} Topics</span>
          </div>
          <div className="progress-bar-container" style={{ width: '150px', height: '10px' }}>
            <div 
              className="progress-bar-fill" 
              style={{ 
                width: `${percentCompleted}%`,
                background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))' 
              }} 
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Track Selectors Tabs */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={() => setActiveSyllabusTrack('CS')}
          className={`btn ${activeSyllabusTrack === 'CS' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '10px 24px', fontSize: '0.85rem' }}
        >
          💻 Computer Science (CS) Syllabus
        </button>
        <button
          onClick={() => setActiveSyllabusTrack('DA')}
          className={`btn ${activeSyllabusTrack === 'DA' ? 'btn-accent-blue' : 'btn-secondary'}`}
          style={{ padding: '10px 24px', fontSize: '0.85rem' }}
        >
          📊 Data Science & AI (DA) Syllabus
        </button>
      </div>

      {/* SECTION 3: Accordion Subjects Render */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {currentSyllabus.map((subject) => {
          const isOpen = openSubjects[subject.id];
          
          // Calculate subject-specific progress
          let subTotal = 0;
          let subDone = 0;
          subject.topics.forEach(t => {
            subTotal++;
            if (trackProgress[t.id]) subDone++;
          });
          const subPercent = subTotal > 0 ? Math.round((subDone / subTotal) * 100) : 0;

          return (
            <div key={subject.id} className="glass-panel" style={{ overflow: 'hidden', padding: 0 }}>
              
              {/* Subject Accordion Trigger */}
              <div 
                onClick={() => toggleSubjectCollapse(subject.id)}
                style={{
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  backgroundColor: 'rgba(255, 255, 255, 0.01)',
                  userSelect: 'none',
                  borderBottom: isOpen ? '1px solid var(--border-color)' : 'none',
                  transition: 'background 0.15s ease'
                }}
                className="accordion-header"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '1.2rem', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', color: 'var(--text-secondary)' }}>
                    ▶
                  </span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>{subject.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{subDone} of {subTotal} topics covered</span>
                  </div>
                </div>

                {/* Progress bar inside row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{subPercent}%</span>
                  <div className="progress-bar-container" style={{ width: '80px', height: '6px' }}>
                    <div 
                      className="progress-bar-fill" 
                      style={{ 
                        width: `${subPercent}%`, 
                        background: activeSyllabusTrack === 'CS' ? 'var(--accent-purple)' : 'var(--accent-blue)' 
                      }} 
                    />
                  </div>
                </div>
              </div>

              {/* Collapsed Subject Topics List */}
              {isOpen && (
                <div style={{
                  padding: '20px 24px',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}>
                  {subject.topics.map((topic) => {
                    const isCompleted = !!trackProgress[topic.id];

                    return (
                      <div 
                        key={topic.id} 
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '16px',
                          padding: '16px',
                          backgroundColor: isCompleted ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.01)',
                          border: `1px solid ${isCompleted ? 'var(--border-color-glow)' : 'var(--border-color)'}`,
                          borderRadius: 'var(--radius-md)',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {/* Checkbox Trigger */}
                        <div 
                          onClick={() => toggleSyllabusTopic(activeSyllabusTrack, topic.id)}
                          style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '6px',
                            border: `2px solid ${isCompleted ? 'var(--accent-purple)' : 'var(--text-muted)'}`,
                            backgroundColor: isCompleted ? 'var(--accent-purple-glow)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '0.8rem',
                            marginTop: '2px',
                            transition: 'all 0.15s ease',
                            userSelect: 'none'
                          }}
                        >
                          {isCompleted ? '✓' : ''}
                        </div>

                        {/* Details */}
                        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <h5 style={{
                            margin: 0,
                            fontSize: '0.95rem',
                            fontWeight: 700,
                            textDecoration: isCompleted ? 'line-through' : 'none',
                            color: isCompleted ? 'var(--text-secondary)' : 'var(--text-primary)'
                          }}>
                            {topic.name}
                          </h5>

                          {/* Sub-topics list */}
                          <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '6px',
                            marginTop: '2px'
                          }}>
                            {topic.subtopics.map((st, sIdx) => (
                              <span 
                                key={sIdx} 
                                style={{
                                  fontSize: '0.72rem',
                                  padding: '2px 8px',
                                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                  borderRadius: '4px',
                                  color: 'var(--text-secondary)',
                                  border: '1px solid var(--border-color)'
                                }}
                              >
                                {st}
                              </span>
                            ))}
                          </div>

                          {/* Curated Resources */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.78rem',
                            marginTop: '4px',
                            color: 'var(--text-secondary)'
                          }}>
                            <span>📺 study resource:</span>
                            <span 
                              style={{ 
                                color: activeSyllabusTrack === 'CS' ? 'var(--accent-purple)' : 'var(--accent-blue)', 
                                fontWeight: 600, 
                                cursor: 'pointer',
                                textDecoration: 'underline'
                              }}
                              onClick={() => {
                                alert(`Opening free course: "${topic.resource}"\n(Direct link simulation inside student preparation environment)`);
                              }}
                              title="Click to access free lectures"
                            >
                              {topic.resource}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        .accordion-header:hover {
          background-color: var(--bg-glass-hover) !important;
        }
      `}</style>
    </div>
  );
};

export default Syllabus;
