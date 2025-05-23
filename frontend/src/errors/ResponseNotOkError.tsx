export default class ResponseNotOkError extends Error {
    public detail: object | string | undefined;

    constructor(message: string, detail?: object | string | undefined) {
        super(message);
        this.name = 'ValidationError';
        this.detail = detail;
        Object.setPrototypeOf(this, ResponseNotOkError.prototype);
    }
}