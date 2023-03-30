interface SignInForm {
    email: string;
    password: string;
}

export const useSignup = () => {
    const { $client } = useNuxtApp();
    const { setAuth, auth } = useAuth();
    const loading = useState<boolean>("signupLoading", () => false);
    const error = useState<any>("signupError", () => null);
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
            router.push("/auth/signin");
        } catch (err) {
            // console.log({ ...err });
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
