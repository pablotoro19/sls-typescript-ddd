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
      DB_URL: '${env:DB_URL}',
    },
  },
  functions: {
    getCustomerById: {
      handler: 'handler.getCustomerById',
      timeout: 30,
      events: [
        {
          httpApi: {
            path: '/customers/{id}',
            method: 'get',
          },
        },
      ],
    },
    getCustomersBy: {
      handler: 'handler.getCustomersBy',
      timeout: 30,
      events: [
        {
          httpApi: {
            path: '/customers',
            method: 'get',
          },
        },
      ],
    },
    createCustomer: {
      handler: 'handler.createCustomer',
      timeout: 30,
      events: [
        {
          httpApi: {
            path: '/customers',
            method: 'post',
          },
        },
      ],
    },
    updateCustomerById: {
      handler: 'handler.updateCustomerById',
      timeout: 30,
      events: [
        {
          httpApi: {
            path: '/customers/{id}',
            method: 'put',
          },
        },
      ],
    },
    deleteCustomer: {
      handler: 'handler.deleteCustomer',
      timeout: 30,
      events: [
        {
          httpApi: {
            path: '/customers/{id}',
            method: 'delete',
          },
        },
      ],
    },
    addAvailableCredit: {
      handler: 'handler.addAvailableCredit',
      timeout: 30,
      events: [
        {
          httpApi: {
            path: '/customers/{id}/credits',
            method: 'post',
          },
        },
      ],
    },
    getCustomersWithCredits: {
      handler: 'handler.getCustomersWithCredits',
      timeout: 30,
      events: [
        {
          httpApi: {
            path: '/customers/credits',
            method: 'get',
          },
        },
      ],
    },
  },
  plugins: ['serverless-plugin-typescript', 'serverless-offline'],
};

module.exports = serverlessConfiguration;
