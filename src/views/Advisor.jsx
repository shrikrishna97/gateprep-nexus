import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../AppContext';

// High-fidelity pre-programmed advisor expert response database
const ADVISOR_KNOWLEDGE = {
  weightage: `### 📊 GATE Subject-Wise Weightage Breakdown

Here is the strategic breakdown of marks based on recent GATE exams for both tracks:

#### 💻 Computer Science & IT (CS)
* **General Aptitude:** 15 Marks (Fixed)
* **Engineering Mathematics:** 13 Marks (Linear Algebra, Calculus, Discrete Math, Probability)
* **Programming & Data Structures + Algorithms:** 15–20 Marks (Highest Technical Weightage)
* **Databases (DBMS) & Operating Systems (OS):** 16–18 Marks
* **Computer Networks (CN):** 8–10 Marks
* **Theory of Computation (TOC) & Compiler Design:** 12–15 Marks
* **Computer Architecture (COA) & Digital Logic:** 10–12 Marks

#### 🧮 Data Science & Artificial Intelligence (DA)
* **General Aptitude:** 15 Marks (Fixed)
* **Probability & Statistics:** 15–18 Marks (Massive weightage!)
* **Linear Algebra & Calculus/Optimization:** 15–18 Marks
* **Programming in Python & Data Structures/Algorithms:** 15 Marks
* **Machine Learning (Supervised, Unsupervised, Metrics):** 20 Marks (Core component)
* **Artificial Intelligence (Search, Logic):** 8–10 Marks
* **DBMS & Data Warehousing:** 8–10 Marks

> 💡 **Advisor Tip:** Engineering Mathematics + General Aptitude covers **28 Marks** in both papers. Mastering these foundational topics is the absolute fastest way to guarantee qualification (cutoff is usually ~25-30)!`,

  time_management: `### ⏳ Strategic Time Management for the 3-Hour GATE Exam

Success in GATE isn't just about what you know; it is about how you execute under pressure. Here is my recommended 3-pass exam-taking strategy:

1. **Pass 1 (0 to 60 mins): The Low-Hanging Fruit**
   * Start with **General Aptitude (GA)** (10-15 mins). It is simple and builds confidence.
   * Scan the technical section and answer only direct, conceptual 1-mark questions that take under 2 minutes. Do NOT touch complex NAT calculations yet.
2. **Pass 2 (60 to 140 mins): The Core Technical Push**
   * Solve the 2-mark MCQs and MSQs. Take your time, draw diagrams, and read options carefully.
   * If a question takes more than 4 minutes, **Mark for Review** and move on. Do not let ego waste your precious minutes!
3. **Pass 3 (140 to 180 mins): Numerical Answers & Double Checks**
   * Address the **NAT (Numerical Answer Type)** questions. Since there is **no negative marking** for NATs, write down your best calculated guess!
   * Review all marked-for-review items. Double-check for silly arithmetic units conversions (e.g. bits vs bytes, KB vs MB).

> ⚠️ **Critical Alert:** Avoid wild guesses on MCQs! A single incorrect 2-mark MCQ costs you **0.67 marks** in penalty, which can drop your rank by 1,000 places.`,

  target_scores: `### 🎯 Safe GATE Marks & Score Targets for Top IITs/IISc

To get admissions into prestigious M.Tech/MS programs or land high-paying PSU recruitment, aim for these benchmarks:

* **IISc Bangalore & IIT Bombay/Madras/Delhi (Top 5 IITs):**
  * **GATE Marks:** Aim for **70+ Marks** (CS) and **68+ Marks** (DA).
  * **GATE Score:** 800+ Score (typically All India Rank < 200).
* **Other Older IITs (Kharagpur, Kanpur, Roorkee, Guwahati):**
  * **GATE Marks:** Aim for **60–68 Marks**.
  * **GATE Score:** 700+ Score (All India Rank < 600).
* **Newer IITs & Top NITs (NIT Trichy, Warangal, Surathkal):**
  * **GATE Marks:** Aim for **52–60 Marks**.
  * **GATE Score:** 600+ Score (All India Rank < 1500).

> 📈 **Historical cutoffs:** CS/DA general qualifying cutoff fluctuates between **25 to 30 marks** depending on the difficulty level of the paper. Qualifying alone gets you the MHRD stipend (₹12,400/month), but you need 60+ for top IIT admissions.`,

  negative_marking: `### 🧠 Demystifying GATE Negative Marking & Question Types

The GATE paper contains three distinct styles of questions, and your strategy must adapt to each:

#### 1. Multiple Choice Questions (MCQ)
* **Penalty:** **1/3rd deduction** of the allocated marks.
  * For 1-mark MCQ: -0.33 marks penalty.
  * For 2-mark MCQ: -0.67 marks penalty.
* **Strategy:** Absolute caution! Never guess unless you have successfully eliminated at least two options.

#### 2. Multiple Select Questions (MSQ)
* **Penalty:** **ZERO Negative Marking!**
* **Nature:** One or more choices can be correct. No partial marks are given (you must mark *all* correct options and *only* the correct options).
* **Strategy:** Since there is no negative marking, **always answer them**. Exercise extreme logical analysis, as MSQs test deep, microscopic concept mastery.

#### 3. Numerical Answer Type (NAT)
* **Penalty:** **ZERO Negative Marking!**
* **Nature:** Input a real number using the virtual floating keyboard (e.g., 2.5 or 64).
* **Strategy:** **Never leave an NAT blank!** Even if you aren't 100% sure, complete the calculation and input your answer. 

> 💡 **Advisor Tip:** Practice with our floating **Virtual GATE Calculator** (bottom right 🧮 icon) during your mock sessions to get comfortable with algebraic syntax.`,

  resources: `### 📚 Curated Master Textbooks & Resources for GATE CS & DA

To build core conceptual foundations, rely on these world-class reference books:

#### 💻 Core Computer Science (CS)
* **Discrete Mathematics:** Kenneth Rosen / NPTEL course by Prof. Kamala Krithivasan.
* **Algorithms & DSA:** "CLRS" (Introduction to Algorithms) / NPTEL Lectures by Prof. Naveen Garg.
* **Operating Systems:** Silberschatz, Galvin & Gagne ("Dinosaur Book").
* **Database Systems:** Korth, Sudarshan & Silberschatz.
* **Theory of Computation:** Peter Linz / Michael Sipser.

#### 🧮 Data Science & AI (DA)
* **Probability & Statistics:** Sheldon Ross / "Introduction to Probability" by Blitzstein & Hwang.
* **Linear Algebra:** Gilbert Strang (MIT OpenCourseWare Lectures are gold!).
* **Machine Learning:** "Introduction to Statistical Learning" (ISLR) / Stanford CS229 lecture notes by Andrew Ng.
* **Artificial Intelligence:** Stuart Russell & Peter Norvig ("Modern Approach").

> 🔗 *Note: We have mapped these topics directly to high-quality free video lectures under the **Syllabus Tracker** page! Feel free to refer to those links for instant access.*`,

  math_advice: `### 📐 Engineering Mathematics Study Blueprint

Mathematics is the ultimate differentiator in GATE. It accounts for **13-15% of the total weight** and underpins all core technical algorithms (especially in ML, AI, and Network routing).

* **Linear Algebra:** Focus heavily on eigenvalues, eigenvectors, matrix rank, LU decomposition, and systems of linear equations. SVD is extremely crucial for Data Science.
* **Probability:** Master Bayes' Theorem, PDF/CDF properties, conditional expectation, and standard distributions (Binomial, Poisson, Normal, Exponential).
* **Discrete Mathematics (For CS):** Propositional logic (tautologies, first-order logic), Set theory, Relation equivalence classes, and Graph Theory (connectivity, Euler paths, graph coloring).
* **Calculus & Optimization:** Limits, maxima/minima, and gradients/Hessians. For DA students, learn Gradient Descent formulas and Lagrange Multipliers deeply.

> 🛠️ **Action Plan:** Spend at least **2 hours every day** on math problems until your conceptual foundations are solid. Never skip steps, and verify calculations twice.`,

  study_strategy: `### 📅 3-Phase GATE Preparation Strategy

To optimize your study hours between now and February 2027, structure your timeline into these three focused blocks:

#### 🎯 Phase 1: Conceptual Foundations (May to October)
* Target coverage: 100% of syllabus topics.
* Study method: Watch NPTEL or recommended free lectures, take neat notes, and solve 10-15 topic questions immediately after studying a concept.
* Focus: High-weightage subjects first (Math, DSA, DBMS).

#### 🔄 Phase 2: Subject Tests & Short Notes (October to December)
* Target coverage: Subject-wise revision and formulation of concise formula sheets.
* Study method: Re-read your notes, compress them into 2-3 page "Micro-Cheat Sheets", and attempt subject-specific practice sets.
* Focus: Speed, accuracy, and plugging conceptual gaps.

#### 🏆 Phase 3: Full Mock Mastery & PYQs (December to Exam Day)
* Target coverage: Past 10-year GATE papers.
* Study method: Sit for 3-hour mock exams in a quiet room, evaluate using the answer keys, and perform a comprehensive post-mortem analysis on every wrong answer.
* Focus: Developing exam endurance, avoiding negative marking, and getting comfortable with the virtual calculator.`,

  default: `Hello! I am your dedicated GATE Strategic Advisor. 🎓

I can provide expert, data-backed insights on how to ace the GATE Computer Science (CS) and Data Science & AI (DA) exams.

Here is a quick advice checklist to get you started:
1. **Master the High-Weightage Core:** Math, General Aptitude, and DSA comprise over **45% of the entire paper**. Secure these first!
2. **Practice Active Recall:** Don't just read books. Attempt the mock assessments under the **Practice Simulator** tab, analyze solutions, and use flashcards to memorize formulas.
3. **Use the Virtual Calculator:** You won't be allowed a physical calculator in the exam hall. Make sure to use the floating scientific calculator (bottom-right 🧮 trigger) to calculate your practice values!

**What would you like to discuss?** Feel free to select any of the hot topics below, or ask your own question about negative marking, syllabus weightage, target scores, reference books, or study scheduling!`
};

