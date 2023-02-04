import { User } from "@prisma/client";

export interface AuthData {
    jwt: string;
    refreshToken: string;
    createdAt: Date;

    user: Omit<User, "password">;
}
