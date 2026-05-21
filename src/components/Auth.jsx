import React, { useState } from 'react';
import { useApp } from '../AppContext';

const Auth = () => {
  const { login } = useApp();
  const [name, setName] = useState('');
  const [track, setTrack] = useState('CS');
  const [avatar, setAvatar] = useState('🚀');
  const [error, setError] = useState('');

  const avatars = ['🚀', '💻', '🧠', '📊', '⚡', '🤖', '📚', '🎯'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (name.trim().length < 3) {
      setError('Name must be at least 3 characters.');
      return;
    }
    setError('');
    login(name.trim(), track, avatar);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'var(--bg-primary)',
      backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 40%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="glass-panel auth-card" style={{
        maxWidth: '460px',
        width: '100%',
        textAlign: 'center',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        animation: 'fadeIn 0.5s ease-out'
      }}>
        {/* Logo and Greeting */}
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎓</div>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
          <span className="text-gradient-purple">GATEPrep</span> Nexus
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '32px' }}>
          Your ultimate prep dashboard for GATE Computer Science (CS) and Data Science & AI (DA) exams.
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          {error && (
            <div style={{
              backgroundColor: 'var(--accent-rose-glow)',
              color: 'var(--accent-rose)',
              border: '1px solid rgba(244, 63, 94, 0.2)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 14px',
              fontSize: '0.85rem',
              fontWeight: 500,
              marginBottom: '20px'
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Name Input */}
          <div className="form-group">
            <label className="form-label" htmlFor="auth-name">Your Full Name</label>
            <input
              id="auth-name"
              type="text"
              className="form-input"
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={30}
            />
          </div>

          {/* Track Selection */}
          <div className="form-group">
            <label className="form-label" htmlFor="auth-track">Select GATE Track Focus</label>
            <select
              id="auth-track"
              className="form-select"
              value={track}
              onChange={(e) => setTrack(e.target.value)}
            >
              <option value="CS">GATE Computer Science & IT (CS)</option>
              <option value="DA">GATE Data Science & Artificial Intelligence (DA)</option>
              <option value="Dual">Dual Prep (Overlapping CS + DA Syllabus)</option>
            </select>
          </div>

          {/* Avatar Picker */}
          <div className="form-group" style={{ marginBottom: '32px' }}>
            <label className="form-label">Choose Your Avatar</label>
            <div className="auth-avatar-grid" style={{
              display: 'grid',
              gap: '8px',
              marginTop: '4px'
            }}>
              {avatars.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => setAvatar(av)}
                  style={{
                    fontSize: '1.5rem',
                    padding: '8px 0',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: avatar === av ? 'var(--accent-purple-glow)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${avatar === av ? 'var(--accent-purple)' : 'var(--border-color)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  className="avatar-btn"
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
            Initialize Prep Dashboard 🚀
          </button>
        </form>

        {/* Footer */}
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '24px' }}>
          *This app runs client-side. Your study progress and scores are safely saved in your browser storage (100% Free).
        </p>
      </div>

      <style>{`
        .auth-card {
          padding: 40px 32px;
        }
        .auth-avatar-grid {
          grid-template-columns: repeat(8, 1fr);
        }
        .avatar-btn:hover {
          transform: translateY(-2px);
          border-color: var(--accent-purple) !important;
          background-color: var(--bg-glass-hover) !important;
        }
        @media (max-width: 480px) {
          .auth-card {
            padding: 24px 16px;
          }
          .auth-avatar-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default Auth;
