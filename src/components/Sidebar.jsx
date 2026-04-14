export default function Sidebar({ currentPage, onNavigate, isOpen }) {
  const links = [
    { id: 'home', label: 'Accueil', icon: 'fa-solid fa-house' },
    { id: 'organisation', label: 'Organisation & Alertes', icon: 'fa-solid fa-bell' },
    { id: 'pedagogique', label: 'Soutien Pédagogique', icon: 'fa-solid fa-book-open' },
    { id: 'technique', label: 'Assistance Technique', icon: 'fa-solid fa-laptop-code' },
  ];

  return (
    <nav className={`sidebar${isOpen ? ' open' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <i className="fa-solid fa-book-open-reader" />
        </div>
        <span>StudiFy</span>
      </div>

      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              id={`nav-${link.id}`}
              className={`nav-link${currentPage === link.id ? ' active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(link.id);
              }}
            >
              <i className={link.icon} />
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="user-profile">
        <img
          src="https://ui-avatars.com/api/?name=Mohamed+Ben+Ali&background=4f46e5&color=ffffff&bold=true"
          alt="Avatar"
        />
        <div>
          <span className="user-name">Mohamed Ben Ali</span>
          <span className="user-role">3ème année lisence informatique  </span>
        </div>
      </div>
    </nav>
  );
}
