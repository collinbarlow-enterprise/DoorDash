const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promoCodeSchema = new Schema({
        code: { type: String, required: true }, 
        discount: { type: Number, required: true }   
});

module.exports = mongoose.model("PromoCode", promoCodeSchema);