// Assessment questions for Unit 2: Cyber Security Fundamentals

export const unit2Assessment = {
  unitId: 2,
  title: "Cyber Security Fundamentals Assessment",
  description: "Test your knowledge of security principles, attacks, and defense mechanisms.",
  questions: [
    {
      id: 1,
      text: "What are the three pillars of information security?",
      options: [
        "Privacy, Integrity, Authentication",
        "Confidentiality, Integrity, Availability",
        "Security, Privacy, Authentication",
        "Vulnerability, Threat, Risk"
      ],
      correctOption: 1,
      explanation: "The CIA triad (Confidentiality, Integrity, and Availability) forms the three main pillars of information security. Confidentiality ensures that information is accessible only to those authorized, integrity ensures data remains accurate and untampered, and availability ensures systems remain operational when needed."
    },
    {
      id: 2,
      text: "Which of the following is an example of a technical control in cyber security?",
      options: [
        "User training programs",
        "Security policies and procedures",
        "Firewalls and intrusion detection systems",
        "Background checks for employees"
      ],
      correctOption: 2,
      explanation: "Technical controls are technological solutions implemented to protect systems and networks, such as firewalls, intrusion detection systems, encryption, and access control mechanisms. User training and policies are examples of administrative controls, while physical barriers would be physical controls."
    },
    {
      id: 3,
      text: "What is the primary purpose of a vulnerability assessment?",
      options: [
        "To detect active intrusions in real-time",
        "To identify and quantify security weaknesses in a system",
        "To test how employees respond to social engineering attacks",
        "To recover data after a security breach"
      ],
      correctOption: 1,
      explanation: "A vulnerability assessment is a systematic review of security weaknesses in a system, network, or application. It identifies and quantifies vulnerabilities, prioritizes them based on risk level, and provides recommendations for remediation or mitigation."
    },
    {
      id: 4,
      text: "Which of the following best describes defense in depth?",
      options: [
        "Using the strongest possible firewall",
        "Implementing multiple layers of security controls",
        "Focusing resources on defending the most critical assets",
        "Thoroughly analyzing a single security control"
      ],
      correctOption: 1,
      explanation: "Defense in depth is a cybersecurity strategy that employs multiple layers of security controls throughout an IT system, creating redundancy in case one control fails. It's like having multiple locks on your door - if one fails, others remain to protect you."
    },
    {
      id: 5,
      text: "What is the difference between a threat and a vulnerability?",
      options: [
        "A threat is potential danger, while a vulnerability is a weakness that can be exploited",
        "A threat is a specific attack, while a vulnerability is a general danger",
        "A threat is internal, while a vulnerability is external",
        "A threat affects hardware, while a vulnerability affects software"
      ],
      correctOption: 0,
      explanation: "A threat is a potential danger that might exploit a vulnerability (weakness) in a system. Threats are the potential actors or events that might harm a system, while vulnerabilities are the weaknesses those threats might exploit."
    },
    {
      id: 6,
      text: "What is the purpose of a security risk assessment?",
      options: [
        "To identify every possible vulnerability in a system",
        "To implement security controls across all systems",
        "To identify, estimate, and prioritize risks to organizational assets",
        "To determine which employees need security training"
      ],
      correctOption: 2,
      explanation: "A security risk assessment is a process that identifies, estimates, and prioritizes risks to organizational operations, assets, individuals, and other organizations. It helps organizations understand their risk exposure and make informed decisions about resource allocation for security controls."
    },
    {
      id: 7,
      text: "Which type of attack attempts to trick users into revealing sensitive information?",
      options: [
        "Denial of Service",
        "Social Engineering",
        "SQL Injection",
        "Zero-day exploit"
      ],
      correctOption: 1,
      explanation: "Social engineering is a type of attack that relies on human interaction and involves tricking people into breaking security procedures, usually through psychological manipulation. Examples include phishing, pretexting, baiting, and tailgating."
    },
    {
      id: 8,
      text: "What is the principle of least privilege?",
      options: [
        "Giving users the minimum permissions needed to perform their jobs",
        "Ensuring all systems have minimal security controls",
        "Restricting physical access to only high-security areas",
        "Providing minimal training to users on security awareness"
      ],
      correctOption: 0,
      explanation: "The principle of least privilege is a computer security concept that restricts user account permissions to only what is necessary for their job functions. This minimizes the potential damage from accidents, errors, or unauthorized access."
    },
    {
      id: 9,
      text: "What is the purpose of incident response in cybersecurity?",
      options: [
        "To prevent all security incidents from occurring",
        "To establish a methodical approach to handling security breaches",
        "To punish employees who cause security incidents",
        "To test security systems on a regular basis"
      ],
      correctOption: 1,
      explanation: "Incident response is an organized approach to addressing and managing the aftermath of a security breach or attack. The goal is to handle the situation in a way that limits damage, reduces recovery time and costs, and identifies root causes to prevent future incidents."
    },
    {
      id: 10,
      text: "Which of the following best describes a zero-day vulnerability?",
      options: [
        "A vulnerability that has existed for less than 24 hours",
        "A vulnerability that allows complete system access in no time",
        "A vulnerability that is known to the attacker but not yet patched",
        "A vulnerability that can be exploited without user interaction"
      ],
      correctOption: 2,
      explanation: "A zero-day vulnerability is a software security flaw that is unknown to those who should be interested in mitigating it, including the vendor. 'Zero-day' refers to the fact that developers have had zero days to address and patch the vulnerability."
    }
  ]
};