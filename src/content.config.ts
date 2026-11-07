import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: z
      .object({
        title: z.string().min(1),
        description: z.string().min(1),
        date: z.coerce.date(),
        draft: z.boolean().default(true),
        author: z.string().optional(),
        authorUrl: z.url({ protocol: /^https?$/ }).optional(),
        updated: z.coerce.date().optional(),
        image: z
          .object({
            src: z.string().regex(/^(?:\/(?!\/)|https?:\/\/)/),
            alt: z.string().min(1),
            width: z.number().int().positive().optional(),
            height: z.number().int().positive().optional(),
          })
          .optional(),
      })
      .refine(
        ({ date, updated }) =>
          !updated || (updated >= date && updated <= new Date()),
        {
          message:
            'updated must be on or after publication and cannot be in the future.',
          path: ['updated'],
        },
      ),
  }),
};
