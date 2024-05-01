import React, { useState, useEffect, useCallback } from 'react'
import * as restaurantsAPI from '../../utilities/restaurants-api'
import '../../../src/checkOutPageCartStyle.css';

export default function CheckOutPageLineItemComponent({ cart, cartItem, restaurant }) {

  const [itemName, setItemName] = useState(null)

  let itemId = cartItem.item;
  let restaurantDishArray = restaurant.menu;

  function determineDishName() {
    for (let i = 0; i < restaurantDishArray.length - 1; i++) {
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

let itemQty = cartItem.quantity;

return (
  <div className="item-container">
    <div className="item-details">
      <div className="item-qty">Qty: {itemQty} |</div>
      <div className="item-name">Item: {itemName}</div>
    </div>
    <div className="item-subtotal">SubTotal Price: ${cartItem.extPrice.toFixed(2)}</div>
  </div>
);
}