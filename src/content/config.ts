import { defineCollection, z } from "astro:content";

const siteCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    header: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  site: siteCollection,
};
