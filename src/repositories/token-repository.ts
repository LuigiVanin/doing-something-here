import { TokenQueryOptions } from "./../@types/token/token-query-options";
import { Repository } from "./../@types/repository";
import { RefreshToken } from "@prisma/client";
import { None, Option, Some } from "@sniptt/monads/build";
import prisma from "../db";

export class TokenRepository implements Repository<RefreshToken> {
    async findOne(
        value: { userId: string },
        options: TokenQueryOptions
    ): Promise<Option<RefreshToken>> {
        const rtOpt = await prisma.refreshToken.findFirst({
            where: {
                userId: value.userId,
            },
            ...options,
        });
        return rtOpt ? Some(rtOpt) : None;
    }

    async create(
        data: Omit<RefreshToken, "id" | "createdAt">
    ): Promise<Option<RefreshToken>> {
        const rtOpt = await prisma.refreshToken.create({
            data: {
                ...data,
            },
        });
        return rtOpt ? Some(rtOpt) : None;
    }
}
