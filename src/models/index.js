const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");
const Purchase = require("./Purchase");
const User = require("./User");


Product.belongsTo(Category)
Category.hasMany(Product)

Cart.belongsTo(User)
User.hasOne(Cart)

Cart.belongsTo(Product)
Product.hasMany(Cart)

Purchase.belongsTo(User)
User.hasMany(Purchase)

Purchase.belongsTo(Product)
Product.hasMany(Purchase)

ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)