/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { APIGatewayProxyHandler } from 'aws-lambda';

import { CreditUseCase } from '../application/credit.useCase';

import { CreditController } from './controller/credit.controller';
import { SequelizeRepository } from './repository/sequelize.repository';

const sequelizeRepository = new SequelizeRepository();
const userUseCase = new CreditUseCase(sequelizeRepository);
const creditController = new CreditController(userUseCase);

export const addAvailableCredit: APIGatewayProxyHandler = async (event) =>
  creditController.addAvailableCredit(
    +(event.pathParameters?.id ?? 0),
    JSON.parse(event.body ?? '{}')
  );
