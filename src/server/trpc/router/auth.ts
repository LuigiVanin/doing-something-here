import { publicProcedure, router } from "./../trpc";
import { resolveUseCase } from "~~/src/services/resolve";
import { signInDto, signUpDto } from "~~/src/dto/auth";
import { SignInUseCase, SignUpUseCase } from "~~/src/useCases/auth";

export const authRouter = router({
    signup: publicProcedure.input(signUpDto).mutation(async ({ input }) => {
        return resolveUseCase(new SignUpUseCase(), input);
    }),
    signin: publicProcedure.input(signInDto).subscription(async ({ input }) => {
        return resolveUseCase(new SignInUseCase(), input);
    }),
});
