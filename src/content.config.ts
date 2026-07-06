import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.coerce.date(),
      draft: z.boolean().optional(),
      featured: z
        .union([
          z.boolean(),
          z.object({
            slug: z.string().min(1).optional(),
            seoTitle: z.string().optional(),
            seoDescription: z.string().optional(),
          }),
        ])
        .optional(),
    }),
});

const blogEn = defineCollection({
  loader: glob({ base: "./src/content/en/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.coerce.date(),
      draft: z.boolean().optional(),
      featured: z
        .union([
          z.boolean(),
          z.object({
            slug: z.string().min(1).optional(),
            seoTitle: z.string().optional(),
            seoDescription: z.string().optional(),
          }),
        ])
        .optional(),
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
        publishedYear: z.string().optional(),
        cover: z.string(),
        link: z.string().optional(),
      }),
    ).default([]),
  }),
});

const booksEn = defineCollection({
  loader: glob({ base: "./src/content/en/books", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    items: z.array(
      z.object({
        title: z.string(),
        author: z.string(),
        publishedYear: z.string().optional(),
        cover: z.string(),
        link: z.string().optional(),
      }),
    ).default([]),
  }),
});

export const collections = { blog, blogEn, books, booksEn };
