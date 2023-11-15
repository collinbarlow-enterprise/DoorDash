const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// not used in this version of Magic Chef

const orderSchema = new Schema({
    restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant', required: true},
    orderItems: [{type: Schema.Types.ObjectId, ref: 'MenuItem', required: true}],
    driver: {type: Schema.Types.ObjectId, ref: 'Driver', required: true},
    totalPrice: {type: Number},
    status: {type: String},

});

module.exports = mongoose.model("Order", orderSchema)