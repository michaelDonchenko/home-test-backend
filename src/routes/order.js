const { Router } = require('express')
const {
  PlaceOrder,
  getOrders,
  topFiveSoldProducts,
} = require('../controllers/order')
const router = Router()

router.post('/place-order', PlaceOrder)
router.get('/orders', getOrders)
router.get('/top-sold-items', topFiveSoldProducts)

module.exports = router
