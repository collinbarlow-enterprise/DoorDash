import React from 'react'
import CartLineItemComponent from '../../components/CartLineItemComponent/CartLineItemComponent'

export default function CartMapComponent({cart, setCart}) {


    const cartMap =cart.lineItems ? cart.lineItems.map((item) => 
<CartLineItemComponent
key = {item._id}
cartItem = {item}
itemQty = {item.quantity}
cart = {cart}
setCart = {setCart}
// handleChangeQty = {handleChangeQty}

/>) : console.log('no cart')

  return (
    <div className="container">
      <h6 className="text-center">Cart Map Component</h6>
      <div>{cartMap}</div>
    </div>
  )
}