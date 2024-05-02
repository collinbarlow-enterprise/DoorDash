const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lineItemSchema = new Schema({
    quantity: { type: Number },
    item: { type: Schema.Types.ObjectId, ref: 'MenuItem' },
    price: { type: Number },
    itemName: {type: String, default : 'none'},
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

lineItemSchema.virtual('extPrice').get(function() {
    return this.quantity * this.price;
});

const paidOrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: false },
    restaurantName: {type: String, default: 'none'},
    orderItems: [{ type: Schema.Types.ObjectId, ref: 'Restaurant', required: false }],
    driver: { type: Schema.Types.ObjectId, ref: 'Driver', required: false },
    totalPrice: { type: Number },
    status: { type: String },
    feesAndTaxes: { type: Number, default: 0 },
    promoCode: { type: Boolean, default: false },
    promoCodeApplied: { type: String, default: 'none' },
    promoCodeDiscount: { type: Number, default: 0 },
    isGift: { type: Boolean, default: false },
    deliveryOption: {
        type: {
            type: String,
            enum: ['standard', 'schedule ahead'],
            default: 'standard',
        },
        data: {
            type: Date,
            default: null,
            validate: {
                validator: function(date) {
                    return date === null || date > new Date();
                },
                message: 'Invalid date. Date must be in the future.',
            },
        },
    },
    deliveryStatus: {type: String, enum: ['order received', 'order in progress', 'waiting on driver', 'driver on route', 'order delivered']},
    orderDelived: {type: Boolean, default: false},
    dropOffInstructions: { type: String, default: 'none' },
    lineItems: [lineItemSchema],
    isPaid: { type: Boolean, default: false },
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

module.exports = mongoose.model("PaidOrder", paidOrderSchema)