import React, { useState, useEffect } from 'react';
import { useApp, calculateDaysBetween, formatDateLocal } from '../AppContext';
import { GATE_NOTICES } from '../data/mockData';

// Helper to determine conducting body based on standard rotation cycle
const getOrganizingInstitute = (year) => {
  const organizers = {
    2025: 'IIT Roorkee',
    2026: 'IIT Guwahati',
    2027: 'IIT Madras',
    2028: 'IIT Bombay',
    2029: 'IIT Kharagpur',
    2030: 'IIT Kanpur',
    2031: 'IIT Delhi',
    2032: 'IISc Bangalore'
  };
  return organizers[year] || 'IIT Madras (Tentative)';
};

const NoticeBoard = () => {
  const { stickyNotes, addStickyNote, deleteStickyNote, customParams } = useApp();
  const [newNoteText, setNewNoteText] = useState('');
  const [noteColor, setNoteColor] = useState('#fef08a'); // default yellow

  const colors = [
    { name: 'Yellow', code: '#fef08a' },
    { name: 'Blue', code: '#bae6fd' },
    { name: 'Green', code: '#bbf7d0' },
    { name: 'Pink', code: '#fbcfe8' }
  ];

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    addStickyNote(newNoteText.trim(), noteColor);
    setNewNoteText('');
  };

  const today = formatDateLocal(new Date());
  const examDate = customParams.examDate;
  const gateYear = new Date(examDate).getFullYear();
  const regStart = `${gateYear - 1}-08-30`;

  const daysToReg = calculateDaysBetween(today, regStart);
  const daysToExam = calculateDaysBetween(today, examDate);

  const [notices, setNotices] = useState(GATE_NOTICES);
  const [syncStatus, setSyncStatus] = useState('loading'); // 'loading' | 'live' | 'offline'

  useEffect(() => {
    let active = true;
    const fetchNotices = async () => {
      try {
        let response = await fetch('/notices.json');
        if (!response.ok) throw new Error('Local fetch failed');
        let data = await response.json();
        if (active) {
          setNotices(data);
          setSyncStatus('live');
        }
      } catch (err) {
        console.warn('GATEPrep Nexus NoticeBoard: Local fetch fallback to GitHub...', err);
        try {
          let response = await fetch('https://raw.githubusercontent.com/shrikrishna97/gateprep-nexus/main/public/notices.json');
          if (!response.ok) throw new Error('GitHub fetch failed', { cause: err });
          let data = await response.json();
          if (active) {
            setNotices(data);
            setSyncStatus('live');
          }
        } catch (gitErr) {
          console.warn('GATEPrep Nexus NoticeBoard: Network fetch failed, using offline seed notices.', gitErr);
          if (active) {
            setNotices(GATE_NOTICES);
            setSyncStatus('offline');
          }
        }
      }
    };
    fetchNotices();
    return () => {
      active = false;
    };
  }, []);

  // Dynamic Notices shifter based on target exam year
  const dynamicNotices = notices.map(notice => {
    let title = notice.title;
    let content = notice.content;
    let date = notice.date;
    const diff = gateYear - 2027;
    if (diff !== 0) {
      title = title.replace(/2027/g, String(gateYear)).replace(/2026/g, String(gateYear - 1));
      content = content.replace(/2027/g, String(gateYear)).replace(/2026/g, String(gateYear - 1));
      const origDate = new Date(notice.date);
      origDate.setFullYear(origDate.getFullYear() + diff);
      date = formatDateLocal(origDate);
    }
    return { ...notice, title, content, date };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* SECTION 1: Milestone Countdowns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {/* Registration Timer */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', borderLeft: '5px solid var(--accent-blue)' }}>
          <div style={{ fontSize: '2.5rem' }}>📝</div>
          <div>
            <h4 style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase' }}>GATE {gateYear} Registration</h4>
            <h3 style={{ fontSize: '1.75rem', margin: '4px 0 0', fontWeight: 800 }}>
              {daysToReg > 0 ? `${daysToReg} Days Left` : 'Ongoing / Closed'}
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Tentative Start: August 30, {gateYear - 1}</p>
          </div>
        </div>

        {/* Exam Timer */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', borderLeft: '5px solid var(--accent-purple)' }}>
          <div style={{ fontSize: '2.5rem' }}>⚡</div>
          <div>
            <h4 style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase' }}>GATE {gateYear} Exam Date</h4>
            <h3 style={{ fontSize: '1.75rem', margin: '4px 0 0', fontWeight: 800 }}>
              {daysToExam > 0 ? `${daysToExam} Days Left` : 'Exam Completed'}
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
              Tentative Exam: {new Date(examDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Conducting Body card */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', borderLeft: '5px solid var(--accent-emerald)' }}>
          <div style={{ fontSize: '2.5rem' }}>🏛️</div>
          <div>
            <h4 style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Organizing Institute</h4>
            <h3 style={{ fontSize: '1.5rem', margin: '4px 0 0', fontWeight: 800 }}>{getOrganizingInstitute(gateYear)}</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Rotational Cycle Representative</p>
          </div>
        </div>
      </div>

      {/* SECTION 2: Layout: Timeline Bulletin vs Sticky Notes desk */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1.8fr',
        gap: '32px'
      }} className="notice-layout-grid">
        
        {/* Left Side: Official Timeline Bulletins */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>📢</span> Official Announcements
            </h3>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: syncStatus === 'live' ? 'var(--accent-emerald)' : (syncStatus === 'offline' ? 'var(--accent-amber)' : 'var(--text-muted)'),
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              padding: '4px 10px',
              borderRadius: '12px',
              border: `1px solid ${syncStatus === 'live' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255, 255, 255, 0.05)'}`
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: syncStatus === 'live' ? 'var(--accent-emerald)' : (syncStatus === 'offline' ? 'var(--accent-amber)' : 'var(--text-muted)'),
                display: 'inline-block',
                boxShadow: syncStatus === 'live' ? '0 0 8px var(--accent-emerald)' : 'none'
              }} className={syncStatus === 'live' ? 'pulse-dot' : ''} />
              {syncStatus === 'live' ? 'Live Connected' : (syncStatus === 'offline' ? 'Local Cache Mode' : 'Syncing...')}
            </span>
          </div>
          
          <div className="news-timeline">
            {dynamicNotices.map((notice, idx) => {
              const dots = ['var(--accent-blue)', 'var(--accent-purple)', 'var(--accent-emerald)'];
              return (
                <div key={notice.id} className="news-timeline-item">
                  <div 
                    className="news-timeline-dot" 
                    style={{ backgroundColor: dots[idx % dots.length] }}
                  />
                  <div style={{
                    padding: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    marginBottom: '4px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className={`badge ${
                        notice.category === 'Official' ? 'badge-blue' :
                        notice.category === 'Syllabus' ? 'badge-purple' : 'badge-amber'
                      }`} style={{ fontSize: '0.65rem' }}>
                        {notice.category}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{notice.date}</span>
                    </div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
                      {notice.title}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {notice.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Sticky Notes Desk */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>📌</span> Aspirant's Note Board
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Click a note to pin down personal checklists!</span>
          </div>

          {/* Sticky Notes Form */}
          <form onSubmit={handleAddNote} className="glass-panel" style={{
            padding: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.15)',
            border: '1px dashed var(--border-color)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <textarea
              className="form-input"
              rows="2"
              placeholder="Type your study reminder or formula drill here..."
              style={{ width: '100%', resize: 'none', background: 'rgba(0,0,0,0.2)', fontSize: '0.9rem' }}
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              maxLength={120}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              {/* Color Toggles */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Color:</span>
                {colors.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => setNoteColor(c.code)}
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: c.code,
                      border: noteColor === c.code ? '2px solid var(--text-primary)' : '1px solid rgba(0,0,0,0.3)',
                      cursor: 'pointer',
                      transform: noteColor === c.code ? 'scale(1.15)' : 'scale(1)',
                      transition: 'transform 0.15s ease'
                    }}
                    title={c.name}
                  />
                ))}
              </div>

              {/* Add Button */}
              <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                Pin Note 📌
              </button>
            </div>
          </form>

          {/* Sticky Notes Render Area */}
          {stickyNotes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)', fontSize: '0.9rem', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              No pinned notes yet. Stick one above to keep track of your reminders!
            </div>
          ) : (
            <div className="sticky-notes-grid">
              {stickyNotes.map((note) => (
                <div key={note.id} className="sticky-note" style={{ backgroundColor: note.color }}>
                  <div className="sticky-note-header">
                    <span 
                      className="sticky-note-btn-delete"
                      onClick={() => deleteStickyNote(note.id)}
                      title="Remove note"
                    >
                      ✕
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', fontWeight: 500, lineHeight: 1.4, margin: '8px 0', flexGrow: 1, wordBreak: 'break-word' }}>
                    {note.text}
                  </p>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.5)', textAlign: 'right', fontWeight: 600 }}>
                    {note.date}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 900px) {
          .notice-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default NoticeBoard;
