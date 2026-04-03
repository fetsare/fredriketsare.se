import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      pubDate: z.coerce.date(),
      draft: z.boolean().optional(),
    }),
});

const reviews = defineCollection({
  loader: glob({ base: "./src/content/reviews", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    items: z.array(
      z.object({
        name: z.string(),
        image: z.string(),
        link: z.string().url().optional(),
      }),
    ).default([]),
  }),
});

const books = defineCollection({
  loader: glob({ base: "./src/content/books", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    items: z.array(
      z.object({
        title: z.string(),
        author: z.string(),
        rating: z.coerce.number().int().min(1).max(10),
        cover: z.string(),
        link: z.string().optional(),
      }),
    ).default([]),
  }),
});

export const collections = { blog, reviews, books };
