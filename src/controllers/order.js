const { Order, Item } = require('../models')

exports.PlaceOrder = async (req, res) => {
  const { products, cartTotal } = req.body
  try {
    const newOrder = await Order.create({ cart_total: cartTotal })

    products.forEach(async (product) => {
      await Item.create({
        title: product.title,
        price: product.price,
        orderId: newOrder.id,
      })
    })

    return res.status(200).json({ message: 'Order created succefully' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'An unexpected error accoured' })
  }
}

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: [Item] })

    return res.status(200).json({ orders })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'An unexpected error accoured' })
  }
}

exports.topFiveSoldProducts = async (req, res) => {
  const options = req.query.options

  try {
    const items = await Item.findAll()
    if (!items || (items && items.length === 0)) {
      return res.status(404).json({ message: 'No products found' })
    }

    let products = {}

    for (let i = 0; i < items.length; i++) {
      if (items[i].title in products) {
        // console.log('exist')
        products[items[i].title] += 1
      } else {
        // console.log('not exist')
        products[items[i].title] = 1
      }
    }

    let entries = Object.entries(products)
    let sorted = entries.sort((a, b) => b[1] - a[1])

    if (sorted.length > 5) {
      let fiveLimit = []
      for (let i = 0; i < 5; i++) {
        fiveLimit.push(sorted[i])
      }

      return res.status(200).json({ products: fiveLimit })
    }

    return res.status(200).json({ products: sorted })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'An unexpected error accoured' })
  }
}
