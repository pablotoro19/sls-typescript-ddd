/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable jest/unbound-method */
/* eslint-disable @typescript-eslint/unbound-method */
import { faker } from '@faker-js/faker';
import { APIGatewayProxyResult } from 'aws-lambda';

import { CreditInterface } from '../../../credit/domain/credit.entity';
import { createAPIGatewayRequest } from '../../../shared/fixtures/apiGatewayRequest';
import { createFakeCustomer, createFakeCustomers } from '../../../shared/fixtures/customer';
import { CustomerUseCase } from '../../application/customer.useCase';
import { CustomerInterface } from '../../domain/customer.entity';
import {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomersBy,
  getCustomersWithCredits,
  updateCustomerById,
} from '../index';

describe('customer.Controller', () => {
  describe('getCustomer', () => {
    it('should return a customer', async () => {
      expect.assertions(2);

      const customer = createFakeCustomer();
      const mockedGetCustomerBy = jest.spyOn(CustomerUseCase.prototype, 'getCustomerBy');
      mockedGetCustomerBy.mockResolvedValueOnce(customer);
      const { event, context, callback } = createAPIGatewayRequest({
        pathParameters: { id: String(customer.id) },
      });

      const response = (await getCustomerById(event, context, callback)) as APIGatewayProxyResult;
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body)).toMatchObject({
        ...customer,
        createdAt: expect.any(String) as string,
        updatedAt: expect.any(String) as string,
      });
    });

    it('should return an error', async () => {
      expect.assertions(2);

      const mockedGetCustomerBy = jest.spyOn(CustomerUseCase.prototype, 'getCustomerBy');
      mockedGetCustomerBy.mockResolvedValueOnce(null);
      const { event, context, callback } = createAPIGatewayRequest({
        pathParameters: { id: String(faker.datatype.number({ min: 1 })) },
      });

      const response = (await getCustomerById(event, context, callback)) as APIGatewayProxyResult;
      expect(response.statusCode).toBe(404);
      expect(JSON.parse(response.body)).toMatchObject({
        message: 'Customer not found',
        errorCode: 'ERROR_CUSTOMER_NOT_FOUND',
      });
    });
  });

  describe('getCustomersBy', () => {
    it('should return customers', async () => {
      expect.assertions(2);

      const customers = createFakeCustomers();
      const mockedGetCustomersBy = jest.spyOn(CustomerUseCase.prototype, 'getCustomersBy');
      mockedGetCustomersBy.mockResolvedValueOnce(customers);
      const { event, context, callback } = createAPIGatewayRequest({});

      const response = (await getCustomersBy(event, context, callback)) as APIGatewayProxyResult;
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body)).toStrictEqual(
        expect.arrayContaining(
          customers.map((c) => {
            return {
              ...c,
              createdAt: expect.any(String) as string,
              updatedAt: expect.any(String) as string,
            };
          })
        )
      );
    });

    it('should return and error', async () => {
      expect.assertions(2);

      const mockedGetCustomersBy = jest.spyOn(CustomerUseCase.prototype, 'getCustomersBy');
      mockedGetCustomersBy.mockImplementationOnce(() => {
        throw new Error('Mocked Error');
      });
      const { event, context, callback } = createAPIGatewayRequest({});

      const response = (await getCustomersBy(event, context, callback)) as APIGatewayProxyResult;
      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.body)).toMatchObject({
        message: 'Mocked Error',
        errorCode: 'ERROR_UNHANDLED_EXCEPTION',
      });
    });

    it('should fail with invalid schema', async () => {
      expect.assertions(2);

      const { event, context, callback } = createAPIGatewayRequest({
        queryStringParameters: { mock: 'test' },
      });

      const response = (await getCustomersBy(event, context, callback)) as APIGatewayProxyResult;
      expect(response.statusCode).toBe(422);
      expect(JSON.parse(response.body)).toMatchObject({
        message: 'must NOT have additional properties',
        errorCode: 'ERROR_VALIDATION_ERROR',
      });
    });
  });

  describe('createCustomer', () => {
    it('should create a customer', async () => {
      expect.assertions(2);

      const customer = createFakeCustomer();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, createdAt, updatedAt, ...rest } = customer;
      const body = rest as string;
      const mockedCreateCustomer = jest.spyOn(CustomerUseCase.prototype, 'createCustomer');
      mockedCreateCustomer.mockResolvedValueOnce(customer);
      const { event, context, callback } = createAPIGatewayRequest({ body });

      const response = (await createCustomer(event, context, callback)) as APIGatewayProxyResult;
      expect(response.statusCode).toBe(201);
      expect(JSON.parse(response.body)).toMatchObject({
        ...customer,
        createdAt: expect.any(String) as string,
        updatedAt: expect.any(String) as string,
      });
    });

    it('should return an error', async () => {
      expect.assertions(2);

      const customer = createFakeCustomer();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, createdAt, updatedAt, ...rest } = customer;
      const body = rest as string;
      const mockedCreateCustomer = jest.spyOn(CustomerUseCase.prototype, 'createCustomer');
      mockedCreateCustomer.mockImplementationOnce(() => {
        throw new Error('Mocked Error');
      });
      const { event, context, callback } = createAPIGatewayRequest({ body });

      const response = (await createCustomer(event, context, callback)) as APIGatewayProxyResult;
      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.body)).toMatchObject({
        message: 'Mocked Error',
        errorCode: 'ERROR_UNHANDLED_EXCEPTION',
      });
    });

    it('should fail with invalid schema', async () => {
      expect.assertions(2);

      const customer = createFakeCustomer();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const body = { name: faker.name.firstName() } as unknown as string;
      const mockedCreateCustomer = jest.spyOn(CustomerUseCase.prototype, 'createCustomer');
      mockedCreateCustomer.mockResolvedValueOnce(customer);
      const { event, context, callback } = createAPIGatewayRequest({ body });

      const response = (await createCustomer(event, context, callback)) as APIGatewayProxyResult;
      expect(response.statusCode).toBe(422);
      expect(JSON.parse(response.body)).toMatchObject({
        message: "must have required property 'email'",
        errorCode: 'ERROR_VALIDATION_ERROR',
      });
    });
  });

  describe('updateCustomer', () => {
    it('should update a customer by id', async () => {
      expect.assertions(2);

      const customer = createFakeCustomer();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, createdAt, updatedAt, ...rest } = customer;
      const body = rest as string;
      const mockedUpdateCustomer = jest.spyOn(CustomerUseCase.prototype, 'updateCustomer');
      mockedUpdateCustomer.mockResolvedValueOnce(true);
      const mockedGetCustomerBy = jest.spyOn(CustomerUseCase.prototype, 'getCustomerBy');
      mockedGetCustomerBy.mockResolvedValue(customer);
      const { event, context, callback } = createAPIGatewayRequest({
        body,
        pathParameters: { id: String(customer.id) },
      });

      const response = (await updateCustomerById(
        event,
        context,
        callback
      )) as APIGatewayProxyResult;

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body)).toMatchObject({
        ...customer,
        createdAt: expect.any(String) as string,
        updatedAt: expect.any(String) as string,
      });
    });

    it('should return an error', async () => {
      expect.assertions(2);

      const customer = createFakeCustomer();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, createdAt, updatedAt, ...rest } = customer;
      const body = rest as string;
      const mockedGetCustomerBy = jest.spyOn(CustomerUseCase.prototype, 'getCustomerBy');
      mockedGetCustomerBy.mockResolvedValueOnce(null);
      const { event, context, callback } = createAPIGatewayRequest({ body });

      const response = (await updateCustomerById(
        event,
        context,
        callback
      )) as APIGatewayProxyResult;
      expect(response.statusCode).toBe(404);
      expect(JSON.parse(response.body)).toMatchObject({
        message: 'Customer not found',
        errorCode: 'ERROR_CUSTOMER_NOT_FOUND',
      });
    });

    it('should fail with invalid schema', async () => {
      expect.assertions(2);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const body = { mock: faker.name.firstName() } as unknown as string;
      const mockedUpdateCustomer = jest.spyOn(CustomerUseCase.prototype, 'updateCustomer');
      mockedUpdateCustomer.mockResolvedValueOnce(true);
      const { event, context, callback } = createAPIGatewayRequest({ body });

      const response = (await updateCustomerById(
        event,
        context,
        callback
      )) as APIGatewayProxyResult;
      expect(response.statusCode).toBe(422);
      expect(JSON.parse(response.body)).toMatchObject({
        message: 'must NOT have additional properties',
        errorCode: 'ERROR_VALIDATION_ERROR',
      });
    });
  });

  describe('deleteCustomer', () => {
    it('should delete a customer', async () => {
      expect.assertions(2);

      const customer = createFakeCustomer();
      const mockedGetCustomerBy = jest.spyOn(CustomerUseCase.prototype, 'getCustomerBy');
      mockedGetCustomerBy.mockResolvedValueOnce(customer);
      const mockedDeleteCustomer = jest.spyOn(CustomerUseCase.prototype, 'deleteCustomer');
      mockedDeleteCustomer.mockResolvedValueOnce(true);
      const { event, context, callback } = createAPIGatewayRequest({
        pathParameters: { id: String(faker.datatype.number({ min: 1 })) },
      });

      const response = (await deleteCustomer(event, context, callback)) as APIGatewayProxyResult;
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body)).toBe(true);
    });

    it('should return an error', async () => {
      expect.assertions(2);

      const mockedGetCustomerBy = jest.spyOn(CustomerUseCase.prototype, 'getCustomerBy');
      mockedGetCustomerBy.mockResolvedValueOnce(null);
      const { event, context, callback } = createAPIGatewayRequest({
        pathParameters: { id: String(faker.datatype.number({ min: 1 })) },
      });

      const response = (await deleteCustomer(event, context, callback)) as APIGatewayProxyResult;
      expect(response.statusCode).toBe(404);
      expect(JSON.parse(response.body)).toMatchObject({
        message: 'Customer not found',
        errorCode: 'ERROR_CUSTOMER_NOT_FOUND',
      });
    });
  });

  describe('getCustomersWithCredits', () => {
    it('should return customers with credit amount and', async () => {
      expect.assertions(2);

      const withCredit = true;
      const count = faker.datatype.number({ min: 1, max: 10 });
      const customers = createFakeCustomers({}, count, withCredit) as unknown as CustomerInterface &
        { Credit: CreditInterface }[];
      const mockedGetCustomersWithCredits = jest.spyOn(
        CustomerUseCase.prototype,
        'getCustomersWithCredits'
      );
      mockedGetCustomersWithCredits.mockResolvedValueOnce(customers);
      const { event, context, callback } = createAPIGatewayRequest({
        queryStringParameters: { amount: 'desc' },
      });

      const response = (await getCustomersWithCredits(
        event,
        context,
        callback
      )) as APIGatewayProxyResult;
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body)).toStrictEqual(
        expect.arrayContaining(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          customers.map(({ Credit, ...customer }) => {
            return {
              ...customer,
              creditAmount: expect.any(Number) as number,
              createdAt: expect.any(String) as string,
              updatedAt: expect.any(String) as string,
            };
          })
        )
      );
    });

    it('should return and error', async () => {
      expect.assertions(2);

      const mockedGetCustomersWithCredits = jest.spyOn(
        CustomerUseCase.prototype,
        'getCustomersWithCredits'
      );
      mockedGetCustomersWithCredits.mockImplementationOnce(() => {
        throw new Error('Mocked Error');
      });
      const { event, context, callback } = createAPIGatewayRequest({
        queryStringParameters: { amount: 'desc' },
      });

      const response = (await getCustomersWithCredits(
        event,
        context,
        callback
      )) as APIGatewayProxyResult;
      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.body)).toMatchObject({
        message: 'Mocked Error',
        errorCode: 'ERROR_UNHANDLED_EXCEPTION',
      });
    });

    it('should fail with invalid schema', async () => {
      expect.assertions(2);

      const { event, context, callback } = createAPIGatewayRequest({
        queryStringParameters: { mock: 'test' },
      });

      const response = (await getCustomersWithCredits(
        event,
        context,
        callback
      )) as APIGatewayProxyResult;
      expect(response.statusCode).toBe(422);
      expect(JSON.parse(response.body)).toMatchObject({
        message: 'must NOT have additional properties',
        errorCode: 'ERROR_VALIDATION_ERROR',
      });
    });
  });
});
