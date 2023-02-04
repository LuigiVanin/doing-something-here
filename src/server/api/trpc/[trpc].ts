import { createNuxtApiHandler } from "trpc-nuxt";
import { publicProcedure, router } from "../../../server/trpc/trpc";
import { authRouter } from "../../trpc/router/auth";
import { galleryRouter } from "../../trpc/router/gallery";
import { createContext } from "../../context";

export const appRouter = router({
    auth: authRouter,
    gallery: galleryRouter,
});

export type AppRouter = typeof appRouter;

export default createNuxtApiHandler({
    router: appRouter,
    createContext,
});
