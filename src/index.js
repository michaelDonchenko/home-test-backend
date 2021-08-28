const express = require('express')
const sequelize = require('./db/database')
const app = express()
const { PORT, CLIENT_URL } = require('./constants')
const cors = require('cors')

//init middlewares
app.use(express.json({ limit: '5mb' }))
app.use(cors({ origin: CLIENT_URL, credentials: true }))

//import routes
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')

//use routes
app.use('/api/product', productRoutes)
app.use('/api/order', orderRoutes)

//app start
const appStart = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`The app is running at http://localhost:${PORT}`)
    })
    //database connection
    try {
      await sequelize.authenticate()
      await sequelize.sync()
      console.log('Connection has been established successfully.')
    } catch (error) {
      console.log(error)
    }
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

appStart()
