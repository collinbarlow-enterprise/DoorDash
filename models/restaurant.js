const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
    
    // if menu items are in an array, how do i access avgRating?
    // will need to reseed data after changing this 
    
    avgRating: [{type: Schema.Types.ObjectId, ref: 'menuItem'}],
    orderHistory: {type: Schema.Types.ObjectId, ref: 'Order'}

});

module.exports = mongoose.model("Restaurant", restaurantSchema)