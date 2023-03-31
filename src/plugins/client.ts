import { tokenStorage } from "./../helpers/localStorage-proxy";
import { createTRPCNuxtClient, httpBatchLink } from "trpc-nuxt/client";
import type { AppRouter } from "../server/api/trpc/[trpc]";

export default defineNuxtPlugin(() => {
    const headers = useRequestHeaders();

    const client = createTRPCNuxtClient<AppRouter>({
        links: [
            httpBatchLink({
                url: "/api/trpc",
                headers() {
                    // console.log(auth.value);
                    const data = tokenStorage.getItem();

                    if (headers["accesstoken"] && headers["refreshtoken"]) {
                        return headers;
                    }
                    return {
                        ...headers,
                        accessToken: data.accessToken || undefined,
                        refreshToken: data.refreshToken || undefined,
                    };
                },
            }),
        ],
    });
    return {
        provide: {
            client,
        },
    };
});
