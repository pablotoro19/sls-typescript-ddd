import { CustomerRepository } from '../domain/customer.repository';

export class CustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  public getCustomerById = async (id: number) => {
    return this.customerRepository.findOneCustomer(id);
  };
}
