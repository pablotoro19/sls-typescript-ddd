import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'sls-motorbike-shop',
  frameworkVersion: '3',
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      NODE_ENV: '${env:NODE_ENV}',
      DYNAMODB_TABLE_NAME: '${env:DYNAMODB_TABLE_NAME}',
      DYNAMODB_TABLE_ARN: '${env:DYNAMODB_TABLE_ARN}',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
            ],
            Resource: ['${env:DYNAMODB_TABLE_ARN}/*', '${env:DYNAMODB_TABLE_ARN}'],
          },
        ],
      },
    },
  },
  custom: {
    tableName: '${env:DYNAMODB_TABLE_NAME}',
    dynamodb: {
      stages: ['dev'],
      start: { port: 8000, inMemory: true, migrate: true },
      migration: { dir: 'offline/migrations' },
    },
  },
  functions: {
    getCustomerById: {
      handler: 'handler.getCustomerById',
      timeout: 30,
      events: [
        {
          httpApi: {
            path: '/customer/{id}',
            method: 'get',
          },
        },
      ],
    },
  },
  resources: {
    Resources: {
      Customers: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: 'customerId',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'customerId',
              KeyType: 'HASH',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
          TableName: 'Customers',
        },
      },
    },
  },
  plugins: ['serverless-plugin-typescript', 'serverless-offline', 'serverless-dynamodb-local'],
};

module.exports = serverlessConfiguration;
