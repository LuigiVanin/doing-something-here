import { z } from "zod";

export const PresignedUrlDto = z.object({
    fileExt: z.string().regex(/(png|jpg|jpeg|svg)$/),
});

export type PresignedUrlInput = z.infer<typeof PresignedUrlDto>;
