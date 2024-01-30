import React, { useState, useEffect, useCallback } from 'react'
import * as restaurantsAPI from '../../utilities/restaurants-api' 

export default function CheckOutPageLineItemComponent({cart, cartItem, restaurant}) {

const [itemName, setItemName] = useState(null)
// console.log(restaurant, 'restaurant in lineItem')
// console.log(cartItem, 'cartItem')

let itemId = cartItem.item
// console.log(itemId, 'itemId variable')

let restaurantDishArray = restaurant.menu

// console.log(restaurantDishArray, 'restaurantDishArray') 

// need to use the cartRestaurant object which should be the restaurant id to find the restaurant

function determineDishName(){
 for (let i = 0; i<restaurantDishArray.length-1; i++) {
    if (itemId == restaurantDishArray[i]._id) {
        let discoveredDishName = restaurantDishArray[i].dishName;

        setItemName((prevState) => {
            // console.log(discoveredDishName, 'dish name discovered in for loop');
            return discoveredDishName;
        });
    }
 }
}

useEffect(() => {
    determineDishName();
})


  return (
    <div className="container">
      <h6 className="text-center">CheckOutPage Line Item for Cart Component </h6>
      Item: {itemName} | Qty: {cartItem.quantity}  | Price: {cartItem.price} | SubTotal Price: {cartItem.extPrice}

    
    </div>
  )
}