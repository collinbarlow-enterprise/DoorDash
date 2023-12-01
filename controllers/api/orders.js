const Order = require('../../models/order')

module.exports = {
    cart,
    addToCart,
    addToCartFromItemPage,
    setItem,
    checkout,
    getPaidCartController,
    deleteOrder
}

async function cart(req, res) {
    const cart = await Order.getCart(req.user._id);
    // console.log(cart, 'CART IN CART CONTROLLER AFTER GETCART STATIC IS CALLED')
    res.json(cart)
}

async function addToCart(req, res) {
    // console.log(req.body, 'req.body in addtocart controller')
    // item id, restaurant, and index are in req.body

    const cart = await Order.getCart(req.user._id, req.body);
    // item is set to null in this console.log
    // console.log(cart, 'CART IN ADDTOCART ORDER CONTROLLER BEFORE TRIGGERING ADDITEM TO CART')

    // await cart.addItemToCart(req.params.id);
    await cart.addItemToCart(req.body.itemId, req.body.index, req.body.restaurant);
    // console.log(cart, 'CART IN ADDTOCART ORDER CONTROLLER')
    // console.log(cart.lineItems, 'CART LINEITEM IN ADDTOCART ORDER CONTROLLER')
    res.json(cart);
}

async function addToCartFromItemPage(req, res) {
    console.log(req.body, 'req.body in addToCART CONTROLLER FROM ITEMPAGE')
    const cart = await Order.getCart(req.user._id, req.body);
    console.log(cart, 'cart in add to order from item page')

    await cart.addItemToCartFromItemPage(req.body.itemId, req.body.restaurantId);

    console.log(cart, 'cart after addItem');
    res.json(cart);
}

async function setItem(req, res) {
    // console.log(req, 'req in setItem CONTROLLER')
    // req.body has itemId and newQty
    const cart = await Order.getCart(req.user._id);
    // console.log(cart, 'cart in setItem CONTROLLER')
    await cart.setItemQty(req.body.itemId, req.body.newQty);
    // console.log(cart, 'cart before sending back in setItem')
    res.json(cart);
}

async function checkout(req, res) {
    const cart = await Order.getCart(req.user._id);
    cart.isPaid = true;
    await cart.save();
    res.json(cart);
}

async function deleteOrder(req, res) {
    try {
    const order = await Order.findByIdAndDelete(req.body._id);
    res.json({success: true, order});
} catch (error) {
    console.log(error);
    res.status(500)
}}

//when using this.find instead of this.findOne in the static method I am returning an array of documents instead of a single document
// thus when I try to access the lineItems property in the controller function(or after) the lineItems property doesn't actually exist
// that explains why I lost so much data and had to use the find method equaling the itemId in the deepest orderHistory componenet
//to fix this I can either change the static method to this.findONe (whihch would only call one) or I can alter the controller function 
// that loops through each document and accesses the lineItems property for each one 

//I am looping through the paidCart array that is returned by getPaidCart and then adding the orderTotal property to each cart
//I am using the ...cart.toJSON() to change the cart from a mongoose document object, to a javascript object which can then be added onto/modified
//the coma is used to seperate properties from within the object
async function getPaidCartController(req, res) {
    const paidCart = await Order.getPaidCart(req.user._id);
    const paidCartsWithTotal = paidCart.map(cart => ({
        ...cart.toJSON(),
        orderTotal: cart.orderTotal
    }));
    res.json(paidCartsWithTotal);
}