import { SignInResponse as AuthData } from "../@types/user/signin";
function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useAuth = () => {
    const { $client } = useNuxtApp();
    const router = useRouter();
    const auth = useState<AuthData | undefined>("auth", () => undefined);
    const isLoading = useState<boolean>("userLoading", () => false);

    const getAuth = async () => {
        isLoading.value = true;
        try {
            const accessToken = localStorage.getItem("access-token");
            const refreshToken = localStorage.getItem("refresh-token");

            if (!accessToken || !refreshToken) {
                router.push("/");
                throw new Error("No token");
            }
            const data = await $client.auth.refresh.mutate({
                jwtToken: accessToken,
                refreshToken,
            });
            localStorage.setItem("access-token", data.jwt);
            localStorage.setItem("refresh-token", data.refreshToken);

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
