# 🎓 GATEPrep Nexus

[![Vercel Deployment](https://img.shields.io/badge/deployed-vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://gateprep-nexus.vercel.app/)
[![React Version](https://img.shields.io/badge/react-v19.2-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite Bundler](https://img.shields.io/badge/vite-v8.0-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

**GATEPrep Nexus** is a state-of-the-art, premium client-side exam preparation portal designed for **GATE Computer Science & IT (CS)** and **Data Science & AI (DA)** aspirants. Built entirely using React 19, Vite 8, and Vanilla CSS with a gorgeous dark glassmorphic interface, it offers complete offline autonomy, zero server costs, and 100% private browser-staged persistence.

🌐 **Live URL:** [gateprep-nexus.vercel.app](https://gateprep-nexus.vercel.app/)

---

## ⚡ Core Features

- **🎯 Interactive Track Onboarding:** Custom avatar designer, personalized name configuration, and syllabus focus selector (CS, DA, or Dual preparation).
- **🔄 Dynamic Exam Rollover Engine:** Timezone-safe date engine that automatically calculates the official GATE start day (first Saturday of February) for any target year. When the exam completes, the system dynamically rolls over all milestones, IIT organizing institute mappings (IIT Guwahati, Madras, Bombay, etc.), and study calendars to the subsequent year automatically.
- **📊 Syllabus Progress Trackers:** Complete breakdown of official syllabi (Engineering Mathematics, Core subjects, and General Aptitude) with direct links to free curated video resources, updating your completion rings in real-time.
- **📅 Dynamic Day-by-Day Scheduler:** Generates a customized, progressive study plan mapped across your remaining days to the next exam, allowing you to log and track your status.
- **📝 Full-Screen Mock Simulator:** Realistic exam simulator that replicates official GATE constraints. Features interactive MCQs, MSQs, and NATs (Numerical Answer Type with decimal inputs), color-coded question state trackers, and a countdown auto-submit timer.
- **🛰️ Dynamic IIT Madras Q-Bank Integration:** A real-time web crawler and parser engine that dynamically syncs community-curated GATE Data Science & AI questions directly from the official IITM student project portal. Features live connection banners, automatic resolution of relative resource links, and a robust offline fail-safe seed of 10 high-fidelity questions for uninterrupted study sessions.
- **📐 LaTeX MathJax Typesetting:** Full integration of MathJax v3 to automatically detect and typeset raw dynamic LaTeX equations, fractions, limits, and matrices inside scraped questions and step-by-step derivations instantly.
- **⚠ MSQ Partial Grading & Amber Banners:** Intelligent multiple-select option evaluations that accurately classify subsets of correct options (with zero incorrect ones) as **Partially Correct**, giving real-time amber visual feedback and logging status indicators.
- **🧮 Integrated Scientific Calculator:** Global floating algebraic calculator featuring full trigonometric, logarithmic, logarithmic bases, and scientific functions mapped to standard GATE parameters.
- **🧠 3D Active Recall Decks:** High-fidelity 3D flippable flashcard stages built using CSS perspective properties. Easily sort concepts by memory strength (Need Review vs. Mastered) with automatic percentage feedback.
- **📋 Searchable unicode Formulas:** A searchable, fully mathematical formula list using clean, native Unicode representation (`⟹`, `∑`, `∏`, sub/superscripts) for instant legibility without heavy external typesetting libraries.
- **🤖 Strategic AI Advisor Chatbot:** Pre-loaded strategic advisor trained on exam blueprints, topic weightage, multi-pass review strategies, safety thresholds, and textbook references.
- **🌓 Adaptive Theme Engine:** Double-gradient glassmorphism styling with fully responsive desktop, tablet, and mobile layouts. Seamlessly toggle between dark and light themes.

---

## 🛠️ Technology Stack

- **Frontend Library:** [React 19](https://react.dev/) (Hooks, dynamic Context state, refs)
- **Asset Bundler:** [Vite 8](https://vite.dev/) (Ultra-fast esbuild compiler: builds in **<600ms**)
- **Styling System:** Vanilla CSS3 with global Custom Properties (CSS variables), glassmorphism styles, and GPU-accelerated keyframe animations.
- **Persistence:** High-reliability browser `localStorage` syncing.
- **Hosting Engine:** Serverless edge hosting via [Vercel](https://vercel.com).

---

## 🚀 Getting Started (Run Locally)

Ensure you have [Node.js](https://nodejs.org/) (version 18 or higher) installed on your system.

### 1. Clone the Repository
```bash
git clone https://github.com/shrikrishna97/gateprep-nexus.git
cd gateprep-nexus
```

### 2. Install Dependencies
Install all package configurations safely:
```bash
npm install
```

### 3. Run Development Server
Start the local hot-reload web server:
```bash
npm run dev
```
Open your browser and navigate to **`http://localhost:5173`**.

### 4. Build for Production
Bundle and optimize all CSS and JavaScript assets into compressed, static chunks:
```bash
npm run build
```
Verify files inside the local `/dist` output directory.

---

## 🔒 Security & Client Autonomy

* **Data Ownership:** Your study habits, checklist progress, calendar status, sticky notes, and mock scores are kept **100% private** inside your personal browser sandbox. No user data ever leaves your device.
* **Serverless Stability:** Because there are no backend databases or active servers, this portal has **zero downtime risks** and zero unexpected hosting costs. It is completely free to deploy and maintain forever.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
