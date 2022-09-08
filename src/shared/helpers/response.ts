import { APIGatewayProxyResult } from 'aws-lambda';

export const successHandler = (message: unknown, statusCode = 200): APIGatewayProxyResult => ({
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

export const errorHandler = (
  message: unknown = 'Unhandled error',
  statusCode = 500,
  errorCode = 'ERROR_UNHANDLED_EXCEPTION'
): APIGatewayProxyResult => ({
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
