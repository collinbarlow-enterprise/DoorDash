const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// the orderItems may be wrong. May just need to figure out a way to add the items to the array, maybe its just an empty array that has the restaurant.menu[] objects added to it?

const orderSchema = new Schema({
    restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant', required: true},
    orderItems: [{type: Schema.Types.ObjectId, ref: 'Restaurant', required: true}],
    driver: {type: Schema.Types.ObjectId, ref: 'Driver', required: true},
    totalPrice: {type: Number},
    status: {type: String},

});

module.exports = mongoose.model("Order", orderSchema)