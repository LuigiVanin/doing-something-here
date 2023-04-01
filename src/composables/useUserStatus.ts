import { SignInResponse } from "../@types/user/signin";

export const useUserStatus = () => {
    const user = useState<SignInResponse | undefined>(
        "user-status",
        () => undefined
    );
    // const editUser = useEditUser();
    // const getUser = useGetUser();

    const setUser = (data: SignInResponse) => {
        user.value = data;
    };

    return {
        user,
        setUser,
    };
};
