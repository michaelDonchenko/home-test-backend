const { Order, Item } = require('../models')
const { Op } = require('sequelize')

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

exports.topFiveUniqueProducts = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: [Item] })
    if (!orders || (orders && orders.length === 0)) {
      return res.status(404).json({ message: 'No products found' })
    }

    let products = {}

    for (let i = 0; i < orders.length; i++) {
      const key = 'title'

      const arrayUniqueByKey = [
        ...new Map(orders[i].items.map((item) => [item[key], item])).values(),
      ]

      for (let i = 0; i < arrayUniqueByKey.length; i++) {
        if (arrayUniqueByKey[i].title in products) {
          // console.log('exist')
          products[arrayUniqueByKey[i].title] += 1
        } else {
          // console.log('not exist')
          products[arrayUniqueByKey[i].title] = 1
        }
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

exports.pastFiveDaysSales = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: {
        createdAt: { [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000 * 5) },
      },
    })

    if (!orders || (orders && orders.length === 0)) {
      return res.status(404).json({ message: 'No products found' })
    }

    let slicedOrders = []

    orders.forEach((order) => {
      stringedDate = order.createdAt.toISOString().slice(0, 10)
      slicedOrders.push({ price: order.cart_total, date: stringedDate })
    })

    let salesByDay = {}

    for (let i = 0; i < slicedOrders.length; i++) {
      if (slicedOrders[i].date in salesByDay) {
        // console.log('exist')
        salesByDay[slicedOrders[i].date] += slicedOrders[i].price
      } else {
        // console.log('not exist')
        salesByDay[slicedOrders[i].date] = slicedOrders[i].price
      }
    }

    return res.json({ salesByDay })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'An unexpected error accoured' })
  }
}
