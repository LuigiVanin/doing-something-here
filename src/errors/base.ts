class WebError extends Error {
    code: string;
    cause: string;

    constructor(message: string, code: Code, cause: string) {
        super(message);
        this.code = code;
        this.cause = cause;
    }
}
