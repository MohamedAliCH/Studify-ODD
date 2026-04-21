# StudyFy 🎓

🌐 Live: https://studifyodd.netlify.app/

StudyFy is a modern, responsive student assistant application built with **React** and **Vite**. Designed with a premium "Neo-Academic" UI aesthetic, StudyFy helps students organize their study schedules, access pedagogical materials, and receive technical assistance in an intuitive and interactive environment.

## ✨ Features

- **Neo-Academic UI**: A distinctive amber/gold-on-navy aesthetic with a strict, symmetrical design system and "Ethereal Glassmorphism" components.
- **Dark/Light Mode**: Seamless theme switching for comfortable studying at any time of day.
- **Organisation (Dashboard)**: Manage alerts, deadlines, and study schedules.
- **Pédagogique (Learning)**: Access course materials, interactive quizzes, and summaries.
- **AI Chatbot**: A per-course AI chatbot to provide context-aware assistance and answer questions.
- **Technique (Support)**: Software setup guides, tutorials, and technical assistance.
- **Interactive Notifications**: Toast notification system for alerts and updates.
- **Mobile Responsive**: Fully optimized for both desktop and mobile devices.

## 🛠️ Technology Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (CSS Variables, Flexbox/Grid, Glassmorphism effects)
- **Icons**: FontAwesome

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/studyfy.git
   cd studyfy
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`.

### Build for Production

To create a production build:

```bash
npm run build
```

You can preview the production build locally using:

```bash
npm run preview
```

## 📁 Project Structure

```text
StudyFy/
├── src/
│   ├── components/      # Reusable UI components (Sidebar, TopBar, Toast, ChatOverlay, QuizOverlay)
│   ├── data/            # Mock data (subjects, notifications, tech environments)
│   ├── pages/           # Main application views (Home, Organisation, Pedagogique, Technique)
│   ├── App.jsx          # Root component & routing
│   ├── index.css        # Global styles and Neo-Academic design system
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── package.json         # Project metadata and dependencies
└── vite.config.js       # Vite configuration
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/studyfy/issues).

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
