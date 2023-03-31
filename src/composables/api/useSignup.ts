import { TRPCErrorShape } from "@trpc/server/rpc";
import { StatusName } from "~~/src/@types/status-code";
import { SignupForm } from "~~/src/@types/user/signup";

interface TrpcClientError {
    data: {
        code: StatusName;
        httpStatus: number;
        path: string;
    };
    name: string;
    shape: TRPCErrorShape;
}

export const useSignup = () => {
    const { $client } = useNuxtApp();
    // const { setAuth, auth } = useAuth();
    const loading = useState<boolean>("signupLoading", () => false);
    const error = useState<TrpcClientError | null>("signupError", () => null);
    const code = ref<string | null>(null);
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
            return _result;
        } catch (err) {
            // console.log({ ...err });
            error.value = err as TrpcClientError;
            code.value = error.value?.shape?.message || null;
        } finally {
            loading.value = false;
        }
    };

    return {
        signup,
        loading,
        error,
        code,
    };
};
