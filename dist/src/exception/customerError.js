"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
// src/errors/CustomError.ts
class CustomError extends Error {
    constructor(statusCode, message) {
        super(message || CustomError.getMessageForStatusCode(statusCode));
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    static getMessageForStatusCode(statusCode) {
        switch (statusCode) {
            case 400:
                return 'Bad Request';
            case 401:
                return 'Unauthorized';
            case 403:
                return 'Forbidden';
            case 404:
                return 'Not Found';
            case 500:
                return 'Internal Server Error';
            default:
                return 'Unknown Error';
        }
    }
}
exports.CustomError = CustomError;
