# GATEPrep Nexus — Developer & Learning Documentation

Welcome to the development documentation for **GATEPrep Nexus**! This document is designed specifically to help you understand **how**, **why**, and **what** technologies are used in this project, serving as a step-by-step React guide.

---

## 🏗️ Project Architecture Overview

This project is built using a modern **Single Page Application (SPA)** model. 
- **Vite** is used as our build tool and development server. It compiles our JavaScript and CSS using a bundler (esbuild) that is 10-100x faster than traditional build systems (like Webpack).
- **React** is the UI library, organized around **Components** (small, reusable pieces of the interface) and **State** (variables that trigger a re-render when their values change).

---

## 🎨 Phase 1: CSS Design System

### Technology: Vanilla CSS + HSL Variables
- **Why?** Rather than using external styling libraries like TailwindCSS which require configuration, we wrote native, high-performance CSS in `src/index.css`.
- **How?** We defined CSS variables inside `:root` (for our midnight dark mode) and inside the `.light-theme` class (for light mode overrides).
- **HSL Colors:** We used HSL (`hue, saturation, lightness`) to create coordinated colors easily. For instance, `--accent-purple: #8b5cf6` has a matching translucent tint `--accent-purple-glow: rgba(139, 92, 246, 0.25)` for glass borders.
- **Glassmorphism:** By combining `background: rgba(...)` with `backdrop-filter: blur(16px)`, we achieved a beautiful glass overlay effect that is responsive and GPU-accelerated.

---

## 🔑 Phase 2: Global State Context & Navigation Layout

In React, sharing variables between components that are far apart can lead to "prop drilling" (passing variables through multiple levels). To solve this, we implemented the **React Context API**.

### 1. Global State Hub: `src/AppContext.jsx`
- **What is it?** This file acts as our application's "brain." It keeps track of global settings like:
  - Is the user logged in? (`user`)
  - Which page is active? (`activeTab`)
  - What is the theme? (`theme` - light/dark)
  - What syllabus items are completed? (`syllabusProgress`)
  - Sticky notes, scores, and logged study hours.
- **How does it persist data?** We used standard React `useEffect` hooks linked to the browser's `localStorage`. Whenever any state changes (like checking off a syllabus topic), React automatically saves a stringified JSON representation to the user's browser, making the app **100% serverless, zero-maintenance, and free forever**.
- **Dynamic Scheduler Engine:** Within a `useEffect` inside `AppContext.jsx`, we built an algorithm that counts the days from today (May 21, 2026) to the estimated GATE exam date (February 6, 2027), generating a day-by-day customized schedule based on the user's selected focus track (CS, DA, or Dual).

### 2. User Interfaces & Forms: `src/components/`
- **`Auth.jsx` (Auth Barrier):** If the `user` state inside our context is `null`, our main application renders the `<Auth />` overlay screen instead of the dashboard. Once the user enters their name, selects their track, and chooses an avatar, we call `login()`, changing `user` from `null` to an object, which immediately removes the overlay and renders the main app layout.
- **`Sidebar.jsx` & `Header.jsx` (Layout Navigation):** These components consume active state values from `useApp()`. Whenever you click a sidebar item, it invokes `setActiveTab(tabId)`, telling React to instantly swap out the active view in the dashboard.
- **`VirtualCalc.jsx` (Official Calculator Simulation):** This is a custom scientific calculator that simulates the real, on-screen calculator provided in the official GATE examination.
  - **Why?** Practicing on-screen math is a major key to managing time during the actual GATE exam.
  - **How?** It uses safe mathematical parsing (converting words like `pi`, `sin`, `sqrt` into JavaScript `Math` properties) and evaluates expressions using scoped evaluation triggers.

---

## 📅 Phase 3: Interactive Syllabus Tracker & Notice Board

In this phase, we completed the core educational data rendering.

### 1. Collapsible Accordions: `src/views/Syllabus.jsx`
- **Accordion State Mapping:** In React, standard collapsing UI is managed using state. We created `const [openSubjects, setOpenSubjects] = useState({})`, which is an object map where keys are Subject IDs and values are booleans (`{ 'cs-math': true, 'cs-os': false }`).
- **How it works:** When a header is clicked, it toggles that specific key's boolean. Inside the JSX, we render `{isOpen && <div className="topics-list">...</div>}`, which only mounts the sub-elements if that subject's boolean is `true`.
- **Resource Integration:** Clickable links trigger educational simulations mapped to the official syllabus, displaying free curated resources (e.g. specific NPTEL playlists).

### 2. Bulletin timelines & Sticky Reminders: `src/views/NoticeBoard.jsx`
- **Dynamic Countdowns:** We consumed the helper function `calculateDaysBetween()` to calculate the exact remaining days to registration and the exam on the fly, rendering milestones countdowns dynamically.
- **Physical Desk Simulation (Sticky Notes):** We leveraged the global context CRUD (`addStickyNote` and `deleteStickyNote`) to render a visual notes dashboard.
  - **CSS rotation:** Notes are styled using random rotations in vanilla CSS (e.g. `transform: rotate(-1.5deg)`) to realistically mimic a physical cork notice board.
  - **Color Picker:** Users can color-code entries. Colors are passed to state and rendered directly as standard inline background styles (`style={{ backgroundColor: note.color }}`).


