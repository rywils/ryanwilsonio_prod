import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    github: z.string().optional(),
    /** Yes = use local markdown body; No = pull from GitHub README (default). Without github, local body is always used. */
    overwrite: z.enum(['Yes', 'No']).default('No'),
    demo: z.string().optional(),
    category: z.union([
      z.enum(['Development', 'Systems/Cloud', 'Cybersecurity']),
      z.array(z.enum(['Development', 'Systems/Cloud', 'Cybersecurity'])),
    ]),
    technologies: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    publishDate: z.coerce.date(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    image: z.string(),
    date: z.string(),
    readTime: z.string(),
    author: z.string(),
    category: z.union([z.string(), z.array(z.string())]),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  projects,
  blog,
};
