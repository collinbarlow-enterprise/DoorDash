const express = require('express')
const router = express.Router();
const paidOrdersCtrl = require('../../controllers/api/paidOrders')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// get paid orders
router.get('/paidOrders', paidOrdersCtrl.getPaidOrders)

router.put(`/convertToPaidOrder`, paidOrdersCtrl.convertToPaidOrder)


module.exports = router