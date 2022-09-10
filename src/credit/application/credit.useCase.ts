import { CreditRepository } from '../domain/credit.repository';

export class CreditUseCase {
  constructor(private readonly creditRepository: CreditRepository) {}

  public async getCreditByCustomer(customerId: number) {
    return this.creditRepository.findOneCredit(customerId);
  }

  public async addAvailableCredit(customerId: number, amount: number) {
    return this.creditRepository.updateCredit(customerId, amount);
  }
}
