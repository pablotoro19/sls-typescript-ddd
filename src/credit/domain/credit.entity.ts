export interface CreditAttributes {
  id?: number;
  customerId?: number;
  amount?: number;
}

export interface CreditModelAttributes extends CreditAttributes {
  id?: number;
  customerId: number;
  amount: number;
}

export interface CreditInterface extends CreditAttributes {
  id: number;
  customerId: number;
  amount: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
