import { TRPCError } from "@trpc/server";
import type { UseCase } from "./../@types/usecase";

export const resolveUseCase = async <T, Response>(usecase: UseCase<T, Response>, input: T) => {
    const result = await usecase.execute(input);
    return result.match({
        err: (err) => {
            throw new TRPCError({ ...err });
        },
        ok: (val) => val,
    });
};
