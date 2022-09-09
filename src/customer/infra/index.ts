/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { APIGatewayProxyHandler } from 'aws-lambda';

import { CustomerUseCase } from '../application/customer.useCase';

import { CustomerController } from './controller/customer.controller';
import { SequelizeRepository } from './repository/sequelize.repository';

const sequelizeRepository = new SequelizeRepository();
const customerUseCase = new CustomerUseCase(sequelizeRepository);
const customerController = new CustomerController(customerUseCase);

export const getCustomerById: APIGatewayProxyHandler = async (event) =>
  customerController.getCustomer(+(event.pathParameters?.id ?? 0));

export const getCustomersBy: APIGatewayProxyHandler = async (event) =>
  customerController.getCustomersBy(event.queryStringParameters || {});

export const createCustomer: APIGatewayProxyHandler = async (event) =>
  customerController.createCustomer(JSON.parse(event?.body ?? '{}'));

export const updateCustomerById: APIGatewayProxyHandler = async (event) =>
  customerController.updateCustomer(
    { id: +(event.pathParameters?.id ?? 0) },
    JSON.parse(event.body ?? '{}')
  );

export const deleteCustomer: APIGatewayProxyHandler = async (event) =>
  customerController.deleteCustomer(+(event.pathParameters?.id ?? 0));

export const getCustomersWithCredits: APIGatewayProxyHandler = async (event) =>
  customerController.getCustomersWithCredits(event?.queryStringParameters || {});
