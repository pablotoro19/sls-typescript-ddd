export interface CustomerAttributes {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
}

export interface CustomerModelAttributes extends CustomerAttributes {
  id?: number;
  name: string;
  email: string;
  phone: string;
}

export interface CustomerInterface extends CustomerAttributes {
  id: number;
}
