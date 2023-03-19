interface SignInForm {
    email: string;
    password: string;
}

export const useSignin = () => {
    const { $client } = useNuxtApp();
    const { setAuth, auth } = useAuth();
    const loading = useState<boolean>("signinLoading", () => false);
    const error = useState<any>("signinError", () => null);
    const router = useRouter();

    const { mutate: signIn } = $client.auth.signin;

    const signin = async (data: SignInForm) => {
        try {
            error.value = null;
            loading.value = true;
            const result = await signIn(data);

            setAuth({
                createdAt: result.createdAt,
                jwt: result.jwt,
                refreshToken: result.refreshToken,
                user: result.user,
            });

            // NOTE: the "setAuth" function above does the same thing as the following lines
            // localStorage.setItem("access-token", auth.value?.jwt || "");
            // localStorage.setItem(
            //     "refresh-token",
            //     auth.value?.refreshToken || ""
            // );
            router.push("/app");
        } catch (err) {
            console.log({ ...err });
            error.value = err;
        } finally {
            loading.value = false;
        }
    };

    return {
        signin,
        loading,
        error,
    };
};
