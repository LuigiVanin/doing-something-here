import { StatusCode } from "../@types/status-code";
import { WebError } from "./base";

export class UnauthorizedError extends WebError {
    constructor(message?: string, cause: string = "unauthorized") {
        super(StatusCode.UNAUTHORIZED, cause, message);
    }
}
