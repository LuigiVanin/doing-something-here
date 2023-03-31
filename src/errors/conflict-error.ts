import { StatusCode } from "./../@types/status-code";
import { WebError } from "./base";

export class ConflictError extends WebError {
    constructor(message?: string, cause = "conflict") {
        super(StatusCode.CONFLICT, cause, message);
    }
}
