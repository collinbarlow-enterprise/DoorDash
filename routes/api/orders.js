const express = require('express')
const router = express.Router();
const ordersCtrl = require('../../controllers/api/orders')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

//get to grab cart
// commenting out ensureLoggedIn, and removing from the rest of the routes temporarily
// router.get('/cart', ensureLoggedIn, ordersCtrl.cart);
router.get('/cart',  ordersCtrl.cart);

//post to add to cart
router.post('/cart/items/:id', ordersCtrl.addToCart);

//post to set item quantity
router.put('/cart/quantity', ordersCtrl.setItem);

//post to checkout for cart
router.post('/cart/checkout', ordersCtrl.checkout);

//get /previousOrders 
router.get('/previousOrders', ordersCtrl.getPaidCartController);

router.delete('/deleteOrder', ordersCtrl.deleteOrder)

module.exports = router