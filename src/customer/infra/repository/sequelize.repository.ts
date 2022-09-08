import { CustomerInterface } from '../../domain/customer.entity';
import { CustomerRepository } from '../../domain/customer.repository';

export class SequelizeRepository implements CustomerRepository {
  // eslint-disable-next-line @typescript-eslint/require-await
  async findOneCustomer(customerId: number): Promise<CustomerInterface> {
    return { id: customerId, name: 'this a test', email: 'test@example.com', phone: '1234567' };
  }
  findAllCustomers(): Promise<CustomerInterface[]> {
    throw new Error('Method not implemented.');
  }
}
