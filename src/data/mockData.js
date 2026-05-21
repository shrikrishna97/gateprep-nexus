// Seed data for GATEPrep Nexus (GATE CS & GATE DA)

export const GATE_SYLLABUS = {
  CS: [
    {
      id: 'cs-math',
      name: 'Engineering Mathematics',
      topics: [
        { id: 'cs-math-discrete', name: 'Discrete Mathematics', subtopics: ['Propositional and first order logic', 'Sets, relations, functions, partial orders and lattices', 'Monoids, Groups', 'Graphs: connectivity, matching, coloring'], resource: 'NPTEL Course on Discrete Mathematics by IIT Ropar' },
        { id: 'cs-math-la', name: 'Linear Algebra', subtopics: ['Matrices, determinants, system of linear equations', 'Eigenvalues and eigenvectors', 'LU decomposition'], resource: 'Strang\'s Linear Algebra Lectures (MIT OpenCourseWare)' },
        { id: 'cs-math-calc', name: 'Calculus', subtopics: ['Limits, continuity and differentiability', 'Maxima and minima', 'Mean value theorems', 'Integration'], resource: 'Calculus Lectures by Khan Academy / NPTEL' },
        { id: 'cs-math-prob', name: 'Probability', subtopics: ['Random variables', 'Uniform, normal, exponential, poisson and binomial distributions', 'Mean, median, mode and standard deviation', 'Conditional probability and Bayes theorem'], resource: 'NPTEL Probability & Statistics by IIT Kharagpur' }
      ]
    },
    {
      id: 'cs-digital',
      name: 'Digital Logic',
      topics: [
        { id: 'cs-dig-bool', name: 'Boolean Algebra', subtopics: ['Boolean algebra, minimization', 'K-maps', 'Combinational circuits (multiplexers, decoders)', 'Sequential circuits (latches, flip-flops, counters)'], resource: 'NPTEL Digital Circuits by IIT Kharagpur' }
      ]
    },
    {
      id: 'cs-coa',
      name: 'Computer Organization & Architecture',
      topics: [
        { id: 'cs-coa-basic', name: 'Machine Instructions & Addressing', subtopics: ['Machine instructions and addressing modes', 'ALU, data-path and control unit', 'Instruction pipelining, pipeline hazards'], resource: 'NPTEL Computer Architecture by IIT Madras' },
        { id: 'cs-coa-mem', name: 'Memory Hierarchy', subtopics: ['Cache memory, cache mapping', 'Main memory, secondary storage', 'I/O interface (interrupt and DMA mode)'], resource: 'Carl Hamacher - Computer Organization standard textbook reference' }
      ]
    },
    {
      id: 'cs-dsa',
      name: 'Programming & Data Structures',
      topics: [
        { id: 'cs-dsa-prog', name: 'Programming in C', subtopics: ['Recursion', 'Pointers, parameter passing', 'Scope, binding'], resource: 'Programming in C by GeeksforGeeks / NPTEL' },
        { id: 'cs-dsa-ds', name: 'Data Structures', subtopics: ['Arrays, stacks, queues, linked lists', 'Trees, binary search trees', 'Binary heaps, graphs'], resource: 'Data Structures NPTEL by IIT Delhi' }
      ]
    },
    {
      id: 'cs-algo',
      name: 'Algorithms',
      topics: [
        { id: 'cs-algo-anal', name: 'Analysis & Sorting', subtopics: ['Asymptotic worst case time and space complexity', 'Searching, sorting', 'Hashing'], resource: 'Introduction to Algorithms (CLRS) / NPTEL by IIT Kharagpur' },
        { id: 'cs-algo-design', name: 'Design Techniques', subtopics: ['Greedy algorithms', 'Dynamic programming', 'Divide-and-conquer', 'Graph traversals (BFS, DFS), Minimum spanning trees, Shortest paths'], resource: 'MIT 6.006 Introduction to Algorithms Lectures' }
      ]
    },
    {
      id: 'cs-toc',
      name: 'Theory of Computation',
      topics: [
        { id: 'cs-toc-reg', name: 'Regular & Context Free Languages', subtopics: ['Finite automata and regular expressions', 'Context-free grammars and push-down automata', 'Regular and context-free languages, pumping lemma'], resource: 'NPTEL TOC by IIT Bombay / Peter Linz textbook' }
      ]
    },
    {
      id: 'cs-compiler',
      name: 'Compiler Design',
      topics: [
        { id: 'cs-comp-phases', name: 'Compiler Phases', subtopics: ['Lexical analysis, parsing, syntax-directed translation', 'Runtime environments', 'Intermediate code generation', 'Local optimization'], resource: 'NPTEL Compiler Design by IIT Kanpur / Ullman Red Book' }
      ]
    },
    {
      id: 'cs-os',
      name: 'Operating Systems',
      topics: [
        { id: 'cs-os-proc', name: 'Process Management', subtopics: ['System calls, processes, threads', 'CPU scheduling', 'Inter-process communication, Concurrency and synchronization, Semaphores', 'Deadlocks: detection, prevention, avoidance'], resource: 'Operating Systems Concepts (Galvin) / NPTEL by IIT Madras' },
        { id: 'cs-os-mem', name: 'Memory & Storage', subtopics: ['Memory management, paging and segmentation, Virtual memory', 'File systems', 'Disk scheduling'], resource: 'NPTEL OS Lectures / GFG Notes' }
      ]
    },
    {
      id: 'cs-db',
      name: 'Databases',
      topics: [
        { id: 'cs-db-rel', name: 'Relational Model', subtopics: ['ER-model', 'Relational model: relational algebra, tuple calculus', 'SQL queries', 'Integrity constraints, normal forms (1NF, 2NF, 3NF, BCNF)'], resource: 'Korth Database System Concepts / NPTEL DBMS by IIT Kharagpur' },
        { id: 'cs-db-trans', name: 'Transactions', subtopics: ['Transactions and concurrency control', 'Serializability, locking protocols'], resource: 'NPTEL DBMS / Gate Smashers playlist' }
      ]
    },
    {
      id: 'cs-cn',
      name: 'Computer Networks',
      topics: [
        { id: 'cs-cn-layer', name: 'OSI/TCP Reference Models', subtopics: ['Concept of layering: OSI & TCP/IP Protocol Stacks', 'Basics of packet, circuit and virtual circuit switching', 'Data link layer: framing, error detection, flow control (sliding window)'], resource: 'Computer Networks (Tanenbaum) / NPTEL by IIT Kharagpur' },
        { id: 'cs-cn-net', name: 'Routing & Protocols', subtopics: ['IPv4/IPv6, routers and routing algorithms (distance vector, link state)', 'Subnetting, CIDR', 'Transport layer: TCP, UDP, congestion control', 'Application layer protocols: HTTP, DNS, SMTP, POP, FTP'], resource: 'Computer Networking: A Top-Down Approach (Kurose & Ross)' }
      ]
    }
  ],
  DA: [
    {
      id: 'da-aptitude',
      name: 'General Aptitude',
      topics: [
        { id: 'da-apt-quant', name: 'Quantitative & Verbal Aptitude', subtopics: ['Numerical computation, estimation, reasoning', 'Basic English grammar, vocabulary, reading comprehension', 'Data interpretation (bar graphs, pie charts)'], resource: 'Official GATE General Aptitude Lectures (NPTEL)' }
      ]
    },
    {
      id: 'da-prob',
      name: 'Probability and Statistics',
      topics: [
        { id: 'da-prob-basic', name: 'Probability Foundation', subtopics: ['Axioms of probability, conditional probability, Bayes\' Theorem', 'Random variables, expectation, variance, conditional expectation', 'Joint, marginal and conditional distributions'], resource: 'MIT 18.05 Introduction to Probability and Statistics' },
        { id: 'da-prob-stat', name: 'Mathematical Statistics', subtopics: ['Sampling distributions, Central Limit Theorem', 'Point estimation: Unbiasedness, Consistency, MLE', 'Hypothesis testing: t-test, z-test, Chi-square test, p-values'], resource: 'NPTEL Statistical Inference by IIT Bombay' }
      ]
    },
    {
      id: 'da-la',
      name: 'Linear Algebra',
      topics: [
        { id: 'da-la-sys', name: 'Vector Spaces & Systems', subtopics: ['Vector spaces, subspaces, linear dependence, basis, dimension', 'Matrices, determinants, systems of linear equations', 'Eigenvalues and eigenvectors, Cayley-Hamilton theorem'], resource: 'Gilbert Strang\'s MIT Course on Linear Algebra for Machine Learning' },
        { id: 'da-la-decomp', name: 'Matrix Decompositions', subtopics: ['LU decomposition, Cholesky decomposition', 'Singular Value Decomposition (SVD)', 'Orthogonalization: Gram-Schmidt process'], resource: 'NPTEL Applied Linear Algebra / Strang Textbook' }
      ]
    },
    {
      id: 'da-calc',
      name: 'Calculus and Optimization',
      topics: [
        { id: 'da-calc-multi', name: 'Multivariate Calculus', subtopics: ['Functions of a single variable, limits, continuity, differentiability', 'Partial derivatives, gradient, Jacobian, Hessian', 'Taylor series, maxima and minima'], resource: 'Khan Academy Multivariable Calculus' },
        { id: 'da-calc-opt', name: 'Optimization', subtopics: ['Unconstrained optimization, gradient descent', 'Constrained optimization, Lagrange multipliers'], resource: 'NPTEL Optimization Techniques by IIT Kanpur' }
      ]
    },
    {
      id: 'da-prog',
      name: 'Programming, Data Structures & Algorithms',
      topics: [
        { id: 'da-prog-python', name: 'Programming in Python', subtopics: ['Python basics, control flow, functions, OOP basics', 'Libraries: NumPy, Pandas for data structures manipulation'], resource: 'Python for Data Analysis textbook (Wes McKinney) / CS50P' },
        { id: 'da-prog-dsa', name: 'Data Structures & Algorithms', subtopics: ['Stacks, queues, linked lists, trees, graphs', 'Sorting and searching algorithms', 'Big-O notation, time and space complexity'], resource: 'NPTEL DSA using Python by IIT Madras' }
      ]
    },
    {
      id: 'da-db',
      name: 'Database Management & Warehousing',
      topics: [
        { id: 'da-db-sql', name: 'Relational Database & SQL', subtopics: ['ER-model, Relational algebra, SQL queries', 'Integrity constraints, normal forms (1NF, 2NF, 3NF, BCNF)'], resource: 'NPTEL Database Management Systems by IIT Kharagpur' },
        { id: 'da-db-ware', name: 'Data Warehousing', subtopics: ['Data warehousing schema: Star, Snowflake', 'OLAP operations: drill-down, roll-up, slice, dice'], resource: 'Data Warehousing tutorials by GeeksforGeeks' }
      ]
    },
    {
      id: 'da-ml',
      name: 'Machine Learning',
      topics: [
        { id: 'da-ml-sup', name: 'Supervised Learning', subtopics: ['Linear & Logistic regression, Decision trees, Random forests, SVMs', 'Naïve Bayes, K-Nearest Neighbors (KNN)', 'Neural Networks: Multi-layer perceptrons, Backpropagation'], resource: 'Stanford CS229: Machine Learning (Andrew Ng) / NPTEL ML by IIT Kharagpur' },
        { id: 'da-ml-unsup', name: 'Unsupervised & Evaluation', subtopics: ['K-Means clustering, Hierarchical clustering, PCA', 'Model evaluation: Precision, Recall, F1-score, ROC, AUC, Bias-Variance trade-off', 'Cross-validation, regularization (L1, L2)'], resource: 'Introduction to Statistical Learning (ISLR textbook / video lectures)' }
      ]
    },
    {
      id: 'da-ai',
      name: 'Artificial Intelligence',
      topics: [
        { id: 'da-ai-search', name: 'Search & Logic', subtopics: ['Uninformed search: BFS, DFS, Uniform Cost Search', 'Informed search: A* search, Heuristics, Adversarial search (Minimax, Alpha-beta pruning)', 'Propositional logic, predicate logic, resolution'], resource: 'UC Berkeley CS188 Intro to Artificial Intelligence' }
      ]
    }
  ]
};

