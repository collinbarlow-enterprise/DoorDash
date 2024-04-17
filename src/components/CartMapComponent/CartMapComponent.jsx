import React from 'react'
import CartLineItemComponent from '../../components/CartLineItemComponent/CartLineItemComponent'

export default function CartMapComponent({cart, restaurant, setCart}) {


    const cartMap =cart.lineItems ? cart.lineItems.map((item) => 
<CartLineItemComponent
key = {item._id}
restaurant = {restaurant}
cartItem = {item}
itemQty = {item.quantity}
cart = {cart}
setCart = {setCart}
// handleChangeQty = {handleChangeQty}

/>) : console.log('no cart')

  return (
    <div>
      <div>{cartMap}</div>
    </div>
  )
}