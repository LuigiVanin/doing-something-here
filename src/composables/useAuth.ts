import { AuthData } from "../@types/user/signin";
import { tokenStorage } from "../helpers/localStorage-proxy";

export const useAuth = () => {
    const { $client } = useNuxtApp();
    const router = useRouter();
    const auth = useState<AuthData | undefined>("auth", () => undefined);
    const isLoading = useState<boolean>("userLoading", () => false);

    const getAuth = async () => {
        isLoading.value = true;
        try {
            const { accessToken, refreshToken } = tokenStorage.getItem();

            if (!accessToken || !refreshToken) {
                router.push("/");
                throw new Error("No token");
            }
            const data = await $client.auth.refresh.mutate({
                jwtToken: accessToken,
                refreshToken,
            });
            tokenStorage.setItem({
                accessToken: data.jwt,
                refreshToken: data.refreshToken,
            });

            auth.value = {
                createdAt: new Date(data.createdAt),
                jwt: data.jwt,
                refreshToken: data.refreshToken,
                user: data.user,
            };
        } catch {
            router.push("/");
        } finally {
            isLoading.value = false;
        }
    };

    const setAuth = (data: AuthData) => {
        auth.value = data;
    };

    return { auth, getAuth, isLoading, setAuth };
};
