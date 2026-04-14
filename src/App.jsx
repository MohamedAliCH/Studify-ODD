import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { ToastProvider, useToast } from './components/Toast';
import { sampleNotifications } from './data/notifications';
import Home from './pages/Home';
import Organisation from './pages/Organisation';
import Pedagogique from './pages/Pedagogique';
import Technique from './pages/Technique';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('studify-dark-mode');
    return saved === 'true';
  });
  const addToast = useToast();

  /* Apply dark mode class */
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('studify-dark-mode', darkMode);
  }, [darkMode]);

  /* Hash-based routing (matches original behavior) */
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(hash);
      setSidebarOpen(false); // Close mobile sidebar on navigate
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  /* Demo notification 3s after mount */
  useEffect(() => {
    const timer = setTimeout(() => {
      addToast(sampleNotifications[1]);
    }, 3000);
    return () => clearTimeout(timer);
  }, [addToast]);

  const navigate = (page) => {
    window.location.hash = `#${page}`;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'organisation':
        return <Organisation />;
      case 'pedagogique':
        return <Pedagogique />;
      case 'technique':
        return <Technique />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
        id="mobile-menu-toggle"
      >
        <i className={`fa-solid ${sidebarOpen ? 'fa-xmark' : 'fa-bars'}`} />
      </button>

      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay${sidebarOpen ? ' visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar
        currentPage={currentPage}
        onNavigate={navigate}
        isOpen={sidebarOpen}
      />
      <main className="content-area">
        <TopBar
          currentPage={currentPage}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((prev) => !prev)}
        />
        {renderPage()}
      </main>
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
