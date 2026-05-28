import { createMarkdownProcessor } from '@astrojs/markdown-remark';

let processor: Awaited<ReturnType<typeof createMarkdownProcessor>> | null = null;

async function getProcessor() {
  if (!processor) {
    processor = await createMarkdownProcessor();
  }
  return processor;
}

export function parseGitHubUrl(url: string): { owner: string; repo?: string } | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== 'github.com') return null;
    const parts = parsed.pathname.replace(/^\//, '').replace(/\.git$/, '').split('/').filter(Boolean);
    if (parts.length < 2) return null;
    return { owner: parts[0], repo: parts[1] };
  } catch {
    return null;
  }
}

interface FetchResult {
  markdown: string;
  branch: string;
}

async function fetchFromRaw(owner: string, repo: string, branch: string): Promise<string | null> {
  const response = await fetch(
    `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`,
    { headers: { Accept: 'text/plain' } },
  );
  if (!response.ok) return null;
  const text = await response.text();
  return text.trim() ? text : null;
}

async function fetchFromGitHubApi(owner: string, repo: string): Promise<FetchResult | null> {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
    headers: {
      Accept: 'application/vnd.github.raw',
      'User-Agent': 'ryanwilsonio-portfolio',
    },
  });
  if (!response.ok) return null;

  const markdown = await response.text();
  if (!markdown.trim()) return null;

  const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'ryanwilsonio-portfolio' },
  });
  const branch = repoResponse.ok
    ? ((await repoResponse.json()) as { default_branch?: string }).default_branch ?? 'main'
    : 'main';

  return { markdown, branch };
}

async function fetchGitHubReadme(owner: string, repo: string): Promise<FetchResult | null> {
  const branches = ['main', 'master'];

  for (const branch of branches) {
    try {
      const markdown = await fetchFromRaw(owner, repo, branch);
      if (markdown) return { markdown, branch };
    } catch {
      // try next branch
    }
  }

  try {
    return await fetchFromGitHubApi(owner, repo);
  } catch {
    return null;
  }
}

const RELATIVE_RE = /^(?!https?:\/\/|ftp:\/\/|data:|mailto:|#|\/\/)/i;

function resolveMarkdownUrls(markdown: string, baseUrl: string): string {
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  const resolveUrl = (url: string): string => {
    const trimmed = url.trim();
    if (!RELATIVE_RE.test(trimmed)) return url;
    const clean = trimmed.replace(/^\.\//, '');
    return normalizedBase + clean;
  };

  let result = markdown;

  result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt, url) => {
    return `![${alt}](${resolveUrl(url)})`;
  });

  result = result.replace(/(?<!!)\[([^\]]*)\]\(([^)]+)\)/g, (_match, text, url) => {
    return `[${text}](${resolveUrl(url)})`;
  });

  result = result.replace(/(<img\s[^>]*?src\s*=\s*")([^"]*)(")/g, (_match, prefix, url, suffix) => {
    return prefix + resolveUrl(url) + suffix;
  });

  result = result.replace(/(<a\s[^>]*?href\s*=\s*")([^"]*)(")/g, (_match, prefix, url, suffix) => {
    return prefix + resolveUrl(url) + suffix;
  });

  return result;
}

function stripFirstH1(markdown: string): string {
  return markdown.replace(/^#\s+.+$/m, '').replace(/^\s*\n/, '').trimStart();
}

export function markdownToPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/^#+\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function excerptPlainText(text: string, length = 100): string {
  const plain = markdownToPlainText(text);
  if (!plain) return '';
  if (plain.length <= length) return plain;
  return `${plain.slice(0, length).trimEnd()}…`;
}

export async function getGitHubReadmeMarkdown(githubUrl: string): Promise<string | null> {
  const parsed = parseGitHubUrl(githubUrl);
  if (!parsed?.repo) return null;

  const result = await fetchGitHubReadme(parsed.owner, parsed.repo);
  if (!result) return null;

  return stripFirstH1(result.markdown);
}

export async function getGitHubReadmeExcerpt(githubUrl: string, length = 100): Promise<string | null> {
  try {
    const markdown = await getGitHubReadmeMarkdown(githubUrl);
    if (!markdown) return null;
    const excerpt = excerptPlainText(markdown, length);
    return excerpt || null;
  } catch (e) {
    console.error(`getGitHubReadmeExcerpt error for ${githubUrl}:`, e);
    return null;
  }
}

export async function getGitHubReadmeHtml(githubUrl: string): Promise<string | null> {
  try {
    const parsed = parseGitHubUrl(githubUrl);
    if (!parsed?.repo) return null;

    const result = await fetchGitHubReadme(parsed.owner, parsed.repo);
    if (!result) return null;

    const baseUrl = `https://raw.githubusercontent.com/${parsed.owner}/${parsed.repo}/${result.branch}/`;
    const processed = resolveMarkdownUrls(result.markdown, baseUrl);
    const withoutH1 = stripFirstH1(processed);

    const p = await getProcessor();
    const rendered = await p.render(withoutH1);
    const html = rendered.code?.trim();
    return html || null;
  } catch (e) {
    console.error(`getGitHubReadmeHtml error for ${githubUrl}:`, e);
    return null;
  }
}
