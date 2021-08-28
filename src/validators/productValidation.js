const { check } = require('express-validator')
// const { Product } = require('../models')

const title = check('title').not().isEmpty().withMessage('All fields required')
const description = check('description')
  .not()
  .isEmpty()
  .withMessage('All fields required')
  .isLength({ max: 500 })
  .withMessage('Description can be only 500 characters')
const price = check('price').not().isEmpty().withMessage('All fields required')
const image_url = check('image_url')
  .not()
  .isEmpty()
  .withMessage('All fields required')

module.exports = {
  createProductValidation: [title, description, price, image_url],
}
