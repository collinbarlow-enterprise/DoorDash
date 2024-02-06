const Order = require('../../models/order');
const PaidOrder = require('../../models/paidOrder');
const User = require('../../models/user')

module.exports = {
    getPaidOrders,
    convertToPaidOrder,
    updateOrderStatusCtrl,
}

async function getPaidOrders(req, res) {
    console.log(req.body, 'get paid orders function')
    console.log(req.body.user, 'req.body.user')
    console.log(req, 'req')
    console.log(req.user._id, 'user id')

    const id = req.user._id
    const user = await User.findById(id)

    const userOrders = user.orders
    // console.log(userOrders, 'user orders')

    const orders = await PaidOrder.find({ _id: { $in: userOrders } })
    // console.log(orders, 'orders')

    // console.log(user, 'order')
    res.json(orders)
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
            deliveryStatus: 'order received',
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

        const userFilter = { _id: req.body.cart.user }
        const userUpdate = { $push: { orders: paidOrder._id } }

        const addOrderToUser = await User.findByIdAndUpdate(userFilter, userUpdate, {
            new: true
        });

        console.log(addOrderToUser, 'addOrderToUser')
        // Respond with success or any other necessary information
        return res.status(200).json({ success: true, message: 'PaidOrder created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500)
    }
}

async function updateOrderStatusCtrl(req, res) {
    console.log(req.body, 'req.body in updateStatusCtrl');

    const statusArray = ['order received', 'order in progress', 'waiting on driver', 'driver on route', 'order delivered'];


    try {
        const orderArray = req.body.ordersInProgress;
        console.log(orderArray, 'orderArray in updateCTRL');

        const updatedOrders = [];

        // i need to iterate through the array
        for (let i = 0; i < orderArray.length; i++) {
            const filter = { _id: orderArray[i]._id};
            console.log(filter, 'filter in updateStatusCtrl')

            const currentStatus = orderArray[i].deliveryStatus;
            console.log(currentStatus, 'currentStatus in updateCtrl')

            let nextStatus = '';

            if (currentStatus != 'order delivered') {
                for (let s = 0; s < statusArray.length; s++) {
                    if (statusArray[s] === currentStatus) {
                        nextStatus = statusArray[s + 1]
                    }
                }
                console.log(nextStatus, 'nextStatus in for loop ')
            };


            const update = { deliveryStatus: nextStatus }

            const thisOrder = await PaidOrder.findOneAndUpdate(filter, update, { new: true })

            console.log(thisOrder, 'thisOrder after update')
        
            updatedOrders.push(thisOrder);
        }

        return res.status(200).json({ success: true, message: 'order status updated successfully', updatedOrders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Failed to update order status' });
    }
}
// grab each document

//  then determine the order delivery status

// if the order delivery status isn't complete, we wait 5 seconds and then change the value, and save the document

// then we return the object

// do i need to create the array of order delivery stages in this? probably wouldn't hurt, then I could iterate through that array and increment +1 to set the new stage 
