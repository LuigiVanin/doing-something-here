import { createNuxtApiHandler } from "trpc-nuxt";
import { publicProcedure, router } from "../../../server/trpc/trpc";
import { authRouter } from "../../trpc/router/auth";
import { galleryRouter } from "../../trpc/router/gallery";
import { createContext } from "../../context";
import { s3ManagerRouter } from "../../trpc/router/s3-manage";

export const appRouter = router({
    auth: authRouter,
    gallery: galleryRouter,
    s3: s3ManagerRouter,
});

export type AppRouter = typeof appRouter;

export default createNuxtApiHandler({
    router: appRouter,
    createContext,
});
