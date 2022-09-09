import { APIGatewayProxyHandler } from 'aws-lambda';

import { CustomerUseCase } from '../application/customer.useCase';
import { CustomerModelAttributes } from '../domain/customer.entity';

import { CustomerController } from './controller/customer.controller';
import { SequelizeRepository } from './repository/sequelize.repository';

const sequelizeRepository = new SequelizeRepository();
const customerUseCase = new CustomerUseCase(sequelizeRepository);
const customerController = new CustomerController(customerUseCase);

export const getCustomerById: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters as { id: string };
  return await customerController.getCustomer(+id);
};

export const getCustomersBy: APIGatewayProxyHandler = async (event) => {
  const filters = (event.queryStringParameters = {} as unknown as {
    name?: string;
    email?: string;
  });
  return await customerController.getCustomersBy(filters);
};

export const createCustomer: APIGatewayProxyHandler = async (event) => {
  const body = JSON.parse(event.body ?? '{}') as CustomerModelAttributes;
  return await customerController.createCustomer(body);
};

export const updateCustomerById: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters as { id: string };
  const body = JSON.parse(event.body ?? '{}') as CustomerModelAttributes;
  return await customerController.updateCustomer({ id: +id }, body);
};

export const deleteCustomer: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters as { id: string };
  return await customerController.deleteCustomer(+id);
};

export const getCustomersWithCredits: APIGatewayProxyHandler = async (event) => {
  const { amount = 'desc' } =
    event?.queryStringParameters ||
    ({} as unknown as {
      amount?: string;
    });

  return await customerController.getCustomersWithCredits({ amount });
};
