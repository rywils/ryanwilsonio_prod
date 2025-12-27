

export type BlogTagConfig = {
  label: string;
  color: string;
};


export const BLOG_TAGS: Record<string, BlogTagConfig> = {
  cybersecurity: { label: 'Cybersecurity', color: '#390062' },
  infosec: { label: 'InfoSec', color: '#0cce35' },
  security: { label: 'Security', color: '#8cd0a4' },
  hacking: { label: 'Hacking', color: '#7d6277' },
  pentesting: { label: 'Pentesting', color: '#7248ad' },
  bugbounty: { label: 'Bugbounty', color: '#477183' },
  redteam: { label: 'Redteam', color: '#347a3f' },
  blueteam: { label: 'Blueteam', color: '#2c833f' },
  soc: { label: 'SOC', color: '#d80623' },
  incidentresponse: { label: 'Incidentresponse', color: '#1045d1' },
  dfir: { label: 'DFIR', color: '#0f4194' },
  forensics: { label: 'Forensics', color: '#2ff8d2' },
  malware: { label: 'Malware', color: '#6ff151' },
  ransomware: { label: 'Ransomware', color: '#771f54' },
  reverseengineering: { label: 'Reverseengineering', color: '#0d961f' },
  threatintel: { label: 'Threatintel', color: '#65ce0c' },
  osint: { label: 'OSINT', color: '#d6cb4d' },
  siem: { label: 'SIEM', color: '#70dd97' },
  firewall: { label: 'Firewall', color: '#e5fe52' },
  zerotrust: { label: 'Zerotrust', color: '#8e6f03' },
  iam: { label: 'IAM', color: '#51be7a' },
  oauth: { label: 'OAuth', color: '#d860ea' },
  jwt: { label: 'JWT', color: '#ae35be' },
  tls: { label: 'TLS', color: '#8c03a3' },
  cryptography: { label: 'Cryptography', color: '#51d8ae' },
  privacy: { label: 'Privacy', color: '#8e4f6e' },
  gdpr: { label: 'Gdpr', color: '#ac342f' },
  compliance: { label: 'Compliance', color: '#c231b7' },
  cve: { label: 'CVE', color: '#b08716' },
  exploits: { label: 'Exploits', color: '#eb3fc1' },
  websecurity: { label: 'Websecurity', color: '#37d9b8' },
  appsec: { label: 'AppSec', color: '#9b6217' },
  cloudsecurity: { label: 'Cloudsecurity', color: '#84e9c6' },
  devsecops: { label: 'DevSecOps', color: '#aaecb4' },
  devops: { label: 'DevOps', color: '#a043ba' },
  sre: { label: 'SRE', color: '#3f7f1f' },
  cloud: { label: 'Cloud', color: '#0f2f4c' },
  aws: { label: 'AWS', color: '#d2b6a3' },
  azure: { label: 'Azure', color: '#4a6a5e' },
  gcp: { label: 'GCP', color: '#c12621' },
  kubernetes: { label: 'Kubernetes', color: '#2a8d2f' },
  docker: { label: 'Docker', color: '#6c5b08' },
  containers: { label: 'Containers', color: '#a54b5f' },
  linux: { label: 'Linux', color: '#f5c06f' },
  windows: { label: 'Windows', color: '#b6b83c' },
  macos: { label: 'Macos', color: '#4d3e7a' },
  networking: { label: 'Networking', color: '#c85f8f' },
  tcpip: { label: 'TCP/IP', color: '#a71a1f' },
  dns: { label: 'Dns', color: '#b1cc3c' },
  http: { label: 'Http', color: '#1b0f07' },
  https: { label: 'HTTPS', color: '#3f1f65' },
  api: { label: 'API', color: '#b3f38f' },
  rest: { label: 'REST', color: '#c76403' },
  graphql: { label: 'GraphQL', color: '#cd9c10' },
  backend: { label: 'Backend', color: '#9ef1d0' },
  frontend: { label: 'Frontend', color: '#a7a618' },
  webdev: { label: 'Web Dev', color: '#c7e786' },
  javascript: { label: 'Javascript', color: '#7f7f0e' },
  typescript: { label: 'Typescript', color: '#5d3b79' },
  python: { label: 'Python', color: '#b7a1d0' },
  golang: { label: 'Go', color: '#9b6d0a' },
  rust: { label: 'Rust', color: '#8e91e8' },
  c: { label: 'C', color: '#257512' },
  cpp: { label: 'C++', color: '#a04d68' },
  java: { label: 'Java', color: '#34571e' },
  csharp: { label: 'C#', color: '#67e3e4' },
  php: { label: 'Php', color: '#d1f7f0' },
  nodejs: { label: 'Node.js', color: '#1e1d4a' },
  react: { label: 'React', color: '#d4a52b' },
  nextjs: { label: 'Next.js', color: '#e00a2b' },
  svelte: { label: 'Svelte', color: '#de3f12' },
  sveltekit: { label: 'SvelteKit', color: '#afc1a1' },
  astro: { label: 'Astro', color: '#6088d9' },
  tailwindcss: { label: 'Tailwind CSS', color: '#a84b53' },
  css: { label: 'Css', color: '#3b38b9' },
  html: { label: 'Html', color: '#8d65a7' },
  databases: { label: 'Databases', color: '#61a9f4' },
  sql: { label: 'SQL', color: '#ac0a3a' },
  postgresql: { label: 'PostgreSQL', color: '#3f4a85' },
  mysql: { label: 'MySQL', color: '#7f2242' },
  mongodb: { label: 'MongoDB', color: '#c2c7d6' },
  redis: { label: 'Redis', color: '#4b4a61' },
  automation: { label: 'Automation', color: '#10a5fd' },
  scripting: { label: 'Scripting', color: '#9b8c20' },
  bash: { label: 'Bash', color: '#6f0d9a' },
  powershell: { label: 'Powershell', color: '#a7b7d0' },
  git: { label: 'Git', color: '#c2f1da' },
  github: { label: 'Github', color: '#e6ffb1' },
  cicd: { label: 'Cicd', color: '#f2ed66' },
  testing: { label: 'Testing', color: '#69b6bb' },
  performance: { label: 'Performance', color: '#8d4a86' },
  architecture: { label: 'Architecture', color: '#94a6bd' },
  systemdesign: { label: 'Systemdesign', color: '#2c2c73' },
  microservices: { label: 'Microservices', color: '#5fdfd9' },
  serverless: { label: 'Serverless', color: '#2fd45f' },
  iot: { label: 'IoT', color: '#d1b407' },
  blockchain: { label: 'Blockchain', color: '#a3f2b5' },
  ai: { label: 'AI', color: '#d66f8d' },
  machinelearning: { label: 'Machinelearning', color: '#f27a06' },
  datascience: { label: 'Datascience', color: '#9f5f9c' },
    
  laravel:       { label: 'Laravel',        color: '#ff2d20' },
  rails:         { label: 'Ruby on Rails',  color: '#cc0000' },
  rubyonrails:   { label: 'Ruby on Rails',  color: '#cc0000' },

  
  cloudflare:    { label: 'Cloudflare',     color: '#f38020' },
  workers:       { label: 'Cloudflare Workers', color: '#f38020' },
  pages:         { label: 'Cloudflare Pages',   color: '#f38020' },
  waf:           { label: 'WAF',            color: '#f38020' },

};



export function normalizeBlogTag(input: string): string {
  return (input ?? '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        
    .replace(/c\+\+/g, 'cpp')    
    .replace(/c#/g, 'csharp')    
    .replace(/[^a-z0-9-]/g, '')  
    .replace(/-+/g, '-')        
    .replace(/ruby-on-rails/g, 'rails')
    .replace(/ruby\s*on\s*rails/g, 'rails')
    .replace(/cloudflare-workers/g, 'workers')
    .replace(/cloudflare-pages/g, 'pages')
    .replace(/^cf$/, 'cloudflare')



}

export function getBlogTagConfig(tag: string): BlogTagConfig {
  const key = normalizeBlogTag(tag);
  return BLOG_TAGS[key] ?? { label: tag, color: '#6b7280' }; 
}
