import { JwtService } from "./../../services/jwt-service";
import { initTRPC, TRPCError } from "@trpc/server";
import type { Context } from "../context";

const t = initTRPC.context<Context>().create({
    errorFormatter: (err) => {
        return {
            ...err.shape,
            cause: err.error.name,
        };
    },
});

export const publicProcedure = t.procedure;
export const router = t.router;
export const middleware = t.middleware;

const authMiddleware = middleware(async ({ ctx, next }) => {
    const jwtService = new JwtService();
    const { accessToken, refreshToken } = ctx;

    if (!accessToken || !refreshToken) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "There is no token sended",
            cause: "no-tokens",
        });
    }

    const data = jwtService.decodeJwt(accessToken as string);
    const user = data.match({
        none: () => {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "Impossible to parse jwt",
                cause: "token-invalid-format",
            });
        },
        some: (data) => data,
    });
    return next({
        ctx: {
            user,
        },
    });
});

export const protectedProcedure = publicProcedure.use(authMiddleware);
