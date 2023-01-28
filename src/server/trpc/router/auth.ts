import { SignUpDto } from "~~/src/dto/auth/signup.dto";
import { publicProcedure, router } from "./../trpc";
import { z } from "zod";
import { SignUpUseCase } from "~~/src/useCases/auth/signup-usecase";
import { TRPCError } from "@trpc/server";
import { resolveUseCase } from "~~/src/services/resolve";

export const authRouter = router({
    signUp: publicProcedure.input(SignUpDto).mutation(async ({ input }) => {
        return resolveUseCase(new SignUpUseCase(), input);
    }),
});
