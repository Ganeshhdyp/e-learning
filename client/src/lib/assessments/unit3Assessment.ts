// Assessment questions for Unit 3: Network Security

export const unit3Assessment = {
  unitId: 3,
  title: "Network Security Assessment",
  description: "Test your knowledge of network security concepts, protocols, and defense mechanisms.",
  questions: [
    {
      id: 1,
      text: "Which layer of the OSI model does a firewall typically operate on?",
      options: [
        "Physical Layer (Layer 1)",
        "Network Layer (Layer 3) and Transport Layer (Layer 4)",
        "Session Layer (Layer 5)",
        "Application Layer (Layer 7)"
      ],
      correctOption: 1,
      explanation: "Traditional firewalls typically operate at the Network Layer (Layer 3) and Transport Layer (Layer 4) of the OSI model, examining IP addresses and port numbers. Next-generation firewalls may also work at the Application Layer (Layer 7)."
    },
    {
      id: 2,
      text: "What is the main purpose of Network Address Translation (NAT)?",
      options: [
        "To encrypt network traffic",
        "To authenticate network users",
        "To modify IP address information in packet headers during transit",
        "To detect malware in network traffic"
      ],
      correctOption: 2,
      explanation: "Network Address Translation (NAT) modifies IP address information in packet headers while in transit across a routing device. NAT helps conserve IPv4 addresses by allowing private IP addresses to be used internally while sharing a single public IP address."
    },
    {
      id: 3,
      text: "Which of the following is NOT a common network scanning technique?",
      options: [
        "TCP SYN scan",
        "UDP scan",
        "RSA scan",
        "ICMP ping sweep"
      ],
      correctOption: 2,
      explanation: "RSA scan is not a network scanning technique. RSA is an encryption algorithm used in cryptography. Common network scanning techniques include TCP SYN scans, UDP scans, and ICMP ping sweeps, which are used to discover hosts and open ports on a network."
    },
    {
      id: 4,
      text: "What type of attack aims to exhaust a system's resources, making it unavailable to legitimate users?",
      options: [
        "Man-in-the-Middle attack",
        "SQL Injection",
        "Denial of Service (DoS) attack",
        "Cross-Site Scripting (XSS)"
      ],
      correctOption: 2,
      explanation: "Denial of Service (DoS) attacks aim to make a machine or network resource unavailable to its intended users by temporarily or indefinitely disrupting services. They work by overwhelming the target with excessive requests to the point where it cannot respond to legitimate traffic."
    },
    {
      id: 5,
      text: "Which protocol is designed to provide secure communication over a computer network?",
      options: [
        "HTTP",
        "FTP",
        "SMTP",
        "HTTPS"
      ],
      correctOption: 3,
      explanation: "HTTPS (Hypertext Transfer Protocol Secure) is designed to provide secure communication over a computer network by encrypting the data using TLS (Transport Layer Security) or its predecessor, SSL (Secure Sockets Layer)."
    },
    {
      id: 6,
      text: "What is a DMZ in network security?",
      options: [
        "A physical zone where network devices are stored",
        "A subnet that contains and exposes external-facing services",
        "A type of firewall that blocks all traffic",
        "A wireless network security protocol"
      ],
      correctOption: 1,
      explanation: "A DMZ (Demilitarized Zone) is a physical or logical subnet that contains and exposes an organization's external-facing services to an untrusted network, usually the internet. It serves as a buffer zone between the public internet and the private network."
    },
    {
      id: 7,
      text: "What is the purpose of an intrusion detection system (IDS)?",
      options: [
        "To prevent unauthorized access to a network",
        "To monitor network traffic for suspicious activity",
        "To encrypt data during transmission",
        "To speed up network connections"
      ],
      correctOption: 1,
      explanation: "An intrusion detection system (IDS) monitors network traffic for suspicious activity and policy violations. Its main purpose is to identify potential security breaches, typically by analyzing patterns of traffic or known attack signatures."
    },
    {
      id: 8,
      text: "Which of the following is a secure remote access method?",
      options: [
        "Telnet",
        "SSH (Secure Shell)",
        "SMTP",
        "HTTP"
      ],
      correctOption: 1,
      explanation: "SSH (Secure Shell) is a cryptographic network protocol that provides a secure way to access a remote computer. Unlike Telnet, which sends data in plaintext, SSH encrypts all traffic, making it a secure remote access method."
    },
    {
      id: 9,
      text: "What is a honeypot in network security?",
      options: [
        "A security tool that blocks malicious websites",
        "A decoy system designed to attract attackers",
        "A type of encryption algorithm",
        "A protocol for secure email transmission"
      ],
      correctOption: 1,
      explanation: "A honeypot is a security mechanism consisting of a decoy system designed to look like a legitimate part of the network but isolated and monitored. It is set up to attract and trap attackers to study their attack methods and gather intelligence."
    },
    {
      id: 10,
      text: "Which of the following is NOT a common wireless network security protocol?",
      options: [
        "WEP (Wired Equivalent Privacy)",
        "WPA2 (Wi-Fi Protected Access 2)",
        "HTTPS (Hypertext Transfer Protocol Secure)",
        "WPA3 (Wi-Fi Protected Access 3)"
      ],
      correctOption: 2,
      explanation: "HTTPS is not a wireless network security protocol. It is a protocol for secure communication over a computer network. WEP, WPA2, and WPA3 are all wireless security protocols designed to protect wireless networks from unauthorized access."
    }
  ]
};