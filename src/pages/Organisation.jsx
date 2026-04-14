import { useState } from 'react';

const emails = [
  {
    id: 1,
    unread: true,
    tagClass: 'tag-urgent',
    tagText: 'URGENT',
    icon: 'fa-solid fa-triangle-exclamation',
    iconColor: '#ef4444',
    iconBg: 'rgba(239, 68, 68, 0.1)',
    title: 'Annulation Cours Réseaux',
    excerpt: "M. Dupont est absent aujourd'hui. Le cours est reporté.",
    time: 'Auj. 08:00',
  },
  {
    id: 2,
    unread: false,
    tagClass: 'tag-java',
    tagText: 'Java EE',
    icon: 'fa-brands fa-java',
    iconColor: '#4f46e5',
    iconBg: 'rgba(79, 70, 229, 0.1)',
    title: 'Rendu TP2 — Architecture 3 Tiers',
    excerpt: "N'oubliez pas de déposer votre archive sur Moodle avant 23h59.",
    time: '13 Avr',
  },
  {
    id: 3,
    unread: false,
    tagClass: 'tag-event',
    tagText: 'Event',
    icon: 'fa-solid fa-trophy',
    iconColor: '#10b981',
    iconBg: 'rgba(16, 185, 129, 0.1)',
    title: 'Hackathon AI 2026',
    excerpt: 'Les inscriptions sont ouvertes pour le hackathon du mois prochain !',
    time: '12 Avr',
  },
  {
    id: 4,
    unread: true,
    tagClass: 'tag-java',
    tagText: 'Sécurité',
    icon: 'fa-solid fa-shield-halved',
    iconColor: '#f59e0b',
    iconBg: 'rgba(245, 158, 11, 0.1)',
    title: 'TP Sécurité — Wireshark',
    excerpt: "Préparez votre VM Kali Linux pour le TP de vendredi.",
    time: 'Auj. 10:30',
  },
  {
    id: 5,
    unread: false,
    tagClass: 'tag-event',
    tagText: 'Admin',
    icon: 'fa-solid fa-university',
    iconColor: '#0ea5e9',
    iconBg: 'rgba(14, 165, 233, 0.1)',
    title: 'Inscription aux examens',
    excerpt: "La période d'inscription aux examens du S2 est ouverte jusqu'au 20 avril.",
    time: '11 Avr',
  },
];

const deadlines = [
  {
    id: 1,
    severity: 'warning',
    day: '18',
    month: 'Avril',
    title: 'Projet Java EE',
    detail: 'Rendu du livrable 1',
    icon: 'fa-brands fa-java',
  },
  {
    id: 2,
    severity: 'danger',
    day: '22',
    month: 'Avril',
    title: 'Examen Réseaux',
    detail: 'Amphi A, 09h00',
    icon: 'fa-solid fa-network-wired',
  },
  {
    id: 3,
    severity: 'warning',
    day: '25',
    month: 'Avril',
    title: 'TP Sécurité',
    detail: 'Rapport Wireshark à rendre',
    icon: 'fa-solid fa-shield-halved',
  },
];

const filters = ['Tous', 'Java EE', 'Réseaux', 'Sécurité', 'Events'];

export default function Organisation() {
  const [activeFilter, setActiveFilter] = useState('Tous');

  return (
    <section className="page" key="organisation">
      <div className="page-header">
        <h2>
          <i className="fa-solid fa-bell" /> Organisation & Alertes
        </h2>
        <p>Gestion automatique des emails et alertes critiques.</p>
      </div>

      <div className="layout-2col">
        {/* Inbox */}
        <div className="glass-panel">
          <h3>Boîte de réception intelligente</h3>
          <div className="filter-pills">
            {filters.map((f) => (
              <button
                key={f}
                className={`filter-pill${activeFilter === f ? ' active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="email-list">
            {emails.map((e) => (
              <div key={e.id} className={`email-item${e.unread ? ' unread' : ''}`}>
                <div
                  className="email-icon"
                  style={{ background: e.iconBg, color: e.iconColor }}
                >
                  <i className={e.icon} />
                </div>
                <div className="email-body">
                  <div className="email-top-row">
                    <span className={`tag ${e.tagClass}`}>{e.tagText}</span>
                    <span className="email-time">{e.time}</span>
                  </div>
                  <h4>{e.title}</h4>
                  <p>{e.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deadlines */}
        <div className="glass-panel">
          <h3>Prochaines Deadlines</h3>
          <div className="deadlines-stack" style={{ marginTop: 'var(--space-4)' }}>
            {deadlines.map((d) => (
              <div key={d.id} className={`deadline-card ${d.severity}`}>
                <div className="date-box">
                  <span className="day">{d.day}</span>
                  <span className="month">{d.month}</span>
                </div>
                <div>
                  <h4>
                    <i className={d.icon} style={{ marginRight: 8, opacity: 0.7, fontSize: '0.9rem' }} />
                    {d.title}
                  </h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {d.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
