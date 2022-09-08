jest.mock('./src/entities', () => {
  return {
    User: {
      findOne: jest.fn(),
      create: jest.fn(),
    },
    sequelize: { query: jest.fn() },
  };
});
