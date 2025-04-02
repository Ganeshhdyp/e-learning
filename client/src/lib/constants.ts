// Constants used throughout the application
export const UNITS = [
  {
    id: 1,
    title: "Introduction to Cyber Security",
    description: "Learn the fundamentals of cyber security, including key concepts, threats, and basic defensive mechanisms."
  },
  {
    id: 2,
    title: "Network Security Fundamentals",
    description: "Understand network security principles, protocols, and protection mechanisms."
  },
  {
    id: 3,
    title: "Cryptography and Encryption",
    description: "Explore cryptographic algorithms, encryption techniques, and secure communication."
  },
  {
    id: 4,
    title: "Security Policies and Risk Management",
    description: "Learn about developing security policies, analyzing risks, and implementing controls."
  },
  {
    id: 5,
    title: "Penetration Testing",
    description: "Understand the methodology and tools used in penetration testing and ethical hacking."
  },
  {
    id: 6,
    title: "Incident Response and Forensics",
    description: "Learn how to respond to security incidents and conduct digital forensic investigations."
  }
];

export const DEFAULT_UNIT_CONTENT = {
  introduction: "This unit covers key concepts and foundations of the topic. You will learn about definitions, principles, and practical applications.",
  keyTopics: [
    "Understanding core principles and terminology",
    "Identifying common threats and vulnerabilities",
    "Implementing basic security controls",
    "Following best practices and standards",
    "Evaluating security effectiveness"
  ],
  importantNote: "All security techniques and knowledge should be applied ethically and legally. Unauthorized testing or attacks against systems are illegal and unethical."
};

// Sample SQL injection examples for the dedicated page
export const SQL_INJECTION_EXAMPLES = [
  {
    vulnerable: "SELECT * FROM users WHERE username = 'INPUT' AND password = 'INPUT';",
    attack: "' OR '1'='1",
    exploited: "SELECT * FROM users WHERE username = '' OR '1'='1' AND password = 'anything';",
    explanation: "This attack creates a condition that's always true, potentially bypassing authentication."
  },
  {
    vulnerable: "SELECT * FROM users WHERE user_id = INPUT;",
    attack: "1; DROP TABLE users;--",
    exploited: "SELECT * FROM users WHERE user_id = 1; DROP TABLE users;--",
    explanation: "This attack attempts to execute multiple SQL statements, potentially destroying data."
  }
];

// Sample XSS examples for the dedicated page
export const XSS_EXAMPLES = [
  {
    type: "Reflected XSS",
    vulnerable: "<div>Welcome, USER_INPUT!</div>",
    attack: "<script>alert('XSS Attack!')</script>",
    explanation: "When the server reflects user input directly into the page without sanitization."
  },
  {
    type: "Stored XSS",
    vulnerable: "Database stores USER_INPUT in comment field, displays later",
    attack: "<img src='x' onerror='alert(\"Stored XSS\")'/>",
    explanation: "Malicious script is stored in the database and served to multiple users over time."
  },
  {
    type: "DOM-based XSS",
    vulnerable: "document.getElementById('greeting').innerHTML = 'Hello, ' + name;",
    attack: "JavaScript:alert('DOM XSS')",
    explanation: "Occurs when client-side JavaScript uses untrusted data to update the DOM."
  }
];
