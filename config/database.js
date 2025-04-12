const Sequelize = require('sequelize');

// Database configuration
module.exports = new Sequelize('postgres', 'postgres', 'postgres', {
  host: 'localhost',
  port: 5433,
  dialect: 'postgres',
  logging: console.log,
  retry: { max: 5, timeout: 5000 }
});