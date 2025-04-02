// This file contains the content for each unit
// Content is based on cybersecurity fundamentals

export const unitContents = {
  1: {
    sections: [
      {
        title: "Introduction to Cyber Security",
        content: [
          "Cyber security is the most concerned matter as cyber threats and attacks are overgrowing. Attackers are now using more sophisticated techniques to target the systems. Individuals, small-scale businesses or large organization, are all being impacted. So, all these firms whether IT or non-IT firms have understood the importance of Cyber Security and focusing on adopting all possible measures to deal with cyber threats.",
          "Cyber security is primarily about people, processes, and technologies working together to encompass the full range of threat reduction, vulnerability reduction, deterrence, international engagement, incident response, resiliency, and recovery policies and activities, including computer network operations, information assurance, law enforcement, etc.",
          "Cyber security is the protection of Internet-connected systems, including hardware, software, and data from cyber attacks. It is made up of two words one is cyber and other is security.",
          "• Cyber is related to the technology which contains systems, network and programs or data.",
          "• Whereas security related to the protection which includes systems security, network security and application and information security."
        ],
        subsections: [
          {
            title: "Why is cyber security important?",
            content: [
              "Listed below are the reasons why cyber security is so important in what's become a predominant digital world:",
              "• Cyber attacks can be extremely expensive for businesses to endure.",
              "• In addition to financial damage suffered by the business, a data breach can also inflict untold reputational damage.",
              "• Cyber-attacks these days are becoming progressively destructive. Cybercriminals are using more sophisticated ways to initiate cyber attacks.",
              "• Regulations such as GDPR are forcing organizations into taking better care of the personal data they hold."
            ]
          }
        ]
      },
      {
        title: "Identifying Types of Threats",
        content: [
          "Some threats are common to all networks; others are more likely with specific types of networks. Most attacks can be categorized as one of seven broad classes:",
          "◼ Malware: This is a generic term for software that has a malicious purpose. It includes virus attacks, worms, adware, Trojan horses, and spyware. This is the most prevalent danger to your system.",
          "◼ Security breaches: This group of attacks includes any attempt to gain unauthorized access to your system. This includes cracking passwords, elevating privileges, breaking into a server…all the things you probably associate with the term hacking.",
          "◼ DoS attacks: These are designed to prevent legitimate access to your system. And, as you will see in later chapters, this includes distributed denial of service (DDoS).",
          "◼ Web attacks: This is any attack that attempts to breach your website. Two of the most common such attacks are SQL injection and cross-site scripting.",
          "◼ Session hijacking: These attacks are rather advanced and involve an attacker attempting to take over a session.",
          "◼ Insider threats: These are breaches based on someone who has access to your network misusing his access to steal data or compromise security.",
          "◼ DNS poisoning: This type of attack seeks to compromise a DNS server so that users can be redirected to malicious websites, including phishing websites."
        ]
      },
      {
        title: "Malware",
        content: [
          "Malware is a generic term for software that has a malicious purpose. This section discusses four types of malware: viruses, Trojan horses, spyware, and logic bombs. Trojan horses and viruses are the most widely encountered. One could also include rootkits, but these usually spread as viruses and are regarded as simply a specific type of virus.",
          "◼ Software with a malicious purpose",
          "❑ Virus",
          "❑ Trojan horse",
          "❑ Spyware",
          "❑ Logic Bomb"
        ],
        subsections: [
          {
            title: "Virus",
            content: [
              "A virus is a program that attempts to damage a computer system and replicate itself to other computer systems.",
              "• Requires a host to replicate and usually attaches itself to a host file or a hard drive sector.",
              "• Replicates each time the host is used.",
              "• Often focuses on destruction or corruption of data.",
              "• Usually attaches to files with execution capabilities such as .doc, .exe, and .bat extensions.",
              "• Often distributes via e-mail. Many viruses can e-mail themselves to everyone in your address book.",
              "• Examples: Stoned, Michelangel"
            ]
          },
          {
            title: "Spyware",
            content: [
              "Spyware is simply software that literally spies on what you do on your computer. Spyware can be as simple as a cookie—a text file that your browser creates and stores on your hard drive—that a website you have visited downloads to your machine and uses to recognize you when you return to the site.",
              "Another form of spyware, called a key logger, records all of your keystrokes. Some key loggers also take periodic screenshots of your computer. Data is then either stored for later retrieval by the person who installed the key logger or is sent immediately back via email."
            ]
          },
          {
            title: "Trojan horse",
            content: [
              "A Trojan horse is a malicious program that is disguised as legitimate software. Discretionary environments are often more vulnerable and susceptible to Trojan horse attacks because security is user focused and user directed. Thus the compromise of a user account could lead to the compromise of the entire environment.",
              "• Cannot replicate itself.",
              "• Often contains spying functions (such as a packet sniffer) or backdoor functions that allow a computer to be remotely controlled from the network.",
              "• Often is hidden in useful software such as screen savers or games.",
              "• Example: Back Orifice, Net Bus, Whack-a-Mole."
            ]
          },
          {
            title: "Logic Bomb",
            content: [
              "A Logic Bomb is malware that lies dormant until triggered. A logic bomb is a specific example of an asynchronous attack.",
              "• A trigger activity may be a specific date and time, the launching of a specific program, or the processing of a specific type of activity.",
              "• Logic bombs do not self-replicate."
            ]
          }
        ]
      },
      {
        title: "DoS Attacks",
        content: [
          "It is an attack which meant to make a server or network resource unavailable to the users. It accomplishes this by flooding the target with traffic or sending it information that triggers a crash. It uses the single system and single internet connection to attack a server. It can be classified into the following-",
          "Volume-based attacks- Its goal is to saturate the bandwidth of the attacked site, and is measured in bit per second.",
          "Protocol attacks- It consumes actual server resources, and is measured in a packet.",
          "Application layer attacks- Its goal is to crash the web server and is measured in request per second."
        ]
      },
      {
        title: "Web Attacks",
        content: [
          "By their nature, web servers have to allow communications. Oftentimes, websites allow users to interact with the website. Any part of a website that allows for user interaction is also a potential point for attempting a web-based attack."
        ],
        subsections: [
          {
            title: "SQL Injection",
            content: [
              "It is the attack in which some data will be injected into a web application to manipulate the application and fetch the required information.",
              "SQL is relatively easy to understand; in fact, it looks a lot like English. There are commands like SELECT to get data, INSERT to put data in, and UPDATE to change data. In order to log in to a website, the web page has to query a database table to see if that username and password are correct.",
              "The most basic form of SQL injection seeks to subvert this process. The idea is to create a statement that will always be true. For example, instead of putting an actual username and password into the appropriate text fields, the attacker will enter ' or '1' = '1 into the username and password boxes. This will cause the program to create this query:",
              "SELECT * FROM Users WHERE USERNAME = '' or '1' = '1' AND PASSWORD = '' or '1' = '1'.",
              "So you are telling the database and application to return all records where username and password are blank or if 1 = 1. It is highly unlikely that the username and password are blank. But I am certain that 1 = 1 always. Any true statement can be substituted. Examples are a = a and bob = bob."
            ]
          },
          {
            title: "Cross-Site Scripting",
            content: [
              "This attack is closely related to SQL injection. It involves entering data other than what was intended, and it depends on the web programmer not filtering input. The perpetrator finds some area of a website that allows users to type in text that other users will see and then instead injects client-side script into those fields.",
              "An attacker might use the following script to redirect users to a fake site:",
              "<script> window.location = \"http://www.fakesite.com\"; </script>",
              "Now when users go to that book, this script will redirect them to the fake site, which looks a great deal like the real one. The attacker then can have the website tell the user that his session has timed out and to please log in again. That would allow the attacker to gather a lot of accounts and passwords."
            ]
          }
        ]
      },
      {
        title: "Session Hijacking",
        content: [
          "It is a security attack on a user session over a protected network. Web applications create cookies to store the state and user sessions. By stealing the cookies, an attacker can have access to all of the user data."
        ]
      },
      {
        title: "Insider Threats",
        content: [
          "Insider threats are a type of security breach. However, they present such a significant issue that we will deal with them separately. An insider threat is simply when someone inside your organization either misuses his access to data or accesses data he is not authorized to access.",
          "Here are a few examples:",
          "◼ A hospital employee who accesses patient records to use the data to steal a patient's identity, or someone with no access at all who accesses records.",
          "◼ A salesperson who takes the list of contacts with him before leaving the company."
        ]
      },
      {
        title: "DNS Poisoning",
        content: [
          "Domain Name Server (DNS) spoofing (a.k.a. DNS cache poisoning) is an attack in which altered DNS records are used to redirect online traffic to a fraudulent website that resembles its intended destination. Once there, users are prompted to login into (what they believe to be) their account, giving the perpetrator the opportunity to steal their access credentials and other personal information.",
          "Example: The following example illustrates a DNS cache poisoning attack, in which an attacker (IP 192.168.3.300) intercepts a communication channel between a client (IP 192.168.1.100) and a server computer belonging to the website www.estores.com (IP 192.168.2.200). In this scenario, a tool (e.g., arpspoof) is used to dupe the client into thinking that the server IP is 192.168.3.300. At the same time, the server is made to think that the client's IP is also 192.168.3.300."
        ]
      },
      {
        title: "Basic Security Terminology",
        content: [
          "People:",
          "❑ Hackers",
          "◼ White hats",
          "◼ Black hats",
          "◼ Gray hats",
          "❑ Script kiddies",
          "❑ Sneakers",
          "❑ Ethical hackers"
        ],
        subsections: [
          {
            title: "Types of Hackers",
            content: [
              "A white hat hacker, upon finding some flaw in a system, will report the flaw to the vendor of that system. For example, if a white hat hacker were to discover some flaw in Red Hat Linux, he would then email the Red Hat company (probably anonymously) and explain exactly what the flaw is and how it was exploited. White hat hackers are often hired specifically by companies to do penetration tests.",
              "A black hat hacker is the person normally depicted in the media. Once she gains access to a system, her goal is to cause some type of harm. She might steal data, erase files, or deface websites. Black hat hackers are sometimes referred to as crackers.",
              "A gray hat hacker is normally a law-abiding citizen, but in some cases will venture into illegal activities."
            ]
          },
          {
            title: "Script Kiddies",
            content: [
              "Script kiddies are people with little technical knowledge who simply download tools and run scripts that other more advanced hackers have developed. This term is used in a derogatory fashion to indicate the low skill level of this type of hacker."
            ]
          }
        ]
      }
    ]
  },
  2: {
    sections: [
      {
        title: "Network Security Fundamentals",
        content: [
          "Network security consists of the policies, processes, and practices adopted to prevent, detect, and monitor unauthorized access, misuse, modification, or denial of a computer network and network-accessible resources.",
          "Network security involves the authorization of access to data in a network, which is controlled by the network administrator."
        ],
        subsections: [
          {
            title: "Firewall Protection",
            content: [
              "A firewall is a network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules. It typically establishes a barrier between a trusted network and an untrusted network, such as the Internet.",
              "Firewalls can be hardware, software, or both. They are categorized as network firewalls, which filter traffic between two or more networks, and host-based firewalls, which filter traffic in and out of a single device."
            ]
          },
          {
            title: "Virtual Private Networks (VPNs)",
            content: [
              "A VPN extends a private network across a public network and enables users to send and receive data across shared or public networks as if their computing devices were directly connected to the private network.",
              "VPNs provide security by encrypting the connection from an endpoint to a network, often over the Internet. This prevents anyone from seeing or modifying the traffic, offering privacy and anonymity."
            ]
          }
        ]
      },
      {
        title: "Access Control Methods",
        content: [
          "Access control is a security technique that regulates who or what can view or use resources in a computing environment. It is a fundamental concept in security that minimizes risk to the business or organization."
        ],
        subsections: [
          {
            title: "Authentication",
            content: [
              "Authentication is the process of verifying that an individual, entity, or website is whom it claims to be. Authentication often involves verifying the validity of at least one form of identification.",
              "Common authentication methods include passwords, PINs, security tokens, biometrics, and digital certificates."
            ]
          },
          {
            title: "Authorization",
            content: [
              "Authorization is the function of specifying access rights and privileges to resources, which is related to information security and computer security in general and to access control in particular.",
              "After authentication, a user must gain authorization to access network resources. The authorization process determines whether the authenticated user has permission to access specific resources."
            ]
          }
        ]
      }
    ]
  },
  3: {
    sections: [
      {
        title: "Cryptography Basics",
        content: [
          "Cryptography is the practice and study of techniques for secure communication in the presence of third parties called adversaries. It deals with developing and analyzing protocols that prevent third parties or the public from reading private messages.",
          "Modern cryptography exists at the intersection of the disciplines of mathematics, computer science, electrical engineering, communication science, and physics."
        ],
        subsections: [
          {
            title: "Encryption",
            content: [
              "Encryption is the process of encoding information in such a way that only authorized parties can access it and those who are not authorized cannot. It does not prevent interception but denies the message content to the interceptor.",
              "In an encryption scheme, the intended information or message, referred to as plaintext, is encrypted using an encryption algorithm – a cipher – generating ciphertext that can only be read if decrypted."
            ]
          },
          {
            title: "Public Key Infrastructure (PKI)",
            content: [
              "Public Key Infrastructure (PKI) is a set of roles, policies, hardware, software, and procedures needed to create, manage, distribute, use, store, and revoke digital certificates and manage public-key encryption.",
              "The purpose of a PKI is to facilitate the secure electronic transfer of information for a range of network activities such as e-commerce, internet banking, and confidential email."
            ]
          }
        ]
      },
      {
        title: "Hash Functions",
        content: [
          "A hash function is any function that can be used to map data of arbitrary size to fixed-size values. The values returned by a hash function are called hash values, hash codes, digests, or simply hashes.",
          "Hash functions are primarily used to generate fixed-length output data that acts as a shortened reference to the original data."
        ],
        subsections: [
          {
            title: "Common Hash Algorithms",
            content: [
              "MD5 (Message Digest Algorithm 5): A widely used hash function producing a 128-bit hash value. Although MD5 was initially designed to be used as a cryptographic hash function, it has been found to suffer from extensive vulnerabilities.",
              "SHA (Secure Hash Algorithm): A family of cryptographic hash functions, including SHA-1, SHA-2, and SHA-3. SHA-1 produces a 160-bit hash value, while SHA-2 consists of two hash functions with different block sizes (SHA-256 and SHA-512)."
            ]
          }
        ]
      }
    ]
  },
  4: {
    sections: [
      {
        title: "Web Security",
        content: [
          "Web security refers to the protective measures and protocols that organizations adopt to protect the organization from cyber criminals and threats that use the web channel.",
          "Web security is critical to businesses, customers, and other users to ensure data security, business continuity, and protection against reputational damage."
        ],
        subsections: [
          {
            title: "Cross-Site Scripting (XSS)",
            content: [
              "Cross-Site Scripting (XSS) is a client-side code injection attack. The attacker aims to execute malicious scripts in a web browser of the victim by including malicious code in a legitimate web page or web application.",
              "The actual attack occurs when the victim visits the web page or web application that executes the malicious code. The web page or web application becomes a vehicle to deliver the malicious script to the user's browser."
            ]
          },
          {
            title: "Cross-Site Request Forgery (CSRF)",
            content: [
              "Cross-Site Request Forgery (CSRF) is an attack that forces an end user to execute unwanted actions on a web application in which they're currently authenticated.",
              "With a little help of social engineering (such as sending a link via email or chat), an attacker may trick the users of a web application into executing actions of the attacker's choosing."
            ]
          }
        ]
      },
      {
        title: "SQL Injection",
        content: [
          "SQL Injection is a code injection technique that might destroy your database. It is one of the most common web hacking techniques.",
          "SQL Injection is the placement of malicious code in SQL statements, via web page input."
        ],
        subsections: [
          {
            title: "How SQL Injection Works",
            content: [
              "SQL injection usually occurs when you ask a user for input, like their username/userid, and instead of a name/id, the user gives you an SQL statement that you will unknowingly run on your database.",
              "This technique works by placing a metacharacter into the input of a web form to allow the execution of SQL commands on a database server."
            ]
          },
          {
            title: "Preventing SQL Injection",
            content: [
              "Use Prepared Statements (with Parameterized Queries): Prepared statements ensure that an attacker is not able to change the intent of a query, even if SQL commands are inserted by an attacker.",
              "Use Stored Procedures: Stored procedures can help limit the types of statements that can be passed to the database, particularly if they don't include dynamic SQL generation.",
              "Validate Input: Validate user input to ensure that it contains only expected characters."
            ]
          }
        ]
      }
    ]
  },
  5: {
    sections: [
      {
        title: "Security Operations",
        content: [
          "Security operations refer to the processes that identify, contain, and remediate cyber threats. Security operations are designed to prevent cybersecurity breaches and minimize the time it takes to detect and respond to a breach.",
          "Effective security operations require a combination of technical solutions and well-defined policies and procedures."
        ],
        subsections: [
          {
            title: "Security Information and Event Management (SIEM)",
            content: [
              "SIEM is a software solution that aggregates and analyzes activity from many different resources across an entire IT infrastructure.",
              "SIEM provides real-time analysis of security alerts generated by applications and network hardware."
            ]
          },
          {
            title: "Incident Response",
            content: [
              "Incident response is an organized approach to addressing and managing the aftermath of a security breach or cyberattack, also known as an incident.",
              "The goal is to handle the situation in a way that limits damage and reduces recovery time and costs."
            ]
          }
        ]
      },
      {
        title: "Vulnerability Management",
        content: [
          "Vulnerability management is the process of identifying, evaluating, treating, and reporting on security vulnerabilities in systems and the software that runs on them.",
          "This is a continuous process that generally includes vulnerability scanning, vulnerability analysis, and remediation."
        ],
        subsections: [
          {
            title: "Vulnerability Scanning",
            content: [
              "Vulnerability scanning is an inspection of the potential points of exploit on a computer or network to identify security holes.",
              "Scanning tools assess computers, systems, networks, or applications for known vulnerabilities."
            ]
          },
          {
            title: "Patch Management",
            content: [
              "Patch management is the process of distributing and applying updates to software. These patches are often necessary to correct security vulnerabilities in an application.",
              "An effective patch management process is critical to maintaining operational efficiency, addressing security vulnerabilities, and maintaining regulatory compliance."
            ]
          }
        ]
      }
    ]
  },
  6: {
    sections: [
      {
        title: "Compliance and Risk Management",
        content: [
          "Compliance and risk management are essential aspects of cybersecurity that help organizations meet regulatory requirements and manage cyber risks effectively.",
          "These activities ensure that an organization's security controls are appropriate and proportionate to the risks the organization faces."
        ],
        subsections: [
          {
            title: "Regulatory Compliance",
            content: [
              "Regulatory compliance describes the goal that organizations aspire to achieve in their efforts to ensure that personnel are aware of and take steps to comply with relevant laws, policies, and regulations.",
              "Examples of regulatory frameworks include GDPR (General Data Protection Regulation), HIPAA (Health Insurance Portability and Accountability Act), and PCI DSS (Payment Card Industry Data Security Standard)."
            ]
          },
          {
            title: "Risk Assessment",
            content: [
              "Risk assessment is the identification of hazards that could negatively impact an organization's ability to conduct business.",
              "Risk assessments help organizations determine what resources to allocate and what security controls to implement to protect themselves from cyber threats."
            ]
          }
        ]
      },
      {
        title: "Security Awareness Training",
        content: [
          "Security awareness training is a formal process for educating employees about computer security. A good security awareness program should educate employees about corporate policies and procedures for working with information technology.",
          "Training helps minimize the risk of social engineering attacks and other security incidents caused by human error."
        ],
        subsections: [
          {
            title: "Phishing Awareness",
            content: [
              "Phishing awareness training teaches employees to identify and avoid phishing attacks, which attempt to steal sensitive information such as usernames, passwords, and credit card details.",
              "Regular simulated phishing exercises can help employees recognize phishing attempts and report them appropriately."
            ]
          },
          {
            title: "Social Engineering Awareness",
            content: [
              "Social engineering awareness training focuses on the psychological manipulation of people into performing actions or divulging confidential information.",
              "Employees are taught to recognize manipulation tactics and to follow security protocols even when under pressure from seemingly authoritative sources."
            ]
          }
        ]
      }
    ]
  }
};