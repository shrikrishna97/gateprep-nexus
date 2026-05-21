import React from 'react';
import { useApp } from '../AppContext';

const Sidebar = ({ isMobileOpen, onCloseMobileNav }) => {
  const { activeTab, setActiveTab, customParams } = useApp();
  const gateYear = customParams ? new Date(customParams.examDate).getFullYear() : 2027;

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Command Center',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      )
    },
    {
      id: 'planner',
      label: 'Study Scheduler',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18M8 14h8m-8 4h5" />
        </svg>
      )
    },
    {
      id: 'syllabus',
      label: 'Syllabus Tracker',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'practice',
      label: 'Practice Simulator',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          <path d="M9 14l2 2 4-4" />
        </svg>
      )
    },
    {
      id: 'formulas',
      label: 'Formula & Recall',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 'noticeboard',
      label: 'Notice Board',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.02 6.02 0 00-4.902-5.903m0 0A4.6 4.6 0 0012 3a4.6 4.6 0 00-1.098.097m0 0A6.02 6.02 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      )
    },
    {
      id: 'advisor',
      label: 'AI Prep Advisor',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M12 14h.01M8 14h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (onCloseMobileNav) {
      onCloseMobileNav();
    }
  };

  return (
    <>
      {/* Mobile Drawer Overlay Background */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobileNav}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 150,
            backdropFilter: 'blur(4px)',
            transition: 'opacity 0.25s'
          }}
        />
      )}

      {/* Sidebar Core Component */}
      <aside className={`app-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* App Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">🎓</div>
          <div className="sidebar-logo-text">
            <span className="text-gradient-purple">GATEPrep</span> Nexus
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleTabClick(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div style={{
            padding: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}>
            <span style={{ fontWeight: 600 }}>GATE {gateYear} Portal</span>
            <br />
            <span>Targeting Feb {gateYear}</span>
          </div>
        </div>
      </aside>

      {/* Inject custom styling to overlay sidebar on mobile when drawer is active */}
      <style>{`
        @media (max-width: 1024px) {
          .app-sidebar {
            transform: translateX(-100%);
            box-shadow: none;
          }
          .app-sidebar.mobile-open {
            transform: translateX(0);
            box-shadow: 8px 0 32px rgba(0, 0, 0, 0.5);
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
