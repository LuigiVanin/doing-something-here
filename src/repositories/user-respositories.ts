import type { User } from "@prisma/client";
import type { Repository } from "./../@types/repository";
import type { UserQueryOptions } from "../@types/user/user-query-options";
import { None, Some, Option } from "@sniptt/monads";
import prisma from "../db";

export class UserRepository implements Repository<User> {
    constructor() {}

    async create(data: User): Promise<Option<User>> {
        await prisma.user.create({
            data: {
                ...data,
            },
        });
        return data ? Some(data) : None;
    }

    async findUnique(
        value: { email: string } | { id: string }
    ): Promise<Option<User>> {
        const result = await prisma.user.findFirst({
            where: {
                ...value,
            },
        });
        return result ? Some(result) : None;
    }

    async find(
        //
        value: Partial<User>,
        options?: UserQueryOptions
        //
    ): Promise<Option<Array<User>>> {
        const result = await prisma.user.findMany({
            where: {
                ...value,
            },
            ...options,
        });
        return result.length ? Some(result) : None;
    }
}
