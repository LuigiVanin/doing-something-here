import { Rules } from "./../../@types/utils/rules";
import { z } from "zod";

export const signinRules: Rules = {
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

import type { SignupForm } from "~~/src/@types/user/signup";
import { SmartOmit } from "~~/src/@types/utils/transform";

export const singUpRule: Rules<
    Record<keyof SmartOmit<SignupForm, "confirmPassword">, string>
> = {
    name: [
        {
            validator: z.string().min(3).max(50),
            message: "Nome deve ter entre 3 e 50 caracteres",
        },
    ],
    email: [
        {
            validator: z.string().email(),
            message: "Email inválido",
        },
        {
            validator: z.string().min(3).max(100),
            message: "Email deve ter entre 3 e 50 caracteres",
        },
    ],
    password: [
        {
            validator: z.string().min(6).max(50),
            message: "Senha deve ter entre 6 e 50 caracteres",
        },
    ],
};