const Advisor = () => {
  const { user } = useApp();
  
  // Persistent chat history in localStorage
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(`gate_chat_history_${user?.email || 'default'}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) return parsed;
      } catch (e) {
        // Fallback
      }
    }
    return [
      {
        id: 'welcome',
        sender: 'ai',
        text: ADVISOR_KNOWLEDGE.default,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Sync to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`gate_chat_history_${user?.email || 'default'}`, JSON.stringify(messages));
    }
  }, [messages, user]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: `msg-${messages.length + 1}-user`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputVal('');
    setIsTyping(true);

    // Simulate AI response delay for realism
    setTimeout(() => {
      let aiResponseText = '';
      const query = text.toLowerCase();

      // Simple keyword matching rules
      if (query.includes('weight') || query.includes('mark') && query.includes('subject') || query.includes('distribution')) {
        aiResponseText = ADVISOR_KNOWLEDGE.weightage;
      } else if (query.includes('time') || query.includes('manage') || query.includes('hours') && query.includes('exam')) {
        aiResponseText = ADVISOR_KNOWLEDGE.time_management;
      } else if (query.includes('score') || query.includes('target') || query.includes('iit') || query.includes('cut') || query.includes('rank')) {
        aiResponseText = ADVISOR_KNOWLEDGE.target_scores;
      } else if (query.includes('negative') || query.includes('mcq') || query.includes('msq') || query.includes('nat')) {
        aiResponseText = ADVISOR_KNOWLEDGE.negative_marking;
      } else if (query.includes('book') || query.includes('resource') || query.includes('textbook') || query.includes('standard')) {
        aiResponseText = ADVISOR_KNOWLEDGE.resources;
      } else if (query.includes('math') || query.includes('linear') || query.includes('probability') || query.includes('calculus')) {
        aiResponseText = ADVISOR_KNOWLEDGE.math_advice;
      } else if (query.includes('schedule') || query.includes('plan') || query.includes('strategy') || query.includes('prepare') || query.includes('phase')) {
        aiResponseText = ADVISOR_KNOWLEDGE.study_strategy;
      } else if (query.includes('calculator') || query.includes('calc')) {
        aiResponseText = `### 🧮 Practicing with the GATE Virtual Calculator

Excellent question! The GATE exam restricts students from carrying any physical calculators. Instead, you are provided an on-screen **Virtual Scientific Calculator** within the browser window.

#### Essential Practices:
1. **Never use your phone calculator** or standard pocket calculators during study sessions. It creates an unrealistic speed advantage that will backfire during the actual exam.
2. **Get familiar with the algebraic order of operations** in the official calculator. Unlike standard calculators, it evaluates trigonometric and logarithmic values by inputting the function *first* or *last* depending on standard guidelines (e.g. key in \`30\` then press \`sin\`).
3. **Practice using our floating calculator!** Click on the floating **🧮 icon** in the bottom-right corner of GATEPrep Nexus. It was custom built to mimic the official GATE calculator interface, helping you develop numerical typing muscle memory!

> ⚡ **Action Item:** When attempting the mock assessments in the **Practice Simulator**, keep the calculator open on the side and try evaluating expressions like logs, roots, and exponents directly inside it.`;
      } else if (query.includes('hi') || query.includes('hello') || query.includes('hey') || query.includes('greetings')) {
        aiResponseText = `Hello! Always wonderful to connect with a dedicated GATE aspirant. I'm ready to guide you.

What specific strategic insights or resources can I map out for you today? We can dive into **syllabus weightages, time management, negative marking strategies, target score boundaries, reference books,** or details about the **virtual calculator**!`;
      } else {
        // Fallback robust prep guide
        aiResponseText = `### 🚀 Expert Advisor Guidance Checklist

Thank you for your question! To help you achieve a high rank, here is my recommended strategy for approaching **${text}**:

1. **Split the Concept:** Break down this topic into foundational axioms, solved textbook examples, and past term paper applications.
2. **Solve PYQs first:** In GATE, the exact questions are rarely repeated, but the **underlying mathematical templates** are reused year after year. Focus on solving the last 10 years of GATE CS/DA questions.
3. **Draft Micro-Notes:** Write down any crucial formulas or exceptions in your **Formula Sheets Hub** for rapid recall.
4. **Build Endurance:** Practice active mock sessions regularly to build the stamina required to sit and focus continuously for 180 minutes.

*Would you like to explore deeper details on related topics? Select from the quick suggestions below or type another question!*`;
      }

      setMessages(prev => [...prev, {
        id: `msg-${Date.now()}-ai`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 900);
  };

  const handleClearHistory = () => {
    if (window.confirm("Clear all strategic advisor conversation logs?")) {
      setMessages([
        {
          id: 'welcome',
          sender: 'ai',
          text: ADVISOR_KNOWLEDGE.default,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      localStorage.removeItem(`gate_chat_history_${user?.email || 'default'}`);
    }
  };

  // Helper to render high-fidelity markdown-like paragraphs, headers, lists and blockquotes line-by-line
  const formatAdvisorText = (txt) => {
    if (!txt) return null;
    
    const lines = txt.split('\n');
    
    // Helper to parse inline bolding **text** inside any line
    const renderInlineStyles = (line) => {
      if (!line) return '';
      const parts = [];
      let currentIdx = 0;
      const regex = /\*\*(.*?)\*\*/g;
      let match;
      
      while ((match = regex.exec(line)) !== null) {
        if (match.index > currentIdx) {
          parts.push(line.substring(currentIdx, match.index));
        }
        parts.push(<strong key={match.index} style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{match[1]}</strong>);
        currentIdx = regex.lastIndex;
      }
      
      if (currentIdx < line.length) {
        parts.push(line.substring(currentIdx));
      }
      
      return parts.length > 0 ? parts : line;
    };
    
    let inBlockquote = false;
    let blockquoteLines = [];
    const elements = [];
    
    const flushBlockquote = (key) => {
      if (blockquoteLines.length > 0) {
        const quoteText = blockquoteLines.join('\n');
        const isDanger = quoteText.includes('⚠️') || quoteText.toLowerCase().includes('critical') || quoteText.toLowerCase().includes('warning');
        const isInfo = quoteText.includes('💡') || quoteText.toLowerCase().includes('tip') || quoteText.toLowerCase().includes('advisor');
        
        let borderColor = 'var(--accent-purple)';
        let bgColor = 'rgba(139, 92, 246, 0.03)';
        if (isDanger) {
          borderColor = 'var(--accent-rose)';
          bgColor = 'rgba(244, 63, 94, 0.04)';
        } else if (isInfo) {
          borderColor = 'var(--accent-emerald)';
          bgColor = 'rgba(16, 185, 129, 0.04)';
        }
        
        elements.push(
          <blockquote key={key} style={{
            padding: '14px 18px',
            borderLeft: `4px solid ${borderColor}`,
            backgroundColor: bgColor,
            borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
            fontSize: '0.88rem',
            lineHeight: 1.5,
            margin: '12px 0',
            color: 'var(--text-secondary)',
            whiteSpace: 'pre-wrap'
          }}>
            {renderInlineStyles(quoteText)}
          </blockquote>
        );
        blockquoteLines = [];
        inBlockquote = false;
      }
    };
    
    for (let i = 0; i < lines.length; i++) {
      const rawLine = lines[i];
      const trimmedLine = rawLine.trim();
      
      // Handle empty lines
      if (trimmedLine === '') {
        flushBlockquote(`quote-${i}`);
        elements.push(<div key={`space-${i}`} style={{ height: '8px' }} />);
        continue;
      }
      
      // Handle blockquotes
      if (trimmedLine.startsWith('> ')) {
        inBlockquote = true;
        blockquoteLines.push(trimmedLine.replace(/^>\s?/, ''));
        continue;
      } else if (inBlockquote) {
        // If we were in a blockquote but this line is not blockquote, flush it
        flushBlockquote(`quote-${i}`);
      }
      
      // Handle Headers
      if (trimmedLine.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${i}`} style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            margin: '18px 0 10px',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em'
          }}>
            {renderInlineStyles(trimmedLine.replace('### ', ''))}
          </h3>
        );
        continue;
      }
      
      if (trimmedLine.startsWith('#### ')) {
        elements.push(
          <h4 key={`h4-${i}`} style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            margin: '14px 0 8px',
            color: 'var(--accent-purple)',
            letterSpacing: '-0.01em'
          }}>
            {renderInlineStyles(trimmedLine.replace('#### ', ''))}
          </h4>
        );
        continue;
      }
      
      // Handle bullet list items (starts with * or -)
      const bulletMatch = trimmedLine.match(/^[* -]\s+(.*)$/);
      if (bulletMatch) {
        const indentLevel = rawLine.match(/^\s*/)[0].length;
        elements.push(
          <div key={`li-bullet-${i}`} style={{
            display: 'flex',
            gap: '8px',
            paddingLeft: `${16 + indentLevel * 4}px`,
            margin: '4px 0',
            fontSize: '0.9rem',
            lineHeight: 1.5,
            color: 'var(--text-secondary)'
          }}>
            <span style={{ color: 'var(--accent-purple)', flexShrink: 0 }}>•</span>
            <div style={{ flexGrow: 1 }}>{renderInlineStyles(bulletMatch[1])}</div>
          </div>
        );
        continue;
      }
      
      // Handle numbered list items (starts with 1., 2. etc.)
      const numberMatch = trimmedLine.match(/^(\d+)\.\s+(.*)$/);
      if (numberMatch) {
        const indentLevel = rawLine.match(/^\s*/)[0].length;
        elements.push(
          <div key={`li-num-${i}`} style={{
            display: 'flex',
            gap: '8px',
            paddingLeft: `${16 + indentLevel * 4}px`,
            margin: '4px 0',
            fontSize: '0.9rem',
            lineHeight: 1.5,
            color: 'var(--text-secondary)'
          }}>
            <span style={{ color: 'var(--accent-purple)', fontWeight: 700, flexShrink: 0 }}>{numberMatch[1]}.</span>
            <div style={{ flexGrow: 1 }}>{renderInlineStyles(numberMatch[2])}</div>
          </div>
        );
        continue;
      }
      
      // Default line rendering (regular paragraph)
      elements.push(
        <p key={`p-${i}`} style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          margin: '4px 0',
          whiteSpace: 'pre-wrap'
        }}>
          {renderInlineStyles(rawLine)}
        </p>
      );
    }
    
    // Flush any trailing blockquotes
    flushBlockquote('quote-end');
    
    return elements;
  };

  const SUGGESTIONS = [
    { label: '📊 Subject Weightages', query: 'What is the subject-wise weightage for GATE CS vs GATE DA?' },
    { label: '⏳ 3-Hour Exam Strategy', query: 'How should I manage my time during the actual 3-hour GATE exam?' },
    { label: '🎯 IIT Admission Targets', query: 'What is a safe target score for top IITs/IISc?' },
    { label: '🧠 Negative Marking Scheme', query: 'How do I handle negative marking in MSQs and NATs?' },
    { label: '📚 Standard Textbooks', query: 'What are the best resources and textbooks for GATE preparation?' }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '24px',
      height: 'calc(100vh - var(--header-height) - 60px)',
      maxHeight: '680px',
      minHeight: '420px'
    }} className="advisor-chat-layout">
      
      {/* Messaging Box container */}
      <div className="glass-panel" style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden'
      }}>
        
        {/* Chat header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.01)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-purple-glow)',
              border: '1px solid var(--accent-purple)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem'
            }}>
              🧙‍♂️
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800 }}>GATE Strategic Prep Advisor</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', color: 'var(--accent-emerald)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-emerald)' }} />
                <span>Online Expert Simulator</span>
              </div>
            </div>
          </div>

          <button 
            onClick={handleClearHistory}
            style={{
              fontSize: '0.75rem',
              color: 'var(--accent-rose)',
              cursor: 'pointer',
              fontWeight: 700,
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid rgba(244, 63, 94, 0.15)'
            }}
          >
            Clear History 🗑️
          </button>
        </div>

        {/* Scrollable messages zone */}
        <div style={{
          flexGrow: 1,
          padding: '24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          backgroundColor: 'rgba(0,0,0,0.1)'
        }}>
          {messages.map((msg) => (
            <div 
              key={msg.id}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: msg.sender === 'user' ? '70%' : '85%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                gap: '4px'
              }}
            >
              {/* Message Bubble */}
              <div className="glass-panel" style={{
                padding: '16px 20px',
                borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                backgroundColor: msg.sender === 'user' ? 'var(--accent-purple-glow)' : 'var(--bg-glass)',
                border: `1px solid ${msg.sender === 'user' ? 'var(--accent-purple)' : 'var(--border-color)'}`
              }}>
                {msg.sender === 'user' ? (
                  <p style={{ fontSize: '0.88rem', margin: 0, lineHeight: 1.4, color: 'var(--text-primary)' }}>
                    {msg.text}
                  </p>
                ) : (
                  <div>
                    {formatAdvisorText(msg.text)}
                  </div>
                )}
              </div>

              {/* Timestamp */}
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: '2px 4px' }}>
                {msg.timestamp}
              </span>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div style={{ alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div className="glass-panel" style={{ padding: '14px 20px', borderRadius: '20px 20px 20px 4px' }}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <div className="typing-dot" style={{ backgroundColor: 'var(--text-muted)' }} />
                  <div className="typing-dot" style={{ backgroundColor: 'var(--text-muted)', animationDelay: '0.2s' }} />
                  <div className="typing-dot" style={{ backgroundColor: 'var(--text-muted)', animationDelay: '0.4s' }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '8px' }}>Advisor is drafting a blueprint...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion buttons */}
        <div style={{
          padding: '14px 20px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          overflowX: 'auto',
          overflowY: 'hidden',
          backgroundColor: 'rgba(0,0,0,0.05)',
          whiteSpace: 'nowrap',
          scrollbarWidth: 'none',
          minHeight: '62px'
        }} className="no-scrollbar advisor-suggestions-container">
          {SUGGESTIONS.map((s) => (
            <button
              key={s.label}
              onClick={() => handleSendMessage(s.query)}
              style={{
                padding: '8px 14px',
                borderRadius: '16px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: 'var(--text-primary)',
                transition: 'all 0.15s ease',
                flexShrink: 0
              }}
              className="suggestion-btn"
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Chat input block */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputVal);
          }}
          style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            gap: '14px',
            backgroundColor: 'rgba(255,255,255,0.015)'
          }}
        >
          <input
            type="text"
            className="form-input"
            placeholder="Type your strategic query here (e.g. standard books, negative marking)..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isTyping}
            style={{ flexGrow: 1, height: '46px' }}
          />
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isTyping || !inputVal.trim()}
            style={{
              padding: '0 24px',
              height: '46px',
              fontSize: '0.85rem',
              whiteSpace: 'nowrap'
            }}
          >
            Ask Advisor 🚀
          </button>
        </form>

      </div>

      {/* Global CSS Styles for Animations */}
      <style>{`
        .suggestion-btn:hover {
          border-color: var(--accent-purple) !important;
          color: var(--text-primary) !important;
          background-color: var(--accent-purple-glow) !important;
        }

        .typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
          animation: typingDotBounce 1.2s infinite ease-in-out;
        }

        @keyframes typingDotBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

    </div>
  );
};

export default Advisor;
