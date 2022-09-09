import { Order, WhereOptions, literal } from 'sequelize';
import { Literal } from 'sequelize/types/utils';

import { CreditInterface } from '../../../credit/domain/credit.entity';
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
      await entities.Credit.create({ customerId: customer.id });
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
      const [updated] = await entities.Customer.update(customerData, {
        where,
      });

      if (!updated) {
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

  public async findAllCustomersWithCredits(creditSort: {
    [key: string]: string;
  }): Promise<CustomerInterface & { Credit: CreditInterface }[]> {
    const sort: Order | (string | Literal)[][] = [];
    Object.keys(creditSort).forEach((key: string): void => {
      sort.push([literal(`"Credit.${key}"`), creditSort[key]]);
    });

    const order = sort as Order;
    const customers = await entities.Customer.findAll({
      include: [{ model: entities.Credit, required: true }],
      order,
    });

    return customers.map((customer) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return customer.get({ plain: true });
    }) as CustomerInterface & { Credit: CreditInterface }[];
  }
}
