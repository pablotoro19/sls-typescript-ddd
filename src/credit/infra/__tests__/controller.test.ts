/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable jest/unbound-method */
/* eslint-disable @typescript-eslint/unbound-method */

import { APIGatewayProxyResult } from 'aws-lambda';

import { createAPIGatewayRequest } from '../../../shared/fixtures/apiGatewayRequest';
import { createFakeCredit } from '../../../shared/fixtures/credit';
import { createFakeCustomer } from '../../../shared/fixtures/customer';
import { CreditUseCase } from '../../application/credit.useCase';
import { addAvailableCredit } from '../index';

describe('credit.Controller', () => {
  describe('addAvailableCredit', () => {
    it('should add credits to customers', async () => {
      expect.assertions(2);

      const customer = createFakeCustomer();
      const credit = createFakeCredit({ customerId: customer.id });
      const body = { amount: credit.amount } as unknown as string;

      const mockedGetCreditByCustomer = jest.spyOn(CreditUseCase.prototype, 'getCreditByCustomer');
      mockedGetCreditByCustomer.mockResolvedValueOnce(credit);
      const mockedAddAvailableCredit = jest.spyOn(CreditUseCase.prototype, 'addAvailableCredit');
      mockedAddAvailableCredit.mockResolvedValueOnce(true);
      const { event, context, callback } = createAPIGatewayRequest({
        pathParameters: { id: String(customer.id) },
        body,
      });

      const response = (await addAvailableCredit(
        event,
        context,
        callback
      )) as APIGatewayProxyResult;
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body)).toBe(true);
    });

    it('should return and error', async () => {
      expect.assertions(2);

      const customer = createFakeCustomer();
      const credit = createFakeCredit({ customerId: customer.id });
      const body = { amount: credit.amount } as unknown as string;

      const mockedGetCreditByCustomer = jest.spyOn(CreditUseCase.prototype, 'getCreditByCustomer');
      mockedGetCreditByCustomer.mockResolvedValueOnce(null);
      const mockedAddAvailableCredit = jest.spyOn(CreditUseCase.prototype, 'addAvailableCredit');
      mockedAddAvailableCredit.mockResolvedValueOnce(true);
      const { event, context, callback } = createAPIGatewayRequest({
        pathParameters: { id: String(customer.id) },
        body,
      });

      const response = (await addAvailableCredit(
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

      const customer = createFakeCustomer();
      const credit = createFakeCredit({ customerId: customer.id });
      const body = { mock: credit.amount } as unknown as string;

      const { event, context, callback } = createAPIGatewayRequest({
        pathParameters: { id: String(customer.id) },
        body,
      });

      const response = (await addAvailableCredit(
        event,
        context,
        callback
      )) as APIGatewayProxyResult;
      expect(response.statusCode).toBe(422);
      expect(JSON.parse(response.body)).toMatchObject({
        message: "must have required property 'amount'",
        errorCode: 'ERROR_VALIDATION_ERROR',
      });
    });
  });
});
