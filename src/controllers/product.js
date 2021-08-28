const { Product } = require('../models')

exports.getAll = async (req, res) => {
  try {
    const products = await Product.findAll()

    return res.status(200).json({ products })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'An unexpected error accoured' })
  }
}

exports.getProduct = async (req, res) => {
  const { id } = req.params
  try {
    const product = await Product.findOne({ where: { id } })

    return res.status(200).json({ product })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'An unexpected error accoured' })
  }
}

exports.create = async (req, res) => {
  try {
    await Product.create({ ...req.body })

    return res.status(200).json({ message: 'Post created succefully' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'An unexpected error accoured' })
  }
}

exports.remove = async (req, res) => {
  const { id } = req.params
  console.log(id)
  try {
    await Product.destroy({ where: { id } })
    return res.status(200).json({ message: 'Post deleted succefully' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'An unexpected error accoured' })
  }
}

exports.update = async (req, res) => {
  const { id } = req.params

  try {
    await Product.update({ ...req.body }, { where: { id } })

    return res.status(200).json({ message: 'Post updated succefully' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'An unexpected error accoured' })
  }
}
