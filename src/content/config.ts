import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    date: z.string().optional(),
    readTime: z.string().optional(),
    author: z.string().optional(),
    category: z.union([z.string(), z.array(z.string())]).optional(),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    github: z.string().optional(),
    overwrite: z.enum(['Yes', 'No']).default('No'),
    demo: z.string().optional(),
    category: z.union([z.string(), z.array(z.string())]).optional(),
    technologies: z.array(z.string()).optional().default([]),
    featured: z.boolean().optional().default(false),
    publishDate: z.coerce.date().optional(),
  }),
});

export const collections = { blog, projects };
