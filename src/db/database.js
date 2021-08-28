const { Sequelize } = require('sequelize')

// local databse connection

module.exports = new Sequelize('home_test_db', 'postgres', 'root', {
  dialect: 'postgres',
  host: 'localhost',
  port: '5432',
})
