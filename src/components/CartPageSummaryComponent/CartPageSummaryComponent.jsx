import React from 'react'


export default function CartPageSummaryComponent(cart) {
    console.log(cart, 'cart in summary component')
    console.log(cart.cart, 'cart.cart in summary component')
    // check why cart is wrapped in another cart object

    if (cart === null) {
        return <div>Loading...</div>
    }
  return (
    <div>
        <h1>Still Under Construction</h1>
        <h1>CartPage Summary Component Page</h1>
        <div>Subtotal: {cart.cart.subTotal}</div>
        <div>Deliver Fees: {cart.deliveryFee}</div>
        <div>Taxes and Fees: {cart.taxesAndFees}</div>
        <div>Total: {cart.total} </div>
    
    </div>
  )
}