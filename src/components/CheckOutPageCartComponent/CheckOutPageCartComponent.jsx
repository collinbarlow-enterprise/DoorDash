import React from 'react'
import CheckOutPageLineItemComponent from '../CheckOutPageCartLineItemComponent/CheckOutPageCartLineItemComponent'
import '../../../src/checkOutPageCartStyle.css';

export default function CheckOutPageCartComponent({ cart, restaurant }) {

  const cartMap = cart.lineItems ? cart.lineItems.map((item) =>
    <CheckOutPageLineItemComponent
      key={item._id}
      cartItem={item}
      itemQty={item.quantity}
      cart={cart}
      cartRestaurant={cart.restaurant}
      restaurant={restaurant}
    />) : console.log('no cart')

  return (
    <div className="container">
      <div className="cart-summary">Cart Summary</div>
      <div className="restaurant-info">{restaurant.name} | {cart.lineItems.length} items</div>
      <div>{cartMap}</div>
    </div>
  );
}