// Assessment questions for Unit 1: Introduction to Cyber Security

export const unit1Assessment = {
  unitId: 1,
  title: "Introduction to Cyber Security Assessment",
  description: "Test your knowledge of cyber security fundamentals, threats, and basic concepts.",
  questions: [
    {
      id: 1,
      text: "What is cyber security primarily about?",
      options: [
        "Only protecting hardware from physical damage",
        "Just installing antivirus software on computers",
        "People, processes, and technologies working together to reduce threats and vulnerabilities",
        "Exclusively government-level protection protocols"
      ],
      correctOption: 2,
      explanation: "Cyber security is primarily about people, processes, and technologies working together to encompass the full range of threat reduction, vulnerability reduction, deterrence, international engagement, incident response, resiliency, and recovery policies and activities."
    },
    {
      id: 2,
      text: "Which of the following is NOT one of the seven broad classes of threats mentioned in the text?",
      options: [
        "Malware",
        "DoS attacks",
        "Phishing",
        "DNS poisoning"
      ],
      correctOption: 2,
      explanation: "While phishing is a common cyber attack method, it was not specifically listed as one of the seven broad classes of threats in the provided text. The seven classes mentioned were: Malware, Security breaches, DoS attacks, Web attacks, Session hijacking, Insider threats, and DNS poisoning."
    },
    {
      id: 3,
      text: "What is a virus in the context of cyber security?",
      options: [
        "A program that attempts to damage a computer system and replicate itself",
        "A type of spyware that only records keystrokes",
        "A program that cannot replicate itself",
        "A dormant program that activates on a specific date"
      ],
      correctOption: 0,
      explanation: "A virus is a program that attempts to damage a computer system and replicate itself to other computer systems. It requires a host to replicate and usually attaches itself to a host file or a hard drive sector."
    },
    {
      id: 4,
      text: "What distinguishes a Trojan horse from other types of malware?",
      options: [
        "It can self-replicate",
        "It's disguised as legitimate software",
        "It can only affect email systems",
        "It always contains a key logger"
      ],
      correctOption: 1,
      explanation: "A Trojan horse is a malicious program that is disguised as legitimate software. Unlike viruses, Trojans cannot replicate themselves. They often contain spying functions or backdoor functions and are frequently hidden in useful software like screen savers or games."
    },
    {
      id: 5,
      text: "What is the main purpose of SQL injection attacks?",
      options: [
        "To overload a server with traffic",
        "To steal cookies from web browsers",
        "To manipulate a web application and fetch unauthorized information",
        "To redirect users to fake websites"
      ],
      correctOption: 2,
      explanation: "SQL injection is an attack in which data is injected into a web application to manipulate the application and fetch unauthorized information. It works by entering SQL commands into login forms in an attempt to trick the server into executing those commands."
    },
    {
      id: 6,
      text: "What is a Logic Bomb?",
      options: [
        "A virus that attacks logical operations in a system",
        "Malware that lies dormant until triggered by a specific event",
        "A type of attack that causes logic circuits to fail",
        "A security breach that affects only the logical layers of a network"
      ],
      correctOption: 1,
      explanation: "A Logic Bomb is malware that lies dormant until triggered. A trigger activity may be a specific date and time, the launching of a specific program, or the processing of a specific type of activity. Logic bombs do not self-replicate."
    },
    {
      id: 7,
      text: "Which type of DoS attack aims to crash the web server?",
      options: [
        "Volume-based attacks",
        "Protocol attacks",
        "Application layer attacks",
        "Network layer attacks"
      ],
      correctOption: 2,
      explanation: "Application layer attacks aim to crash the web server and are measured in requests per second. Volume-based attacks saturate bandwidth, while protocol attacks consume server resources."
    },
    {
      id: 8,
      text: "In the context of SQL injection, what would entering ' or '1' = '1 into a login form attempt to do?",
      options: [
        "Create an error in the database",
        "Delete user records",
        "Create a statement that will always be true to bypass authentication",
        "Add a new admin user"
      ],
      correctOption: 2,
      explanation: "The basic form of SQL injection seeks to create a statement that will always be true. Entering ' or '1' = '1 into login fields causes the query to return all records where username and password are blank OR where 1=1 (which is always true), effectively bypassing authentication."
    },
    {
      id: 9,
      text: "What is DNS poisoning?",
      options: [
        "A virus that affects DNS servers",
        "An attack that infects DNS records with malware",
        "An attack that redirects traffic to fraudulent websites by altering DNS records",
        "A method to slow down DNS resolution"
      ],
      correctOption: 2,
      explanation: "DNS poisoning (also known as DNS spoofing or DNS cache poisoning) is an attack in which altered DNS records are used to redirect online traffic to a fraudulent website that resembles its intended destination, allowing attackers to steal credentials or personal information."
    },
    {
      id: 10,
      text: "What is the primary difference between white hat and black hat hackers?",
      options: [
        "Their level of technical knowledge",
        "The tools they use for hacking",
        "Their ethical intentions and behaviors",
        "The countries they operate from"
      ],
      correctOption: 2,
      explanation: "The primary difference between white hat and black hat hackers is their ethical intentions and behaviors. White hat hackers find flaws in systems and report them to vendors to improve security, while black hat hackers exploit vulnerabilities to cause harm such as stealing data, erasing files, or defacing websites."
    }
  ]
};