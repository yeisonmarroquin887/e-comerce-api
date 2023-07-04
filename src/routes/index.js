const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.router');
const routerProduct = require('./product.router');
const routerCart = require('./cart.router');
const routerPurchase = require('./purchase.router');
const routerProductimg = require('./productimg.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', routerUser)
router.use('/categoris', routerCategory) 
router.use('/products', routerProduct)
router.use('/cart', routerCart)
router.use('/purchase', routerPurchase)
router.use('/product_images', routerProductimg)


module.exports = router;