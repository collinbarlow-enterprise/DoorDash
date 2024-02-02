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
    const filter = { _id: req.body.cart._id };
    console.log(filter, 'filter');
    console.log(typeof filter, 'filter');

    try {
        console.log('made it into convert paid order controller')

        const update = { isPaid: true }

        // find the cart document and update the isPaid field to true
        const updatedCart = await Order.findOneAndUpdate(filter, update, {
            new: true
        });

        console.log(updatedCart, 'updatedCart')

        // const order = await Order.findById(filter).populate('lineItems.item').exec(); 

        const paidOrderData = {
            user: updatedCart.user,
            restaurant: updatedCart.restaurant,
            orderItems: updatedCart.orderItems,
            driver: updatedCart.driver,
            totalPrice: updatedCart.totalPrice,
            status: updatedCart.status,
            feesAndTaxes: updatedCart.feesAndTaxes,
            promoCode: updatedCart.promoCode,
            promoCodeApplied: updatedCart.promoCodeApplied,
            promoCodeDiscount: updatedCart.promoCodeDiscount,
            isGift: updatedCart.isGift,
            deliveryOption: updatedCart.deliveryOption,
            dropOffInstructions: updatedCart.dropOffInstructions,
            lineItems: updatedCart.lineItems.map(lineItem => ({
                quantity: lineItem.quantity,
                item: lineItem.item, // Assuming item is a reference to MenuItem
                price: lineItem.price,
            })),
            isPaid: true, // You are marking it as paid, adjust as needed
        };

        const paidOrder = new PaidOrder(paidOrderData);
        await paidOrder.save();

        console.log('PaidOrder created:', paidOrder);

        // Respond with success or any other necessary information
        return res.status(200).json({ success: true, message: 'PaidOrder created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500)
    }
}