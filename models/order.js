const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Restaurant, MenuItem } = require('./restaurant');
const { ObjectId } = require('mongodb');

// the orderItems may be wrong. May just need to figure out a way to add the items to the array, maybe its just an empty array that has the restaurant.menu[] objects added to it?

const lineItemSchema = new Schema({
    // does this need a default value? 
    quantity: { type: Number },
    item: { type: Schema.Types.ObjectId, ref: 'MenuItem' }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

// this.item.price doesnt work, and price is null. item i sreferring to my restaurants.object.id
// lineItemSchema.virtual('extPrice').get(function() {
//     console.log(this, 'this in lineItem virtual')
//     return this.quantity*this.item.price
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
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    // need to add the restaurant field as part of either the addItem or purchase (probably addItem b/c then I could create a limitation/handler that prevents another ordered being made if the restaurant value is different than a restaurant state value on the front end)
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: false },
    // just copy the linteItems value into this array
    orderItems: [{ type: Schema.Types.ObjectId, ref: 'Restaurant', required: false }],
    // this would be assigned as part of the purchase function, and would just be a RNG that would match with the index value of a driver document 
    driver: { type: Schema.Types.ObjectId, ref: 'Driver', required: false },
    // would be a property that is assigned at time of purchase
    totalPrice: { type: Number },
    // this is a property that is going to be updated as part of the delivery workflow (just a series of time delays before moving through 3 stages)
    status: { type: String },

    lineItems: [lineItemSchema],
    isPaid: { type: Boolean, default: false }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});



//grabs the value of  all the line items times their multiply of whats in the cart 

orderSchema.virtual('orderTotal').get(function () {
    return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
});

orderSchema.virtual('totalQty').get(function () {
    return this.lineItems.reduce((total, item) => total + item.quantity, 0);
});


orderSchema.virtual('orderId').get(function () {
    return this.id.slice(-6).toUpperCase();
});


orderSchema.statics.getCart = async function (userId, reqBody) {
    // console.log(reqBody, 'reqBody in getCart Static')
    // console.log(this, 'THIS in getCart Static')
    // console.log(MenuItem, 'MENUITEM in getCart Static')
    // console.log('TRYING TO POPULATE IN THE GET CART STATICS')
   const populatedLineItem = await this.findOneAndUpdate(
        { user: userId, isPaid: false },
        { user: userId },
        { upsert: true, new: true }
    )
    
        // .populate('lineItems.item')
        .exec();

    // console.log(populatedLineItem,'POPULATED LINE ITEM IN GET CART');
    // console.log('First Line Item:', populatedLineItem.lineItems[0]);

    // item is null
return populatedLineItem;
};

// need to include populate 'lineItems.item' b/c without that I will only have access to the document id (in this case Fish Id)
//by using the populate I am telling mongoose to retrieve the referenced 'Fish' documents and replace the objectId with the actual 'Fish'
//this allows me to access the properties of the 'fish' documents in my virtual and thus allows me to calculate the virtuals 


orderSchema.statics.getPaidCart = function (userId) {
    // console.log('getPaidcart function in ORDER MODEL')
    return this.find(
        { user: userId, isPaid: true },
    )
        .populate('lineItems.item')
        .exec();
};

orderSchema.methods.addItemToCart = async function (itemId, index, restaurant) {
    const cart = this;
    // console.log(cart, 'CART BEFORE EVERYTHING IN ADDITEM TO CART')
    const restaurantId = restaurant._id;
    // console.log(restaurantId, 'restaurantId in ORDEER')

    const specificRestaurant = await mongoose.model('Restaurant').findById(restaurantId);
    // console.log(specificRestaurant, 'SPECIFIC RESTAURANT')

  

    if (specificRestaurant) {
        const menuItem = specificRestaurant.menu.find(item => item._id.equals(itemId));

        // const populatedLineItems = specificRestaurant.menu.find(item => item._id.equals(itemId)).populate('lineItems.item').exec();
        // const populatedLineItems = await mongoose.model('Restaurant').findById({restaurantId }).populate().exec();
        // console.log(populatedLineItems, 'POPULATED LINE ITEMS')

        // console.log(itemId, 'ITEMID AFTER MENUITEM IS DEFINED')
        // console.log(menuItem, 'MENU ITEM IF RESTAURANT IS FOUND')
        // console.log(typeof menuItem, 'TYPE OF MENU ITEM IF RESTAURANT IS FOUND')
        // console.log(menuItem._id, 'MENU ITEM ID')

        // Filter out entries with null items
        cart.lineItems = cart.lineItems.filter((entry) => entry.item !== null);

        // cart.lineItems = cart.lineItems.filter((entry) => entry.item && entry.item !== null);



        // console.log(cart.lineItems, 'cart.lineItems ')
        // console.log(cart.lineItems.item, 'CART LINE ITEMS ITEM BEFOR PUSH ')
        // console.log(cart, 'CART CART CART BEFORE PUSH')

        // console.log(cart.lineItems, 'CART LINE ITEMS BEFORE FIND');
        const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(menuItem._id));

        // console.log(lineItem, 'LINEITEM IF TRUE AFTER FIND')

        if (lineItem) {
            // console.log(lineItem, 'MADE IT INSIDE IF STATEMENT FOR LINEITEM')
            lineItem.quantity += 1;

        } else {
            // console.log(menuItem, 'MENUITEM BEFORE PUSHING')
            // cart.lineItems.push({ quantity: 1, item: { ...menuItem } });
            const newMenuItem = { ...menuItem };
            // cart.lineItems.push({ quantity: 1, item: { menuItem: newMenuItem } });
            cart.lineItems.push({ quantity: 1, item: newMenuItem } );
        }


        // console.log(cart, 'cart after everything')
        await cart.save();
        // console.log(cart, 'cart after saving')
        // console.log(cart.lineItems, 'cart.lineItems after saving')
        return cart;
    }
};

