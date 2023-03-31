import { User } from "@prisma/client";
import { SerielizedResponse } from "./../../@types/token/serielized-response";

export const convertSerializedUser = (data: SerielizedResponse): Omit<User, "password"> => {
    data.user.createdAt;
    return {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        createdAt: new Date(data.user.createdAt),
        updatedAt: new Date(data.user.updatedAt),
    };
};

export const convertSerieledResposeToAuth = (data: SerielizedResponse) => {
    return {
        createdAt: new Date(data.createdAt),
        jwt: data.jwt,
        refreshToken: data.refreshToken,
        user: convertSerializedUser(data),
    };
};