---

## ⚙️ Phase 4: Dynamic Study Planner & Academic Command Center

In this phase, we completed the scheduler engine and command dashboard.

### 1. SVG Trigo Progress Rings: `src/views/Dashboard.jsx`
- **Vector Calculations:** To make the study hours tracker look premium, we rendered a dynamic SVG circle progress ring.
- **Mathematics:** We defined a radius `r = 50`. The circumference is `C = 2 * Math.PI * r \approx 314.16`.
- **How it works:** We leverage standard SVG properties:
  - `strokeDasharray`: Represents the dash length. We set it to the full circumference.
  - `strokeDashoffset`: Represents where the dash starts. A value of `0` means the ring is fully filled. A value of `C` means it is empty.
  - **React state connection:** `const strokeDashoffset = circumference - (hoursPercent / 100) * circumference`. When the logged hours change, this calculation runs, and the CSS transition fills the ring smoothly!

### 2. State-Driven Pagination: `src/views/Planner.jsx`
- **React Pagination:** Rather than rendering 260 days at once (which degrades browser performance), we implemented client-side pagination.
- **Array Slice Pattern:** We store the `currentPage` in local state. We define the `indexOfLastItem = currentPage * itemsPerPage` and `indexOfFirstItem = indexOfLastItem - itemsPerPage`. We then extract our slice: `currentDays = filteredPlan.slice(indexOfFirstItem, indexOfLastItem)` and render only that small chunk!
- **Dynamic Recalculations:** When you edit your parameters (e.g. daily hours or target date) in the scheduler panel, it updates `customParams` in our Context, which triggers a global `useEffect` to instantly rebuild the study plan array in less than 5 milliseconds!



---

---

## 📝 Phase 5: Interactive Practice Center & Mock Exam Simulator

To ensure GATE-level realism, we built a full-fledged exam player and scoring engine.

### 1. State-Driven Exam Player: `src/views/Practice.jsx`
- **Timer Effect:** We implemented a countdown timer using standard React `useEffect` + `setInterval`. When `testMode` is active, the timer decrements `secondsLeft` every second.
- **Answer Storage:** User answers are tracked as a dictionary object: `{ [qId]: selectedOptionIndex | textInputValue }`.
- **Review System:** Users can flag questions for review. We maintain a boolean lookup object `markedForReview`. In the side grid navigator, buttons are styled conditionally based on whether a question has an answer or has been marked for review, creating a color-coded legend (Green = Answered, Purple = Marked for Review, Gray = Unvisited) identical to the actual GATE examination interface.
- **NAT Comparison:** Unlike MCQs which match selected option indexes, Numerical Answer Type (NAT) inputs are string representations of decimals. We parse and normalize both the user's input and correct answer using `parseFloat(userAnswer) === parseFloat(q.correctAnswer)` to ensure matching precision even if the student adds leading/trailing zeroes.
- **Instant Detailed Feedback:** Upon submitting, scores are evaluated and saved to the global `mockHistory` context, and the view swaps to an advanced mathematical solution review, providing step-by-step math breakdowns for every answer.

---

## 🧠 Phase 6: Formulas cheat sheet, 3D Flashcards & AI Prep Chatbot

In this phase, we completed the self-testing and advisory dashboards.

### 1. Flashcard 3D CSS Transitions: `src/views/Formulas.jsx`
- **3D Transform:** To make the card flip feel premium and physical, we designed a scene with CSS perspective. The card inner box features `transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)` and `transform-style: preserve-3d`.
- **Flipping Mechanism:** Clicking the card toggles the `isFlipped` state in React. When `isFlipped` is `true`, a class `.flipped` is applied, executing `transform: rotateY(180deg)`.
- **Backface Visibility:** Both the front and back of the card are positioned absolutely and have `backface-visibility: hidden` so that the rear content is invisible until the card rotates 180 degrees.
- **Mastery Tracker:** Active recall card results are saved in `localStorage`, showing a smooth mastery percentage bar that increments as cards are moved to the "Mastered" status.

