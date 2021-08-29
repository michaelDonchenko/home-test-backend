const { config } = require('dotenv')
config()

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL,
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
}
