import React, { useState } from 'react';
import { AppProvider, useApp } from './AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Auth from './components/Auth';
import VirtualCalc from './components/VirtualCalc';

// Views
import Dashboard from './views/Dashboard';
import NoticeBoard from './views/NoticeBoard';
import Syllabus from './views/Syllabus';
import Planner from './views/Planner';
import Practice from './views/Practice';
import Formulas from './views/Formulas';
import Advisor from './views/Advisor';
import CommunityQBank from './views/CommunityQBank';

// Layout Orchestration Component
const Layout = () => {
  const { user, activeTab } = useApp();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Guard: If not signed in locally, show the auth barrier
  if (!user) {
    return <Auth />;
  }

  // Active view router
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'noticeboard': return <NoticeBoard />;
      case 'syllabus': return <Syllabus />;
      case 'planner': return <Planner />;
      case 'practice': return <Practice />;
      case 'formulas': return <Formulas />;
      case 'iitm-qbank': return <CommunityQBank />;
      case 'advisor': return <Advisor />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar 
        isMobileOpen={isMobileOpen} 
        onCloseMobileNav={() => setIsMobileOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="main-content">
        <Header onMobileNavToggle={() => setIsMobileOpen(!isMobileOpen)} />
        
        <main className="page-container">
          {renderActiveView()}
        </main>
      </div>

      {/* Floating scientific calculator */}
      <VirtualCalc />
    </div>
  );
};

// Root Component with Provider
function App() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
}

export default App;
