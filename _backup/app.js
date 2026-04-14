document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ROUTING & NAVIGATION ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const pages = document.querySelectorAll('.page');

    function navigateToPath() {
        let hash = window.location.hash || '#home';
        
        // Update nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });

        // Show correct page
        pages.forEach(page => {
            page.classList.remove('active');
            page.classList.add('hidden');
            if ('#' + page.id === hash) {
                page.classList.remove('hidden');
                page.classList.add('active');
            }
        });
    }

    // Listen for hash changes and run on load
    window.addEventListener('hashchange', navigateToPath);
    navigateToPath(); // initial load


    // --- 2. HIERARCHICAL SUBJECTS ENGINE (Pillar 2) ---
    const subjectData = {
        javaee: {
            title: "Java EE",
            icon: "fa-brands fa-java",
            cours: [
                {
                    titre: "Cours 1 : Architecture 3 Tiers & MVC",
                    pdf: { name: "Architecture_MVC.pdf", size: "2.4 MB" },
                    resume: "Séparation d'une application de niveau entreprise en 3 couches (Présentation, Métier, Accès aux données). Le pattern MVC est souvent appliqué dans la couche Présentation.",
                    quizzes: [
                        { text: "Quel est le rôle du Contrôleur en MVC Java EE ?", options: [{ text: "La page JSP", correct: false }, { text: "La Servlet", correct: true }, { text: "La BDD", correct: false }] }
                    ]
                },
                {
                    titre: "Cours 2 : Les Servlets et la Gestion de Session",
                    pdf: { name: "Servlets_Sessions.pdf", size: "1.1 MB" },
                    resume: "Les Servlets gèrent les requêtes et réponses HTTP. La session permet de conserver l'état du client via l'objet HttpSession (cookies JSESSIONID).",
                    quizzes: [
                        { text: "Lequel de ces objets permet de stocker des attributs liés à un seul utilisateur ?", options: [{ text: "request", correct: false }, { text: "application", correct: false }, { text: "session", correct: true }] }
                    ]
                }
            ]
        },
        reseaux: {
            title: "Réseaux Informatiques",
            icon: "fa-solid fa-network-wired",
            cours: [
                {
                    titre: "Cours 1 : Le Modèle OSI",
                    pdf: { name: "Chap1_Modele_OSI.pdf", size: "3.5 MB" },
                    resume: "Le Modèle OSI comprend 7 couches standardisées. La Couche 3 (Réseau) s'occupe de l'adressage IP et du routage.",
                    quizzes: [
                        { text: "À quelle couche correspond le protocole IP ?", options: [{ text: "Couche Physique", correct: false }, { text: "Couche Transport", correct: false }, { text: "Couche Réseau", correct: true }] }
                    ]
                }
            ]
        },
        maths: {
            title: "Mathématiques Appliquées",
            icon: "fa-solid fa-calculator",
            cours: [
                {
                    titre: "Cours 1 : Algèbre Linéaire",
                    pdf: { name: "Algebre_Matrices.pdf", size: "4.1 MB" },
                    resume: "Étude des matrices et déterminants. Une matrice est inversible si et seulement si son déterminant est non nul.",
                    quizzes: []
                }
            ]
        }
    };

    const pedaGridView = document.getElementById('peda-grid-view');
    const pedaDetailView = document.getElementById('peda-detail-view');
    const lessonsListContainer = document.getElementById('subject-lessons-list');
    
    // Quiz Elements
    const qOverlay = document.getElementById('quiz-overlay');
    const qElements = {
        qText: document.getElementById('question-text'),
        optionsContainer: document.getElementById('options-container'),
        feedback: document.getElementById('quiz-feedback'),
        nextBtn: document.getElementById('next-btn'),
        qCurrent: document.getElementById('q-current'),
        qTotal: document.getElementById('q-total')
    };

    let activeQuizData = [];
    let currentQIndex = 0;

    window.openSubject = function(subjectKey) {
        const data = subjectData[subjectKey];
        if(!data) return;

        // Set Title
        document.getElementById('subject-title').innerHTML = `<i class="${data.icon}"></i> ${data.title}`;
        
        // Render Lessons
        lessonsListContainer.innerHTML = data.cours.map((cours, index) => {
            const hasQuiz = cours.quizzes && cours.quizzes.length > 0;
            return `
                <div class="lesson-card">
                    <div class="lesson-header">
                        ${cours.titre}
                    </div>
                    <div class="lesson-body">
                        <div class="pdf-item">
                            <i class="fa-solid fa-file-pdf"></i>
                            <span>${cours.pdf.name} <small style="color: var(--text-muted);">(${cours.pdf.size})</small></span>
                            <button class="icon-btn download-icon"><i class="fa-solid fa-download"></i></button>
                        </div>
                        <div class="summary-content">
                            <h4 style="margin-bottom:0.5rem; color:var(--text-muted); font-size:0.9rem;">RÉSUMÉ RAPIDE</h4>
                            <p>${cours.resume}</p>
                        </div>
                        <div class="lesson-actions">
                            ${hasQuiz ? `<button class="primary-btn" onclick="openQuiz('${subjectKey}', ${index})"><i class="fa-solid fa-clipboard-question"></i> Lancer le Mini-Quiz</button>` : `<span style="color: var(--text-muted);"><i class="fa-solid fa-circle-info"></i> Aucun quiz pour ce cours</span>`}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Switch Views
        pedaGridView.classList.add('hidden');
        pedaDetailView.classList.remove('hidden');
    };

    window.closeSubject = function() {
        pedaDetailView.classList.add('hidden');
        pedaGridView.classList.remove('hidden');
    };

    window.openQuiz = function(subjectKey, lessonIndex) {
        activeQuizData = subjectData[subjectKey].cours[lessonIndex].quizzes;
        currentQIndex = 0;
        
        qElements.qTotal.innerText = activeQuizData.length;
        qOverlay.classList.remove('hidden');
        loadQuestion(0);
    };

    window.closeQuiz = function() {
        qOverlay.classList.add('hidden');
    };

    function loadQuestion(index) {
        if(index >= activeQuizData.length) {
            qElements.qText.innerHTML = "🎉 Quiz terminé ! Excellent travail.";
            qElements.optionsContainer.innerHTML = "";
            qElements.nextBtn.innerHTML = "Fermer";
            qElements.nextBtn.classList.remove('hidden');
            qElements.nextBtn.onclick = closeQuiz; // Rebind
            qElements.qCurrent.parentElement.classList.add('hidden');
            return;
        }

        const q = activeQuizData[index];
        qElements.qText.innerText = q.text;
        qElements.qCurrent.innerText = index + 1;
        qElements.qCurrent.parentElement.classList.remove('hidden');
        qElements.optionsContainer.innerHTML = '';
        qElements.feedback.classList.add('hidden');
        qElements.nextBtn.classList.add('hidden');

        // Restore default Next button behavior
        qElements.nextBtn.innerHTML = `Suivant <i class="fa-solid fa-arrow-right"></i>`;
        qElements.nextBtn.onclick = () => {
            currentQIndex++;
            loadQuestion(currentQIndex);
        };

        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.innerText = opt.text;
            btn.dataset.correct = opt.correct;
            btn.addEventListener('click', handleOptionClick);
            qElements.optionsContainer.appendChild(btn);
        });
    }

    function handleOptionClick(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        
        // Disable all buttons
        const allBtns = qElements.optionsContainer.querySelectorAll('button');
        allBtns.forEach(btn => btn.disabled = true);

        // Styling
        if (isCorrect) {
            selectedBtn.classList.add('selected', 'correct');
            qElements.feedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Bonne réponse !';
            qElements.feedback.className = 'correct';
        } else {
            selectedBtn.classList.add('selected', 'wrong');
            allBtns.forEach(btn => {
                if(btn.dataset.correct === "true") btn.classList.add('selected', 'correct');
            });
            qElements.feedback.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Mauvaise réponse.';
            qElements.feedback.className = 'wrong';
        }

        qElements.feedback.classList.remove('hidden');
        qElements.nextBtn.classList.remove('hidden');
    }

    // --- 4. HIERARCHICAL TECHNIQUE ENGINE (Pillar 3 - Niveau 3) ---
    const techData = {
        java: {
            title: "Environnement Java EE",
            icon: "fa-brands fa-java",
            logiciels: [
                {
                    name: "Apache Tomcat 9",
                    icon: "fa-solid fa-server",
                    downloadButton: "Archive ZIP (Windows x64)",
                    setupSteps: [
                        "Téléchargez le ZIP et extrayez-le dans un dossier racine (ex: C:/Servers/tomcat9).",
                        "Ouvrez Eclipse, allez dans Window > Preferences > Server > Runtime Environments.",
                        "Ajoutez 'Apache Tomcat v9.0' et pointez vers le répertoire dézippé."
                    ],
                    tutorials: [
                        { title: "Lier Tomcat à Eclipse EE", duration: "05:42", thumb: "fa-play" }
                    ],
                    botKnowledge: {
                        "8080": "Erreur Port 8080 en cours d'utilisation ? Ouvrez Tomcat/conf/server.xml, cherchez port='8080' et remplacez par '8081'. Sauvegardez et redémarrez.",
                        "default": "Problème d'installation avec Tomcat ? Je connais toutes ses erreurs serveurs !"
                    }
                },
                {
                    name: "JDK 17",
                    icon: "fa-brands fa-java",
                    downloadButton: "Windows x64 Installer",
                    setupSteps: [
                        "Exécutez l'installeur téléchargé et laissez le chemin par défaut.",
                        "Recherchez 'Variables d'environnement' dans Windows.",
                        "Dans 'Variables Système', ajoutez 'JAVA_HOME' pointant vers votre dossier JDK.",
                        "Ajoutez '%JAVA_HOME%\\bin' à la variable Path."
                    ],
                    tutorials: [
                        { title: "Configuration JDK et variables Path", duration: "04:15", thumb: "fa-play" }
                    ],
                    botKnowledge: {
                        "javac": "Erreur 'javac n'est pas reconnu' : C'est un souci de variable Path. Avez-vous bien rajouté /bin à la fin du chemin ?",
                        "default": "Le JDK est la base. Quelle est votre erreur Java ?"
                    }
                }
            ]
        },
        db: {
            title: "Bases de Données",
            icon: "fa-solid fa-database",
            logiciels: [
                {
                    name: "MySQL Server",
                    icon: "fa-solid fa-database",
                    downloadButton: "MySQL Installer Community",
                    setupSteps: [
                        "Lancez l'installation en type 'Developer Default'.",
                        "Lors de la config, définissez un mot de passe Root (notez-le !).",
                        "Démarrez le service Windows 'MySQL80'."
                    ],
                    tutorials: [
                        { title: "Installer MySQL de A à Z", duration: "06:20", thumb: "fa-play" }
                    ],
                    botKnowledge: {
                        "access denied": "Access Denied : Vous vous trompez de mot de passe ou vous essayez de vous connecter sans mot de passe (''). Vérifiez vos identifiants fournis à l'installation.",
                        "default": "Souci avec l'installation du serveur MySQL ?"
                    }
                }
            ]
        },
        web: {
            title: "Développement Web",
            icon: "fa-brands fa-html5",
            logiciels: [
                {
                    name: "Node.js",
                    icon: "fa-brands fa-node",
                    downloadButton: "Version LTS (Recommandée)",
                    setupSteps: [
                        "Téléchargez et lancez le .msi.",
                        "Acceptez toutes les options par défaut, NPM sera installé avec.",
                        "Redémarrez VS Code pour que la commande NPM soit reconnue."
                    ],
                    tutorials: [
                        { title: "Installer Node.js et NPM", duration: "04:50", thumb: "fa-play" }
                    ],
                    botKnowledge: {
                        "npm": "Si npm est introuvable, redémarrez votre PC. Si ça persiste, l'installation n'a pas mis à jour le Path.",
                        "default": "Comment puis-je vous aider sur l'installation de NodeJS ?"
                    }
                }
            ]
        }
    };

    const techGridView = document.getElementById('tech-grid-view');
    const techDetailView = document.getElementById('tech-detail-view');
    const softwareDetailView = document.getElementById('software-detail-view');
    
    // Chatbot Elements
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-chat');
    const messagesContainer = document.getElementById('chat-messages');
    let activeBotKnowledge = {};
    let currentActiveEnv = '';

    window.openTech = function(techKey) {
        const data = techData[techKey];
        if(!data) return;
        currentActiveEnv = techKey;

        // Title and Icon
        document.getElementById('tech-title').innerHTML = `<i class="${data.icon}"></i> ${data.title}`;

        // Populate Software Grid (Level 2)
        document.getElementById('tech-softwares-grid').innerHTML = data.logiciels.map((sof, index) => `
            <div class="subject-card glass-panel" onclick="openSoftware('${index}')">
                <i class="${sof.icon} fa-3x"></i>
                <h4>${sof.name}</h4>
                <p>Ouvrir les détails</p>
            </div>
        `).join('');

        // Switch Views
        techGridView.classList.add('hidden');
        techDetailView.classList.remove('hidden');
        softwareDetailView.classList.add('hidden');
    };

    window.closeTech = function() {
        techDetailView.classList.add('hidden');
        techGridView.classList.remove('hidden');
    };

    window.openSoftware = function(index) {
        const softData = techData[currentActiveEnv].logiciels[index];
        if(!softData) return;

        // Title
        document.getElementById('soft-title').innerText = softData.name;

        // Download
        document.getElementById('soft-download-container').innerHTML = `
            <button class="primary-btn"><i class="fa-solid fa-cloud-arrow-down"></i> ${softData.downloadButton}</button>
        `;

        // Setup Steps
        document.getElementById('soft-setup-steps').innerHTML = softData.setupSteps.map(step => `
            <li>${step}</li>
        `).join('');

        // Tutorials
        if (softData.tutorials && softData.tutorials.length > 0) {
            document.getElementById('soft-tutorials').innerHTML = softData.tutorials.map(tuto => `
                <div class="video-card" style="background: rgba(255,255,255,0.02); border: 1px solid var(--panel-border);">
                    <div class="video-thumb">
                        <i class="fa-solid ${tuto.thumb}"></i>
                        <span class="duration">${tuto.duration}</span>
                    </div>
                    <div class="video-info">
                        <h4>${tuto.title}</h4>
                    </div>
                </div>
            `).join('');
        } else {
            document.getElementById('soft-tutorials').innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">Aucun tutoriel spécifique renseigné.</p>`;
        }

        // Setup Chatbot uniquely for this software
        activeBotKnowledge = softData.botKnowledge || {"default": "Bonjour, expert à votre service."};
        messagesContainer.innerHTML = `<div class="message bot">${activeBotKnowledge.default}</div>`;

        // Switch Views
        techDetailView.classList.add('hidden');
        softwareDetailView.classList.remove('hidden');
    };

    window.closeSoftware = function() {
        softwareDetailView.classList.add('hidden');
        techDetailView.classList.remove('hidden');
    };

    function addMessage(msg, sender) {
        window.requestAnimationFrame(() => {
            const div = document.createElement('div');
            div.className = `message ${sender}`;
            div.innerText = msg;
            messagesContainer.appendChild(div);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
    }

    function processChat() {
        const text = chatInput.value.trim();
        if(!text) return;
        
        addMessage(text, 'user');
        chatInput.value = '';

        // Simulate typing delay
        setTimeout(() => {
            const lowerText = text.toLowerCase();
            let response = activeBotKnowledge.default;
            
            for(const [key, value] of Object.entries(activeBotKnowledge)) {
                if(lowerText.includes(key) && key !== "default") {
                    response = value;
                    break;
                }
            }
            addMessage(response, 'bot');
        }, 600);
    }

    if(sendBtn) sendBtn.addEventListener('click', processChat);
    if(chatInput) chatInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') processChat();
    });

    // --- 5. NOTIFICATION SYSTEM ---
    const notifContainer = document.getElementById('notification-container');
    const notifTrigger = document.getElementById('trigger-notification');

    const sampleNotifications = [
        { type: "danger", title: "Alerte Cours", text: "Annulation du cours de Mathématiques de 14h.", icon: "fa-triangle-exclamation" },
        { type: "warning", title: "Rappel Deadline", text: "Projet Web à rendre dans 48h sur Moodle.", icon: "fa-clock" },
        { type: "info", title: "Nouveau Fichier", text: "TP3_Correction.pdf ajouté dans 'Programmation'.", icon: "fa-file-pdf" },
        { type: "success", title: "Note Publiée", text: "Vos notes d'Architecture sont disponibles.", icon: "fa-graduation-cap" }
    ];

    function showToast(notif) {
        const toast = document.createElement('div');
        toast.className = `toast ${notif.type}`;
        toast.innerHTML = `
            <div class="toast-icon"><i class="fa-solid ${notif.icon}"></i></div>
            <div class="toast-content">
                <h4>${notif.title}</h4>
                <p>${notif.text}</p>
            </div>
        `;
        
        notifContainer.appendChild(toast);

        // Auto remove after 5s
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s forwards';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    if(notifTrigger) {
        notifTrigger.addEventListener('click', () => {
            const randomNotif = sampleNotifications[Math.floor(Math.random() * sampleNotifications.length)];
            showToast(randomNotif);
        });
        
        // Trigger one 3 seconds after page loads for demonstration
        setTimeout(() => showToast(sampleNotifications[1]), 3000);
    }

});
