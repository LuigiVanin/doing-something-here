import type { User } from "@prisma/client";
import { None, Some, Option } from "@sniptt/monads";
import type { UserQueryOptions } from "../@types/user/user-query-options";
import prisma from "../db";
import type { Repository } from "./../@types/repository";

export class UserRepository implements Repository<User> {
    constructor() {}

    async create(
        data: Omit<User, "id" | "createdAt" | "updatedAt">
    ): Promise<Option<User>> {
        const user = await prisma.user.create({
            data: {
                ...data,
            },
        });
        return user ? Some(user) : None;
    }

    async findUnique(
        value: { email: string } | { id: string }
    ): Promise<Option<User>> {
        try {
            const result = await prisma.user.findFirst({
                where: {
                    ...value,
                },
            });
            return result ? Some(result) : None;
        } catch (err) {
            console.error(err);
            return None;
        }
    }

    async find(
        value: Partial<User>,
        options?: UserQueryOptions
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
