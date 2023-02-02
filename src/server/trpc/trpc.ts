import { initTRPC } from "@trpc/server";
// import type { Context } from "../context";

const t = initTRPC.context<Context>().create();

export const publicProcedure = t.procedure;
export const router = t.router;
export const middleware = t.middleware;

const isProtected = middleware(async ({ ctx, next, meta }) => {
    console.log("ocorrendo dentro de um contexto");
    console.log(ctx);
    console.log(meta);
    return next();
});

export const protectedProcedure = publicProcedure.use(isProtected);
