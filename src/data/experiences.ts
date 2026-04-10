import ryanwilsonioIcon2 from '../assets/experience/ryanwilsonio2.png';
import ryanwilsonioIcon from '../assets/experience/ryanwilsonio.png';
import dhpaceIcon from '../assets/experience/dhpace.png';
import blueallyIcon from '../assets/experience/blueally.webp';
import caseysIcon from '../assets/experience/caseys.svg';
import microsoftIcon from '../assets/experience/microsoft.svg';

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
    icon: ryanwilsonioIcon2,
    title: 'Freelance Developer',
    company: 'ryanwilson.io',
    period: 'Nov 2024 - Present',
    description: 'Develop web applications and full-stack solutions for small business clients across a range of modern frameworks and cloud platforms.',
    achievements: [
      'Develop web applications using React and Next.js, along with WordPress sites for small business clients',
      'Project specific, full-stack applications using Next.js, Vue/Nuxt, SvelteKit, and Laravel',
      'Build backend APIs and services using Node.js, Express, GraphQL, tRPC, and Supabase',
      'Deploy applications across AWS, Vercel, Netlify, Linode, and DigitalOcean',
      'Implement CI/CD pipelines, CDN distribution, and Redis caching with Upstash',
      'Design application data layers using PostgreSQL, SQLite, MongoDB, and MariaDB',
      'Manage full project lifecycle including client onboarding, architecture, deployment, and support',
    ],
  },
  {
    icon: dhpaceIcon,
    title: 'Systems Engineer',
    company: 'DH Pace',
    period: 'Jul 2023 - Aug 2024',
    description: 'Administered enterprise IT infrastructure and security across hybrid environments.',
    achievements: [
      'Administered VMware vSphere infrastructure (vCenter, ESXi) across hybrid environments',
      'Managed AWS workloads and Cisco Meraki cloud-managed networking',
      'Deployed and maintained Fortinet NGFW policies and site-to-site VPN infrastructure',
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
      'Provided IT consulting and infrastructure support for small and mid-sized businesses',
      'Managed Windows Server and Linux environments including Active Directory and Group Policy',
      'Supported AWS and Microsoft Azure infrastructure deployments',
      'Performed infrastructure troubleshooting, system upgrades, and maintenance',
      'Assisted clients with network configuration, system administration, and operational support',
    ],
  },
  {
    icon: blueallyIcon,
    title: 'Systems Administrator',
    company: 'BlueAlly',
    period: 'Oct 2019 - Dec 2021',
    description: 'Provided managed IT support and infrastructure management for multiple enterprise environments while maintaining strict SLAs.',
    achievements: [
      'Managed Fortinet Security Fabric deployments, Cisco ASA, and Cisco Firepower firewalls',
      'Implemented Riverbed SteelHead WAN optimization appliances',
      'Deployed Talari SD-WAN solutions to improve connectivity across distributed sites',
      'Administered Linux servers, including package management, services, and automation scripts',
      'Maintained strict SLA requirements across managed enterprise environments',
    ],
  },
  {
    icon: caseysIcon,
    title: 'Help Desk Specialist (Contract)',
    company: "Casey's General Stores",
    period: 'Jul 2019 - Oct 2019',
    description: 'Supported rollout of the online ordering platform across retail locations.',
    achievements: [
      'Supported rollout of Casey\'s online ordering platform across retail locations',
      'Assisted with incident triage, ticket resolution, and remote troubleshooting',
      'Provided technical support for store systems and retail infrastructure',
      'Worked with deployment teams during rollout of new ordering systems',
    ],
  },
  {
    icon: microsoftIcon,
    title: 'Datacenter Technician (Contract)',
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
