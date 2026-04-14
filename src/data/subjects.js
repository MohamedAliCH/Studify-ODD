export const subjectData = {
  javaee: {
    title: 'Java EE',
    icon: 'fa-brands fa-java',
    cours: [
      {
        titre: 'Cours 1 : Architecture 3 Tiers & MVC',
        pdf: { name: 'Architecture_MVC.pdf', size: '2.4 MB' },
        resume:
          "Séparation d'une application de niveau entreprise en 3 couches (Présentation, Métier, Accès aux données). Le pattern MVC est souvent appliqué dans la couche Présentation.",
        quizzes: [
          {
            text: 'Quel est le rôle du Contrôleur en MVC Java EE ?',
            options: [
              { text: 'La page JSP', correct: false },
              { text: 'La Servlet', correct: true },
              { text: 'La BDD', correct: false },
            ],
          },
        ],
      },
      {
        titre: 'Cours 2 : Les Servlets et la Gestion de Session',
        pdf: { name: 'Servlets_Sessions.pdf', size: '1.1 MB' },
        resume:
          "Les Servlets gèrent les requêtes et réponses HTTP. La session permet de conserver l'état du client via l'objet HttpSession (cookies JSESSIONID).",
        quizzes: [
          {
            text: "Lequel de ces objets permet de stocker des attributs liés à un seul utilisateur ?",
            options: [
              { text: 'request', correct: false },
              { text: 'application', correct: false },
              { text: 'session', correct: true },
            ],
          },
        ],
      },
    ],
  },
  reseaux: {
    title: 'Réseaux Informatiques',
    icon: 'fa-solid fa-network-wired',
    cours: [
      {
        titre: 'Cours 1 : Le Modèle OSI',
        pdf: { name: 'Chap1_Modele_OSI.pdf', size: '3.5 MB' },
        resume:
          "Le Modèle OSI comprend 7 couches standardisées. La Couche 3 (Réseau) s'occupe de l'adressage IP et du routage.",
        quizzes: [
          {
            text: 'À quelle couche correspond le protocole IP ?',
            options: [
              { text: 'Couche Physique', correct: false },
              { text: 'Couche Transport', correct: false },
              { text: 'Couche Réseau', correct: true },
            ],
          },
        ],
      },
      {
        titre: 'Cours 2 : TCP/UDP et les Protocoles de Transport',
        pdf: { name: 'Chap2_TCP_UDP.pdf', size: '2.8 MB' },
        resume:
          "TCP offre une connexion fiable avec contrôle de flux et retransmission. UDP est sans connexion, plus rapide mais sans garantie de livraison.",
        quizzes: [
          {
            text: 'Quel protocole est utilisé pour le streaming vidéo en temps réel ?',
            options: [
              { text: 'TCP', correct: false },
              { text: 'UDP', correct: true },
              { text: 'FTP', correct: false },
            ],
          },
        ],
      },
    ],
  },
  maths: {
    title: 'Mathématiques Appliquées',
    icon: 'fa-solid fa-calculator',
    cours: [
      {
        titre: 'Cours 1 : Algèbre Linéaire',
        pdf: { name: 'Algebre_Matrices.pdf', size: '4.1 MB' },
        resume:
          'Étude des matrices et déterminants. Une matrice est inversible si et seulement si son déterminant est non nul.',
        quizzes: [
          {
            text: 'Une matrice 3×3 avec un déterminant de 0 est :',
            options: [
              { text: 'Inversible', correct: false },
              { text: 'Singulière (non inversible)', correct: true },
              { text: 'Diagonale', correct: false },
            ],
          },
        ],
      },
      {
        titre: 'Cours 2 : Probabilités et Statistiques',
        pdf: { name: 'Probabilites_Stats.pdf', size: '3.2 MB' },
        resume:
          "Les lois de probabilité (Binomiale, Poisson, Normale) modélisent des phénomènes aléatoires. L'espérance et la variance caractérisent une distribution.",
        quizzes: [
          {
            text: "Quelle loi modélise le nombre de succès dans n épreuves indépendantes ?",
            options: [
              { text: 'Loi de Poisson', correct: false },
              { text: 'Loi Binomiale', correct: true },
              { text: 'Loi Normale', correct: false },
            ],
          },
        ],
      },
    ],
  },
  securite: {
    title: 'Sécurité Informatique',
    icon: 'fa-solid fa-shield-halved',
    cours: [
      {
        titre: 'Cours 1 : Cryptographie et Chiffrement',
        pdf: { name: 'Crypto_Chiffrement.pdf', size: '2.9 MB' },
        resume:
          "La cryptographie symétrique (AES) utilise une clé unique, tandis que l'asymétrique (RSA) utilise une paire clé publique/privée. Le hachage (SHA-256) assure l'intégrité.",
        quizzes: [
          {
            text: 'Quel algorithme utilise une paire de clés (publique/privée) ?',
            options: [
              { text: 'AES', correct: false },
              { text: 'RSA', correct: true },
              { text: 'MD5', correct: false },
            ],
          },
        ],
      },
      {
        titre: 'Cours 2 : Pare-feu et Détection d\'Intrusions',
        pdf: { name: 'Firewall_IDS.pdf', size: '2.1 MB' },
        resume:
          "Les pare-feu filtrent le trafic réseau selon des règles. Les IDS (Intrusion Detection Systems) détectent les activités suspectes via des signatures ou des anomalies.",
        quizzes: [
          {
            text: 'Quel outil détecte les activités suspectes sur un réseau ?',
            options: [
              { text: 'Pare-feu', correct: false },
              { text: 'IDS', correct: true },
              { text: 'DNS', correct: false },
            ],
          },
        ],
      },
    ],
  },
  devweb: {
    title: 'Développement Web',
    icon: 'fa-brands fa-html5',
    cours: [
      {
        titre: 'Cours 1 : HTML5, CSS3 et Responsive Design',
        pdf: { name: 'HTML_CSS_Responsive.pdf', size: '3.0 MB' },
        resume:
          "HTML5 structure le contenu, CSS3 le stylise. Le Responsive Design utilise les media queries et Flexbox/Grid pour adapter l'affichage à tous les écrans.",
        quizzes: [
          {
            text: 'Quelle propriété CSS permet de créer une grille de mise en page ?',
            options: [
              { text: 'display: flex', correct: false },
              { text: 'display: grid', correct: true },
              { text: 'display: block', correct: false },
            ],
          },
        ],
      },
      {
        titre: 'Cours 2 : JavaScript ES6+ et DOM',
        pdf: { name: 'JavaScript_ES6_DOM.pdf', size: '2.5 MB' },
        resume:
          "ES6 introduit let/const, les arrow functions, les promesses et async/await. Le DOM permet de manipuler dynamiquement les éléments HTML via JavaScript.",
        quizzes: [
          {
            text: 'Quelle méthode est utilisée pour sélectionner un élément par son ID ?',
            options: [
              { text: 'querySelector()', correct: false },
              { text: 'getElementById()', correct: true },
              { text: 'getElementsByName()', correct: false },
            ],
          },
        ],
      },
      {
        titre: 'Cours 3 : React et les Composants',
        pdf: { name: 'React_Composants.pdf', size: '2.7 MB' },
        resume:
          "React utilise des composants réutilisables et un Virtual DOM pour un rendu performant. Les Hooks (useState, useEffect) gèrent l'état et les effets de bord.",
        quizzes: [
          {
            text: 'Quel hook React gère l\'état local d\'un composant ?',
            options: [
              { text: 'useEffect', correct: false },
              { text: 'useState', correct: true },
              { text: 'useRef', correct: false },
            ],
          },
        ],
      },
    ],
  },
  bdd: {
    title: 'Bases de Données Avancées',
    icon: 'fa-solid fa-database',
    cours: [
      {
        titre: 'Cours 1 : SQL Avancé et Optimisation',
        pdf: { name: 'SQL_Avance.pdf', size: '2.6 MB' },
        resume:
          "Les jointures (INNER, LEFT, RIGHT), sous-requêtes et index optimisent les requêtes. EXPLAIN analyse le plan d'exécution pour identifier les goulots d'étranglement.",
        quizzes: [
          {
            text: 'Quelle commande SQL analyse le plan d\'exécution d\'une requête ?',
            options: [
              { text: 'DESCRIBE', correct: false },
              { text: 'EXPLAIN', correct: true },
              { text: 'ANALYZE', correct: false },
            ],
          },
        ],
      },
      {
        titre: 'Cours 2 : NoSQL et MongoDB',
        pdf: { name: 'NoSQL_MongoDB.pdf', size: '3.3 MB' },
        resume:
          "Les bases NoSQL (MongoDB, Redis) stockent des données non structurées. MongoDB utilise des documents JSON/BSON et offre une scalabilité horizontale.",
        quizzes: [
          {
            text: 'Quel format de données utilise MongoDB ?',
            options: [
              { text: 'XML', correct: false },
              { text: 'CSV', correct: false },
              { text: 'BSON (JSON binaire)', correct: true },
            ],
          },
        ],
      },
    ],
  },
  systemes: {
    title: 'Systèmes d\'Exploitation',
    icon: 'fa-brands fa-linux',
    cours: [
      {
        titre: 'Cours 1 : Commandes Linux et Shell Scripting',
        pdf: { name: 'Linux_Shell.pdf', size: '2.2 MB' },
        resume:
          "Les commandes de base (ls, cd, grep, chmod) et le scripting Bash automatisent l'administration système. Les permissions rwx contrôlent l'accès aux fichiers.",
        quizzes: [
          {
            text: 'Quelle commande change les permissions d\'un fichier sous Linux ?',
            options: [
              { text: 'chown', correct: false },
              { text: 'chmod', correct: true },
              { text: 'chgrp', correct: false },
            ],
          },
        ],
      },
      {
        titre: 'Cours 2 : Processus et Gestion de la Mémoire',
        pdf: { name: 'Processus_Memoire.pdf', size: '3.1 MB' },
        resume:
          "Un processus est un programme en exécution. Le scheduler gère la planification (FIFO, Round Robin). La mémoire virtuelle utilise la pagination pour isoler les processus.",
        quizzes: [
          {
            text: 'Quel algorithme de planification attribue un quantum de temps à chaque processus ?',
            options: [
              { text: 'FIFO', correct: false },
              { text: 'Round Robin', correct: true },
              { text: 'SJF', correct: false },
            ],
          },
        ],
      },
    ],
  },
};
