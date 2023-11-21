const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const menuItemSchema = new Schema({
    dishName: { type: String },
    description: { type: String },
    ingredients: [{ type: String }],
    price: { type: Number },
    ratings: { type: Number },
    reviews: [{ type: String }],
});

const restaurantSchema = new Schema({
    name: { type: String },
    cuisineType: { type: String },
    picture: { type: String },
    menu: [menuItemSchema], // Embed the menuItemSchema directly
    avgRating: [{ type: Schema.Types.ObjectId, ref: 'menuItem' }],
    orderHistory: { type: Schema.Types.ObjectId, ref: 'Order' },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = { Restaurant, MenuItem };
