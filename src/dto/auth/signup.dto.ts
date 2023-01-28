import z from "zod";
// import type { CreateUser } from "@/@types/user/create-user";

export const SignUpDto = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    password2: z.string().min(6),
});

export type ISignUp = z.infer<typeof SignUpDto>;
