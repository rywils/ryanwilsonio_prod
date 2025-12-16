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
    company: 'ryanwilsonio',
    period: '2024 - Present',
    description: 'I provide comprehensive full-stack web development and consulting services for small business clients, specializing in modern application development, company branding and marketing with a website tailored to business needs.',
    achievements: [
      'Tailored web solutions at half the cost of traditional agencies',
      'On average, clients saw a 150% increase in web traffic',
    ],
  },
  {
    icon: dhpaceIcon,
    title: 'Systems Engineer',
    company: 'DH Pace',
    period: '2023 - 2024',
    description: 'Managed enterprise IT infrastructure and security utilizing external and in-house tools for automation and infrastructure visibility.',
    achievements: [
      'Managed AWS infrastructure',
      'Configured and maintained Cisco Meraki cloud-managed network devices',
      'Deployed, configured, and maintained FortiGate firewalls',
    ],
  },
  {
    icon: ryanwilsonioIcon,
    title: 'IT Consultant',
    company: 'RYIO Consulting',
    period: '2022 - 2023',
    description: 'Provided comprehensive IT consulting, Tier 1-3 help desk support, and infrastructure management for small to medium-sized businesses.',
    achievements: [
      'Managed Cisco, Juniper, and Aruba environments',
      'Configured routing & segmentation (OSPF, EIGRP, BGP, VLANs)',
      'Administered Azure, AWS, Linux, and Windows Server',
    ],
  },
  {
    icon: blueallyIcon,
    title: 'Technical Support Specialist',
    company: 'BlueAlly',
    period: '2019 - 2021',
    description: 'Provided managed IT support and infrastructure management for multiple environments while maintaining SLAs.',
    achievements: [
      'Monitored WAN & LAN infrastructure with LogicMonitor',
      'Deployed Riverbed Steelheads for WAN optimization',
      'Configured Talari SD-WAN solutions',
      'Configured and managed Forigate Firewells, Sophos, and more'
    ],
  },
  {
    icon: caseysIcon,
    title: "Temp Help Desk Specialist",
    company: "Casey's General Stores",
    period: '2019',
    description: 'Contributed to the rollout of the new online ordering system across the Midwest.',
    achievements: [
      'OMS rollout for new online ordering system',
      'Provided escalated support for system issues',
    ],
  },
  {
    icon: microsoftIcon,
    title: 'Datacenter Technician',
    company: 'Microsoft',
    period: '2017 - 2018',
    description: 'Maintained server hardware and connectivity for Azure datacenters.',
    achievements: [
      'Diagnosed/troubleshot hardware failures',
      'Responded to SLA-driven incident tickets',
      'Performed rack deployments, decomms, hardware replacements',
    ],
  },
];
