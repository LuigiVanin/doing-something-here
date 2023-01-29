import { StatusCode } from "./../@types/status-code";
import { WebError } from "./base";

export class IternalServerError extends WebError {
    constructor(message?: string, cause: string = "internal-server-error") {
        super(StatusCode.INTERNAL_SERVER_ERROR, cause, message);
    }
}
