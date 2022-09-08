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
            Resource: [
              'arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:custom.tableName}/*',
              'arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:custom.tableName}',
            ],
          },
        ],
      },
    },
  },
  custom: {
    tableName: 'customers',
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
          TableName: '${self:custom.tableName}',
        },
      },
    },
  },
  plugins: ['serverless-plugin-typescript', 'serverless-offline', 'serverless-dynamodb-local'],
};

module.exports = serverlessConfiguration;
