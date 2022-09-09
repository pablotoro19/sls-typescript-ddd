import Ajv from 'ajv';
import { APIGatewayProxyResult } from 'aws-lambda';

import { ApiError } from '../../../shared/helpers/errors/ApiError';
import { errorHandler, successHandler } from '../../../shared/helpers/response';
import { CustomerUseCase } from '../../application/customer.useCase';
import { CustomerAttributes, CustomerModelAttributes } from '../../domain/customer.entity';
import {
  getCustomersBySchema,
  createCustomerSchema,
  updateCustomerSchema,
  getCustomersWithCreditsSchema,
} from '../schema';

export class CustomerController {
  constructor(private customerUseCase: CustomerUseCase) {}

  public getCustomer = async (id: number): Promise<APIGatewayProxyResult> => {
    try {
      const customer = await this.customerUseCase.getCustomerBy({ id });
      if (!customer) {
        throw new ApiError({
          status: 404,
          message: 'Customer not found',
          errorCode: 'ERROR_CUSTOMER_NOT_FOUND',
        });
      }

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
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(getCustomersBySchema);

      if (!validate(filters)) {
        throw new ApiError({
          status: 422,
          message: validate.errors?.[0]?.message ?? 'Validation error',
          errorCode: 'ERROR_VALIDATION_ERROR',
        });
      }

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
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(createCustomerSchema);

      if (!validate(customerData)) {
        throw new ApiError({
          status: 422,
          message: validate.errors?.[0]?.message ?? 'Validation error',
          errorCode: 'ERROR_VALIDATION_ERROR',
        });
      }

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
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(updateCustomerSchema);

      if (!validate(customerData)) {
        throw new ApiError({
          status: 422,
          message: validate.errors?.[0]?.message ?? 'Validation error',
          errorCode: 'ERROR_VALIDATION_ERROR',
        });
      }

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

  public getCustomersWithCredits = async (
    sort: CustomerAttributes
  ): Promise<APIGatewayProxyResult> => {
    try {
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(getCustomersWithCreditsSchema);

      if (!validate(sort)) {
        throw new ApiError({
          status: 422,
          message: validate.errors?.[0]?.message ?? 'Validation error',
          errorCode: 'ERROR_VALIDATION_ERROR',
        });
      }

      const customersWithCredits = await this.customerUseCase.getCustomersWithCredits(sort);
      const customers = customersWithCredits.map(({ Credit, ...customer }) => {
        return { ...customer, creditAmount: Credit?.amount };
      });

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
}
