const { validationResult } = require('express-validator')

exports.validationMiddleware = (req, res, next) => {
  console.log({ ...req.body })
  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    const errorsResult = errors.array()
    return res.status(400).json({
      message: errorsResult[0].msg,
    })
  }

  next()
}
