const Order = require('../../models/order');
const PaidOrder = require('../../models/paidOrder');
const User = require('../../models/user')
const { Restaurant, MenuItem } = require('../../models/restaurant')
const mongoose = require('mongoose');

module.exports = {
    getPaidOrders,
    convertToPaidOrder,
    updateOrderStatusCtrl,
}

async function getPaidOrders(req, res) {
    // console.log(req.body, 'get paid orders function')
    // console.log(req.body.user, 'req.body.user')
    // console.log(req, 'req')
    // console.log(req.user._id, 'user id')

    const id = req.user._id

    try {
        const user = await User.findById(id)

        const userOrders = user.orders
        // console.log(userOrders, 'user orders')

        const orders = await PaidOrder.find({ _id: { $in: userOrders } })
        // console.log(orders, 'orders')

        // console.log(user, 'order')
        res.json(orders)
    } catch (error) {
        console.error(error);

        // Handle different types of errors and return appropriate status codes
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation error' });
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function convertToPaidOrder(req, res) {
    console.log(req.body, 'REQ.BODY in convert to paid order CONTROLLER')
    const filter = { _id: req.body.cart._id };
    // console.log(filter, 'filter');
    // console.log(typeof filter, 'filter');

    try {
        // console.log('made it into convert paid order controller')

        const update = { 
            isPaid: true,
            dropOffInstructions: req.body.cart.dropOffInstructions,
            isGift: req.body.cart.giftStatus,
        }

        // find the cart document and update the isPaid field to true
        const updatedCart = await Order.findOneAndUpdate(filter, update, {
            new: true
        });

        console.log(updatedCart, 'UPDATED CART')
        // console.log('Restaurant ID:', updatedCart.restaurant);

        // console.log(Restaurant);  // This should show a function or a model object

        // Assuming Restaurant is your model for the restaurant collection
        const restaurantData = await Restaurant.findById(updatedCart.restaurant).exec();
        // console.log(restaurantData, 'RESTAURANT DATA')

        const restaurantName = restaurantData ? restaurantData.name : 'Unknown Restaurant';

        // console.log(restaurantName, 'RESTAURANT NAME in paidCART')
        // const order = await Order.findById(filter).populate('lineItems.item').exec(); 

        // Function to fetch item name
        async function getItemName(itemId, restaurantData) {
            // console.log(itemId, 'Item ID being queried');
            // console.log(restaurantData.menu, 'Menu Items in restaurant');

            // Find the menu item in the restaurant's menu array using Array.find
            // Find the menu item in the restaurant's menu array using Array.find
            
            const menuItem = restaurantData.menu.find(item => item._id.equals(itemId));

            // console.log(menuItem, 'Menu Item found');

            return menuItem ? menuItem.dishName : 'Unknown Item';
        }


        // Map lineItems to promises to enrich them with item names
        // const lineItemsWithNames = await Promise.all(updatedCart.lineItems.map(async (lineItem) => {
        //     const itemName = await getItemName(lineItem.item);
        //     console.log(itemName, 'itemName in lineItemMapping')
        //     return {
        //         quantity: lineItem.quantity,
        //         item: lineItem.item,
        //         itemName: itemName,
        //         price: lineItem.price,
        //     };
        // }));

        const lineItemsWithNames = await Promise.all(updatedCart.lineItems.map(async (lineItem) => {
            // console.log(lineItem.item, 'Item ID being queried');  // Check the actual ID being passed
            const itemName = await getItemName(lineItem.item, restaurantData);
            // console.log(itemName, 'itemName in lineItemMapping');  // Check the fetched name
            return {
                quantity: lineItem.quantity,
                item: lineItem.item,
                itemName: itemName,
                price: lineItem.price,
            };
        }));




        const paidOrderData = {
            user: updatedCart.user,
            restaurant: updatedCart.restaurant,
            restaurantName: restaurantName,
            orderItems: updatedCart.orderItems,
            driver: updatedCart.driver,
            totalPrice: updatedCart.total,
            status: updatedCart.status,
            feesAndTaxes: updatedCart.feesAndTaxes,
            promoCode: updatedCart.promoCode,
            promoCodeApplied: updatedCart.promoCodeApplied,
            promoCodeDiscount: updatedCart.promoCodeDiscount,
            isGift: updatedCart.isGift,
            deliveryStatus: 'order received',
            deliveryOption: updatedCart.deliveryOption,
            dropOffInstructions: updatedCart.dropOffInstructions,
            lineItems: lineItemsWithNames,
            // lineItems: updatedCart.lineItems.map(lineItem => ({
            //     quantity: lineItem.quantity,
            //     item: lineItem.item, // Assuming item is a reference to MenuItem
            //     itemName: lineItemName,
            //     price: lineItem.price,
            // })),
            isPaid: true, // You are marking it as paid, adjust as needed
        };

        const paidOrder = new PaidOrder(paidOrderData);
        await paidOrder.save();

        // console.log('PaidOrder created:', paidOrder);

        const userFilter = { _id: req.body.cart.user }
        const userUpdate = { $push: { orders: paidOrder._id } }

        const addOrderToUser = await User.findByIdAndUpdate(userFilter, userUpdate, {
            new: true
        });

        // console.log(addOrderToUser, 'addOrderToUser')
        // Respond with success or any other necessary information
        return res.status(200).json({ success: true, message: 'PaidOrder created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500)
    }
}

async function updateOrderStatusCtrl(req, res) {
    // console.log(req.body, 'req.body in updateStatusCtrl');

    const statusArray = ['order received', 'order in progress', 'waiting on driver', 'driver on route', 'order delivered'];


    try {
        const orderArray = req.body.ordersInProgress;
        // console.log(orderArray, 'orderArray in updateCTRL');

        const updatedOrders = [];

        // i need to iterate through the array
        for (let i = 0; i < orderArray.length; i++) {
            const filter = { _id: orderArray[i]._id };
            // console.log(filter, 'filter in updateStatusCtrl')

            const currentStatus = orderArray[i].deliveryStatus;
            // console.log(currentStatus, 'currentStatus in updateCtrl')

            let nextStatus = '';

            if (currentStatus != 'order delivered') {
                for (let s = 0; s < statusArray.length; s++) {
                    if (statusArray[s] === currentStatus) {
                        nextStatus = statusArray[s + 1]
                    }
                }
                // console.log(nextStatus, 'nextStatus in for loop ')
            };


            const update = { deliveryStatus: nextStatus }

            const thisOrder = await PaidOrder.findOneAndUpdate(filter, update, { new: true })

            // console.log(thisOrder, 'thisOrder after update')

            updatedOrders.push(thisOrder);
        }

        return res.status(200).json({ success: true, message: 'order status updated successfully', updatedOrders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Failed to update order status' });
    }
}

