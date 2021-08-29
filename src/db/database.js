const { Sequelize } = require('sequelize')
const { DB_CONNECTION_STRING, NODE_ENV } = require('../constants')

NODE_ENV === 'development'
  ? (module.exports = new Sequelize('home_test_db', 'postgres', 'root', {
      dialect: 'postgres',
      host: 'localhost',
      port: '5432',
    }))
  : (module.exports = new Sequelize(DB_CONNECTION_STRING))
