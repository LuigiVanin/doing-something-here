import { User } from "@prisma/client";
import { None, Some, Option } from "@sniptt/monads";
import { Repository } from "./../@types/repository";
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

    async findOne(value: { email: string }): Promise<Option<User>> {
        const result = await prisma.user.findFirst({
            where: {
                email: value.email,
            },
        });
        return result ? Some(result) : None;
    }
}
