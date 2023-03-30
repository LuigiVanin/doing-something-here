import { SignupForm } from "~~/src/pages/auth/signup.vue";

interface SignInForm {
    email: string;
    password: string;
}

export const useSignup = () => {
    const { $client } = useNuxtApp();
    // const { setAuth, auth } = useAuth();
    const loading = useState<boolean>("signinLoading", () => false);
    const error = useState<any>("signinError", () => null);
    const router = useRouter();

    const { mutate: signUp } = $client.auth.signup;

    const signup = async (data: SignupForm) => {
        try {
            error.value = null;
            loading.value = true;
            const _result = await signUp({
                email: data.email,
                password: data.password,
                name: data.name,
                password2: data.confirmPassword,
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
        signup,
        loading,
        error,
    };
};
