import { useState, useRef, useEffect } from 'react';

const botResponses = {
  greeting: "Bonjour ! 👋 Je suis votre assistant StudiFy. Posez-moi une question sur ce cours et je ferai de mon mieux pour vous aider.",
  fallback: [
    "C'est une excellente question ! Permettez-moi de vous guider. Pourriez-vous préciser un peu plus votre demande ?",
    "Je comprends votre question. Voici ce que je peux vous dire à ce sujet...",
    "Bonne question ! Essayez de revoir le résumé du cours pour plus de détails sur ce point.",
    "N'hésitez pas à consulter le PDF du cours pour une explication plus approfondie.",
    "Je vous recommande de revoir les points clés du résumé. Avez-vous d'autres questions ?",
  ],
  keywords: {
    'résumé': "Le résumé du cours est disponible juste au-dessus. Il contient les points essentiels à retenir.",
    'pdf': "Vous pouvez télécharger le PDF du cours en cliquant sur le bouton de téléchargement dans la section du cours.",
    'quiz': "Vous pouvez lancer le mini-quiz pour tester vos connaissances ! Cliquez sur 'Lancer le Mini-Quiz'.",
    'aide': "Je suis là pour vous aider ! Posez-moi une question spécifique sur le contenu du cours.",
    'merci': "De rien ! N'hésitez pas si vous avez d'autres questions. Bon courage ! 💪",
    'bonjour': "Bonjour ! Comment puis-je vous aider avec ce cours ?",
    'examen': "Pour bien préparer votre examen, je vous conseille de : 1) Relire le résumé, 2) Faire le quiz, 3) Revoir les points non maîtrisés.",
    'comprends pas': "Pas de souci ! Essayons ensemble. Quel concept spécifique vous pose problème ?",
    'exercice': "Les exercices pratiques sont essentiels. Essayez le mini-quiz pour tester vos connaissances, puis revisitez les concepts difficiles.",
  },
};

function getBotResponse(userMessage) {
  const msg = userMessage.toLowerCase();
  for (const [keyword, response] of Object.entries(botResponses.keywords)) {
    if (msg.includes(keyword)) return response;
  }
  return botResponses.fallback[Math.floor(Math.random() * botResponses.fallback.length)];
}

export default function ChatOverlay({ courseName, onClose }) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: `${botResponses.greeting}\n\n📚 Cours : **${courseName}**` },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { sender: 'user', text: trimmed }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', text: getBotResponse(trimmed) }]);
    }, 800 + Math.random() * 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-overlay" onClick={onClose}>
      <div className="chat-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="chat-modal-header">
          <div className="chat-modal-title">
            <div className="chat-avatar">
              <i className="fa-solid fa-robot" />
            </div>
            <div>
              <h3>Assistant StudiFy</h3>
              <span className="chat-status">
                <span className="status-dot" /> En ligne
              </span>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Fermer le chat" id="btn-close-chat">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {/* Course context badge */}
        <div className="chat-context-badge">
          <i className="fa-solid fa-book" />
          {courseName}
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="message bot typing">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <input
            ref={inputRef}
            type="text"
            placeholder="Posez votre question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Message"
            autoComplete="off"
            id="chat-input"
          />
          <button
            className="primary-btn"
            onClick={sendMessage}
            disabled={!input.trim()}
            aria-label="Envoyer"
            id="btn-send-chat"
          >
            <i className="fa-solid fa-paper-plane" />
          </button>
        </div>
      </div>
    </div>
  );
}
