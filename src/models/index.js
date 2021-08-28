const sequelize = require('../db/database')
const { DataTypes } = require('sequelize')
const { STRING, INTEGER, TEXT } = DataTypes

//product model

const Product = sequelize.define(
  'product',
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: STRING, allowNull: false },
    description: { type: TEXT, allowNull: false },
    price: { type: INTEGER, allowNull: false },
    image_url: { type: TEXT, allowNull: false },
  },
  { timestamps: true }
)

const Order = sequelize.define(
  'order',
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    cart_total: { type: INTEGER, allowNull: false },
  },
  { timestamps: true }
)

const Item = sequelize.define(
  'item',
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: STRING, allowNull: false },
    price: { type: INTEGER, allowNull: false },
  },
  { timestamps: false }
)

//relations
Order.hasMany(Item)
Item.belongsTo(Order)

module.exports = {
  Product,
  Order,
  Item,
}
