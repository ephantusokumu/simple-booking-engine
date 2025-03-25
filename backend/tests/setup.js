require('dotenv').config({ path: '.env.test' });

// Ensure the database is clean before running tests
const { sequelize } = require('../src/models');

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});