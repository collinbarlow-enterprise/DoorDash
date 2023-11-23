const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// not used in this version of Magic Chef

const driverSchema = new Schema({
    name: {type: String},
    // url string 
    picture: {type: String},
    // can make these have subfields for make, model, year
    car: {type: String},
    // would be an array that the user could push to, may need to create two properties for the rating field for avg and an array, or add another field that would be ratingAvg
    rating: [{type: Number}]
});

module.exports = mongoose.model("Driver", driverSchema)