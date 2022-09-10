import { CustomerAttributes, CustomerModelAttributes } from '../domain/customer.entity';
import { CustomerRepository } from '../domain/customer.repository';

export class CustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  public async getCustomerBy(conditions: CustomerAttributes) {
    return this.customerRepository.findOneCustomer(conditions);
  }

  public async getCustomersBy(conditions?: CustomerAttributes) {
    return this.customerRepository.findAllCustomers(conditions);
  }

  public async createCustomer(customerData: CustomerModelAttributes) {
    return this.customerRepository.createCustomer(customerData);
  }

  public async updateCustomer(
    conditions: CustomerAttributes,
    customerData: CustomerModelAttributes
  ) {
    return this.customerRepository.updateCustomer(conditions, customerData);
  }

  public async deleteCustomer(id: number) {
    return this.customerRepository.deleteCustomer(id);
  }

  public async getCustomersWithCredits(sort: { [key: string]: string }) {
    return this.customerRepository.findAllCustomersWithCredits(sort);
  }
}
