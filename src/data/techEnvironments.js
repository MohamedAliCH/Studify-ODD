export const techData = {
  java: {
    title: 'Environnement Java EE',
    icon: 'fa-brands fa-java',
    logiciels: [
      {
        name: 'Apache Tomcat 9',
        icon: 'fa-solid fa-server',
        downloadButton: 'Archive ZIP (Windows x64)',
        setupSteps: [
          'Téléchargez le ZIP et extrayez-le dans un dossier racine (ex: C:/Servers/tomcat9).',
          'Ouvrez Eclipse, allez dans Window > Preferences > Server > Runtime Environments.',
          "Ajoutez 'Apache Tomcat v9.0' et pointez vers le répertoire dézippé.",
        ],
        tutorials: [
          { title: 'Lier Tomcat à Eclipse EE', duration: '05:42', thumb: 'fa-play' },
        ],
        botKnowledge: {
          '8080':
            "Erreur Port 8080 en cours d'utilisation ? Ouvrez Tomcat/conf/server.xml, cherchez port='8080' et remplacez par '8081'. Sauvegardez et redémarrez.",
          default:
            "Problème d'installation avec Tomcat ? Je connais toutes ses erreurs serveurs !",
        },
      },
      {
        name: 'JDK 17',
        icon: 'fa-brands fa-java',
        downloadButton: 'Windows x64 Installer',
        setupSteps: [
          "Exécutez l'installeur téléchargé et laissez le chemin par défaut.",
          "Recherchez 'Variables d'environnement' dans Windows.",
          "Dans 'Variables Système', ajoutez 'JAVA_HOME' pointant vers votre dossier JDK.",
          "Ajoutez '%JAVA_HOME%\\bin' à la variable Path.",
        ],
        tutorials: [
          { title: 'Configuration JDK et variables Path', duration: '04:15', thumb: 'fa-play' },
        ],
        botKnowledge: {
          javac:
            "Erreur 'javac n'est pas reconnu' : C'est un souci de variable Path. Avez-vous bien rajouté /bin à la fin du chemin ?",
          default: 'Le JDK est la base. Quelle est votre erreur Java ?',
        },
      },
      {
        name: 'Eclipse IDE Enterprise',
        icon: 'fa-solid fa-code',
        downloadButton: 'Eclipse IDE 2024-03',
        setupSteps: [
          "Téléchargez 'Eclipse IDE for Enterprise Java and Web Developers'.",
          'Extrayez dans un dossier sans espaces (ex: C:/Dev/eclipse).',
          'Configurez le JDK dans Window > Preferences > Java > Installed JREs.',
          'Importez le server Tomcat dans la vue Servers.',
        ],
        tutorials: [
          { title: 'Premier projet Web avec Eclipse', duration: '08:30', thumb: 'fa-play' },
        ],
        botKnowledge: {
          workspace:
            "Erreur de workspace ? Supprimez le dossier .metadata dans votre workspace et relancez Eclipse.",
          maven:
            "Pour activer Maven, clic droit sur le projet > Configure > Convert to Maven Project.",
          default: "Eclipse a un souci ? Décrivez-moi l'erreur et je vous guide !",
        },
      },
    ],
  },
  db: {
    title: 'Bases de Données',
    icon: 'fa-solid fa-database',
    logiciels: [
      {
        name: 'MySQL Server',
        icon: 'fa-solid fa-database',
        downloadButton: 'MySQL Installer Community',
        setupSteps: [
          "Lancez l'installation en type 'Developer Default'.",
          'Lors de la config, définissez un mot de passe Root (notez-le !).',
          "Démarrez le service Windows 'MySQL80'.",
        ],
        tutorials: [
          { title: 'Installer MySQL de A à Z', duration: '06:20', thumb: 'fa-play' },
        ],
        botKnowledge: {
          'access denied':
            "Access Denied : Vous vous trompez de mot de passe ou vous essayez de vous connecter sans mot de passe (''). Vérifiez vos identifiants fournis à l'installation.",
          default: "Souci avec l'installation du serveur MySQL ?",
        },
      },
      {
        name: 'MySQL Workbench',
        icon: 'fa-solid fa-table-cells',
        downloadButton: 'MySQL Workbench 8.0',
        setupSteps: [
          "Installé automatiquement avec MySQL Installer en mode 'Developer Default'.",
          'Ouvrez Workbench et créez une connexion avec Host: localhost, Port: 3306.',
          'Entrez le mot de passe Root défini lors de l\'installation.',
        ],
        tutorials: [
          { title: 'Créer et gérer une BDD avec Workbench', duration: '07:10', thumb: 'fa-play' },
        ],
        botKnowledge: {
          connexion:
            "Erreur de connexion ? Vérifiez que le service MySQL est démarré (services.msc > MySQL80 > Démarrer).",
          default: 'Un problème avec MySQL Workbench ? Décrivez votre erreur !',
        },
      },
      {
        name: 'MongoDB Community',
        icon: 'fa-solid fa-leaf',
        downloadButton: 'MongoDB 7.0 Community',
        setupSteps: [
          "Téléchargez le MSI depuis mongodb.com et lancez l'installation.",
          "Cochez 'Install MongoDB as a Service' pour le démarrage automatique.",
          "Installez MongoDB Compass (interface graphique) séparément.",
          "Testez avec : mongosh dans le terminal.",
        ],
        tutorials: [
          { title: 'Premiers pas avec MongoDB', duration: '09:15', thumb: 'fa-play' },
        ],
        botKnowledge: {
          mongosh:
            "Si 'mongosh' n'est pas reconnu, ajoutez le chemin MongoDB/bin à votre variable Path système.",
          default: "Comment puis-je vous aider avec MongoDB ?",
        },
      },
    ],
  },
  web: {
    title: 'Développement Web',
    icon: 'fa-brands fa-html5',
    logiciels: [
      {
        name: 'Node.js',
        icon: 'fa-brands fa-node',
        downloadButton: 'Version LTS (Recommandée)',
        setupSteps: [
          'Téléchargez et lancez le .msi.',
          'Acceptez toutes les options par défaut, NPM sera installé avec.',
          'Redémarrez VS Code pour que la commande NPM soit reconnue.',
        ],
        tutorials: [
          { title: 'Installer Node.js et NPM', duration: '04:50', thumb: 'fa-play' },
        ],
        botKnowledge: {
          npm: "Si npm est introuvable, redémarrez votre PC. Si ça persiste, l'installation n'a pas mis à jour le Path.",
          default: "Comment puis-je vous aider sur l'installation de NodeJS ?",
        },
      },
      {
        name: 'VS Code',
        icon: 'fa-solid fa-code',
        downloadButton: 'VS Code Stable (Windows)',
        setupSteps: [
          'Téléchargez et installez VS Code depuis code.visualstudio.com.',
          "Installez les extensions : ESLint, Prettier, Live Server, React Developer Tools.",
          'Configurez le formatage automatique dans Settings > Format On Save.',
        ],
        tutorials: [
          { title: 'Configurer VS Code pour le Web', duration: '06:00', thumb: 'fa-play' },
        ],
        botKnowledge: {
          extension:
            "Pour installer une extension : Ctrl+Shift+X, cherchez le nom, et cliquez Install.",
          terminal:
            "Le terminal intégré s'ouvre avec Ctrl+` (backtick). Vous pouvez choisir PowerShell ou Git Bash.",
          default: 'Un souci avec VS Code ? Dites-moi votre problème !',
        },
      },
      {
        name: 'Git & GitHub',
        icon: 'fa-brands fa-git-alt',
        downloadButton: 'Git for Windows',
        setupSteps: [
          'Téléchargez Git depuis git-scm.com et installez avec les options par défaut.',
          "Configurez : git config --global user.name 'Votre Nom'",
          "Configurez : git config --global user.email 'votre@email.com'",
          'Créez un compte GitHub et configurez une clé SSH pour le push.',
        ],
        tutorials: [
          { title: 'Git & GitHub pour débutants', duration: '12:30', thumb: 'fa-play' },
        ],
        botKnowledge: {
          push:
            "Erreur 'permission denied' lors du push ? Vérifiez votre clé SSH avec : ssh -T git@github.com",
          merge:
            "Conflit de merge ? Ouvrez le fichier en conflit, choisissez la version à garder entre les marqueurs <<<, === et >>>, puis faites git add et git commit.",
          default: 'Git vous pose problème ? Décrivez votre situation !',
        },
      },
    ],
  },
  linux: {
    title: 'Administration Linux',
    icon: 'fa-brands fa-linux',
    logiciels: [
      {
        name: 'VirtualBox',
        icon: 'fa-solid fa-desktop',
        downloadButton: 'VirtualBox 7.0 (Windows)',
        setupSteps: [
          'Téléchargez VirtualBox depuis virtualbox.org.',
          "Installez avec les options par défaut (les adaptateurs réseau virtuels seront créés).",
          'Téléchargez un ISO Ubuntu Server 22.04 LTS.',
          "Créez une nouvelle VM : 2 Go RAM, 25 Go disque, type Linux/Ubuntu 64-bit.",
        ],
        tutorials: [
          { title: 'Créer une VM Ubuntu avec VirtualBox', duration: '10:20', thumb: 'fa-play' },
        ],
        botKnowledge: {
          virtualisation:
            "Erreur 'VT-x is not available' ? Activez la virtualisation dans le BIOS de votre PC (Intel VT-x ou AMD-V).",
          reseau:
            "Pour accéder à Internet depuis la VM, utilisez le mode 'NAT' dans les paramètres réseau de VirtualBox.",
          default: 'Un problème avec VirtualBox ? Décrivez votre erreur !',
        },
      },
      {
        name: 'PuTTY (SSH)',
        icon: 'fa-solid fa-terminal',
        downloadButton: 'PuTTY 0.80 (Windows)',
        setupSteps: [
          'Téléchargez le MSI depuis putty.org et installez.',
          "Ouvrez PuTTY, entrez l'adresse IP de votre serveur Linux.",
          'Port : 22, Connection type : SSH.',
          "Cliquez 'Open' et connectez-vous avec vos identifiants Linux.",
        ],
        tutorials: [
          { title: 'Se connecter en SSH avec PuTTY', duration: '04:45', thumb: 'fa-play' },
        ],
        botKnowledge: {
          'connection refused':
            "Erreur 'Connection refused' ? Vérifiez que le service SSH est actif sur le serveur : sudo systemctl status sshd",
          default: 'PuTTY a un problème de connexion ? Dites-moi plus !',
        },
      },
    ],
  },
  securite: {
    title: 'Sécurité & Pentesting',
    icon: 'fa-solid fa-shield-halved',
    logiciels: [
      {
        name: 'Wireshark',
        icon: 'fa-solid fa-magnifying-glass',
        downloadButton: 'Wireshark 4.2 (Windows)',
        setupSteps: [
          'Téléchargez depuis wireshark.org et installez avec Npcap (coché par défaut).',
          "Lancez Wireshark et sélectionnez votre interface réseau (Wi-Fi ou Ethernet).",
          "Utilisez les filtres : 'http', 'tcp.port == 80', 'ip.addr == x.x.x.x'.",
        ],
        tutorials: [
          { title: 'Analyser le trafic réseau avec Wireshark', duration: '11:00', thumb: 'fa-play' },
        ],
        botKnowledge: {
          'no interfaces':
            "Pas d'interfaces visibles ? Lancez Wireshark en tant qu'administrateur et vérifiez que Npcap est installé.",
          filtre:
            "Filtres utiles : 'http.request.method == GET' pour voir les requêtes GET, 'dns' pour le trafic DNS.",
          default: 'Un problème avec Wireshark ? Décrivez votre situation !',
        },
      },
      {
        name: 'Kali Linux (VM)',
        icon: 'fa-brands fa-linux',
        downloadButton: 'Kali Linux VM Image',
        setupSteps: [
          "Téléchargez l'image VirtualBox (.ova) depuis kali.org.",
          'Dans VirtualBox, faites Fichier > Importer un appareil virtuel.',
          'Identifiants par défaut : kali / kali.',
          'Mettez à jour avec : sudo apt update && sudo apt upgrade.',
        ],
        tutorials: [
          { title: 'Installer Kali Linux en VM', duration: '08:40', thumb: 'fa-play' },
        ],
        botKnowledge: {
          resolution:
            "Résolution d'écran bloquée ? Installez les Guest Additions : sudo apt install virtualbox-guest-x11 puis redémarrez.",
          default: 'Kali Linux vous pose problème ? Décrivez votre erreur !',
        },
      },
    ],
  },
};
