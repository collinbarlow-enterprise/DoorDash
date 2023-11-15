const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// not used in this version of Magic Chef

const restaurantSchema = new Schema({
    name: {type: String},
    cuisineType: {type: String},
    picture: {type: Image},
    menu: {type: Schema.Types.ObjectId, ref: 'menuItem'},
    avgRating: [{type: Schema.Types.ObjectId, ref: 'menuItem'}],
    orderHistory: {type: Schema.Types.ObjectId, ref: 'Order'}

});

module.exports = mongoose.model("Restaurant", restaurantSchema)