### 2. Conversational Advisor Simulator: `src/views/Advisor.jsx`
- **Expert Database:** We created an expert pre-programmed advisor database mapping strategic keys (weightages, negative marking, safe scores, reference books, study planning) to beautifully formatted markdown logs.
- **Keyword Scanner:** When a student asks a custom question, a lightweight string scanner checks the query against active keyword arrays, retrieving high-value, highly specific responses. If no keyword matches, it returns a generalized strategic advice blueprint.
- **Micro-Animations (Typing Indicator):** When a message is sent, a typing state (`isTyping`) triggers three small dots that bounce sequentially in an infinite CSS keyframe loop (`@keyframes typingDotBounce`), mimicking real-time AI generation before appending the advisor's final text.
- **Scroll Synchronization:** We created a React ref `messagesEndRef = useRef(null)` at the bottom of the scroll container. Inside a `useEffect` hooked to `messages`, we execute `messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })`, ensuring the view smoothly snaps to the newest message whenever the student or AI posts.
- **Conversation Logs Persistence:** Chat logs are backed up directly in `localStorage`, ensuring that the student can seamlessly switch tabs without losing their strategic guidance conversations!

---

## 🛠️ Summary of React Hooks Used Across GATEPrep Nexus

1. **`useState`:** Tracks reactive values inside a component (e.g., active question index, search queries, active tabs).
2. **`useContext`:** Provides global access to the `AppContext` from any view without passing props manually.
3. **`useEffect`:** Handles asynchronous operations, timers, and syncing states directly to `localStorage` on state updates.
4. **`useRef`:** Accesses raw DOM nodes directly (e.g. scrolling the chat container, focusing input fields).

---

## 🛰️ Phase 13-17: Dynamic Scraper Engine, LaTeX MathJax, & Syllabus Overlap Analysis

In these advanced phases, we integrated real-time external data crawling, MathJax LaTeX math rendering, MSQ partial correctness grading, and track-specific overlap guidelines.

### 1. Hybrid Live-Sync Scraper Engine: `src/views/CommunityQBank.jsx`
- **Dynamic Crawling Pattern:** The browser fetches the index file from the official IITM student project portal. Using standard browser `DOMParser`, it extracts category nodes and relative URLs.
- **On-Demand Loading:** Question files are crawled and compiled on-the-fly when selected. If a CORS barrier is hit or the candidate is offline, the scraper automatically falls back to a curated offline seed database of 10 high-fidelity questions, showing a yellow notice bulletin.
- **Dynamic URL Resolution:** Pre-compiled scripts scan all parsed relative link nodes (e.g. images, reference links) and prepends the absolute domain URL (`https://iitmbsc-student-projects.github.io/gate-da/`) so all links resolve successfully in the client browser with `target="_blank"`.

### 2. MathJax LaTeX Typesetting Integration
- **Script Injection:** We dynamically configure and load the MathJax v3 script inside `index.html`, disabling Quarto standard ignore rules.
- **Reactive Hooks:** Whenever a new question is loaded, an option selected, or grading verified, the `typesetPromise()` method is called reactively in React's rendering flow. This guarantees that raw LaTeX expressions (`\(...\)` and `\[...\]`) convert instantly to crisp vector equations in the browser.

### 3. Multiple Select (MSQ) Partial Grading Engine
- **Partial Correctness Logic:** Unlike traditional binary grading, multiple-select questions (MSQs) in our portal check whether the student's selected choices form a non-empty subset of the correct options, with *zero* incorrect options selected.
- **Visual Feedback:** When this subset condition is satisfied, the exam simulator outputs an amber/yellow warning banner: `"Partially Correct!"` and records a `"partial"` progress key to highlight partial concept mastery.

### 4. CS vs. DA Syllabus Overlap Analysis
Mathematics, programming, and databases form a massive strategic overlap (~35% of overall marks) between **GATE CS** and **GATE DA**:

| Category ID | Subject Name | CS Relevance | Syllabus Overlap Details |
| :--- | :--- | :--- | :--- |
| `linear_algebra` | Linear Algebra | 🌟 High (Shared) | Matrices, eigenvalues, eigenvectors, systems of equations are identical. |
| `prob_stats` | Probability & Stats | 🌟 High (Shared) | Bayes theorem, random variables, and expectation are identical. (DA has advanced inference). |
| `calculus` | Calculus & Optimization | 🌟 High (Shared) | Limits, continuity, derivatives, maxima/minima are shared. (DA adds multivariable optimization). |
| `dbms` | Database Management | 🌟 High (Shared) | Normal forms, SQL queries, ER modeling, relational algebra are 100% identical. |
| `pdsa` | Programming & DSA | 🌟 High (Shared) | Searching, sorting, stack/queue/list, trees, graph BFS/DFS are identical. |
| `aptitude` | General Aptitude | 🌟 High (Shared) | Quantitative and verbal reasoning sections are 100% identical. |
| `machine_learning`| Machine Learning | 🤖 DA Specific | Not tested in standard GATE CS. |
| `ai` | Artificial Intelligence | 🤖 DA Specific | Not tested in standard GATE CS. |

* **Interactive Badge system:** The `CommunityQBank` view includes custom warning notices tailored to the candidate's active track (CS, DA, or Dual).
* **Category Indicators:** Each category selector button renders a visual indicator (`🌟` for Shared or `🤖` for DA Only) to guide CS candidates dynamically to 100% applicable practice materials.

