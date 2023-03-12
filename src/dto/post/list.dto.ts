import { z } from "zod";

export const postListDto = z.object({
    parentId: z.string().nullish().optional().default(null),
    userTargetId: z.string().nullish().optional().default(null),
    page: z.number().default(1),
});

export type ListPostInput = z.infer<typeof postListDto>;
