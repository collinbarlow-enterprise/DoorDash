const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// not used in this version of Magic Chef

const driverSchema = new Schema({
    name: {type: String},
    picture: {type: Image},
    car: {type: String},
    rating: [{type: Number}]
});

module.exports = mongoose.model("Driver", driverSchema)