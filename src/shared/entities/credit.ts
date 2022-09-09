/* eslint-disable @typescript-eslint/no-empty-function */
import { Model, DataTypes, Sequelize, ModelStatic } from 'sequelize';

import { CreditModelAttributes } from '../../credit/domain/credit.entity';

import Customer from './customer';

class Credit extends Model implements CreditModelAttributes {
  public id?: number;
  public customerId!: number;
  public amount!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize = (sequelize: Sequelize): void => {
    Credit.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        customerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: true,
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
        tableName: 'Credits',
      }
    );
  };

  static associate = (entities: { [k: string]: unknown }): void => {
    const customer = entities.Customer as ModelStatic<Customer>;
    Credit.belongsTo(customer, {
      foreignKey: 'customerId',
      targetKey: 'id',
    });
  };
}

export default Credit;
