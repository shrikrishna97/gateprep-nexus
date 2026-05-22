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
    { title: 'Eigenvalues & Trace', formula: '\\\\( \\\\text{Trace}(A) = \\\\sum \\\\lambda_i \\\\quad \\\\text{and} \\\\quad \\\\text{det}(A) = \\\\prod \\\\lambda_i \\\\)', description: 'The sum of eigenvalues equals the trace (sum of diagonal elements), and the product of eigenvalues equals the determinant.' },
    { title: 'Rank-Nullity Theorem', formula: '\\\\( \\\\text{Rank}(A) + \\\\text{Nullity}(A) = n \\\\)', description: 'For an m x n matrix A, the dimension of the column space plus the dimension of the null space equals the number of columns.' },
    { title: 'Eigenvalues of A^k', formula: '\\\\( A \\\\cdot v = \\\\lambda \\\\cdot v \\\\implies A^k \\\\cdot v = \\\\lambda^k \\\\cdot v \\\\)', description: 'If matrix A has an eigenvalue λ, then A raised to power k has eigenvalue λ raised to power k with the same eigenvector.' }
  ],
  Prob: [
    { title: 'Bayes\' Theorem', formula: '\\\\( P(A|B) = \\\\frac{P(B|A) \\\\cdot P(A)}{P(B)} \\\\)', description: 'Crucial for conditional probability, classification problems, and Naive Bayes in Machine Learning.' },
    { title: 'Variance of Sum', formula: '\\\\( \\\\text{Var}(X \\\\pm Y) = \\\\text{Var}(X) + \\\\text{Var}(Y) \\\\pm 2\\\\text{Cov}(X, Y) \\\\)', description: 'If X and Y are independent, Var(X + Y) = Var(X - Y) = Var(X) + Var(Y) since Cov(X,Y) = 0.' },
    { title: 'Binomial Distribution', formula: '\\\\( P(X = k) = \\\\binom{n}{k} p^k (1-p)^{n-k} \\\\)', description: 'Probability of exactly k successes in n independent Bernoulli trials. Mean E[X] = np, Variance Var(X) = np(1-p).' }
  ],
  DSA: [
    { title: 'Master Theorem for Recurrences', formula: '\\\\( T(n) = a \\\\cdot T\\\\left(\\\\frac{n}{b}\\\\right) + f(n) \\\\quad [\\\\text{Compare } f(n) \\\\text{ vs } n^{\\\\log_b a}] \\\\)', description: 'Solves recurrences of divide-and-conquer algorithms (e.g. Merge Sort: a=2, b=2, f(n)=O(n) ➔ T(n) = O(n log n)).' },
    { title: 'Binary Tree Nodes', formula: '\\\\( N_{\\\\text{max}} = 2^{h+1} - 1 \\\\quad \\\\text{and} \\\\quad L = I + 1 \\\\)', description: 'Maximum nodes in a binary tree of height h. L represents leaf nodes, I represents internal nodes (for Strict Binary Trees).' }
  ],
  ML: [
    { title: 'Precision, Recall & F1-Score', formula: '\\\\( F_1 = 2 \\\\cdot \\\\frac{\\\\text{Precision} \\\\cdot \\\\text{Recall}}{\\\\text{Precision} + \\\\text{Recall}} \\\\)', description: 'Standard classification metrics. Precision = TP / (TP + FP), Recall = TP / (TP + FN). F1 is their harmonic mean.' },
    { title: 'Gradient Descent Update Rule', formula: '\\\\( \\\\theta_j := \\\\theta_j - \\\\alpha \\\\cdot \\\\frac{\\\\partial J(\\\\theta)}{\\\\partial \\\\theta_j} \\\\)', description: 'Optimization algorithm that updates weights θ in the opposite direction of the gradient of cost function J with learning rate α.' },
    { title: 'L2 Regularization (Ridge)', formula: '\\\\( J(\\\\theta) = J_0(\\\\theta) + \\\\lambda \\\\sum \\\\theta_j^2 \\\\)', description: 'Adds the squared magnitude of coefficients (L2 norm) as a penalty term to the loss function J₀ to prevent overfitting.' }
  ]
};

