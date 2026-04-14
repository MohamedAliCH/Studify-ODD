import { useState, useMemo, useRef } from 'react';
import { subjectData as initialSubjectData } from '../data/subjects';
import QuizOverlay from '../components/QuizOverlay';
import ChatOverlay from '../components/ChatOverlay';

export default function Pedagogique() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [chatCourse, setChatCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [importedCourses, setImportedCourses] = useState({});
  const fileInputRef = useRef(null);

  // Merge static data with imported courses
  const subjectData = useMemo(() => {
    const merged = { ...initialSubjectData };
    for (const [key, courses] of Object.entries(importedCourses)) {
      if (merged[key]) {
        merged[key] = {
          ...merged[key],
          cours: [...merged[key].cours, ...courses],
        };
      }
    }
    return merged;
  }, [importedCourses]);

  const subjectEntries = Object.entries(subjectData);

  // Security: sanitize search input — only allow alphanumeric, spaces, accented chars
  const sanitizeInput = (input) => {
    return input.replace(/[<>{}()\[\]\\\/]/g, '').slice(0, 100);
  };

  // Filter subjects based on search query
  const filteredEntries = useMemo(() => {
    if (!searchQuery.trim()) return subjectEntries;
    const query = searchQuery.toLowerCase().trim();
    return subjectEntries.filter(([, data]) => {
      const titleMatch = data.title.toLowerCase().includes(query);
      const coursMatch = data.cours.some((c) => c.titre.toLowerCase().includes(query));
      return titleMatch || coursMatch;
    });
  }, [searchQuery, subjectEntries]);

  const toggleFavorite = (key, e) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  const openQuiz = (quizzes) => {
    if (quizzes && quizzes.length > 0) setQuizData(quizzes);
  };

  // Handle file import
  const handleFileImport = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length || !selectedSubject) return;

    // Security: validate file types — only accept PDF, images, common doc formats
    const allowedTypes = [
      'application/pdf',
      'image/png', 'image/jpeg', 'image/gif', 'image/webp',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
    ];
    const allowedExtensions = ['.pdf', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.doc', '.docx', '.ppt', '.pptx', '.txt'];

    const validFiles = files.filter((file) => {
      const ext = '.' + file.name.split('.').pop().toLowerCase();
      return allowedTypes.includes(file.type) || allowedExtensions.includes(ext);
    });

    if (validFiles.length === 0) {
      alert('Format non supporté. Formats acceptés : PDF, images, Word, PowerPoint, texte.');
      return;
    }

    // Security: limit file size (50MB max per file)
    const maxSize = 50 * 1024 * 1024;
    const oversized = validFiles.filter((f) => f.size > maxSize);
    if (oversized.length > 0) {
      alert('Fichier(s) trop volumineux. Taille max : 50 MB par fichier.');
      return;
    }

    const newCourses = validFiles.map((file) => {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
      // Create a local URL for the file
      const fileUrl = URL.createObjectURL(file);

      return {
        titre: `📄 ${nameWithoutExt}`,
        pdf: { name: file.name, size: `${sizeMB} MB`, url: fileUrl },
        resume: `Cours importé depuis vos fichiers. Type : ${file.type || 'inconnu'}. Ajouté le ${new Date().toLocaleDateString('fr-FR')}.`,
        quizzes: [],
        imported: true,
      };
    });

    setImportedCourses((prev) => ({
      ...prev,
      [selectedSubject]: [...(prev[selectedSubject] || []), ...newCourses],
    }));

    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /* === GRID VIEW === */
  if (!selectedSubject) {
    return (
      <section className="page" key="pedagogique-grid">
        <div className="page-header">
          <h2>
            <i className="fa-solid fa-book-open" /> Soutien Pédagogique
          </h2>
          <p>Résumés, PDFs et entraînements interactifs structurés par matière.</p>
        </div>

        {/* Contextual Search Bar */}
        <div className="page-search-bar" id="search-pedagogique">
          <i className="fa-solid fa-search" />
          <input
            type="text"
            placeholder="Rechercher une matière ou un cours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(sanitizeInput(e.target.value))}
            aria-label="Rechercher une matière"
            autoComplete="off"
          />
        </div>

        {filteredEntries.length > 0 ? (
          <>
            <p className="section-label">Sélectionnez une matière :</p>
            <div className="subjects-grid">
              {filteredEntries.map(([key, data]) => (
                <div
                  key={key}
                  className="glass-card subject-card"
                  onClick={() => setSelectedSubject(key)}
                  id={`subject-${key}`}
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
                    {data.cours.length} cours disponible{data.cours.length > 1 ? 's' : ''}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <i className="fa-solid fa-search" />
            <p>Aucune matière ne correspond à "{searchQuery}"</p>
          </div>
        )}
      </section>
    );
  }

  /* === DETAIL VIEW === */
  const subject = subjectData[selectedSubject];

  return (
    <section className="page" key={`pedagogique-${selectedSubject}`}>
      <div className="page-header">
        <h2>
          <i className="fa-solid fa-book-open" /> Soutien Pédagogique
        </h2>
        <p>Résumés, PDFs et entraînements interactifs structurés par matière.</p>
      </div>

      <div className="detail-header">
        <h3 className="detail-title">
          <i className={subject.icon} /> {subject.title}
        </h3>
        <div className="detail-actions">
          {/* Import Button */}
          <button
            className="primary-btn import-btn"
            onClick={() => fileInputRef.current?.click()}
            id="btn-import-course"
          >
            <i className="fa-solid fa-file-import" /> Importer un cours
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.png,.jpg,.jpeg,.gif,.webp"
            onChange={handleFileImport}
            style={{ display: 'none' }}
            aria-label="Sélectionner des fichiers"
          />
          <button className="secondary-btn" onClick={() => setSelectedSubject(null)} id="btn-back-subjects">
            <i className="fa-solid fa-arrow-left" /> Retour
          </button>
        </div>
      </div>

      <div className="lessons-list">
        {subject.cours.map((cours, idx) => {
          const hasQuiz = cours.quizzes && cours.quizzes.length > 0;
          return (
            <div className={`lesson-card${cours.imported ? ' imported' : ''}`} key={idx}>
              <div className="lesson-header">
                {cours.imported && <i className="fa-solid fa-cloud-arrow-up" style={{ marginRight: 8, opacity: 0.7 }} />}
                {cours.titre}
                {cours.imported && <span className="imported-badge">Importé</span>}
              </div>
              <div className="lesson-body">
                {/* PDF */}
                <div className="pdf-item">
                  <i className={`fa-solid ${cours.pdf.name.endsWith('.pdf') ? 'fa-file-pdf' : 'fa-file'}`} />
                  <span>
                    {cours.pdf.name} <small>({cours.pdf.size})</small>
                  </span>
                  {cours.pdf.url ? (
                    <a href={cours.pdf.url} download={cours.pdf.name} className="icon-btn" style={{ width: 32, height: 32 }} aria-label="Télécharger">
                      <i className="fa-solid fa-download" />
                    </a>
                  ) : (
                    <button className="icon-btn" style={{ width: 32, height: 32 }} aria-label="Télécharger PDF">
                      <i className="fa-solid fa-download" />
                    </button>
                  )}
                </div>

                {/* Summary */}
                <div className="summary-block">
                  <p className="summary-label">Résumé rapide</p>
                  <p className="summary-text">{cours.resume}</p>
                </div>

                {/* Quiz launcher + Chatbot */}
                <div className="lesson-actions">
                  {hasQuiz ? (
                    <button className="primary-btn" onClick={() => openQuiz(cours.quizzes)} id={`quiz-btn-${idx}`}>
                      <i className="fa-solid fa-clipboard-question" /> Lancer le Mini-Quiz
                    </button>
                  ) : (
                    <span style={{ color: 'var(--text-tertiary)', fontSize: '0.88rem' }}>
                      <i className="fa-solid fa-circle-info" /> {cours.imported ? 'Quiz non disponible pour les cours importés' : 'Aucun quiz pour ce cours'}
                    </span>
                  )}
                  <button
                    className="chat-btn"
                    onClick={() => setChatCourse(cours.titre)}
                    title="Discuter avec l'assistant IA"
                    id={`chat-btn-${idx}`}
                    aria-label="Ouvrir le chat IA"
                  >
                    <i className="fa-solid fa-robot" />
                    <span>Chat IA</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quiz overlay */}
      {quizData && <QuizOverlay quizzes={quizData} onClose={() => setQuizData(null)} />}

      {/* Chat overlay */}
      {chatCourse && <ChatOverlay courseName={chatCourse} onClose={() => setChatCourse(null)} />}
    </section>
  );
}
