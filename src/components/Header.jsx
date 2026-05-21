import React from 'react';
import { useApp } from '../AppContext';

const Header = ({ onMobileNavToggle }) => {
  const { user, theme, activeTab, toggleTheme, logout } = useApp();

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Academic Command Center';
      case 'noticeboard': return 'Bulletin Board & Milestones';
      case 'syllabus': return 'Syllabus Coverage Tracker';
      case 'planner': return 'Daily Study Scheduler';
      case 'practice': return 'Interactive Assessment Center';
      case 'formulas': return 'Formula Hub & Active Recall';
      case 'advisor': return 'Simulated AI GATE Advisor';
      default: return 'GATEPrep Nexus';
    }
  };

  return (
    <header className="app-header">
      {/* Mobile Toggle Button */}
      <button 
        className="btn-secondary" 
        onClick={onMobileNavToggle}
        style={{ padding: '8px', borderRadius: '8px', display: 'none', cursor: 'pointer' }}
        id="mobile-nav-toggle"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Page Title */}
      <div>
        <h1 className="header-page-title" style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
          {getPageTitle()}
        </h1>
        <p className="header-welcome-text" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
          {user ? `Welcome back, ${user.name}!` : 'Prepare smarter for the GATE exam'}
        </p>
      </div>

      {/* Actions (Theme, User profile, Logout) */}
      {user && (
        <div className="header-user">
          {/* Track Badge */}
          <span className={`badge ${
            user.track === 'CS' ? 'badge-purple' : 
            user.track === 'DA' ? 'badge-blue' : 'badge-cyan'
          } header-track-badge`} style={{ fontSize: '0.7rem' }}>
            GATE {user.track} {user.track === 'Dual' ? 'Track' : ''}
          </span>

          {/* Theme Toggler */}
          <button 
            className="btn-secondary" 
            onClick={toggleTheme} 
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            style={{ padding: '8px', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            {theme === 'dark' ? (
              // Sun icon
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="10" cy="10" r="5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 2V4M10 16v2M4 10H2M18 10h-2M5.75 5.75l1.42 1.42M12.83 12.83l1.42 1.42M5.75 14.25l1.42-1.42M12.83 7.17l1.42-1.42" />
              </svg>
            ) : (
              // Moon icon
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>

          {/* User Profile Card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="header-user-avatar">
              {user.avatar}
            </div>
            <div className="header-user-info" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{user.name}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Aspirant</span>
            </div>
          </div>

          {/* Logout Button */}
          <button 
            className="btn-secondary" 
            onClick={logout}
            title="Log Out"
            style={{ padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--accent-rose)', borderColor: 'rgba(244, 63, 94, 0.2)' }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      )}

      {/* Inject custom styling to show the mobile trigger when under 1024px */}
      <style>{`
        @media (max-width: 1024px) {
          #mobile-nav-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
