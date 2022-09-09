import { CreditInterface } from '../../credit/domain/credit.entity';

import { CustomerInterface, CustomerAttributes, CustomerModelAttributes } from './customer.entity';

export interface CustomerRepository {
  findOneCustomer(conditions: CustomerAttributes): Promise<CustomerInterface | null>;
  findAllCustomers(conditions?: CustomerAttributes): Promise<CustomerInterface[]>;
  createCustomer(customerData: CustomerModelAttributes): Promise<CustomerInterface>;
  updateCustomer(
    conditions: CustomerAttributes,
    customerData: CustomerModelAttributes
  ): Promise<boolean>;
  deleteCustomer(id: number): Promise<boolean>;
  findAllCustomersWithCredits(sort: {
    [key: string]: string;
  }): Promise<CustomerInterface & { Credit: CreditInterface }[]>;
}
