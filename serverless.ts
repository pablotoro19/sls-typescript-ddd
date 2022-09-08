import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  org: 'pablotoro',
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
  plugins: ['serverless-plugin-typescript', 'serverless-offline'],
};

module.exports = serverlessConfiguration;
