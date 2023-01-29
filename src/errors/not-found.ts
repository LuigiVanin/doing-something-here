import { StatusCode } from "./../@types/status-code";
import { WebError } from "./base";

export class NotFoundError extends WebError {
    constructor(message?: string, cause: string = "not-found") {
        super(StatusCode.NOT_FOUND, cause, message);
    }
}
