const { config } = require('dotenv')
config()

module.exports = {
  PORT: process.env.PORT || 8000,
  ENV: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL,
}
