import { APIGatewayProxyResult } from 'aws-lambda';

import { errorHandler, successHandler } from '../../../shared/helpers/response';
import { CustomerUseCase } from '../../application/customer.useCase';
import { CustomerAttributes, CustomerModelAttributes } from '../../domain/customer.entity';

export class CustomerController {
  constructor(private customerUseCase: CustomerUseCase) {}

  public getCustomer = async (id: number): Promise<APIGatewayProxyResult> => {
    try {
      const customer = await this.customerUseCase.getCustomerBy({ id });
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

  public getCustomersBy = async (filters?: CustomerAttributes): Promise<APIGatewayProxyResult> => {
    try {
      const customers = await this.customerUseCase.getCustomersBy(filters);
      return successHandler(customers);
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

  public createCustomer = async (
    customerData: CustomerModelAttributes
  ): Promise<APIGatewayProxyResult> => {
    try {
      const customer = await this.customerUseCase.createCustomer(customerData);
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

  public updateCustomer = async (
    conditions: CustomerAttributes,
    customerData: CustomerModelAttributes
  ): Promise<APIGatewayProxyResult> => {
    try {
      await this.customerUseCase.updateCustomer(conditions, customerData);
      const customer = await this.customerUseCase.getCustomerBy(conditions);
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

  public deleteCustomer = async (id: number): Promise<APIGatewayProxyResult> => {
    try {
      const deleted = await this.customerUseCase.deleteCustomer(id);
      return successHandler(deleted);
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
