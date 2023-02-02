import { inferAsyncReturnType } from "@trpc/server";
import { CreateContextFn } from "trpc-nuxt";

export const createContext = (event: any) => {
    // Create your context based on the request object
    // Will be available as `ctx` in all your resolvers
    // This is just an example of something you might want to do in your ctx fn
    console.log("ocorrendo dentro de um contexto");
    console.log(event);
    return {
        user: "sapato mágico",
    };
};

export type Context = inferAsyncReturnType<typeof createContext>;
