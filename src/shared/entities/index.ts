/* eslint-disable jest/require-hook */
import { Sequelize } from 'sequelize';

import * as config from '../../config/database';

import Customer from './customer';

const env: string = process.env.NODE_ENV || 'dev';

const dbConfig = config[env as keyof typeof config] as unknown as Record<string, string>;
const { url } = dbConfig as { url: string };

const sequelize = new Sequelize(url, dbConfig);

const entities = {
  Customer,
};

Object.keys(entities).forEach((modelKey: string): void => {
  entities[modelKey as keyof typeof entities].initialize(sequelize);
});

Object.keys(entities).forEach((modelKey: string): void => {
  // Create model associations
  if (entities[modelKey as keyof typeof entities].associate.length) {
    entities[modelKey as keyof typeof entities].associate(entities);
  }
});

export { sequelize };
export default entities;
