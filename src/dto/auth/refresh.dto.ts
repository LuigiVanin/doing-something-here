import { z } from "zod";

export const refreshDto = z.object({
    refreshToken: z.string(),
    jwtToken: z.string(),
});

export type RefreshDto = z.infer<typeof refreshDto>;
