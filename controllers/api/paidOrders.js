const Order = require('../../models/order');
const PaidOrder = require('../../models/paidOrder');

module.exports = {
    getPaidOrders,
    convertToPaidOrder,
}

async function getPaidOrders(req, res) {
    console.log(req.body, 'get paid orders function')
}

async function convertToPaidOrder(req, res) {
    console.log(req.body, 'req.body in convert to paid order CONTROLLER')
    const filter = {_id: req.body.cart._id};
    console.log(filter, 'filter');
    console.log(typeof filter, 'filter');

    try {
        console.log('made it into convert paid order controller')



        const update = {isPaid : true}

        // find the cart document and update the isPaid field to true
        const updatedCart = await Order.findOneAndUpdate(filter, update, {
            new: true
        });

        console.log(updatedCart, 'updatedCart')
        // create a new paidOrder document that matches the fields

        // return a success object that we can use to trigger the navigate to order status page on the front end 
    }
    catch (error){
        console.log(error);
        res.status(500)
    }
}