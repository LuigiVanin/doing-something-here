import { tokenStorage } from "./../helpers/localStorage-proxy";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const router = useRouter();
    if (!process.server) {
        const { accessToken, refreshToken } = tokenStorage.getItem();

        if (!accessToken || !refreshToken) {
            return router.push("/");
        }
    }
});
