import React from 'react'
import * as ordersAPI from '../../utilities/orders-api'

import '../../../src/cartItemStyle.css'

export default function CartLineItemComponent({ cartItem, restaurant, itemQty, cart, setCart }) {
  console.log(cartItem, 'cartItem in cartlineitem component')
  console.log(restaurant, 'restaurant in cartLineItem')
  // console.log(cart, 'cart in cartlineitem component')

  const itemId = cartItem.item
  // console.log(itemId, 'itemId in cartlineItemComponent')

  function findMenuItem(restaurant, itemId) {
    // Assuming restaurant.menu is an array of dish objects
    // and itemId is the _id of a dish
    const dish = restaurant.menu.find(dish => dish._id === itemId);
    if (dish) {
      return dish;
    } else {
      console.error('No dish found with the provided ID:', itemId);
      return null;  // or handle this case as you see fit
    }
  }

  const defaultImage = '/no-image.svg';
  const dishDetails = findMenuItem(restaurant, cartItem.item);
  if (dishDetails) {
    console.log('Dish details:', dishDetails);
  }

  async function handleChangeQty(itemId, newQty) {
    // console.log(cart, 'cart in handleChangeQty')
    // console.log(menuId, 'menuId in handleChangeQty on Cart Component')
    // console.log(newQty, 'new Qty in handleChangeQty on Cart Component')
    const updatedCart = await ordersAPI.setItem(itemId, newQty);
    // console.log(updatedCart, 'updatedCart in handleChangeQty')
    // setCart(updatedCart)
    setCart((prevCart) => {
      //   console.log(updatedCart, 'UPDATED CART IN ADDTO ORDER, should be cart that returns from json');
      //   console.log(prevCart, 'PREVIOUS CART STATE');
      return updatedCart;
    });
  }
  return (
    <div className="containerCart">
        <div className='DishImage'><img src={defaultImage} /></div>
        <div className='lineItemNamePrice'>
          <div>Item: {dishDetails ? dishDetails.dishName : 'Item not found'}</div>
          <div>${cartItem.price* cartItem.quantity}</div>
        </div>
        <div className='adjustItemQty'>
          <button onClick={() => handleChangeQty(itemId, cartItem.quantity -1)}>-</button> <strong>{cartItem.quantity}</strong>
          <button onClick={() => handleChangeQty(itemId, cartItem.quantity + 1)}>+</button>
        </div>
      </div>

  )
}