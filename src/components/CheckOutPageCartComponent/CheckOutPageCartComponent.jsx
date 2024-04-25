import React from 'react'
import CheckOutPageLineItemComponent from '../CheckOutPageCartLineItemComponent/CheckOutPageCartLineItemComponent'
import '../../../src/checkOutPageDeliveryOptionsStyle.css'

export default function CheckOutPageCartComponent({cart, restaurant}) {
    // console.log(cart, 'cart in cart component')

    const cartMap =cart.lineItems ? cart.lineItems.map((item) => 
    <CheckOutPageLineItemComponent
    key = {item._id}
    cartItem = {item}
    itemQty = {item.quantity}
    cart = {cart}
    cartRestaurant = {cart.restaurant}
    restaurant = {restaurant}

    // handleChangeQty = {handleChangeQty}
    
    />) : console.log('no cart')
    
// may need to create a map or a drop down menu or something that will house all the user credit cards in the array and then the selection will push the selected credit card into a state value and that state value will be used for the order model field
  return (
    <div className="container">
      <h6 className="text-center">CheckOutPage Cart Component - Leads to the LineItem</h6>
      <div>{cartMap}</div>
    
    </div>
  )
}