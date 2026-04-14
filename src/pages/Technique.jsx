import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { techData } from '../data/techEnvironments';

export default function Technique() {
  const [selectedEnv, setSelectedEnv] = useState(null);
  const [selectedSoftware, setSelectedSoftware] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const messagesEndRef = useRef(null);

  const envEntries = Object.entries(techData);

  // Security: sanitize search input
  const sanitizeInput = (input) => {
    return input.replace(/[<>{}()\[\]\\\/]/g, '').slice(0, 100);
  };

  // Security: sanitize chat input to prevent XSS
  const sanitizeChatInput = (input) => {
    return input.replace(/[<>]/g, '').slice(0, 500);
  };

  // Filter environments based on search query
  const filteredEntries = useMemo(() => {
    if (!searchQuery.trim()) return envEntries;
    const query = searchQuery.toLowerCase().trim();
    return envEntries.filter(([, data]) => {
      const titleMatch = data.title.toLowerCase().includes(query);
      const softMatch = data.logiciels.some((s) => s.name.toLowerCase().includes(query));
      return titleMatch || softMatch;
    });
  }, [searchQuery, envEntries]);

  const toggleFavorite = (key, e) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(scrollToBottom, [messages, scrollToBottom]);

  const openEnv = (key) => {
    setSelectedEnv(key);
    setSelectedSoftware(null);
  };

  const openSoftware = (index) => {
    const soft = techData[selectedEnv].logiciels[index];
    setSelectedSoftware(index);
    setMessages([{ sender: 'bot', text: soft.botKnowledge.default }]);
  };

  const sendMessage = () => {
    const text = sanitizeChatInput(chatInput.trim());
    if (!text) return;
    setChatInput('');

    setMessages((prev) => [...prev, { sender: 'user', text }]);

    const soft = techData[selectedEnv].logiciels[selectedSoftware];
    const knowledge = soft.botKnowledge;
    const lowerText = text.toLowerCase();

    setTimeout(() => {
      let response = knowledge.default;
      for (const [key, value] of Object.entries(knowledge)) {
        if (key !== 'default' && lowerText.includes(key)) {
          response = value;
          break;
        }
      }
      setMessages((prev) => [...prev, { sender: 'bot', text: response }]);
    }, 600);
  };

  /* === VIEW 1: Environment Grid === */
  if (!selectedEnv) {
    return (
      <section className="page" key="technique-grid">
        <div className="page-header">
          <h2>
            <i className="fa-solid fa-laptop-code" /> Assistance Technique (TP)
          </h2>
          <p>Environnements, logiciels, tutoriels et chatbot spécialisés.</p>
        </div>

        {/* Contextual Search Bar */}
        <div className="page-search-bar" id="search-technique">
          <i className="fa-solid fa-search" />
          <input
            type="text"
            placeholder="Rechercher un environnement ou logiciel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(sanitizeInput(e.target.value))}
            aria-label="Rechercher un environnement"
            autoComplete="off"
          />
        </div>

        {filteredEntries.length > 0 ? (
          <>
            <p className="section-label">Sélectionnez un environnement :</p>
            <div className="subjects-grid">
              {filteredEntries.map(([key, data]) => (
                <div
                  key={key}
                  className="glass-card subject-card"
                  onClick={() => openEnv(key)}
                  id={`env-${key}`}
                >
                  <button
                    className={`favorite-btn${favorites.includes(key) ? ' active' : ''}`}
                    onClick={(e) => toggleFavorite(key, e)}
                    aria-label={favorites.includes(key) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  >
                    <i className={`fa-${favorites.includes(key) ? 'solid' : 'regular'} fa-star`} />
                  </button>
                  <i className={`${data.icon} fa-3x`} />
                  <h4>{data.title}</h4>
                  <p>
                    {data.logiciels.length} logiciel{data.logiciels.length > 1 ? 's' : ''}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <i className="fa-solid fa-search" />
            <p>Aucun environnement ne correspond à "{searchQuery}"</p>
          </div>
        )}
      </section>
    );
  }

  const env = techData[selectedEnv];

  /* === VIEW 2: Software List === */
  if (selectedSoftware === null) {
    return (
      <section className="page" key={`technique-${selectedEnv}`}>
        <div className="page-header">
          <h2>
            <i className="fa-solid fa-laptop-code" /> Assistance Technique (TP)
          </h2>
          <p>Environnements, logiciels, tutoriels et chatbot spécialisés.</p>
        </div>

        <div className="detail-header">
          <h3 className="detail-title">
            <i className={env.icon} /> {env.title}
          </h3>
          <button className="secondary-btn" onClick={() => setSelectedEnv(null)} id="btn-back-envs">
            <i className="fa-solid fa-arrow-left" /> Environnements
          </button>
        </div>

        <div className="glass-panel">
          <h3 style={{ marginBottom: 'var(--space-3)' }}>
            <i className="fa-solid fa-list-check" /> Logiciels requis
          </h3>
          <p
            style={{
              color: 'var(--text-secondary)',
              marginBottom: 'var(--space-4)',
              fontSize: '0.9rem',
            }}
          >
            Sélectionnez le logiciel que vous souhaitez installer ou configurer pour voir le
            tutoriel et accéder à l'assistant dédié.
          </p>
          <div className="software-grid">
            {env.logiciels.map((sof, i) => (
              <div key={i} className="software-card" onClick={() => openSoftware(i)} id={`software-${selectedEnv}-${i}`}>
                <i className={`${sof.icon} fa-2x`} />
                <h4 style={{ fontSize: '0.95rem' }}>{sof.name}</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                  Ouvrir les détails
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* === VIEW 3: Software Detail + Chatbot === */
  const soft = env.logiciels[selectedSoftware];

  return (
    <section className="page" key={`technique-${selectedEnv}-${selectedSoftware}`}>
      <div className="page-header">
        <h2>
          <i className="fa-solid fa-laptop-code" /> Assistance Technique (TP)
        </h2>
        <p>Environnements, logiciels, tutoriels et chatbot spécialisés.</p>
      </div>

      <div className="detail-header">
        <h3 className="detail-title">{soft.name}</h3>
        <button className="secondary-btn" onClick={() => setSelectedSoftware(null)} id="btn-back-software">
          <i className="fa-solid fa-arrow-left" /> Liste des Logiciels
        </button>
      </div>

      <div className="layout-2col">
        {/* Left: Download, Setup, Videos */}
        <div>
          <div className="glass-panel" style={{ marginBottom: 'var(--space-5)' }}>
            <h3 style={{ marginBottom: 'var(--space-4)' }}>
              <i className="fa-solid fa-download" /> Téléchargement & Installation
            </h3>
            <button className="primary-btn" style={{ marginBottom: 'var(--space-5)' }} id="btn-download">
              <i className="fa-solid fa-cloud-arrow-down" /> {soft.downloadButton}
            </button>
            <h4
              style={{
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-3)',
                fontSize: '0.88rem',
              }}
            >
              Étapes d'installation
            </h4>
            <ol className="setup-steps-list">
              {soft.setupSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="glass-panel">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>
              <i className="fa-brands fa-youtube" /> Vidéos Recommandées
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {soft.tutorials.map((tuto, i) => (
                <div className="video-card" key={i}>
                  <div className="video-thumb">
                    <i className={`fa-solid ${tuto.thumb}`} />
                    <span className="duration">{tuto.duration}</span>
                  </div>
                  <div className="video-info">
                    <h4>{tuto.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Chatbot */}
        <div className="glass-panel">
          <h3>
            <i className="fa-solid fa-robot" /> Assistant Installation
          </h3>
          <div className="chat-window">
            <div className="chat-messages">
              {messages.map((m, i) => (
                <div key={i} className={`message ${m.sender}`}>
                  {m.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input-area">
              <input
                type="text"
                placeholder="Décrivez votre erreur..."
                value={chatInput}
                onChange={(e) => setChatInput(sanitizeChatInput(e.target.value))}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                aria-label="Message au chatbot"
                autoComplete="off"
                id="chat-input"
              />
              <button className="primary-btn" onClick={sendMessage} id="btn-send-chat" aria-label="Envoyer">
                <i className="fa-solid fa-paper-plane" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
