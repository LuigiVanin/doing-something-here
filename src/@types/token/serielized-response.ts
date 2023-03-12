import { User } from "@prisma/client";

export type SerielizedResponse = {
    createdAt: string;
    refreshToken: string;
    jwt: string;
    user: Omit<User, "password" | "createdAt" | "updatedAt"> & {
        createdAt: string;
        updatedAt: string;
    };
};
