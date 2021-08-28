const { Router } = require('express')
const {
  getAll,
  create,
  remove,
  update,
  getProduct,
} = require('../controllers/product')
const { validationMiddleware } = require('../middlewares/validationMiddleware')
const { createProductValidation } = require('../validators/productValidation')
const router = Router()

router.get('/products', getAll)
router.get('/product/:id', getProduct)
router.post(
  '/create-product',
  createProductValidation,
  validationMiddleware,
  create
)
router.delete('/delete/:id', remove)
router.put('/update/:id', createProductValidation, validationMiddleware, update)

module.exports = router
