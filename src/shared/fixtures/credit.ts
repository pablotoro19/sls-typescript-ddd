import { faker } from '@faker-js/faker';

import { CreditAttributes, CreditInterface } from '../../credit/domain/credit.entity';

export const generateIds = (count = 1): number[] => {
  const ids: number[] = [];
  Array.from({ length: count }).forEach(() => {
    ids.push(faker.datatype.number({ min: 0 }));
  });

  return ids;
};

export const createFakeCredit = ({
  id,
  customerId,
  amount,
}: CreditAttributes = {}): CreditInterface => {
  return {
    id: id ?? faker.datatype.number({ min: 1 }),
    customerId: customerId ?? faker.datatype.number({ min: 1 }),
    amount: amount || faker.datatype.number({ min: 0 }),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };
};

export const createFakeCredits = (
  { customerId, amount }: CreditAttributes = {},
  count = 2
): CreditInterface[] =>
  generateIds(count).map((id) => createFakeCredit({ id, customerId, amount }));
