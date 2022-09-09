import { CreditRepository } from '../domain/credit.repository';

export class CreditUseCase {
  constructor(private readonly creditRepository: CreditRepository) {}

  public getCreditByCustomer = async (customerId: number) => {
    return this.creditRepository.findOneCredit(customerId);
  };

  public addAvailableCredit = async (customerId: number, amount: number) => {
    return this.creditRepository.updateCredit(customerId, amount);
  };
}
