'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      { tableName: 'Customers', schema: 'public' },
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        email: {
          type: Sequelize.TEXT,
          allowNull: false,
          unique: true,
        },
        phone: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable({ tableName: 'Customers', schema: 'public' });
  },
};
