const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const menuItemSchema = new Schema({
    dishName: { type: String },
    description: { type: String },
    ingredients: [{ type: String }],
    price: { type: Number },
    // think rating should be an array
    ratings: { type: Number },
    reviews: [{ type: String }],
});

const restaurantSchema = new Schema({
    name: { type: String },
    cuisineType: { type: String },
    // picture should be a url, may not be a string type?
    picture: { type: String },
    menu: [menuItemSchema], // Embed the menuItemSchema directly
    // dont think the avgRating should be an object type. It would probably be a virtual that accessed the all the reviews in the menuItems documents
    avgRating: [{ type: Schema.Types.ObjectId, ref: 'menuItem' }],
    // this may need to be an array - it should store all the order id's that come through this restaurant. Would probably a findOneAndUpdate or just a push as part of the purchase function
    orderHistory: { type: Schema.Types.ObjectId, ref: 'Order' },
});

// is this an issue? Can I export multiple mongoose models from the same file? I think its okay. I think its saying look at this file, and export these two objects which are mongoose models
const Restaurant = mongoose.model("Restaurant", restaurantSchema);
const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = { Restaurant, MenuItem };
