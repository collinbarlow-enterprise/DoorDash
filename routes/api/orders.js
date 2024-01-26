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

// post to add to cart from itemPage
router.post('/cart/items/itemPage/:id', ordersCtrl.addToCartFromItemPage);

//post to set item quantity
router.put('/cart/quantity', ordersCtrl.setItem);

// get to grab cart total
router.get('/cart/total',  ordersCtrl.getTotal);

//post to checkout for cart
router.post('/cart/checkout', ordersCtrl.checkout);

//get /previousOrders 
router.get('/previousOrders', ordersCtrl.getPaidCartController);

router.delete('/deleteOrder', ordersCtrl.deleteOrder)

// check for promoCode
router.post('/checkPromoCode', ordersCtrl.checkPromoCode);

module.exports = router