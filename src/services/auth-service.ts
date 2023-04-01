import { v4 as uuid4 } from "uuid";
import { Err, Ok, Result, Some, Option, None } from "@sniptt/monads/build";
import { RefreshToken, User } from "@prisma/client";
import _ from "lodash";
import { SignInResponse } from "../@types/user/signin";
import { ServiceError } from "../@types/error";
import { JwtService } from "./jwt-service";
import { TokenRepository } from "./../repositories/token-repository";

export class AuthService {
    private tokenRepository: TokenRepository;
    private jwtService: JwtService;

    constructor() {
        this.tokenRepository = new TokenRepository();
        this.jwtService = new JwtService();
    }

    private async getRefreshToken(
        data: { userId: string } | { token: string }
    ) {
        return await this.tokenRepository.findOneWithUser(
            { ...data },
            { orderBy: { createdAt: "desc" } }
        );
    }

    private async createRefreshToken(
        userId: string
    ): Promise<Result<RefreshToken, ServiceError>> {
        const token = uuid4();
        const _ = await this.tokenRepository.deleteMany({ userId });
        const createOpt = await this.tokenRepository.create({ userId, token });

        return createOpt.match<Result<RefreshToken, ServiceError>>({
            some: (rt) => Ok(rt),
            none: () =>
                Err({
                    message: "Could not create refresh token",
                    cause: "could-not-create-token",
                }),
        });
    }

    private refreshTokenExpired(refreshToken: RefreshToken) {
        const { createdAt } = refreshToken;
        const now = new Date();
        const diff = now.getTime() - createdAt.getTime();
        return diff > 1000 * 60 * 60 * 24 * 7;
    }

    async authorizeUser(
        refreshToken: string,
        jwtToken: string
    ): Promise<Result<SignInResponse, ServiceError>> {
        const rtOpt = await this.getRefreshToken({ token: refreshToken });

        if (rtOpt.isNone()) {
            return Err({
                message: "Invalid refresh token",
                cause: "invalid-refresh-token",
            });
        }
        const rt = rtOpt.unwrap();

        if (this.refreshTokenExpired(rt)) {
            return Err({
                message: "Refresh token expired",
                cause: "refresh-token-expired",
            });
        }

        return this.jwtService.decodeJwt(jwtToken).match({
            some: (val) => {
                if (val.email !== rt.user.email || val.id !== rt.user.id) {
                    return Err({
                        message: "Invalid JWT",
                        cause: "invalid-jwt",
                    });
                }
                const jwt = this.jwtService.signJwt({
                    email: rt.user.email,
                    id: rt.user.id,
                });
                return Ok({
                    createdAt: rt.createdAt,
                    refreshToken: rt.token,
                    jwt,
                    user: _.omit(rt.user, ["password"]),
                });
            },
            none: () => Err({ message: "Invalid JWT", cause: "invalid-jwt" }),
        });
    }

    async signUser(user: User): Promise<Result<SignInResponse, ServiceError>> {
        const { email, id } = user;
        const jwtToken = this.jwtService.signJwt({ email, id });

        const tfResult = await this.createRefreshToken(id);

        return tfResult.match<Result<SignInResponse, ServiceError>>({
            ok: (rt) =>
                Ok({
                    createdAt: rt.createdAt,
                    refreshToken: rt.token,
                    jwt: jwtToken,
                    user: _.omit(user, ["password"]),
                }),
            err: (err) => Err(err),
        });
    }
}
