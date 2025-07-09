"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reach360Error = void 0;
exports.handleError = handleError;
function handleError(error) {
    let message = "An unknown error occurred";
    if (error instanceof Error) {
        message = error.message;
    }
    else if (typeof error === "string") {
        message = error;
    }
    return {
        content: [
            {
                type: "text",
                text: `Error: ${message}`,
            },
        ],
        isError: true,
    };
}
class Reach360Error extends Error {
    code;
    statusCode;
    constructor(message, code, statusCode) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.name = "Reach360Error";
    }
}
exports.Reach360Error = Reach360Error;
//# sourceMappingURL=errors.js.map