import { SignUpUseCase } from "./../../../useCases/auth/signup-usecase";
import { UserRepository } from "./../../../repositories/user-respositories";
import { createNuxtApiHandler } from "trpc-nuxt";
import { publicProcedure, router } from "../../../server/trpc/trpc";
import { z } from "zod";
import prisma from "../../../db";
import { User } from "@prisma/client";
import { None, Option, Some } from "@sniptt/monads";
import { authRouter } from "../../trpc/router/auth";
import { galleryRouter } from "../../trpc/router/gallery";

export const appRouter = router({
    auth: authRouter,
    gallery: galleryRouter,
});

export type AppRouter = typeof appRouter;

export default createNuxtApiHandler({
    router: appRouter,
    // createContext: (event) => {
    //     return {
    //         // Add context here
    //     };
    // },
});
