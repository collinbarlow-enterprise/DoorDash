const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// not used in this version of Magic Chef

const menuItemSchema = new Schema({
    dishName: {type: String},
    description: {type: String},
    ingredients: [{type: String}], 
    price: {type: Number},
    ratings: {type: Number},
    reviews: [{type: String}],
});

module.exports = mongoose.model("MenuItem", menuItemSchema)