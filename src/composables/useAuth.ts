import { SerielizedResponse } from "../@types/token/serielized-response";
import { SignInResponse } from "../@types/user/signin";
import { tokenStorage } from "../helpers/localStorage-proxy";
import { convertSerieledResposeToAuth } from "../helpers/utils/serielize";
// NOTE: userStatsu is not ready yet
// import { useUserStatus } from "./useUserStatus";

export const useAuth = () => {
    const { $client } = useNuxtApp();
    const router = useRouter();
    const auth = useState<SignInResponse | undefined>("auth", () => undefined);
    // NOTE: userStatsu is not ready yet
    // const { setUser } = useUserStatus();
    const isLoading = useState<boolean>("userLoading", () => false);

    const getAuth = async (erroCb?: (error: Error) => void) => {
        isLoading.value = true;
        try {
            const { accessToken, refreshToken } = tokenStorage.getItem();

            if (!accessToken || !refreshToken) {
                const error = new Error("No token");
                erroCb && erroCb(error);
                router.push("/");
                throw error;
            }
            const data = await $client.auth.refresh.mutate({
                jwtToken: accessToken,
                refreshToken,
            });
            setAuth(data);
        } catch {
            router.push("/");
        } finally {
            isLoading.value = false;
        }
    };

    const setAuth = (data: SerielizedResponse) => {
        auth.value = convertSerieledResposeToAuth(data);
        // NOTE: when userStatus is ready use this to sync data
        // setUser(auth.value);
        tokenStorage.setItem({
            accessToken: data.jwt,
            refreshToken: data.refreshToken,
        });
    };

    return { auth, getAuth, isLoading, setAuth };
};
