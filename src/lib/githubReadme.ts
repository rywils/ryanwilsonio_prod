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
  const slice = plain.slice(0, length);
  const lastSpace = slice.lastIndexOf(' ');
  const trimmed = (lastSpace > length * 0.55 ? slice.slice(0, lastSpace) : slice).trimEnd();
  return `${trimmed}…`;
}

function stripPreviewMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/^\|.+\|\s*\n\|[-:\s|]+\|\s*\n(?:\|.+\|\s*\n?)*/gm, '')
    .trim();
}

function splitMarkdownBlocks(markdown: string): string[] {
  return markdown
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}

function isListBlock(block: string): boolean {
  return block.split('\n').every((line) => /^\s*(?:[-*+]|\d+\.)\s+/.test(line) || !line.trim());
}

function excerptListBlock(block: string, remaining: number): string {
  const lines = block.split('\n').filter((line) => line.trim());
  const kept: string[] = [];
  let plain = 0;

  for (const line of lines) {
    const linePlain = markdownToPlainText(line);
    if (kept.length > 0 && plain + linePlain.length > remaining) break;
    if (kept.length === 0 && linePlain.length > remaining) {
      return truncateInlineMarkdown(line, remaining);
    }
    kept.push(line);
    plain += linePlain.length;
  }

  if (kept.length < lines.length && kept.length > 0) {
    const marker = /^\s*\d+\./.test(lines[0]!) ? '1.' : '-';
    kept.push(`${marker} …`);
  }

  return kept.join('\n');
}

function truncateInlineMarkdown(markdown: string, maxPlain: number): string {
  if (maxPlain <= 0) return '…';
  const plain = markdownToPlainText(markdown);
  if (plain.length <= maxPlain) return markdown;

  let plainCount = 0;
  let i = 0;
  let result = '';

  const appendEllipsis = () => {
    if (!result.endsWith('…')) result = `${result.trimEnd()}…`;
  };

  while (i < markdown.length && plainCount < maxPlain) {
    if (markdown.startsWith('**', i)) {
      const end = markdown.indexOf('**', i + 2);
      if (end !== -1) {
        const inner = markdown.slice(i + 2, end);
        const innerPlain = markdownToPlainText(inner);
        if (plainCount + innerPlain.length > maxPlain) {
          result += `**${truncateInlineMarkdown(inner, maxPlain - plainCount).replace(/…$/, '')}**`;
          appendEllipsis();
          break;
        }
        result += markdown.slice(i, end + 2);
        plainCount += innerPlain.length;
        i = end + 2;
        continue;
      }
    }

    if (markdown[i] === '`') {
      const end = markdown.indexOf('`', i + 1);
      if (end !== -1) {
        const inner = markdown.slice(i + 1, end);
        if (plainCount + inner.length > maxPlain) {
          result += `\`${inner.slice(0, maxPlain - plainCount)}…\``;
          plainCount = maxPlain;
          break;
        }
        result += markdown.slice(i, end + 1);
        plainCount += inner.length;
        i = end + 1;
        continue;
      }
    }

    if (markdown[i] === '[') {
      const closeBracket = markdown.indexOf(']', i + 1);
      const openParen = closeBracket !== -1 ? markdown.indexOf('(', closeBracket) : -1;
      const closeParen = openParen !== -1 ? markdown.indexOf(')', openParen + 1) : -1;
      if (closeBracket !== -1 && openParen === closeBracket + 1 && closeParen !== -1) {
        const label = markdown.slice(i + 1, closeBracket);
        const url = markdown.slice(openParen + 1, closeParen);
        if (plainCount + label.length > maxPlain) {
          result += `[${label.slice(0, maxPlain - plainCount)}…](${url})`;
          plainCount = maxPlain;
          break;
        }
        result += markdown.slice(i, closeParen + 1);
        plainCount += label.length;
        i = closeParen + 1;
        continue;
      }
    }

    result += markdown[i];
    plainCount += 1;
    i += 1;
  }

  if (plain.length > maxPlain) appendEllipsis();
  return result;
}

/** Keep block structure (paragraphs, lists, headings) while limiting visible text length. */
export function excerptMarkdown(markdown: string, length = 520): string {
  const source = stripPreviewMarkdown(stripFirstH1(markdown));
  if (!source) return '';

  const fullPlain = markdownToPlainText(source);
  if (fullPlain.length <= length) return source;

  const blocks = splitMarkdownBlocks(source);
  const parts: string[] = [];
  let totalPlain = 0;

  for (const block of blocks) {
    const blockPlain = markdownToPlainText(block);
    if (totalPlain >= length) break;

    if (totalPlain + blockPlain.length <= length) {
      parts.push(block);
      totalPlain += blockPlain.length;
      continue;
    }

    const remaining = length - totalPlain;
    if (remaining < 40) break;

    if (isListBlock(block)) {
      const partial = excerptListBlock(block, remaining);
      if (partial) parts.push(partial);
    } else {
      parts.push(truncateInlineMarkdown(block, remaining));
    }
    break;
  }

  return parts.join('\n\n').trim();
}

export async function renderMarkdownExcerpt(markdown: string, length = 520): Promise<string> {
  const excerpt = excerptMarkdown(markdown, length);
  if (!excerpt) return '';
  const p = await getProcessor();
  const rendered = await p.render(excerpt);
  return rendered.code?.trim() ?? '';
}

export async function getGitHubReadmeExcerptHtml(
  githubUrl: string,
  length = 520,
): Promise<string | null> {
  try {
    const parsed = parseGitHubUrl(githubUrl);
    if (!parsed?.repo) return null;

    const result = await fetchGitHubReadme(parsed.owner, parsed.repo);
    if (!result) return null;

    const baseUrl = `https://raw.githubusercontent.com/${parsed.owner}/${parsed.repo}/${result.branch}/`;
    const processed = resolveMarkdownUrls(result.markdown, baseUrl);
    const html = await renderMarkdownExcerpt(processed, length);
    return html || null;
  } catch (e) {
    console.error(`getGitHubReadmeExcerptHtml error for ${githubUrl}:`, e);
    return null;
  }
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
