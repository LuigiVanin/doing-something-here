import { z } from "zod";

export const signInDto = z.object({
    email: z.string().email(),
    password: z.string().min(4),
});

export type ISignIn = z.infer<typeof signInDto>;
