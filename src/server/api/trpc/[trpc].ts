import { SignUpUseCase } from "./../../../useCases/auth/signup-usecase";
import { UserRepository } from "./../../../repositories/user-respositories";
import { createNuxtApiHandler } from "trpc-nuxt";
import { publicProcedure, router } from "../../../server/trpc/trpc";
import { z } from "zod";
import prisma from "../../../db";
import { User } from "@prisma/client";
import { None, Option, Some } from "@sniptt/monads";
import { authRouter } from "../../trpc/router/auth";

export const appRouter = router({
    hello: publicProcedure
        .input(
            z.object({
                text: z.string().nullish(),
            })
        )
        .query(async ({ input }): Promise<User | null> => {
            console.log("alow");
            if (!input?.text) {
                return null;
            }
            const repo = new UserRepository();
            const user = await repo.findUnique({ email: input.text });
            // console.log(user);
            return user.match({
                some: (user) => user,
                none: () => null,
            });
        }),
    auth: authRouter,
});

export type AppRouter = typeof appRouter;

export default createNuxtApiHandler({
    router: appRouter,
    createContext: () => {
        return {
            // Add context here
        };
    },
});
