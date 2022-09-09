/* eslint-disable @typescript-eslint/no-empty-function */
import { Model, DataTypes, Sequelize } from 'sequelize';

import { CustomerModelAttributes } from '../../customer/domain/customer.entity';

class Customer extends Model implements CustomerModelAttributes {
  public id?: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize = (sequelize: Sequelize): void => {
    Customer.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: true,
          validate: {
            len: [3, 255],
          },
        },
        email: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            len: [3, 150],
            isEmail: true,
          },
        },
        phone: {
          type: DataTypes.TEXT,
          allowNull: true,
          validate: {
            len: [3, 30],
          },
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        tableName: 'Customers',
      }
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static associate = (_entities?: { [k: string]: unknown }): void => {};
}

export default Customer;