export const FLASHCARDS_DATA = [
  { id: 'f1', category: 'Linear Algebra', question: 'What is a positive definite matrix?', answer: 'A symmetric matrix \\\\( A \\\\) is positive definite if all its eigenvalues are strictly positive (\\\\( \\\\lambda_i > 0 \\\\)), or equivalently, \\\\( x^T A x > 0 \\\\) for all non-zero vectors \\\\( x \\\\).' },
  { id: 'f2', category: 'Databases', question: 'What is BCNF (Boyce-Codd Normal Form)?', answer: 'A relation \\\\( R \\\\) is in BCNF if for every non-trivial functional dependency \\\\( X \\\\rightarrow Y \\\\), \\\\( X \\\\) is a superkey.' },
  { id: 'f3', category: 'Machine Learning', question: 'What is the Bias-Variance Tradeoff?', answer: 'Bias represents error from erroneous assumptions in the model. Variance represents error from sensitivity to small fluctuations in training data. Increasing model complexity decreases bias (\\\\( \\\\text{bias} \\\\)) but increases variance (\\\\( \\\\text{variance} \\\\)).' },
  { id: 'f4', category: 'Operating Systems', question: 'What is a Semaphore?', answer: 'A semaphore is an integer variable used for signaling and solving synchronization/concurrency problems, accessed only through two standard atomic operations: \\\\( \\\\text{wait}() \\\\) (\\\\( P \\\\)) and \\\\( \\\\text{signal}() \\\\) (\\\\( V \\\\)).' }
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
        question: 'Let \\\\( G \\\\) be a simple undirected graph with 10 vertices and 3 connected components. What is the maximum possible number of edges in \\\\( G \\\\)?',
        options: [
          '21',
          '28',
          '36',
          '45'
        ],
        correctOption: 1, // index 1 is "28"
        explanation: 'For a simple graph with \\\\( n \\\\) vertices and \\\\( k \\\\) connected components, the maximum number of edges is \\\\( \\\\frac{(n - k)(n - k + 1)}{2} \\\\). Here, \\\\( n = 10 \\\\) and \\\\( k = 3 \\\\). Therefore, the maximum possible number of edges is \\\\( \\\\frac{(10 - 3)(10 - 3 + 1)}{2} = \\\\frac{7 \\\\times 8}{2} = 28 \\\\). This maximum is achieved when \\\\( 2 \\\\) components are isolated vertices (1 vertex each, 0 edges) and \\\\( 1 \\\\) component is a complete graph \\\\( K_8 \\\\) with \\\\( \\\\frac{8 \\\\times 7}{2} = 28 \\\\) edges.'
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
        explanation: 'The original payload is \\\\( 1500 - 20 = 1480 \\\\) bytes. The MTU is \\\\( 500 \\\\) bytes, which includes a \\\\( 20 \\\\)-byte IP header, leaving the maximum payload size per fragment as \\\\( 500 - 20 = 480 \\\\) bytes. Since \\\\( 480 \\\\) is a multiple of \\\\( 8 \\\\), it is a valid fragment payload size. Fragment 1 has payload size \\\\( 480 \\\\) bytes (offset \\\\( 0 \\\\)). Fragment 2 will start at payload offset \\\\( 480 \\\\). Therefore, the Fragment Offset field value in the second fragment is \\\\( \\\\frac{480}{8} = 60 \\\\).'
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
        explanation: 'Logistic Regression makes decisions based on the sign of \\\\( w^T x + b = 0 \\\\). If all feature vectors \\\\( x \\\\) are doubled to \\\\( 2x \\\\), we can achieve identical classification by halving the weight vector \\\\( w \\\\) to \\\\( \\\\frac{w}{2} \\\\), leading to \\\\( \\\\left(\\\\frac{w}{2}\\\\right)^T (2x) + b = w^T x + b = 0 \\\\). Therefore, the physical decision boundary and classification of all points remain completely unchanged.'
      },
      {
        id: 'q-da-2',
        type: 'MCQ',
        question: 'Let \\\\( A \\\\) be a \\\\( 3 \\\\times 3 \\\\) matrix with eigenvalues \\\\( 1 \\\\), \\\\( 2 \\\\), and \\\\( 5 \\\\). What is the trace of the matrix \\\\( B = A^2 - 3A + 4I \\\\)?',
        options: [
          '13',
          '15',
          '18',
          '20'
        ],
        correctOption: 2, // "18"
        explanation: 'By the spectral mapping theorem, the eigenvalues of the matrix \\\\( B = A^2 - 3A + 4I \\\\) are given by applying the polynomial function to the eigenvalues of \\\\( A \\\\) (which are \\\\( \\\\lambda_1=1 \\\\), \\\\( \\\\lambda_2=2 \\\\), and \\\\( \\\\lambda_3=5 \\\\)).<br /><br />• For \\\\( \\\\lambda_1=1 \\\\): The corresponding eigenvalue of \\\\( B \\\\) is \\\\( 1^2 - 3(1) + 4 = 2 \\\\).<br />• For \\\\( \\\\lambda_2=2 \\\\): The corresponding eigenvalue of \\\\( B \\\\) is \\\\( 2^2 - 3(2) + 4 = 2 \\\\).<br />• For \\\\( \\\\lambda_3=5 \\\\): The corresponding eigenvalue of \\\\( B \\\\) is \\\\( 5^2 - 3(5) + 4 = 14 \\\\).<br /><br />Since the trace of a matrix is equal to the sum of its eigenvalues, we have:<br />\\\\( \\\\text{Trace}(B) = 2 + 2 + 14 = 18 \\\\).'
      },
      {
        id: 'q-da-3',
        type: 'NAT',
        question: 'Consider a Naive Bayes classifier with two classes, \\\\( C_1 \\\\) and \\\\( C_2 \\\\). The prior probabilities are \\\\( P(C_1) = 0.6 \\\\) and \\\\( P(C_2) = 0.4 \\\\). For a given query vector \\\\( x \\\\), the likelihoods are \\\\( P(x|C_1) = 0.3 \\\\) and \\\\( P(x|C_2) = 0.7 \\\\). What is the posterior probability \\\\( P(C_1|x) \\\\)? (Round off to 2 decimal places)',
        correctAnswer: '0.39',
        explanation: `By Bayes' theorem:<br />\\\\( P(C_1|x) = \\\\frac{P(x|C_1) P(C_1)}{P(x|C_1) P(C_1) + P(x|C_2) P(C_2)} \\\\)<br /><br />Substituting the given values:<br />\\\\( P(C_1|x) = \\\\frac{0.3 \\\\times 0.6}{0.3 \\\\times 0.6 + 0.7 \\\\times 0.4} = \\\\frac{0.18}{0.18 + 0.28} = \\\\frac{0.18}{0.46} \\\\approx 0.3913 \\\\)<br /><br />Rounding off to 2 decimal places, we get \\\\( 0.39 \\\\).`
      }
    ]
  }
];

