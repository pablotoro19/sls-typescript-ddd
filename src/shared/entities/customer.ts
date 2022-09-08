/* eslint-disable @typescript-eslint/no-empty-function */
import { Model, DataTypes, Sequelize } from 'sequelize';

class Customer extends Model {
  public id?: number;
  public name!: string;
  public email!: string;
  public phone!: string;

  public static initialize = (sequelize: Sequelize): void => {
    Customer.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: true,
          validate: {
            len: [3, 255],
          },
        },
        email: {
          type: DataTypes.STRING(150),
          allowNull: false,
          validate: {
            len: [3, 150],
            isEmail: true,
          },
        },
        phone: {
          type: DataTypes.STRING(30),
          allowNull: true,
          validate: {
            len: [3, 30],
          },
        },
      },
      {
        sequelize,
        tableName: 'Customers',
      }
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static associate = (entities?: { [k: string]: unknown }): void => {};
}

export default Customer;
