import { APIGatewayProxyResult } from 'aws-lambda';

import { ApiError } from '../../../shared/helpers/errors/ApiError';
import { errorHandler, successHandler } from '../../../shared/helpers/response';
import { CreditUseCase } from '../../application/credit.useCase';

export class CreditController {
  constructor(private creditUseCase: CreditUseCase) {}

  public addAvailableCredit = async (
    customerId: number,
    amount: number
  ): Promise<APIGatewayProxyResult> => {
    try {
      const credit = await this.creditUseCase.getCreditByCustomer(customerId);

      if (!credit) {
        throw new ApiError({
          status: 404,
          message: 'Customer not found',
          errorCode: 'ERROR_CUSTOMER_NOT_FOUND',
        });
      }

      const newAmount = credit.amount + amount;
      const updated = await this.creditUseCase.addAvailableCredit(customerId, newAmount);
      return successHandler(updated);
    } catch (error: unknown) {
      const { message, status, errorCode } = error as {
        message: string;
        errorCode: string;
        status: number;
      };
      console.error('error: ', error);
      return errorHandler(message, status, errorCode);
    }
  };
}