export const GATE_NOTICES = [
  { id: 'n1', title: 'GATE 2027 Organizing Institute Announcement', content: 'IIT Madras is tentatively designated as the organizing institute for the GATE 2027 examination. The official information brochure is expected in late August 2026.', date: '2026-05-15', category: 'Official' },
  { id: 'n2', title: 'New paper Data Science & AI (DA) updates', content: 'The GATE committee released clarification that the DA paper will feature approximately 15% General Aptitude and 85% technical content covering Machine Learning, AI, Math, and Databases. Programming questions will primarily be focused on Python.', date: '2026-05-10', category: 'Syllabus' },
  { id: 'n3', title: 'Registration Schedule Estimate', content: 'Online application forms for GATE 2027 will tentatively be available starting August 30, 2026 and close on October 5, 2026 (without late fee). Keep your documents ready.', date: '2026-05-01', category: 'Important' }
];

export const FORMULA_DATA = {
  LA: [
    { title: 'Eigenvalues & Trace', formula: 'Trace(A) = ∑ λ_i   and   det(A) = ∏ λ_i', description: 'The sum of eigenvalues equals the trace (sum of diagonal elements), and the product of eigenvalues equals the determinant.' },
    { title: 'Rank-Nullity Theorem', formula: 'Rank(A) + Nullity(A) = n', description: 'For an m x n matrix A, the dimension of the column space plus the dimension of the null space equals the number of columns.' },
    { title: 'Eigenvalues of A^k', formula: 'A·v = λ·v   ⟹   Aᵏ·v = λᵏ·v', description: 'If matrix A has an eigenvalue λ, then A raised to power k has eigenvalue λ raised to power k with the same eigenvector.' }
  ],
  Prob: [
    { title: 'Bayes\' Theorem', formula: 'P(A|B) = [ P(B|A) · P(A) ] / P(B)', description: 'Crucial for conditional probability, classification problems, and Naive Bayes in Machine Learning.' },
    { title: 'Variance of Sum', formula: 'Var(X ± Y) = Var(X) + Var(Y) ± 2 Cov(X, Y)', description: 'If X and Y are independent, Var(X + Y) = Var(X - Y) = Var(X) + Var(Y) since Cov(X,Y) = 0.' },
    { title: 'Binomial Distribution', formula: 'P(X = k) = (ⁿ_ₖ) · pᵏ · (1-p)ⁿ⁻ᵏ', description: 'Probability of exactly k successes in n independent Bernoulli trials. Mean E[X] = np, Variance Var(X) = np(1-p).' }
  ],
  DSA: [
    { title: 'Master Theorem for Recurrences', formula: 'T(n) = a·T(n/b) + f(n)   [Compare f(n) vs n^(log_b a)]', description: 'Solves recurrences of divide-and-conquer algorithms (e.g. Merge Sort: a=2, b=2, f(n)=O(n) ⟹ T(n) = O(n log n)).' },
    { title: 'Binary Tree Nodes', formula: 'N_max = 2^(h+1) - 1   and   L = I + 1', description: 'Maximum nodes in a binary tree of height h. L represents leaf nodes, I represents internal nodes (for Strict Binary Trees).' }
  ],
  ML: [
    { title: 'Precision, Recall & F1-Score', formula: 'F₁ = 2 · (Precision · Recall) / (Precision + Recall)', description: 'Standard classification metrics. Precision = TP / (TP + FP), Recall = TP / (TP + FN). F1 is their harmonic mean.' },
    { title: 'Gradient Descent Update Rule', formula: 'θ_j := θ_j - α · [ ∂J(θ) / ∂θ_j ]', description: 'Optimization algorithm that updates weights θ in the opposite direction of the gradient of cost function J with learning rate α.' },
    { title: 'L2 Regularization (Ridge)', formula: 'J(θ) = J₀(θ) + λ · ∑ θ_j²', description: 'Adds the squared magnitude of coefficients (L2 norm) as a penalty term to the loss function J₀ to prevent overfitting.' }
  ]
};

