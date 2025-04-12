// const Sequelize = require('sequelize');

// // Database configuration
// module.exports = new Sequelize('postgres', 'postgres', 'postgres', {
//   host: 'localhost',
//   port: 5433,
//   dialect: 'postgres',
//   logging: console.log,
//   retry: { max: 5, timeout: 5000 }
// });

const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

module.exports =  new Sequelize(process.env.DATABASE_URL, {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});