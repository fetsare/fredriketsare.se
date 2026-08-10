import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

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
        currentlyReading: z.boolean().optional(),
      }),
    ).default([]),
  }),
});

export const collections = { books };
