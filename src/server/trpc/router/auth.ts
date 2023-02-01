import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./../trpc";
import { resolveUseCase } from "~~/src/services/resolve";
import { signInDto, signUpDto } from "~~/src/dto/auth";
import { SignInUseCase, SignUpUseCase } from "~~/src/useCases/auth";
import { z } from "zod";
import { AuthService } from "~~/src/services/auth-service";

export const authRouter = router({
    signup: publicProcedure.input(signUpDto).mutation(async ({ input }) => {
        return resolveUseCase(new SignUpUseCase(), input);
    }),
    signin: publicProcedure.input(signInDto).mutation(async ({ input }) => {
        return resolveUseCase(new SignInUseCase(), input);
    }),
    getToken: publicProcedure
        .input(
            z.object({
                refreshToken: z.string(),
                jwtToken: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            // throw new TRPCError({
            //     code: "UNAUTHORIZED",
            //     message: "Unauthorized",
            // });
            const service = new AuthService();
            service.authorizeUser(input.refreshToken, input.jwtToken);
            return { token: "123" };
        }),
});
