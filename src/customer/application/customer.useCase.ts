import { CustomerAttributes, CustomerModelAttributes } from '../domain/customer.entity';
import { CustomerRepository } from '../domain/customer.repository';

export class CustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  public getCustomerBy = async (conditions: CustomerAttributes) => {
    return this.customerRepository.findOneCustomer(conditions);
  };

  public getCustomersBy = async (conditions?: CustomerAttributes) => {
    return this.customerRepository.findAllCustomers(conditions);
  };

  public createCustomer = async (customerData: CustomerModelAttributes) => {
    return this.customerRepository.createCustomer(customerData);
  };

  public updateCustomer = async (
    conditions: CustomerAttributes,
    customerData: CustomerModelAttributes
  ) => {
    return this.customerRepository.updateCustomer(conditions, customerData);
  };

  public deleteCustomer = async (id: number) => {
    return this.customerRepository.deleteCustomer(id);
  };
}
