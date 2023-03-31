import { publicProcedure, router } from "./../trpc";
import { resolveUseCase } from "~~/src/services/resolve";
import { signInDto, signUpDto } from "~~/src/dto/auth";
import {
    SignInUseCase,
    SignUpUseCase,
    RefreshTokenUseCase,
} from "~~/src/useCases/auth";
import { refreshDto } from "~~/src/dto/auth/refresh.dto";

export const authRouter = router({
    signup: publicProcedure
        .input(signUpDto)
        .mutation(async ({ input }) =>
            resolveUseCase(new SignUpUseCase(), input)
        ),
    signin: publicProcedure
        .input(signInDto)
        .mutation(async ({ input }) =>
            resolveUseCase(new SignInUseCase(), input)
        ),
    refresh: publicProcedure
        .input(refreshDto)
        .mutation(async ({ input }) =>
            resolveUseCase(new RefreshTokenUseCase(), input)
        ),
});
