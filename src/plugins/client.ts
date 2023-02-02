import { createTRPCNuxtClient, httpBatchLink } from "trpc-nuxt/client";
import type { AppRouter } from "../server/api/trpc/[trpc]";

export default defineNuxtPlugin(() => {
    const headers = useRequestHeaders();
    const { auth } = useAuth();

    const client = createTRPCNuxtClient<AppRouter>({
        links: [
            httpBatchLink({
                url: "/api/trpc",
                headers() {
                    console.log("Eu vim do plugin");
                    console.log(auth.value);

                    if (headers["accesstoken"] && headers["refreshtoken"]) {
                        return headers;
                    }
                    return {
                        ...headers,
                        accessToken: auth.value?.jwt || "",
                        refreshToken: auth.value?.refreshToken || "",
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
