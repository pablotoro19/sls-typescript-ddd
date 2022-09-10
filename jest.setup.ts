jest.mock('./src/shared/entities', () => {
  return {
    Customer: {
      findOne: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    },
    sequelize: { query: jest.fn() },
  };
});
