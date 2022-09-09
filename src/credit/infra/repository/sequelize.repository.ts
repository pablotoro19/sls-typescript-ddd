import entities from '../../../shared/entities';
import { CreditInterface } from '../../domain/credit.entity';
import { CreditRepository } from '../../domain/credit.repository';

export class SequelizeRepository implements CreditRepository {
  public async findOneCredit(customerId: number): Promise<CreditInterface | null> {
    const credit = await entities.Credit.findOne({ where: { customerId } });
    if (!credit) {
      return null;
    }

    return credit.get({ plain: true }) as CreditInterface;
  }

  public async updateCredit(customerId: number, amount: number): Promise<boolean> {
    try {
      const [updated] = await entities.Credit.update(
        { amount },
        {
          where: { customerId },
        }
      );

      if (!updated) {
        return false;
      }

      return true;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
