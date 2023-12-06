import React from 'react'
import * as ordersAPI from '../../utilities/orders-api'

export default function CartLineItemComponent({cartItem, itemQty, cart, key, setCart}) {
    console.log(cartItem, 'cartItem in cartlineitem component')
    console.log(cart, 'cart in cartlineitem component')

    const itemId = cartItem.item
    console.log(itemId, 'itemId in cartlineItemComponent')

    async function handleChangeQty(itemId, newQty) {
        // console.log(cart, 'cart in handleChangeQty')
        // console.log(menuId, 'menuId in handleChangeQty on Cart Component')
        console.log(newQty, 'new Qty in handleChangeQty on Cart Component')
        const updatedCart = await ordersAPI.setItem(itemId, newQty);
        console.log(updatedCart, 'updatedCart in handleChangeQty')
        // setCart(updatedCart)
        setCart((prevCart) => {
          console.log(updatedCart, 'UPDATED CART IN ADDTO ORDER, should be cart that returns from json');
          console.log(prevCart, 'PREVIOUS CART STATE');
          return updatedCart;
        });
      }
  return (
    <div className="container">
      <h6 className="text-center">Cart LineItem Component</h6>
      <div>Item : {cartItem.item}</div>
      <div>${cartItem.price}</div>
      <div>
          <button onClick={() => handleChangeQty(itemId, -1)}>-</button> <strong>{cartItem.quantity}</strong>
          <button onClick={() => handleChangeQty(itemId, 1)}>+</button>

        </div>
    </div>
  )
}