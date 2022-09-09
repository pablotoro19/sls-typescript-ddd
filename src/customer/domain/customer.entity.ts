export interface CustomerAttributes {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface CustomerModelAttributes extends CustomerAttributes {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface CustomerInterface extends CustomerAttributes {
  id: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
