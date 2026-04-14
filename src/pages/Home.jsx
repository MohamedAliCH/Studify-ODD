import { useState, useEffect } from 'react';

const particles = [
  { icon: 'fa-solid fa-graduation-cap', left: '8%',  size: '1.8rem', duration: '14s', delay: '0s' },
  { icon: 'fa-solid fa-book',           left: '25%', size: '1.4rem', duration: '18s', delay: '3s' },
  { icon: 'fa-solid fa-flask',          left: '45%', size: '1.6rem', duration: '16s', delay: '1s' },
  { icon: 'fa-solid fa-atom',           left: '65%', size: '1.3rem', duration: '20s', delay: '5s' },
  { icon: 'fa-solid fa-code',           left: '82%', size: '1.5rem', duration: '15s', delay: '2s' },
  { icon: 'fa-solid fa-calculator',     left: '92%', size: '1.2rem', duration: '19s', delay: '7s' },
];

const stats = [
  { icon: 'fa-solid fa-book-open', value: 7, label: 'Matières', color: 'indigo' },
  { icon: 'fa-solid fa-file-lines', value: 13, label: 'Cours', color: 'teal' },
  { icon: 'fa-solid fa-clipboard-check', value: 12, label: 'Quiz dispo', color: 'emerald' },
  { icon: 'fa-solid fa-clock', value: 2, label: 'Deadlines', color: 'amber' },
];

const tips = [
  'La technique Pomodoro (25 min de focus, 5 min de pause) améliore la concentration de 40%.',
  'Révisez vos notes dans les 24h après le cours pour retenir 80% de l\'information.',
  'Enseigner un concept à quelqu\'un d\'autre est le meilleur moyen de le maîtriser.',
  'Faites des quiz réguliers — la récupération active renforce la mémoire à long terme.',
  'Alternez entre différentes matières plutôt que de réviser un seul sujet pendant des heures.',
];

export default function Home({ onNavigate }) {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="page" key="home">
      <div className="hero">
        {/* Floating academic icon particles */}
        <div className="hero-particles">
          {particles.map((p, i) => (
            <i
              key={i}
              className={`hero-particle ${p.icon}`}
              style={{
                left: p.left,
                fontSize: p.size,
                animationDuration: p.duration,
                animationDelay: p.delay,
                bottom: '-10%',
              }}
            />
          ))}
        </div>

        <h1>
          Bienvenue sur <span className="gradient-text">StudiFy</span>
        </h1>
        <p className="hero-subtitle">
          Votre écosystème étudiant intelligent. Organisez, révisez et réussissez vos projets
          techniques avec aisance.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="stats-strip">
        {stats.map((s, i) => (
          <div className="stat-card" key={i} id={`stat-${s.color}`}>
            <div className={`stat-icon ${s.color}`}>
              <i className={s.icon} />
            </div>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <div className="card-grid">
        <div className="glass-card feature-card" onClick={() => onNavigate('organisation')} id="card-organisation">
          <div className="feature-icon">
            <i className="fa-solid fa-envelope-open-text" />
          </div>
          <h3>Smart Triage & Alertes</h3>
          <p>
            Ne ratez aucune deadline. Vos emails sont triés, les annonces critiques sont notifiées
            en temps réel.
          </p>
        </div>

        <div className="glass-card feature-card" onClick={() => onNavigate('pedagogique')} id="card-pedagogique">
          <div className="feature-icon">
            <i className="fa-solid fa-brain" />
          </div>
          <h3>Soutien Interactif</h3>
          <p>
            Des résumés de cours générés intelligemment et des quiz interactifs pour tester vos
            connaissances avant l'examen.
          </p>
        </div>

        <div className="glass-card feature-card" onClick={() => onNavigate('technique')} id="card-technique">
          <div className="feature-icon">
            <i className="fa-solid fa-microchip" />
          </div>
          <h3>Assistance TP</h3>
          <p>
            Ressources, logiciels, tutoriels vidéo et un chatbot dédié pour résoudre vos problèmes
            de configuration.
          </p>
        </div>
      </div>

      {/* Study Tip Banner */}
      <div className="study-tip-banner" key={tipIndex}>
        <div className="study-tip-icon">
          <i className="fa-solid fa-lightbulb" />
        </div>
        <div className="study-tip-content">
          <p className="tip-label">Conseil d'étude</p>
          <p>{tips[tipIndex]}</p>
        </div>
      </div>
    </section>
  );
}
