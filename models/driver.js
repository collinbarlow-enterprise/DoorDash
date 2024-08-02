const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    // url string for the image
    picture: { type: String, default: 'not available' },
    car: {
      make: { type: String },
      model: { type: String },
      year: { type: Number }
    },
    rating: [{ type: Number }]
  });

module.exports = mongoose.model("Driver", driverSchema)