import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import * as restaurantAPI from '../../utilities/restaurants-api'
import * as ordersAPI from '../../utilities/orders-api'
import CartComponent from '../../components/CartComponent/CartComponent'


export default function CartPage() {
  const [cart, setCart] = useState()
  const [restaurant, setRestaurant] = useState()
  const [order, setOrder] = useState()
  const navigate = useNavigate();


  async function getCart() {
    const cart = await ordersAPI.getCart();
    // console.log(cart, 'CART IN GETCART FUNCTION ON HOMEPAGE COMPO BEFORE setting cart')
    setCart((prevState) => {
      console.log(cart, 'cart in getCart on CartPage')
      return cart;
    })


    setCart(cart);
    // console.log(cart, 'CART AFTER SETCART IS RAN IN GETCART')
  }

  // need to find a way to get the Restaurant id...from the cart or order? 
  async function getRestaurant() {
    try {
        const restaurantData = await restaurantAPI.getOneRestaurant();
        // console.log(restaurantsData, 'restaurantsData in getRestaurants HomePage')
        setRestaurant(restaurantData);
    } catch(error) {
        console.error(error, 'error for getRestaurant in Home Page')
    }
}


  // what state values do I need?
    // X cart - to see the lineItems and change qtys
    // X restaurant - to see other items
    // X order - to see subtotal and total, and all that
    // user to see if chaseSaphire is present - don't think needs to be a state value, the user object should already be present? 

// the cart page has:

// all the items in a cart, with the ability to add/remove items from cart


// a section that shows other items from the restaurant


// a section for the summary - promo code, subtotal, delivery fee, fees & estimated tax, total


// a small section that shows the savings from being a Chase Saphire Member - would be a field in the user model, and then a function which would be called in the checkout process that would discount the delivery fee and fees&tax section....would probably need a few functions involved in this, and then would be ran as part of a larger function itself


// a button to 'continue' which will lead to the checkoutPage

function toCheckOutPage() {
  // navigate to the summary page
  navigate(`/checkout`);
}

function navigateBackToHome() {
  navigate(`/home`)
}

useEffect(() => {
  getCart();
  // getRestaurant();

}, [])

if (restaurant === null) {
  return <div>Loading...</div>
}

  return (
    <div>
        <h1>Still Under Construction</h1>
        <div><button onClick = {() => navigateBackToHome() }>X</button></div>
        <h1>Cart Page</h1>
        {/* its not the CartComponent, that cart component is already in use on the Restaurant and Item Page */}
        {/* <div><CartComponent/></div> */}
        <div>Complement You Cart Below</div>
        <div>{}</div>
        <div>Summary Section Below</div>
        <div>{}</div>
        <div>Chase Saphire Section Below</div>
        <div>{}</div>
        <div>Continue Button Below</div>
        <div><button onClick={() => { toCheckOutPage() }}>Continue</button></div>
    </div>
  )
}