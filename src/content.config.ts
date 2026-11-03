import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      date: z.coerce.date(),
      draft: z.boolean().default(true),
      author: z.string().optional(),
    }),
  }),
};
