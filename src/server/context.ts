import { inferAsyncReturnType } from "@trpc/server";
import { CreateContextFn } from "trpc-nuxt";

type H3Event = Parameters<CreateContextFn<any>>[0];

export const createContext = (event: H3Event) => {
    const { req } = event.node;
    const { accesstoken: accessToken, refreshtoken: refreshToken } =
        req.headers;

    return {
        accessToken,
        refreshToken,
    };
};

export type Context = inferAsyncReturnType<typeof createContext>;
