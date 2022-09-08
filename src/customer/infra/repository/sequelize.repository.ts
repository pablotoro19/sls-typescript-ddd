import entities from '../../../shared/entities';
import { CustomerInterface } from '../../domain/customer.entity';
import { CustomerRepository } from '../../domain/customer.repository';

export class SequelizeRepository implements CustomerRepository {
  async findOneCustomer(customerId: number): Promise<CustomerInterface> {
    return (await entities.Customer.findOne({ where: { id: customerId } })) as CustomerInterface;
  }
  findAllCustomers(): Promise<CustomerInterface[]> {
    throw new Error('Method not implemented.');
  }
}