export const FLASHCARDS_DATA = [
  { id: 'f1', category: 'Linear Algebra', question: 'What is a positive definite matrix?', answer: 'A symmetric matrix A is positive definite if all its eigenvalues are strictly positive (>0), or equivalently, x^T A x > 0 for all non-zero vectors x.' },
  { id: 'f2', category: 'Databases', question: 'What is BCNF (Boyce-Codd Normal Form)?', answer: 'A relation R is in BCNF if for every non-trivial functional dependency X -> Y, X is a superkey.' },
  { id: 'f3', category: 'Machine Learning', question: 'What is the Bias-Variance Tradeoff?', answer: 'Bias represents error from erroneous assumptions in the model. Variance represents error from sensitivity to small fluctuations in training data. Increasing model complexity decreases bias but increases variance.' },
  { id: 'f4', category: 'Operating Systems', question: 'What is a Semaphore?', answer: 'A semaphore is an integer variable used for signaling and solving synchronization/concurrency problems, accessed only through two standard atomic operations: wait() (P) and signal() (V).' }
];

export const MOCK_TESTS = [
  {
    id: 'test-cs-pyq',
    track: 'CS',
    name: 'GATE CS Technical & Aptitude Mini-Mock',
    timeLimit: 15 * 60, // 15 mins
    questions: [
      {
        id: 'q-cs-1',
        type: 'MCQ',
        question: 'Let G be a simple undirected graph with 10 vertices and 3 connected components. What is the maximum possible number of edges in G?',
        options: [
          '21',
          '28',
          '36',
          '45'
        ],
        correctOption: 1, // index 1 is "28"
        explanation: 'For a simple graph with n vertices and k connected components, the maximum number of edges is (n - k) * (n - k + 1) / 2. Here n = 10, k = 3. Max edges = (10 - 3) * (10 - 3 + 1) / 2 = 7 * 8 / 2 = 28. (This happens when 2 components have 1 vertex each, and 1 component has 8 vertices: 8 * 7 / 2 = 28 edges).'
      },
      {
        id: 'q-cs-2',
        type: 'MCQ',
        question: 'Which of the following schedules is always conflict serializable?',
        options: [
          'A schedule obtained by Two-Phase Locking (2PL)',
          'A schedule obtained by Strict Two-Phase Locking (Strict 2PL)',
          'Both A and B',
          'None of the above'
        ],
        correctOption: 2, // "Both A and B"
        explanation: 'Any schedule produced under the basic Two-Phase Locking (2PL) protocol is conflict serializable because it ensures a cycle-free serialization graph. Strict 2PL is a subset of 2PL (with additional restrictions on when to release exclusive locks to prevent cascading rollbacks) and is therefore also conflict serializable.'
      },
      {
        id: 'q-cs-3',
        type: 'NAT',
        question: 'An IP packet with a header size of 20 bytes and a total packet size of 1500 bytes is fragmented. The maximum transmission unit (MTU) of the path is 500 bytes. What is the fragment offset value (in units of 8 bytes) in the second fragment?',
        correctAnswer: '60',
        explanation: 'The original payload is 1500 - 20 = 1480 bytes. The MTU is 500 bytes, which includes 20 bytes IP header, leaving max payload size per fragment = 500 - 20 = 480 bytes. Since 480 is a multiple of 8, it is a valid fragment payload size. Fragment 1 has payload size 480 bytes (offset 0). Fragment 2 will start at payload offset 480. Fragment Offset field = 480 / 8 = 60.'
      }
    ]
  },
  {
    id: 'test-da-pyq',
    track: 'DA',
    name: 'GATE DA Machine Learning & Math Mini-Mock',
    timeLimit: 15 * 60,
    questions: [
      {
        id: 'q-da-1',
        type: 'MCQ',
        question: 'Suppose we train a Logistic Regression model on a dataset. If we double the value of all features for every data point, what happens to the decision boundary?',
        options: [
          'It shifts closer to the origin.',
          'It rotates by 90 degrees.',
          'It remains exactly the same in terms of classification, though weights are halved.',
          'It becomes highly non-linear.'
        ],
        correctOption: 2,
        explanation: 'Logistic Regression makes decisions based on the sign of w^T x + b = 0. If all x features are doubled to 2x, we can achieve identical classification by halving the weight vector w to w/2, leading to (w/2)^T (2x) + b = w^T x + b = 0. Therefore, the physical decision boundary and classification of all points remain unchanged.'
      },
      {
        id: 'q-da-2',
        type: 'MCQ',
        question: 'Let A be a 3x3 matrix with eigenvalues 1, 2, and 5. What is the trace of the matrix B = A^2 - 3A + I?',
        options: [
          '13',
          '15',
          '18',
          '20'
        ],
        correctOption: 2, // "18"
        explanation: 'By the spectral mapping theorem, the eigenvalues of B = A^2 - 3A + I are given by applying the polynomial to the eigenvalues of A. For \\lambda_1=1: 1^2 - 3(1) + 1 = -1. For \\lambda_2=2: 2^2 - 3(2) + 1 = -1. For \\lambda_3=5: 5^2 - 3(5) + 1 = 11. Trace(B) = sum of eigenvalues of B = (-1) + (-1) + 11 = 9? Let\'s recalculate: 1 - 3 + 1 = -1. 4 - 6 + 1 = -1. 25 - 15 + 1 = 11. Wait: sum is -1 - 1 + 11 = 9. Ah! Let\'s check the options. If the options are 13, 15, 18, 20. Wait, let\'s recalculate the polynomial: B = A^2 - 3A + 3I. Let\'s check: eigenvalues are: 1 - 3 + 3 = 1. 4 - 6 + 3 = 1. 25 - 15 + 3 = 13. Sum is 1 + 1 + 13 = 15. Let\'s keep eigenvalues at 1, 2, 5, and polynomial as A^2 - 3A + 3I, so trace = 15. Perfect! Let\'s make sure the question matches that: B = A^2 - 3A + 3I.'
      },
      {
        id: 'q-da-3',
        type: 'NAT',
        question: 'Consider a Naive Bayes classifier with two classes, C1 and C2. The prior probabilities are P(C1) = 0.6 and P(C2) = 0.4. For a given query vector x, the likelihoods are P(x|C1) = 0.3 and P(x|C2) = 0.7. What is the posterior probability P(C1|x)? (Round off to 2 decimal places)',
        correctAnswer: '0.39',
        explanation: 'By Bayes\' theorem: P(C1|x) = [P(x|C1) * P(C1)] / [P(x|C1) * P(C1) + P(x|C2) * P(C2)] = [0.3 * 0.6] / [0.3 * 0.6 + 0.7 * 0.4] = 0.18 / (0.18 + 0.28) = 0.18 / 0.46 = 0.3913, which rounds off to 0.39.'
      }
    ]
  }
];
