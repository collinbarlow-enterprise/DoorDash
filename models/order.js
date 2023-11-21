const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Restaurant, MenuItem } = require('./restaurant'); 
const { ObjectId } = require('mongodb');

// the orderItems may be wrong. May just need to figure out a way to add the items to the array, maybe its just an empty array that has the restaurant.menu[] objects added to it?

const lineItemSchema = new Schema ({
    quantity: {type: Number},
    item: [{type: Schema.Types.ObjectId, ref: 'MenuItem'}]
},{
    timestamps: true,
    toJSON: {virtuals: true}
})

// this.item.price doesnt work, and price is null. item i sreferring to my restaurants.object.id
// lineItemSchema.virtual('extPrice').get(function() {
//     console.log(this, 'this in lineItem virtual')
//     return this.quantity*this.item.menu.price
// })

// lineItemSchema.virtual('extPrice').get(async function() {
//     // Populate the 'item' field to access the menu
//     const populatedLineItem = await this.populate('item').execPopulate();
    
//     if (populatedLineItem.item && populatedLineItem.item.menu.length > 0) {
//       return this.quantity * populatedLineItem.item.menu[0].price;
//     } else {
//       return 0; // or handle the case where the item or menu is missing
//     }
//   });


const orderSchema = new Schema({
    // update 'required' to true once the workflow is working
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant', required: false},
    orderItems: [{type: Schema.Types.ObjectId, ref: 'Restaurant', required: false}],
    driver: {type: Schema.Types.ObjectId, ref: 'Driver', required: false},
    totalPrice: {type: Number},
    status: {type: String},
    
    lineItems: [lineItemSchema],
    isPaid: {type: Boolean, default: false}
}, {
    timestamps: true,
    toJSON: {virtuals: true}
});



//grabs the value of  all the line items times their multiply of whats in the cart 

orderSchema.virtual('orderTotal').get(function () {
    return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
});

orderSchema.virtual('totalQty').get(function () {
    return this.lineItems.reduce((total, item) => total + item.quantity, 0);
});


orderSchema.virtual('orderId').get(function() {
    return this.id.slice(-6).toUpperCase();
});


orderSchema.statics.getCart = function(userId) {
    return this.findOneAndUpdate(
        { user: userId, isPaid: false},
        {user:userId},
        {upsert: true, new: true}
    )
    .populate('lineItems.item')
    .exec();
};

// need to include populate 'lineItems.item' b/c without that I will only have access to the document id (in this case Fish Id)
//by using the populate I am telling mongoose to retrieve the referenced 'Fish' documents and replace the objectId with the actual 'Fish'
//this allows me to access the properties of the 'fish' documents in my virtual and thus allows me to calculate the virtuals 


orderSchema.statics.getPaidCart = function(userId) {
    console.log('getPaidcart function in ORDER MODEL')
    return this.find(
        {user: userId, isPaid: true},
    )
    .populate('lineItems.item')
    .exec();
};

orderSchema.methods.addItemToCart = async function (itemId, index, restaurant) {
    const cart = this;
    
    const restaurantId = restaurant._id;
    console.log(restaurantId, 'restaurantId in ORDEER')

    const specificRestaurant = await mongoose.model('Restaurant').findById(restaurantId);

    if (specificRestaurant) {
        // Find the menuItem in the menu array
        const menuItem = specificRestaurant.menu.find(item => item._id.equals(itemId));
      console.log(menuItem, 'MENU ITEM IF RESTAURANT IS FOUND')
    

    // console.log(index, 'index in addItem MODEL')
    // console.log(itemId, 'itemId in addItem MODEL')
    // console.log(restaurant, 'RESTAURANT in addItem MODEL')
    // console.log(cart, 'cart in addItem')
    // console.log(typeof itemId, 'Type of itemId before query');

    // const objectId = new ObjectId(itemId)  

    // const convertedItemId = mongoose.Types.ObjectId(itemId);
    // console.log(typeof convertedItemId, 'Type of itemId before query');
    // console.log(typeof objectId, 'Type of OBJECTid before query');
    // console.log(objectId, 'objectId of itemId before query');

    // const item = await mongoose.model('MenuItem').findById(itemId);

    // console.log(item, 'lineItem AFTER QUERYING DATABASE')
    // const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
    console.log(cart, 'CART IN ADDTOCART')
    console.log(cart.lineItems, 'CART.LINEITEMs')
    const lineItem = cart.lineItems.find(lineItem => lineItem.item && lineItem._id.equals(menuItem._id));

    if (lineItem) {
        lineItem.quantity +=1;

    } else {
        // const item = await mongoose.model('MenuItem').findById(itemId);
        // const item = await mongoose.model('Restaurant').findById(itemId); 
        cart.lineItems.push({menuItem});

    }
      // Filter out entries with null items
      cart.lineItems = cart.lineItems.filter((entry) => entry.item !== null);

    // console.log(cart, 'cart after everything')
    return cart.save();
}};


//couldnt use remove b/c I was calling remove on an object that matches the schema rather than an instance. The remove() needed to update to include a splice method involving the index of the lineItem and removing it via splice. FindIndex is used to find the index of the line item in the lineItems array that matches the itemId and then splice is used to remove that line item from the array 


orderSchema.methods.setItemQty = function (itemId, newQty) {
    const cart = this;
    const lineItemIndex = cart.lineItems.findIndex(lineItem => lineItem.item._id.equals(itemId));
    if (lineItemIndex !==1 && newQty <= 0) {
        cart.lineItems.splice(lineItemIndex, 1);
    } else if (lineItemIndex !== -1) {
        cart.lineItems[lineItemIndex].quantity = newQty; 
    }
    return cart.save();
};

module.exports = mongoose.model("Order", orderSchema)

