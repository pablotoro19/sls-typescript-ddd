/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

module.exports = {
  dev: {
    url: process.env.DB_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 2,
      min: 0,
      acquire: 3000,
      idle: 0,
      evict: 30000,
    },
  },
};
