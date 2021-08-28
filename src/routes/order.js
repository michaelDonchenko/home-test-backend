const { Router } = require('express')
const {
  PlaceOrder,
  getOrders,
  topFiveSoldProducts,
  topFiveUniqueProducts,
  pastFiveDaysSales,
} = require('../controllers/order')
const router = Router()

router.post('/place-order', PlaceOrder)
router.get('/orders', getOrders)
router.get('/top-sold-items', topFiveSoldProducts)
router.get('/top-unique-items', topFiveUniqueProducts)
router.get('/past-five-days-sales', pastFiveDaysSales)

module.exports = router
