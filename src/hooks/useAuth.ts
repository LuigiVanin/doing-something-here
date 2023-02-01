import { SignInResponse as AuthData } from "./../@types/user/signin";
function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useAuth = () => {
    const { $client } = useNuxtApp();
    const router = useRouter();
    const auth = useState<AuthData | undefined>("auth", () => {
        return undefined;
    });
    const isLoading = useState<boolean>("userLoading", () => false);

    const getAuth = async () => {
        isLoading.value = true;
        try {
            await sleep(5000);
            // const { token } = await $client.auth.getToken.mutate({});
            // auth.value = token;
            // router.push("/user");
        } catch {
            router.push("/");
        } finally {
            isLoading.value = false;
        }
    };

    return { auth, getAuth, isLoading };
};
