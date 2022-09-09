import { APIGatewayProxyHandler } from 'aws-lambda';

import { CreditUseCase } from '../application/credit.useCase';
import { CreditModelAttributes } from '../domain/credit.entity';

import { CreditController } from './controller/credit.controller';
import { SequelizeRepository } from './repository/sequelize.repository';

const sequelizeRepository = new SequelizeRepository();
const userUseCase = new CreditUseCase(sequelizeRepository);
const creditController = new CreditController(userUseCase);

export const addAvailableCredit: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters as { id: string };
  const { amount = 0 } = JSON.parse(event.body ?? '{}') as CreditModelAttributes;
  return await creditController.addAvailableCredit(+id, amount);
};
