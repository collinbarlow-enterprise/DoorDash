const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// not used in this version of Magic Chef

const restaurantSchema = new Schema({
    name: {type: String},
    cuisineType: {type: String},
    picture: {type: String},
    menu: [{
        dishName: { type: String },
        description: { type: String },
        ingredients: [{ type: String }],
        price: { type: Number },
        ratings: { type: Number },
        reviews: [{ type: String }],
    }],
    avgRating: [{type: Schema.Types.ObjectId, ref: 'menuItem'}],
    orderHistory: {type: Schema.Types.ObjectId, ref: 'Order'}

});

module.exports = mongoose.model("Restaurant", restaurantSchema)