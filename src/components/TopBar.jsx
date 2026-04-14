import { useToast } from './Toast';
import { sampleNotifications } from '../data/notifications';

const pageLabels = {
  home: { title: 'Bienvenue 👋', subtitle: "Votre espace d'étude intelligent" },
  organisation: { title: 'Organisation', subtitle: 'Gérez vos alertes et deadlines' },
  pedagogique: { title: 'Pédagogique', subtitle: 'Cours, résumés et quiz interactifs' },
  technique: { title: 'Technique', subtitle: 'Logiciels, tutoriels et assistance' },
};

export default function TopBar({ currentPage, darkMode, onToggleDarkMode }) {
  const addToast = useToast();

  const triggerNotification = () => {
    const n = sampleNotifications[Math.floor(Math.random() * sampleNotifications.length)];
    addToast(n);
  };

  const label = pageLabels[currentPage] || pageLabels.home;

  return (
    <header className="top-bar" role="banner">
      <div className="top-bar-greeting">
        <h3>{label.title}</h3>
        <p>{label.subtitle}</p>
      </div>
      <div className="top-bar-actions">
        <button
          className={`icon-btn theme-toggle${darkMode ? ' dark' : ''}`}
          onClick={onToggleDarkMode}
          title={darkMode ? 'Mode clair' : 'Mode sombre'}
          id="btn-toggle-theme"
          aria-label={darkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
        >
          <i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'}`} />
        </button>
        <button
          className="icon-btn"
          onClick={triggerNotification}
          title="Tester une notification"
          id="btn-test-notification"
          aria-label="Test notification"
        >
          <i className="fa-solid fa-bell" />
        </button>
      </div>
    </header>
  );
}
