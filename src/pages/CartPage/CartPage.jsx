import React from 'react'
import CartComponent from '../../components/CartComponent/CartComponent'


export default function CartPage() {
// the cart page has:
// all the items in a cart, with the ability to add/remove items from cart
// a section that shows other items from the restaurant
// a section for the summary - promo code, subtotal, delivery fee, fees & estimated tax, total
// a small section that shows the savings from being a Chase Saphire Member - would be a field in the user model, and then a function which would be called in the checkout process that would discount the delivery fee and fees&tax section....would probably need a few functions involved in this, and then would be ran as part of a larger function itself
// a button to 'continue' which will lead to the checkoutPage


  return (
    <div>
        <h1>Still Under Construction</h1>
        <h1>Cart Page</h1>
        <div>{CartComponent}</div>
        <div>Complement You Cart Below</div>
        <div>{}</div>
        <div>Summary Section Below</div>
        <div>{}</div>
        <div>Chase Saphire Section Below</div>
        <div>{}</div>
        <div>Continue Button Below</div>
        <div>{}</div>
    </div>
  )
}