import { APIGatewayProxyHandler } from 'aws-lambda';

import { CustomerUseCase } from '../application/customer.useCase';

import { CustomerController } from './controller/customer.controller';
import { SequelizeRepository } from './repository/sequelize.repository';

const sequelizeRepository = new SequelizeRepository();
const userUseCase = new CustomerUseCase(sequelizeRepository);
const customerController = new CustomerController(userUseCase);

export const getCustomerById: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters as { id: string };
  return customerController.getCustomer(+id);
};
