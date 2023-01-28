import z from "zod";

export const signUpDto = z
    .object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(3),
        password2: z.string().min(3),
    })
    .superRefine(({ password, password2 }, ctx) => {
        if (password !== password2) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match",
                fatal: true,
                path: ["password2"],
            });
        }
    });

export type ISignUp = z.infer<typeof signUpDto>;
