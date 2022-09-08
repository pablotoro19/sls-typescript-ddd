"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-empty-function */
const sequelize_1 = require("sequelize");
class Customer extends sequelize_1.Model {
}
Customer.initialize = (sequelize) => {
    Customer.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: true,
            validate: {
                len: [3, 255],
            },
        },
        email: {
            type: sequelize_1.DataTypes.STRING(150),
            allowNull: false,
            validate: {
                len: [3, 150],
                isEmail: true,
            },
        },
        phone: {
            type: sequelize_1.DataTypes.STRING(30),
            allowNull: true,
            validate: {
                len: [3, 30],
            },
        },
    }, {
        sequelize,
        tableName: 'Customers',
    });
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
Customer.associate = (entities) => { };
exports.default = Customer;
//# sourceMappingURL=customer.js.map