orderSchema.methods.addItemToCartFromItemPage = async function (itemId, restaurantId) {
    const cart = this;
    // console.log(itemId, 'itemId in MODELS')
    // console.log(restaurantId, 'restaurantId in MODELS')

    const specificRestaurant = await mongoose.model('Restaurant').findById(restaurantId);
    // console.log(specificRestaurant, 'SpecificRestaurant ')

    if (specificRestaurant) {
        const menuItem = specificRestaurant.menu.find(item => item._id.equals(itemId));

        // console.log(menuItem, 'menuItem if specific restaurant is found')

        cart.lineItems = cart.lineItems.filter((entry) => entry.item !== null);
        // cart.lineItems = cart.lineItems.filter((entry) => entry.item && entry.item !== null);
        // console.log(cart.lineItems, 'cart.lineItems ')
        // console.log(cart.lineItems.item, 'CART LINE ITEMS ITEM BEFOR PUSH ')
        // console.log(cart, 'CART CART CART BEFORE PUSH')
        // console.log(cart.lineItems, 'CART LINE ITEMS BEFORE FIND');
        const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(menuItem._id));
        // console.log(lineItem, 'LINEITEM IF TRUE AFTER FIND')
        if (lineItem) {
            // console.log(lineItem, 'MADE IT INSIDE IF STATEMENT FOR LINEITEM')
            lineItem.quantity += 1;

        } else {
            // console.log(menuItem, 'MENUITEM BEFORE PUSHING')
            // cart.lineItems.push({ quantity: 1, item: { ...menuItem } });
            const newMenuItem = { ...menuItem };
            // cart.lineItems.push({ quantity: 1, item: { menuItem: newMenuItem } });
            cart.lineItems.push({ quantity: 1, item: newMenuItem } );
        }
        // console.log(cart, 'cart after everything')
        await cart.save();
        // console.log(cart, 'cart after saving')
        // console.log(cart.lineItems, 'cart.lineItems after saving')
        return cart;
    }
};

//couldnt use remove b/c I was calling remove on an object that matches the schema rather than an instance. The remove() needed to update to include a splice method involving the index of the lineItem and removing it via splice. FindIndex is used to find the index of the line item in the lineItems array that matches the itemId and then splice is used to remove that line item from the array 


orderSchema.methods.setItemQty = function (itemId, newQty) {
    console.log(newQty, 'newQty in setItem MODEL')
    // add some sort of check to see if newQty is 0 or lower and then remove the item from the array
   
    // define the cart
    const cart = this;
    // console.log(cart, 'cart & made it inside setItemQty METHOD')
    // console.log(cart.lineItems, 'cart.lineItems in setItemQty')
    // console.log(cart.lineItems.length, 'cart.lineItems length in setItemQty')

    // iterate through the cart to see which itemId matches with what lineItems.item 
    for (let i = 0; i < cart.lineItems.length; i++) {
        // console.log('made it inside for loop')
    // once we find it, we set the lineItems.quantity to newQty
        if (cart.lineItems[i].item == itemId) {
            cart.lineItems[i].quantity = cart.lineItems[i].quantity + newQty;

            if (cart.lineItems[i].quantity <= 0) {
                cart.lineItems.splice(cart.lineItems[i], 1)
            }
            // console.log('made it inside if statement')
            // return cart.lineItems[i].quantity;
        }
        
    // if we don't find it, we return a string or an error

    }


    // const lineItemIndex = cart.lineItems.findIndex(lineItem => lineItem.item._id.equals(itemId));
    // console.log(lineItemIndex, 'lineItemIndex in setItemQty')
    // if (lineItemIndex !== 1 && newQty <= 0) {
    //     cart.lineItems.splice(lineItemIndex, 1);
    // } else if (lineItemIndex !== -1) {
    //     cart.lineItems[lineItemIndex].quantity = newQty;
    // }
    console.log(cart, 'cart before save in setItemQty')
    return cart.save();
};

module.exports = mongoose.model("Order", orderSchema)

