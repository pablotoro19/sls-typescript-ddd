"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.successHandler = void 0;
const successHandler = (message, statusCode = 200) => ({
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSS-Protection': '1',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'no-referrer',
        'Content-Security-Policy': 'no-referrer',
    },
    statusCode,
    body: JSON.stringify(message),
});
exports.successHandler = successHandler;
const errorHandler = (message = 'Unhandled error', statusCode = 500, errorCode = 'ERROR_UNHANDLED_EXCEPTION') => ({
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSS-Protection': '1',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'no-referrer',
        'Content-Security-Policy': 'no-referrer',
    },
    statusCode,
    body: JSON.stringify({ errorCode, message }),
});
exports.errorHandler = errorHandler;
//# sourceMappingURL=response.js.map