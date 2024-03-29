const express = require('express')
const router = express.Router();
const paidOrdersCtrl = require('../../controllers/api/paidOrders')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// get paid orders
router.get('/getPaidOrders', paidOrdersCtrl.getPaidOrders)

router.put('/convertToPaidOrder', paidOrdersCtrl.convertToPaidOrder)

router.put('/updateOrderStatus', paidOrdersCtrl.updateOrderStatusCtrl)


module.exports = router