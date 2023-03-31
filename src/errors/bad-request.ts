import { StatusCode } from "./../@types/status-code";
import { WebError } from "./base";

export class BadRequestError extends WebError {
    constructor(message?: string, cause = "bad-request") {
        super(StatusCode.BAD_REQUEST, cause, message);
    }
}
