import { z } from "zod";

export const createPostDto = z.object({
    title: z.string().min(10).max(100),
    image: z.string().url().default("https://via.placeholder.com/150"),
    body: z.string().optional().default(""),
    published: z.boolean().optional().default(true),
    reactions: z.string().optional().default("{}"),
    parentId: z.string().nullish().default(null),
});

export type CreatePostInput = z.infer<typeof createPostDto>;
