import { JSONSchemaType } from 'ajv';

export const getCustomersBySchema: JSONSchemaType<{
  email?: string;
  name?: string;
}> = {
  type: 'object',
  properties: {
    email: { type: 'string', nullable: true },
    name: { type: 'string', nullable: true },
  },
  required: [],
  additionalProperties: false,
};

export const createCustomerSchema: JSONSchemaType<{
  name?: string;
  email: string;
  phone?: string;
  address?: string;
}> = {
  type: 'object',
  properties: {
    email: { type: 'string', nullable: false },
    name: { type: 'string', nullable: true },
    phone: { type: 'string', nullable: true },
    address: { type: 'string', nullable: true },
  },
  required: ['email'],
  additionalProperties: false,
};

export const updateCustomerSchema: JSONSchemaType<{
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}> = {
  type: 'object',
  minProperties: 1,
  properties: {
    email: { type: 'string', nullable: true },
    name: { type: 'string', nullable: true },
    phone: { type: 'string', nullable: true },
    address: { type: 'string', nullable: true },
  },
  required: [],
  additionalProperties: false,
};

export const getCustomersWithCreditsSchema: JSONSchemaType<{
  amount?: string;
}> = {
  type: 'object',
  properties: {
    amount: { type: 'string', enum: ['desc', 'asc'], nullable: true },
  },
  required: [],
  additionalProperties: false,
};
