const Order = require('../../models/order');
const PaidOrder = require('../../models/paidOrder');

module.exports = {
    getPaidOrders,
    convertToPaidOrder,
}

async function convertToPaidOrder(req, res) {
    console.log(req.body, 'req.body in convert to paid order CONTROLLER')
}