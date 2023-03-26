import { z } from "zod";

export const signinRules = {
    email: [
        {
            validator: z.string().email(),
            message: "Email inválido",
        },
        {
            validator: z.string().min(1),
            message: "Email deve ser preenchido",
        },
    ],
    password: [
        {
            validator: z.string().min(6),
            message: "Senha deve ter no mínimo 6 caracteres",
        },
        {
            validator: z.string().min(1),
            message: "Senha deve ser preenchida",
        },
    ],
};
