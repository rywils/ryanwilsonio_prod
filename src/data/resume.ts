export const resume = {
  name: "Ryan Wilson",
  title: "Security Engineer",
  location: "Des Moines, IA (Open to Remote)"
  email: "ryan@ryanwilson.io",

  links: [
    { label: "ryanwilson.io", href: "https://ryanwilson.io" },
    { label: "github.com/rywils", href: "https://github.com/rywils" },
    { label: "linkedin.com/in/rywils", href: "https://linkedin.com/in/rywils" },
  ],

  summary: `Security-focused engineer with experience across networking, systems administration, and infrastructure operations. Specialized in enterprise networking, Linux systems, and cloud environments, with hands-on experience in a variety of technologies including FortiGate NGFW, Cisco Firepower, CrowdStrike Falcon, and Snort. Currently pursuing a B.S. in Cybersecurity and Information Assurance. Focused on security engineering, infrastructure security, and AI-driven security systems.`,

  skills: [
    {
      title: "Security",
      items: "Vulnerability assessment, threat detection, incident response, network segmentation, Fortinet NGFW, Cisco Firepower, Snort, CrowdStrike Falcon, Splunk, Wireshark, Nmap, Burp Suite"
    },
    {
      title: "Networking",
      items: "TCP/IP, VLANs, VPNs, routing & switching, DNS, DHCP, Cisco, Juniper, Aruba, pfSense, Riverbed, Talari SD-WAN"
    },
    {
      title: "Systems",
      items: "Linux administration, Windows Server, Active Directory, system hardening, VMware, Proxmox, Hyper-V, Ubuntu, RHEL, Debian, Kali, AlmaLinux, SELinux"
    },
    {
      title: "Cloud / Infrastructure",
      items: "AWS, Azure, GCP, Terraform, Ansible, Docker, Kubernetes, VPC networking, WAF, CloudFront/CDN, CloudWatch"
    },
    {
      title: "Development",
      items: "JavaScript/TypeScript, Python, Go, C, C#, PHP, Node.js, React, REST APIs, GraphQL, Supabase, PostgreSQL, MySQL, MariaDB"
    }
  ],

  experience: [
    {
      role: "Senior Infrastructure Engineer",
      company: "AGIS Global",
      date: "May 2026 – Present",
      bullets: [
        "Designed and built the entire infrastructure stack from scratch at a pre-launch startup spanning platform, backend, DevOps, SRE, and security simultaneously",
        "Architected and deployed a multi-node bare-metal NVIDIA DGX Spark GPU cluster with a dedicated 400G RoCE RDMA fabric via Arista for large-scale AI inference",
        "Architected datacenter migration and expansion from on-premise infrastructure to co-location",
        "Designed enterprise network topology across Juniper BGP border routing, perimeter firewalls, and Cisco Nexus spine/leaf switching",
        "Built a custom Rust-based orchestration layer for zero-copy IPC, eliminating Python GIL bottlenecks for high-throughput AI request handling",
        "Implemented Infrastructure as Code using Ansible for bare-metal provisioning and Terraform for AWS cloud failover",
        "Deployed self-hosted observability stack using Grafana, Prometheus, Loki, and Jaeger alongside self-hosted GitLab CI/CD",
        "Defined and enforced security posture across IAM, endpoint detection, and secret management",
        "Onboarded and led engineering hires, establishing workflows, repository standards, security protocols, and access controls"
      ]
    },
    {
      role: "Freelance Developer",
      company: "ryanwilson.io",
      date: "Nov 2024 – Present",
      bullets: [
        "Develop web applications using React and Next.js, along with WordPress sites for small business clients",
        "Project-specific full-stack applications using Next.js, Vue/Nuxt, SvelteKit, and Laravel",
        "Build backend APIs and services using Node.js, Express, GraphQL, tRPC, and Supabase",
        "Deploy applications across AWS, Vercel, Netlify, Linode, and DigitalOcean",
        "Implement CI/CD pipelines, CDN distribution, and Redis caching with Upstash",
        "Design application data layers using PostgreSQL, SQLite, MongoDB, and MariaDB",
        "Manage full project lifecycle including client onboarding, architecture, deployment, and support"
      ]
    },
    {
      role: "Systems Engineer",
      company: "DH Pace",
      date: "Jul 2023 – Aug 2024",
      bullets: [
        "Administered VMware vSphere infrastructure (vCenter, ESXi) across hybrid environments",
        "Managed AWS workloads and Cisco Meraki cloud-managed networking",
        "Deployed and maintained Fortinet NGFW policies and site-to-site VPN infrastructure",
        "Supported Cisco and Aruba networking equipment across enterprise locations",
        "Implemented CrowdStrike Falcon endpoint protection across enterprise endpoints"
      ]
    },
    {
      role: "Freelance Consultant",
      company: "RYIO Consulting",
      date: "Mar 2022 – Jun 2023",
      bullets: [
        "Provided IT consulting and infrastructure support for small and mid-sized businesses",
        "Managed Windows Server and Linux environments including Active Directory and Group Policy",
        "Supported AWS and Microsoft Azure infrastructure deployments",
        "Performed infrastructure troubleshooting, system upgrades, and maintenance",
        "Assisted clients with network configuration, system administration, and operational support"
      ]
    },
    {
      role: "Systems Administrator",
      company: "BlueAlly",
      date: "Oct 2019 – Dec 2021",
      bullets: [
        "Managed Fortinet Security Fabric deployments, Cisco ASA, and Cisco Firepower firewalls",
        "Implemented Riverbed SteelHead WAN optimization appliances",
        "Deployed Talari SD-WAN solutions to improve connectivity across distributed sites",
        "Administered Linux servers, including package management, services, and automation scripts",
        "Maintained strict SLA requirements across managed enterprise environments"
      ]
    },
    {
      role: "Help Desk Specialist (Contract)",
      company: "Casey's General Stores",
      date: "Jul 2019 – Oct 2019",
      bullets: [
        "Supported rollout of Casey's online ordering platform across retail locations",
        "Assisted with incident triage, ticket resolution, and remote troubleshooting",
        "Provided technical support for store systems and retail infrastructure",
        "Worked with deployment teams during rollout of new ordering systems"
      ]
    },
    {
      role: "Datacenter Technician (Contract)",
      company: "Microsoft",
      date: "Nov 2017 – Dec 2018",
      bullets: [
        "Diagnosed and triaged server and hardware failures across datacenter clusters",
        "Performed Cisco Nexus switch configuration and network troubleshooting",
        "Assisted with rack deployments and server cluster provisioning",
        "Maintained compliance with strict Microsoft SLAs for outages and hardware failures"
      ]
    }
  ],

  projects: [
    {
      name: "Kitscan",
      subtitle: "Web application for code analysis",
      date: "Nov 2025 – Apr 2026",
      bullets: [
        "Built a local static analysis and dependency vulnerability scanning tool for identifying security issues in source code",
        "Implemented multi-phase scanning (baseline + deep analysis) to refine findings and reduce false positives",
        "Integrated OSV.dev vulnerability lookups to detect known CVEs in dependencies",
        "Developed rule-based detection for insecure coding patterns, exposed secrets, and misconfigurations",
        "Generated structured findings with severity, file location, and remediation guidance aligned to OWASP and CWE standards"
      ]
    },
    {
      name: "BitSentry",
      subtitle: "Security Assessment Platform",
      date: "2025 – Present",
      bullets: [
        "Released a modular CLI-based security assessment suite for attack-surface discovery, vulnerability scanning, and reporting",
        "Built BitScope, BitProbe, BitReport, and BitAI as integrated platform components",
        "Developed plugin-based scanning pipelines for web application analysis, TLS misconfiguration detection, exposed services, and CVE identification",
        "Implemented automated crawl and attack-surface enumeration workflows",
        "Designed CI/CD and Docker-compatible execution paths",
        "Built reporting outputs in JSON, Markdown, PDF, and HTML",
        "Structured the platform for future offensive security and monitoring modules"
      ]
    }
  ],

  education: [
    {
      school: "Western Governors University",
      degree: "B.S. Cybersecurity and Information Assurance",
      date: "In Progress (Started January 2026)"
    },
    {
      school: "Des Moines Area Community College",
      degree: "A.A.S. Information Technology - Network Administration",
      date: "Graduated May 2016"
    }
  ],

  certifications: [
    "ISC2 Certified in Cybersecurity (CC)",
    "LogicMonitor Certified Professional (Expired)",
    "Riverbed RCPE Associate (Expired)",
    "Fortinet NSE3 (Expired)"
  ]
};
