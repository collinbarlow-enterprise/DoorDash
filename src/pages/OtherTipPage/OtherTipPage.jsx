import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import * as ordersAPI from '../../utilities/orders-api'


export default function PastOrderPage() {

// cart model needs to hold the tip and then the continue button can send it the form field in the model 

// would need to swap up the checkout page to grab the tip from the model, which wouldn't be hard since ive already grabbed the cart itself, it would just be a div tag with {cart.dasherTip} or somethimg

  const navigate = useNavigate();
  const [cart, setCart] = useState(null)

  async function getCart() {
    const cart = await ordersAPI.getCart();
    setCart((prevState) => {
      return cart;
    })
    setCart(cart);
    // console.log(cart, 'CART AFTER SETCART IS RAN IN GETCART')
  }

  function toCheckOutPage() {
    navigate(`/checkout`);
  }

  useEffect(() => {
    getCart();
  }, [])

  return (
    <div>
        <h1>Still Under Construction</h1>
        <h1>Other Tip Page</h1>
        <h1>Add a Tip</h1>
        <div>Some sort of Form Field that will update the driver tip state</div>
        <button onClick={() => { toCheckOutPage() }}>Continue</button>
    </div>
  )
}