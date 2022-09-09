/* eslint-disable @typescript-eslint/no-empty-function */
import { Model, DataTypes, Sequelize, ModelStatic } from 'sequelize';

import { CustomerModelAttributes } from '../../customer/domain/customer.entity';

import Credit from './credit';

class Customer extends Model implements CustomerModelAttributes {
  public id?: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public address!: string;
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
        address: {
          type: DataTypes.TEXT,
          allowNull: true,
          validate: {
            len: [3, 150],
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

  static associate = (entities: { [k: string]: unknown }): void => {
    const credit = entities.Credit as ModelStatic<Credit>;
    Customer.hasOne(credit, {
      foreignKey: 'customerId',
      sourceKey: 'id',
    });
  };
}

export default Customer;
