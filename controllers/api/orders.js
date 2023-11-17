const Order = require('../../models/order')

module.exports = {
    cart,
    addToCart,
    setItem,
    checkout,
    getPaidCartController,
    deleteOrder
}

async function cart(req, res) {
    const cart = await Order.getCart(req.user._id);
    res.json(cart)
}

async function addToCart(req, res) {
    const cart = await Order.getCart(req.user._id);
    await cart.addItemToCart(req.params.id);
    res.json(cart);
}

async function setItem(req, res) {
    const cart = await Order.getCart(req.user._id);
    await cart.setItemQty(req.body.itemId, req.body.newQty);
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