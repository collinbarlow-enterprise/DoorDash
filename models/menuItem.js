const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// possibly not even being used in this version of doordash 

const testmenuItemSchema = new Schema({
    dishName: {type: String},
    description: {type: String},
    ingredients: [{type: String}], 
    price: {type: Number},
    ratings: {type: Number},
    reviews: [{type: String}],
});

module.exports = mongoose.model("testMenuItem", testmenuItemSchema)