// Offline fallback seed questions from IITM GATE-DA Question Bank
export const IITM_QBANK_OFFLINE_SEED = [
  {
    title: 'Question 1',
    questionHtml: `<p>Is the following statement true or false?</p><p class="my-2 p-3 bg-white/5 border border-white/10 rounded-lg font-semibold text-purple-300">The row echelon form is defined only for square matrices.</p>`,
    questionText: 'Is the following statement true or false? The row echelon form is defined only for square matrices.',
    options: ['True', 'False'],
    type: 'MCQ',
    correctIdxs: [1],
    correctIdx: 1,
    natAnswer: '',
    solutionHtml: `<p>The row echelon form is defined for matrices of any shape (rectangular or square). For example, a 3 × 5 matrix can easily be brought to row echelon form via Gaussian elimination. Thus, the statement is <strong>False</strong>.</p>`,
    hintHtml: `<p>Consider the Gaussian elimination process. Does it restrict matrices to square dimensions before performing row operations?</p>`,
    categories: ['linear_algebra'],
    relativePath: 'linear_algebra/bank/question-001.html',
    subject: 'linear_algebra'
  },
  {
    title: 'Question 2',
    questionHtml: `<p>What is the maximum rank that a 4 × 8 matrix can have?</p>`,
    questionText: 'What is the maximum rank that a 4 x 8 matrix can have?',
    options: [],
    type: 'NAT',
    correctIdxs: [],
    correctIdx: null,
    natAnswer: '4',
    solutionHtml: `<p>The row rank is always equal to the column rank for any matrix.</p>
<ul class="list-disc pl-5 my-2 space-y-1">
  <li>The row rank is the dimension of the row space, which can be at most <i>m</i> = 4.</li>
  <li>The column rank is the dimension of the column space, which can be at most <i>n</i> = 8.</li>
</ul>
<p>Therefore, the rank of an <i>m × n</i> matrix is at most <strong>min(m, n)</strong>. In this case, <code>min(4, 8) = 4</code>.</p>`,
    hintHtml: `<p>Recall that the rank of a matrix A is bounded by the minimum of its dimensions: rank(A) ≤ min(m, n).</p>`,
    categories: ['linear_algebra'],
    relativePath: 'linear_algebra/bank/question-002.html',
    subject: 'linear_algebra'
  },
  {
    title: 'Question 1',
    questionHtml: `<p>Let <b>w</b> = [1, 2, 3]ᵀ be the weight vector of a linear classifier for a binary classification problem whose labels lie in the set {0, 1}. If the bias of the classifier is set to 0, which of the following is the equation of the decision boundary for this classifier?</p>`,
    questionText: 'w = [1, 2, 3]^T is the weight vector of a linear classifier for a binary classification problem whose labels lie in the set {0, 1}. If the bias of the classifier is set to 0, which of the following is the equation of the decision boundary for this classifier?',
    options: [
      'x₁ + 2x₂ + 3x₃ = 1',
      'x₁ + 2x₂ + 3x₃ = -1',
      'x₁ + 2x₂ + 3x₃ = 0',
      'x₁ - 2x₂ + 3x₃ = 0'
    ],
    type: 'MCQ',
    correctIdxs: [2],
    correctIdx: 2,
    natAnswer: '',
    solutionHtml: `<p>The decision boundary for a linear classifier is given by the equation:</p>
<p class="font-mono text-emerald-400 p-2 text-center bg-black/30 rounded my-2">wᵀ x + b = 0</p>
<p>Since the bias <i>b = 0</i>, this simplifies to:</p>
<p class="font-mono text-emerald-400 p-2 text-center bg-black/30 rounded my-2">wᵀ x = 0</p>
<p>Taking the dot product of <b>w</b> and <b>x</b> = [x₁, x₂, x₃]ᵀ:</p>
<p class="font-mono text-emerald-400 p-2 text-center bg-black/30 rounded my-2">1·x₁ + 2·x₂ + 3·x₃ = 0</p>
<p>Therefore, the correct equation is <strong>x₁ + 2x₂ + 3x₃ = 0</strong>.</p>`,
    hintHtml: `<p>A linear decision boundary separates the space based on where the score function wᵀx + b evaluates to exactly zero.</p>`,
    categories: ['machine_learning'],
    relativePath: 'machine_learning/bank/question-001.html',
    subject: 'machine_learning'
  },
  {
    title: 'Question 2',
    questionHtml: `<p>Which of the following classifiers produce a linear decision boundary in the feature space?</p>`,
    questionText: 'Which of the following classifiers produce a linear decision boundary in the feature space?',
    options: [
      'Perceptron',
      'Logistic regression',
      'Kernel SVM with Gaussian kernel',
      'A neural network with two hidden layers that has ReLU activations in the hidden layers'
    ],
    type: 'MSQ',
    correctIdxs: [0, 1],
    correctIdx: 0,
    natAnswer: '',
    solutionHtml: `<p>Let's evaluate each option:</p>
<ul class="list-disc pl-5 my-2 space-y-2">
  <li><strong>Perceptron:</strong> Uses a linear combination of inputs (wᵀx + b) passed through a step function. Renders a strictly linear decision boundary.</li>
  <li><strong>Logistic Regression:</strong> Models the log-odds as a linear combination (wᵀx + b). The decision boundary (probability = 0.5) corresponds to wᵀx + b = 0, which is strictly linear.</li>
  <li><strong>Kernel SVM (Gaussian RBF Kernel):</strong> Projects features into an infinite-dimensional space, yielding complex, non-linear boundaries in the original feature space.</li>
  <li><strong>Neural Network with ReLU:</strong> Renders a highly non-linear, piece-wise linear decision boundary due to multiple layers of activations.</li>
</ul>
<p>Thus, the correct options are <strong>Perceptron</strong> and <strong>Logistic regression</strong>.</p>`,
    hintHtml: `<p>Look for classifiers whose decision equations depend strictly on a linear score term wᵀx + b = 0 without higher-order feature mappings or non-linear layer stacks.</p>`,
    categories: ['machine_learning'],
    relativePath: 'machine_learning/bank/question-002.html',
    subject: 'machine_learning'
  },
  {
    title: 'Question 1',
    questionHtml: `<p>There are thirteen flights from Delhi to Bangalore, and then six flights from Bangalore to Chennai. Saumya wants to fly from Delhi to Bangalore and then to Chennai. How many choices does she have for her flight plan?</p>`,
    questionText: 'There are thirteen flights from Delhi to Bangalore, and then six flights from Bangalore to Chennai. Saumya wants to fly from Delhi to Bangalore and then to Chennai. How many choices does she have for her flight plan?',
    options: ['19', '72', '78', '39'],
    type: 'MCQ',
    correctIdxs: [2],
    correctIdx: 2,
    natAnswer: '',
    solutionHtml: `<p>This counting problem can be modeled as a sequence of two independent actions:</p>
<ul class="list-decimal pl-5 my-2 space-y-1">
  <li>Action A: Delhi to Bangalore (13 choices).</li>
  <li>Action B: Bangalore to Chennai (6 choices).</li>
</ul>
<p>By the basic <strong>multiplication rule of counting</strong>, the total number of distinct flight plans is the product of the choices for each stage:</p>
<p class="font-mono text-center text-xl text-emerald-400 bg-black/20 p-2 rounded my-2">13 × 6 = 78 choices</p>`,
    hintHtml: `<p>Saumya needs to complete both steps sequentially. Apply the fundamental counting principle.</p>`,
    categories: ['prob_stats'],
    relativePath: 'prob_stats/bank/question-001.html',
    subject: 'prob_stats'
  },
  {
    title: 'Question 2',
    questionHtml: `<p>A professor is creating an exam of eleven questions from a test bank of 15 questions. In how many ways can he select and arrange the questions?</p>`,
    questionText: 'A professor is creating an exam of eleven questions from a test bank of 15 questions. In how many ways can he select and arrange the questions?',
    options: ['15!', '15! / (11! · 4!)', '15! / 11!', '15! / 4!'],
    type: 'MCQ',
    correctIdxs: [3],
    correctIdx: 3,
    natAnswer: '',
    solutionHtml: `<p>This process consists of two stages: selecting the questions, and then arranging them.</p>
<p class="font-semibold text-purple-300">Method 1 (Combinations and Permutations):</p>
<ul class="list-disc pl-5 my-2 space-y-1">
  <li>Number of ways to select 11 questions out of 15: <code>¹⁵C₁₁ = 15! / (11! · (15-11)!) = 15! / (11! · 4!)</code></li>
  <li>Number of ways to arrange the 11 chosen questions in order: <code>11!</code></li>
  <li>Total ways = <code>¹⁵C₁₁ × 11! = [15! / (11! · 4!)] × 11! = 15! / 4!</code></li>
</ul>
<p class="font-semibold text-purple-300">Method 2 (Direct Permutation):</p>
<p>Since order matters (we select and arrange), we can directly compute this as the number of permutations of 11 elements from a set of 15:</p>
<p class="font-mono text-center text-emerald-400 bg-black/20 p-2 rounded my-2">¹⁵P₁₁ = 15! / (15 - 11)! = 15! / 4!</p>`,
    hintHtml: `<p>Does the order of the questions on the exam paper matter? Yes, because we "select and arrange". Use permutations.</p>`,
    categories: ['prob_stats'],
    relativePath: 'prob_stats/bank/question-002.html',
    subject: 'prob_stats'
  },
  {
    title: 'Question 1',
    questionHtml: `<p>Let <i>f</i> and <i>g</i> be two real valued functions such that <code>g(x) = f(x) - 2</code>. Select all true options.</p>`,
    questionText: 'Let f and g be two real valued functions such that g(x) = f(x) - 2. Select all true options.',
    options: [
      'If f is odd, then g is odd.',
      'If f is even, then g is even.',
      'If g is odd, then f is odd.',
      'If g is even, then f is even.'
    ],
    type: 'MSQ',
    correctIdxs: [1, 3],
    correctIdx: 1,
    natAnswer: '',
    solutionHtml: `<p>Recall the definitions of even and odd functions:</p>
<ul class="list-disc pl-5 my-2 space-y-1">
  <li>An <strong>even</strong> function satisfies: <code>h(-x) = h(x)</code> for all x.</li>
  <li>An <strong>odd</strong> function satisfies: <code>h(-x) = -h(x)</code> for all x.</li>
</ul>
<p class="font-semibold text-purple-300 mt-3">Evaluating evenness:</p>
<p>If <i>f</i> is even, then <code>f(-x) = f(x)</code>. Substituting this in the expression for <i>g</i>:</p>
<p class="font-mono ml-4 text-emerald-400 font-semibold my-1">g(-x) = f(-x) - 2 = f(x) - 2 = g(x)</p>
<p>So <i>g</i> is also even. This proves option 2.</p>
<p>Similarly, if <i>g</i> is even, then <code>g(-x) = g(x)</code>. Expressing <i>f</i> as <code>f(x) = g(x) + 2</code>:</p>
<p class="font-mono ml-4 text-emerald-400 font-semibold my-1">f(-x) = g(-x) + 2 = g(x) + 2 = f(x)</p>
<p>So <i>f</i> is also even. This proves option 4.</p>
<p class="font-semibold text-purple-300 mt-3">Evaluating oddness:</p>
<p>Translation by a constant shifts the graph vertically, which breaks the rotational origin symmetry required for odd functions. For example, if <code>f(x) = x</code> (odd), then <code>g(x) = x - 2</code>. We have <code>g(-x) = -x - 2</code>, which is neither equal to <code>g(x)</code> nor <code>-g(x) = -x + 2</code>. So <i>g</i> is neither even nor odd.</p>`,
    hintHtml: `<p>Substitute -x into g(x) and use the properties of even and odd functions.</p>`,
    categories: ['calculus'],
    relativePath: 'calculus/bank/question-001.html',
    subject: 'calculus'
  },
  {
    title: 'Question 1',
    questionHtml: `<p>Consider two relations <b>s</b>(A, B, C) and <b>r</b>(P, Q, C) such that relation <b>s</b> has 30 rows and relation <b>r</b> has 12 rows. What is the maximum number of rows that are possible in the natural join <code><b>r</b> ⋈ <b>s</b></code>?</p>`,
    questionText: 'Consider two relations s(A, B, C) and r(P, Q, C) such that relation s has 30 rows and relation r has 12 rows. What is the maximum number of rows that are possible in r ⋈ s?',
    options: [],
    type: 'NAT',
    correctIdxs: [],
    correctIdx: null,
    natAnswer: '360',
    solutionHtml: `<p>The natural join is performed on the common attribute, which is <b>C</b>.</p>
<p>The maximum number of rows in the natural join occurs when <em>every</em> row in relation <b>r</b> matches with <em>every</em> row in relation <b>s</b>. This happens when all rows in both relations share the exact same value for attribute C.</p>
<p>In this worst-case scenario, the natural join behaves exactly like a Cartesian product for all practical purposes:</p>
<p class="font-mono text-center text-xl text-emerald-400 bg-black/20 p-2 rounded my-2">Max Rows = |r| × |s| = 12 × 30 = 360 rows</p>`,
    hintHtml: `<p>Identify the common attribute on which the natural join operates. In what case will every row of r match with every row of s?</p>`,
    categories: ['dbms'],
    relativePath: 'dbms/bank/question-001.html',
    subject: 'dbms'
  },
  {
    title: 'Question 1',
    questionHtml: `<p>What is the output of the following Python code snippet?</p>
<pre class="bg-black/40 border border-white/5 rounded p-3 text-emerald-400 font-mono text-sm my-3"><code>def foo(n):
    if n % 2 == 0:
        return n // 2
    return 3 * n + 1

count = 0
x = 10
while x != 1:
    x = foo(x)
    count += 1
print(count)</code></pre>`,
    questionText: 'What is the output of the following Python snippet of code? (Collatz trace starting at 10)',
    options: [],
    type: 'NAT',
    correctIdxs: [],
    correctIdx: null,
    natAnswer: '6',
    solutionHtml: `<p>Let's trace the values of <code>x</code> and <code>count</code> at each iteration of the loop:</p>
<div class="overflow-x-auto my-3 rounded-lg border border-white/10">
  <table class="w-full text-sm text-left bg-black/30">
    <thead class="text-xs uppercase bg-white/10 text-purple-300">
      <tr>
        <th class="px-4 py-2">Iteration</th>
        <th class="px-4 py-2">Input x</th>
        <th class="px-4 py-2">x is Even?</th>
        <th class="px-4 py-2">Next x</th>
        <th class="px-4 py-2">New count</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-white/5">
      <tr>
        <td class="px-4 py-2">1</td>
        <td class="px-4 py-2">10</td>
        <td class="px-4 py-2">Yes</td>
        <td class="px-4 py-2">10 // 2 = 5</td>
        <td class="px-4 py-2 font-semibold text-emerald-400">1</td>
      </tr>
      <tr>
        <td class="px-4 py-2">2</td>
        <td class="px-4 py-2">5</td>
        <td class="px-4 py-2">No</td>
        <td class="px-4 py-2">3 * 5 + 1 = 16</td>
        <td class="px-4 py-2 font-semibold text-emerald-400">2</td>
      </tr>
      <tr>
        <td class="px-4 py-2">3</td>
        <td class="px-4 py-2">16</td>
        <td class="px-4 py-2">Yes</td>
        <td class="px-4 py-2">16 // 2 = 8</td>
        <td class="px-4 py-2 font-semibold text-emerald-400">3</td>
      </tr>
      <tr>
        <td class="px-4 py-2">4</td>
        <td class="px-4 py-2">8</td>
        <td class="px-4 py-2">Yes</td>
        <td class="px-4 py-2">8 // 2 = 4</td>
        <td class="px-4 py-2 font-semibold text-emerald-400">4</td>
      </tr>
      <tr>
        <td class="px-4 py-2">5</td>
        <td class="px-4 py-2">4</td>
        <td class="px-4 py-2">Yes</td>
        <td class="px-4 py-2">4 // 2 = 2</td>
        <td class="px-4 py-2 font-semibold text-emerald-400">5</td>
      </tr>
      <tr>
        <td class="px-4 py-2">6</td>
        <td class="px-4 py-2">2</td>
        <td class="px-4 py-2">Yes</td>
        <td class="px-4 py-2">2 // 2 = 1</td>
        <td class="px-4 py-2 font-semibold text-emerald-400">6</td>
      </tr>
    </tbody>
  </table>
</div>
<p>When <code>x = 1</code>, the loop condition <code>x != 1</code> becomes false, and the loop terminates. The printed count is <strong>6</strong>.</p>`,
    hintHtml: `<p>Trace the value of x step-by-step. If even, divide by 2. If odd, multiply by 3 and add 1. Stop when x reaches 1.</p>`,
    categories: ['pdsa'],
    relativePath: 'pdsa/bank/question-001.html',
    subject: 'pdsa'
  },
  {
    title: 'Question 1',
    questionHtml: `<p class="text-lg font-semibold my-2 text-purple-300">Courage : Bravery :: Yearning : __________</p><p>Select the most appropriate option to complete the analogy.</p>`,
    questionText: 'Courage : Bravery :: Yearning : __________ Select the most appropriate option to complete the analogy.',
    options: ['Longing', 'Yelling', 'Yawning', 'Glaring'],
    type: 'MCQ',
    correctIdxs: [0],
    correctIdx: 0,
    natAnswer: '',
    solutionHtml: `<p>This question tests semantic analogy (synonyms):</p>
<ul class="list-disc pl-5 my-2 space-y-1">
  <li><strong>Courage</strong> and <strong>Bravery</strong> are direct synonyms.</li>
  <li>Similarly, <strong>Yearning</strong> represents a strong feeling of wishing or craving for something, which is directly synonymous with <strong>Longing</strong>.</li>
</ul>
<p>The other choices (Yelling, Yawning, Glaring) are unrelated verbs and nouns.</p>`,
    hintHtml: `<p>Find the relationship between the first pair (Courage and Bravery) and apply the same relationship to Yearning.</p>`,
    categories: ['gate_2025'],
    relativePath: 'papers/GATE-2025/question-01.html',
    subject: 'papers/GATE-2025'
  }
];

