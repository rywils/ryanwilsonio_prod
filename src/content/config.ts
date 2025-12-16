import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    github: z.string().optional(),
    demo: z.string().optional(),
    category: z.union([
      z.enum(['Development', 'Systems/Cloud', 'Cybersecurity']),
      z.array(z.enum(['Development', 'Systems/Cloud', 'Cybersecurity']))
    ]),
    technologies: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    publishDate: z.date(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    image: z.string(),
    date: z.string(),
    readTime: z.string(),
    author: z.string(),
    category: z.union([
      z.string(),
      z.array(z.string())
    ]),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  projects,
  blog,
};