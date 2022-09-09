import { JSONSchemaType } from 'ajv';

export const addAvailableCreditSchema: JSONSchemaType<{
  amount: number;
}> = {
  type: 'object',
  properties: {
    amount: { type: 'number', nullable: false },
  },
  required: ['amount'],
  additionalProperties: false,
};