// Browser dynamic crawlers for client-side live syncing
export function parseIITMSidebar(htmlText) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, 'text/html');
  
  // Find all a tags
  const aTags = doc.querySelectorAll('a[href]');
  const questionsList = [];
  
  aTags.forEach(a => {
    const href = a.getAttribute('href');
    const text = a.textContent.trim();
    
    if (!href) return;
    let cleanPath = href.replace(/^\.\//, ''); // replace leading ./
    cleanPath = cleanPath.replace(/^(\.\.\/)+/, ''); // replace leading ../
    cleanPath = cleanPath.trim();
    
    // Ignore external links, mailto, search page, index pages
    if (cleanPath.startsWith('http') || cleanPath.startsWith('mailto') || cleanPath.includes('search') || cleanPath.endsWith('index.html')) {
      return;
    }
    
    // Only accept question subpages
    if (!cleanPath.endsWith('.html') || (!cleanPath.includes('/bank/') && !cleanPath.includes('/papers/'))) {
      return;
    }
    
    // Categorize
    let category = null;
    if (cleanPath.includes('aptitude/')) {
      category = { id: 'aptitude', name: 'General Aptitude' };
    } else if (cleanPath.includes('linear_algebra/')) {
      category = { id: 'linear_algebra', name: 'Linear Algebra' };
    } else if (cleanPath.includes('calculus/')) {
      category = { id: 'calculus', name: 'Calculus & Optimization' };
    } else if (cleanPath.includes('prob_stats/')) {
      category = { id: 'prob_stats', name: 'Probability & Statistics' };
    } else if (cleanPath.includes('machine_learning/')) {
      category = { id: 'machine_learning', name: 'Machine Learning' };
    } else if (cleanPath.includes('ai/')) {
      category = { id: 'ai', name: 'Artificial Intelligence' };
    } else if (cleanPath.includes('dbms/')) {
      category = { id: 'dbms', name: 'Database Management' };
    } else if (cleanPath.includes('pdsa/')) {
      category = { id: 'pdsa', name: 'Programming & DSA' };
    } else if (cleanPath.includes('papers/GATE-2025/')) {
      category = { id: 'gate_2025', name: 'GATE-2025 Paper' };
    } else if (cleanPath.includes('papers/GATE-2024/')) {
      category = { id: 'gate_2024', name: 'GATE-2024 Paper' };
    }
    
    if (!category) return;
    
    // Extract question number/name
    let qLabel = text || 'Question';
    if (qLabel.toLowerCase() === 'question' || qLabel === '') {
      const match = cleanPath.match(/question-(\d+)\.html/i);
      if (match) {
        qLabel = `Question ${parseInt(match[1], 10)}`;
      }
    }
    
    // Avoid duplicates
    if (!questionsList.some(q => q.relativePath === cleanPath)) {
      questionsList.push({
        relativePath: cleanPath,
        title: qLabel,
        category: category.id,
        categoryName: category.name
      });
    }
  });
  
  // Sort questions
  questionsList.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    const aMatch = a.relativePath.match(/question-(\d+)\.html/i);
    const bMatch = b.relativePath.match(/question-(\d+)\.html/i);
    if (aMatch && bMatch) {
      return parseInt(aMatch[1], 10) - parseInt(bMatch[1], 10);
    }
    return a.title.localeCompare(b.title);
  });
  
  return questionsList;
}

