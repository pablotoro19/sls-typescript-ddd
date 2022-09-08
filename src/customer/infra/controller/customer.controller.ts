import { APIGatewayProxyResult } from 'aws-lambda';

import { errorHandler, successHandler } from '../../../shared/helpers/response';
import { CustomerUseCase } from '../../application/customer.useCase';

export class CustomerController {
  constructor(private customerUseCase: CustomerUseCase) {}

  public getCustomer = async (id: number): Promise<APIGatewayProxyResult> => {
    try {
      const customer = await this.customerUseCase.getCustomerById(id);
      return successHandler(customer);
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
