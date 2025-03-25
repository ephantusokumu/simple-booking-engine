const { Sequelize } = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      logging: false
    }
);

const models = {
  User: require('./user')(sequelize, Sequelize),
  Tour: require('./tour')(sequelize, Sequelize),
  Booking: require('./booking')(sequelize, Sequelize),
  Payment: require('./payment')(sequelize, Sequelize)
};

Object.values(models).forEach(model => {
  if (model.associate) model.associate(models);
});

module.exports = { sequelize, ...models };