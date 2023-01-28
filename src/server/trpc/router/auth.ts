import { signUpDto } from "~~/src/dto/auth/signup.dto";
import { publicProcedure, router } from "./../trpc";
import { SignUpUseCase } from "~~/src/useCases/auth/signup-usecase";
import { resolveUseCase } from "~~/src/services/resolve";

export const authRouter = router({
    signup: publicProcedure.input(signUpDto).mutation(async ({ input }) => {
        return resolveUseCase(new SignUpUseCase(), input);
    }),
});
