import { CreditInterface } from './credit.entity';

export interface CreditRepository {
  findOneCredit(customerId: number): Promise<CreditInterface | null>;
  updateCredit(customerId: number, amount: number): Promise<boolean>;
}
