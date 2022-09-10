import { faker } from '@faker-js/faker';

import { CreditInterface } from '../../credit/domain/credit.entity';
import { CustomerAttributes, CustomerInterface } from '../../customer/domain/customer.entity';

import { createFakeCredit } from './credit';

export const generateIds = (count = 1): number[] => {
  const ids: number[] = [];
  Array.from({ length: count }).forEach(() => {
    ids.push(faker.datatype.number({ min: 0 }));
  });

  return ids;
};

export const createFakeCustomer = (
  { id, email, name, phone, address }: CustomerAttributes = {},
  withCredit = false
): CustomerInterface & { Credit?: CreditInterface } => {
  const customerId = id ?? faker.datatype.number({ min: 1 });

  return {
    id: customerId,
    email: email || faker.internet.email(),
    name: name || faker.name.firstName(),
    phone: phone || faker.phone.number(),
    address: address || faker.address.direction(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    ...(withCredit && { Credit: createFakeCredit({ customerId }) }),
  };
};

export const createFakeCustomers = (
  { email, name, phone, address }: CustomerAttributes = {},
  count = 2,
  withCredit = false
): (CustomerInterface & { Credit?: CreditInterface })[] =>
  generateIds(count).map((id) =>
    createFakeCustomer({ id, email, name, phone, address }, withCredit)
  );
