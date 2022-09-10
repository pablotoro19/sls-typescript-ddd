/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  APIGatewayEvent,
  APIGatewayEventDefaultAuthorizerContext,
  APIGatewayEventIdentity,
  APIGatewayEventRequestContextWithAuthorizer,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Callback,
  Context,
} from 'aws-lambda';

export const createAPIGatewayRequest = ({
  body,
  method,
  path = '',
  queryStringParameters,
  pathParameters,
  stageVariables = null,
  headers = {},
}: Partial<APIGatewayEvent & { body?: unknown; method?: string }>): {
  event: APIGatewayProxyEvent;
  context: Context;
  callback: Callback<APIGatewayProxyResult>;
} => {
  const context: Context = {
    callbackWaitsForEmptyEventLoop: false,
    functionName: '',
    functionVersion: '',
    invokedFunctionArn: '',
    memoryLimitInMB: '',
    awsRequestId: '',
    logGroupName: '',
    logStreamName: '',
    getRemainingTimeInMillis: function (): number {
      throw new Error('Function not implemented.');
    },
    done: function (_error?: Error | undefined, _result?: unknown): void {
      throw new Error('Function not implemented.');
    },
    fail: function (_error: string | Error): void {
      throw new Error('Function not implemented.');
    },
    succeed: function (_messageOrObject: unknown): void {
      throw new Error('Function not implemented.');
    },
  };

  const callback: Callback<APIGatewayProxyResult> = () => null;
  const identity = '' as unknown as APIGatewayEventIdentity;
  const requestContext: APIGatewayEventRequestContextWithAuthorizer<APIGatewayEventDefaultAuthorizerContext> =
    {
      accountId: '',
      apiId: '',
      authorizer: undefined,
      protocol: '',
      httpMethod: '',
      path: '',
      stage: '',
      requestId: '',
      requestTimeEpoch: 0,
      resourceId: '',
      resourcePath: '',
      identity,
    };

  return {
    event: {
      body: body ? JSON.stringify(body) : null,
      headers,
      multiValueHeaders: {},
      httpMethod: method || '',
      isBase64Encoded: false,
      path,
      pathParameters: pathParameters || null,
      queryStringParameters: queryStringParameters || null,
      multiValueQueryStringParameters: null,
      stageVariables,
      requestContext,
      resource: '',
    },
    context,
    callback,
  };
};
