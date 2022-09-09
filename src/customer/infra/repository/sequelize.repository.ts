import { WhereOptions } from 'sequelize';

import entities from '../../../shared/entities';
import {
  CustomerInterface,
  CustomerAttributes,
  CustomerModelAttributes,
} from '../../domain/customer.entity';
import { CustomerRepository } from '../../domain/customer.repository';

export class SequelizeRepository implements CustomerRepository {
  public async findOneCustomer(conditions: CustomerAttributes): Promise<CustomerInterface | null> {
    if (!conditions) {
      return null;
    }

    const customer = await entities.Customer.findOne({ where: { ...conditions } });
    if (!customer) {
      return null;
    }

    return customer.get({ plain: true }) as CustomerInterface;
  }

  public async findAllCustomers(conditions: CustomerAttributes): Promise<CustomerInterface[]> {
    const where = conditions as WhereOptions<CustomerAttributes>;
    const customers = await entities.Customer.findAll({ where, order: [['id', 'DESC']] });
    return customers.map((customer) => {
      return customer.get({ plain: true }) as CustomerInterface;
    });
  }

  public async createCustomer(
    customerData: Partial<CustomerModelAttributes>
  ): Promise<CustomerInterface> {
    try {
      const customer = await entities.Customer.create(customerData);
      return customer.get({ plain: true }) as CustomerInterface;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async updateCustomer(
    conditions: CustomerAttributes,
    customerData: Partial<CustomerModelAttributes>
  ): Promise<boolean> {
    try {
      const where = conditions as WhereOptions<CustomerAttributes>;
      const [updatedInvoice] = await entities.Customer.update(customerData, {
        where,
      });

      if (!updatedInvoice) {
        return false;
      }

      return true;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async deleteCustomer(id: number): Promise<boolean> {
    const deleted = await entities.Customer.destroy({
      where: { id },
    });

    if (!deleted) {
      return false;
    }

    return true;
  }
}
