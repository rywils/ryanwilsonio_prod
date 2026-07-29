import ryanwilsonioIcon2 from '../assets/experience/ryanwilsonio2.webp';
import ryanwilsonioIcon from '../assets/experience/ryanwilsonio.webp';
import dhpaceIcon from '../assets/experience/dhpace.webp';
import blueallyIcon from '../assets/experience/blueally.webp';
import caseysIcon from '../assets/experience/caseys.svg';
import microsoftIcon from '../assets/experience/microsoft.svg';
import agisIcon from '../assets/experience/a9is.webp';


export interface ExperienceItem {
  icon: ImageMetadata;
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export const experiences: ExperienceItem[] = [
  {
    icon: agisIcon,
    title: 'Founding AI / Software Engineer',
    company: 'AGIS Global',
    period: 'May 2026 - Present',
    description: 'Designed and built the company\'s entire technology stack from the ground up, including enterprise networking, Linux infrastructure, hybrid AWS cloud, DevOps, security, internal, and production software developed in Rust, Go, TypeScript, and C#.',
    achievements: [
      'Built a custom Rust based orchestration layer for zero-copy IPC, eliminating Python GIL bottlenecks for high-throughput AI request handling',
      'Designed and shipped a modular, model-agnostic AI agent framework, portable across environments with interchangeable LLM backends, deployed live with domain-restricted access control via Clerk',
      'Developed business-critical internal platforms including an employee management portal & timeclock, ITSM platform, infrastructure management console, and customer-facing web applications',
      'Implemented Infrastructure as Code using Ansible for bare-metal provisioning and Terraform for cloud failover on AWS',
      'Deployed self-hosted observability stack via Grafana, Prometheus, Loki, and Jaeger alongside CI/CD via self-hosted GitLab',
      'Architected and deployed a multi-node bare-metal NVIDIA DGX Spark GPU cluster with a dedicated 400G RoCE RDMA fabric via Arista, purpose-built for large-scale AI inference',
      'Designed full enterprise network topology across Juniper BGP border routing and perimeter firewall, and Cisco Nexus spine/leaf switching. Production-grade from day one',
      'Defined and enforced security posture across IAM, endpoint detection, and secret management',
      'Onboarded and led incoming engineering hires, establishing team workflows, repository standards, security protocols, and access controls as the organization scaled',
    ],
  },
  {
    icon: ryanwilsonioIcon2,
    title: 'Freelance Developer',
    company: 'ryanwilson.io',
    period: 'Nov 2024 - May 2026',
    description: 'Develop web applications and full-stack solutions for small business clients across a range of modern frameworks and cloud platforms.',
    achievements: [
      'Built responsive web applications using React/Next.js, React Native, Vue/Nuxt, SvelteKit, and Laravel, along with WordPress sites for small business clients',
      'Engineered type-safe APIs with Node.js/Express, tRPC, GraphQL, gRPC, and Supabase',
      'Managed databases including PostgreSQL, MongoDB, MariaDB, and TimescaleDB, using Prisma ORM',
      'Deployed applications on AWS (RDS, Lightsail, Cognito), Vercel, Heroku, Linode, Netlify, and DigitalOcean',
      'Implemented authentication, CI/CD, CDN distribution, and real-time caching with Redis',
      'Utilized project-specific CMS systems including headless WordPress, Sanity.io, Strapi, and Contentful',
      'Managed full project lifecycle including continuous client prospecting, onboarding, architecture, deployment, and support',
    ],
  },
  {
    icon: dhpaceIcon,
    title: 'Systems Engineer',
    company: 'DH Pace',
    period: 'Jul 2023 - Aug 2024',
    description: 'Administered enterprise IT infrastructure and security across hybrid environments.',
    achievements: [
      'Administered VMware environments including vCenter, ESXi hosts, VM provisioning, and VM management across hybrid environments',
      'Managed AWS infrastructure including S3, VPC, and IAM policies',
      'Configured and maintained Cisco Meraki cloud-managed networks, including SD-WAN solutions',
      'Deployed, configured, and maintained Fortinet firewalls and VPNs with policy configuration and IPSEC tunneling',
      'Supported Cisco and Aruba networking equipment across enterprise locations',
      'Implemented CrowdStrike Falcon endpoint protection across enterprise endpoints',
    ],
  },
  {
    icon: ryanwilsonioIcon,
    title: 'Freelance Consultant',
    company: 'RYIO Consulting',
    period: 'Mar 2022 - Jun 2023',
    description: 'Provided IT consulting and infrastructure support for small and mid-sized businesses.',
    achievements: [
      'Provided comprehensive IT consulting services and delivered Tier 1–3 help desk support for small to mid-sized businesses',
      'Managed and maintained network infrastructure, working primarily with Cisco, Juniper, and Aruba equipment',
      'Configured advanced network features including VLAN segmentation, routing (OSPF, EIGRP, BGP), and QoS policies',
      'Administered Microsoft Azure and AWS environments; deployed SentinelOne and various SIEM solutions',
      'Managed Windows Server and Linux environments, including Active Directory, Group Policy, and automated backups',
    ],
  },
  {
    icon: blueallyIcon,
    title: 'Systems Administrator',
    company: 'BlueAlly',
    period: 'Oct 2019 - Dec 2021',
    description: 'Provided managed IT support and infrastructure management for multiple enterprise environments while maintaining strict SLAs.',
    achievements: [
      'Monitored client infrastructure using RMM tools (LogicMonitor) and responded to alerts proactively',
      'Implemented and managed diverse network hardware, including L2/L3 Cisco switches, Cisco routers, Cisco Meraki, Juniper, Aruba, Palo Alto, ASA, and Firepower NGFW',
      'Deployed and managed Riverbed Steelheads for increased network performance and content delivery across the WAN',
      'Deployed and configured Talari SD-WAN solutions',
      'Administered Linux servers, including package management, service configuration, and shell scripting',
      'VMware administration',
      'Citrix XenDesktop administration',
      'Veeam backup and disaster recovery',
    ],
  },
  {
    icon: caseysIcon,
    title: 'Help Desk Specialist (Contract)',
    company: "Casey's General Stores",
    period: 'Jul 2019 - Oct 2019',
    description: 'Supported rollout of the online ordering platform across retail locations.',
    achievements: [
      'Contributed to the rollout and deployment of the new online ordering system across all Midwest retail locations',
      'Assisted with incident triage, ticket resolution, and remote troubleshooting',
      'Provided technical support for store systems and retail infrastructure',
      'Worked with deployment teams during rollout of new ordering systems',
    ],
  },
  {
    icon: microsoftIcon,
    title: 'Datacenter Technician',
    company: 'Microsoft',
    period: 'Nov 2017 - Dec 2018',
    description: 'Maintained server hardware and connectivity for Azure datacenters.',
    achievements: [
      'Diagnosed and triaged server and hardware failures across datacenter clusters',
      'Performed Cisco Nexus switch configuration and network troubleshooting',
      'Assisted with rack deployments and server cluster provisioning',
      'Maintained compliance with strict Microsoft SLAs for outages and hardware failures',
    ],
  },
];
