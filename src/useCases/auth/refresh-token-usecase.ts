import { JwtPayload } from "./../../@types/token/jwt";
import { AuthData } from "./../../@types/user/signin";
import { UnauthorizedError } from "./../../errors/unauthorized-error";
import { Err, Ok, Result } from "@sniptt/monads/build";
import { UseCase } from "~~/src/@types/usecase";
import { AuthService } from "~~/src/services/auth-service";
import { WebError } from "~~/src/errors/base";

export class RefreshTokenUseCase implements UseCase<JwtPayload, AuthData> {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async execute(input: any): Promise<Result<AuthData, WebError>> {
        const data = await this.authService.authorizeUser(
            input.refreshToken,
            input.jwtToken
        );

        return data.match<Result<AuthData, WebError>>({
            ok: (data) => {
                return Ok(data);
            },
            err: () => {
                return Err(new UnauthorizedError("Unauthorized"));
            },
        });
    }
}
