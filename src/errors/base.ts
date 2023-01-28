import { StatusName } from "./../@types/status-code";

export class WebError {
    code: StatusName;
    cause: string;
    messsage?: string;

    constructor(code: StatusName, cause: string, message?: string) {
        this.messsage = message;
        this.code = code;
        this.cause = cause;
    }
}