export function parseIITMQuestionPage(htmlText, relativePath) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, 'text/html');
  
  // Find main content
  let mainContent = doc.querySelector('main.content') || doc.getElementById('quarto-document-content');
  if (!mainContent) {
    throw new Error('Main content not found in HTML');
  }
  
  // Rewrite all anchor tags to be absolute and open in new tab
  mainContent.querySelectorAll('a').forEach(a => {
    let href = a.getAttribute('href');
    if (href) {
      if (!href.startsWith('http://') && !href.startsWith('https://') && !href.startsWith('mailto:') && !href.startsWith('#')) {
        if (href.startsWith('/')) {
          href = href.slice(1);
        }
        a.setAttribute('href', `https://iitmbsc-student-projects.github.io/gate-da/${href}`);
      }
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
      a.classList.add('parsed-link');
    }
  });

  // Rewrite all image src attributes to be absolute pointing to IITM site
  mainContent.querySelectorAll('img').forEach(img => {
    let src = img.getAttribute('src');
    if (src) {
      if (!src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('data:')) {
        try {
          const baseUrl = `https://iitmbsc-student-projects.github.io/gate-da/${relativePath}`;
          const absoluteUrl = new URL(src, baseUrl).href;
          img.setAttribute('src', absoluteUrl);
        } catch (e) {
          console.error('Error resolving image src:', e);
        }
      }
    }
  });
  
  // Extract categories if any
  const categories = [];
  mainContent.querySelectorAll('.quarto-category').forEach(el => {
    categories.push(el.textContent.trim());
  });
  
  // Extract title
  let titleEl = mainContent.querySelector('h1.title') || doc.querySelector('h1');
  let title = titleEl ? titleEl.textContent.trim() : 'Question';
  
  // Scrape question text before the first callout
  const firstCallout = mainContent.querySelector('.callout');
  
  let questionHtml = '';
  let questionText = '';
  
  let children = Array.from(mainContent.children);
  for (let child of children) {
    if (child === firstCallout) break;
    // Skip title block header
    if (child.tagName === 'HEADER' || child.classList.contains('quarto-title-block') || child.id === 'title-block-header') {
      continue;
    }
    // Skip options container task list
    if (child.classList.contains('task-list') || child.querySelector('.task-list')) {
      continue;
    }
    
    questionHtml += child.outerHTML;
    questionText += child.textContent + '\n';
  }
  
  questionHtml = questionHtml.trim();
  questionText = questionText.trim();
  
  // Parse options
  let options = [];
  let taskList = mainContent.querySelector(':not(.callout) > .task-list, :not(.callout) .task-list');
  if (!taskList) {
    taskList = mainContent.querySelector('.task-list');
  }
  
  if (taskList) {
    taskList.querySelectorAll('li').forEach(li => {
      options.push(li.textContent.trim());
    });
  }
  
  // Parse Correct Answer (from "Answer" callout) and Solution (from "Solution/Soluton" callout)
  let correctIdxs = [];
  let type = 'MCQ';
  let isCheckedFound = false;
  let natAnswer = '';
  
  const callouts = mainContent.querySelectorAll('.callout');
  let answerCallout = null;
  let solutionCallout = null;
  let hintCallout = null;
  
  callouts.forEach(callout => {
    const titleContainer = callout.querySelector('.callout-title-container');
    if (titleContainer) {
      const text = titleContainer.textContent.toLowerCase();
      if (text.includes('answer')) {
        answerCallout = callout;
      } else if (text.includes('solution') || text.includes('soluton')) {
        solutionCallout = callout;
      } else if (text.includes('hint')) {
        hintCallout = callout;
      }
    }
  });
  
  if (answerCallout) {
    const listItems = answerCallout.querySelectorAll('li');
    const checkedInputs = answerCallout.querySelectorAll('input[checked]');
    const allInputs = answerCallout.querySelectorAll('input');
    
    if (listItems.length > 0) {
      listItems.forEach((li, idx) => {
        const input = li.querySelector('input');
        if (input && (input.hasAttribute('checked') || input.checked)) {
          correctIdxs.push(idx);
          isCheckedFound = true;
        }
      });
      
      if (!isCheckedFound) {
        allInputs.forEach((input, idx) => {
          if (input.checked || input.hasAttribute('checked')) {
            correctIdxs.push(idx);
            isCheckedFound = true;
          }
        });
      }
    } else {
      const body = answerCallout.querySelector('.callout-body-container') || answerCallout;
      natAnswer = body.textContent.trim();
      type = 'NAT';
    }
  }
  
  if (type !== 'NAT') {
    if (correctIdxs.length > 1) {
      type = 'MSQ';
    } else if (correctIdxs.length === 1) {
      type = 'MCQ';
    } else {
      if (options.length > 0) {
        type = 'MCQ';
        correctIdxs = [0]; // fallback
      } else {
        type = 'NAT';
        if (answerCallout) {
          natAnswer = answerCallout.textContent.replace(/NoteAnswer/i, '').trim();
        }
      }
    }
  }
  
  if (type === 'NAT' && natAnswer) {
    natAnswer = natAnswer.replace(/^(NoteAnswer|Answer|Note)\s+/i, '').trim();
  }
  
  let solutionHtml = '';
  if (solutionCallout) {
    const body = solutionCallout.querySelector('.callout-body-container') || solutionCallout;
    solutionHtml = body.innerHTML.trim();
    // Strip toggle buttons/headers inside if any
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = solutionHtml;
    const toggle = tempDiv.querySelector('.callout-btn-toggle');
    if (toggle) toggle.remove();
    solutionHtml = tempDiv.innerHTML.trim();
  }
  
  let hintHtml = '';
  if (hintCallout) {
    const body = hintCallout.querySelector('.callout-body-container') || hintCallout;
    hintHtml = body.innerHTML.trim();
  }
  
  return {
    title,
    questionHtml,
    questionText,
    options,
    type,
    correctIdxs,
    correctIdx: correctIdxs.length > 0 ? correctIdxs[0] : null,
    natAnswer,
    solutionHtml,
    hintHtml,
    categories,
    relativePath
  };
}
