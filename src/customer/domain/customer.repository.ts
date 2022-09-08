import { CustomerInterface, CustomerModelAttributes } from './customer.entity';

export interface CustomerRepository {
  findOneCustomer(customerId: number): Promise<CustomerInterface>;
  findAllCustomers(customerData: CustomerModelAttributes): Promise<CustomerInterface[]>;
}
