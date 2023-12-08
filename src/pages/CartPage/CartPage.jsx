import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import * as restaurantAPI from '../../utilities/restaurants-api'
import * as ordersAPI from '../../utilities/orders-api'
import CartPageComponent from '../../components/CartPageComponent/CartPageComponent'
import CartMapComponent from '../../components/CartMapComponent/CartMapComponent'
import CartRestaurantMenuMap from '../../components/CartRestaurantMenuMap/CartRestaurantMenuMap'
import CartPageSummaryComponent from '../../components/CartPageSummaryComponent/CartPageSummaryComponent'


export default function CartPage() {
  const [cart, setCart] = useState(null)
  const [restaurant, setRestaurant] = useState(null)
  const [order, setOrder] = useState(null)
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
        const restaurantData = await restaurantAPI.getOneRestaurant(cart.restaurant);
        console.log(restaurantData, 'restaurantsData in getRestaurants HomePage')
        setRestaurant(restaurantData);
    } catch(error) {
        console.error(error, 'error for getRestaurant in Home Page')
    }
}


  // what state values do I need?
    // X cart - to see the lineItems and change qtys
    // X restaurant - to see other items
    // X order - to see subtotal and total, and all that - is this not just the cart? 

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
function toRestaurant() {
  navigate(`/restaurant/${restaurant._id}`)
}



useEffect(() => {
  getCart();
  // getRestaurant();

}, [])

useEffect(() => {
  getRestaurant();
  console.log(restaurant, 'restaurant in cart page')
},[cart])

if (restaurant === null || cart === null) {
  return <div>Loading...</div>
}

// const cartMap = restaurant && cart && cart.lineItems ? cart.lineItems.map((item) => 
// <CartLineItemComponent
// key = {item._id}
// cartItem = {item}
// itemQty = {item.quantity}
// cart = {cart}
// // handleChangeQty = {handleChangeQty}

// />
// ) : [cart && restaurant];

  return (
    <div>
        <h1>Still Under Construction</h1>
        <div><button onClick = {() => navigateBackToHome() }>X</button></div>
        <h1>Cart Page</h1>
        {/* its not the CartComponent, that cart component is already in use on the Restaurant and Item Page */}
        <div>
          <div>
          <CartPageComponent cart ={cart} restaurant = {restaurant} toRestaurant= {toRestaurant}/>
          </div>

        </div>
        
        <div>
          <div>
          <CartMapComponent cart ={cart} setCart = {setCart}/>
          </div>
          <div>
            <button onClick={() => { toRestaurant() }}>+ Add More Items</button>
          </div>
        </div>

        <div>Complement You Cart Below</div>
        {/* going to need an intermediary for the restaurant mapping  */}
        <div><CartRestaurantMenuMap cart ={cart} setCart = {setCart} restaurant = {restaurant}/></div>
        <div>Summary Section Below</div>
        <div><CartPageSummaryComponent cart = {cart}/></div>
        <div>Chase Saphire Section Below</div>
        <div>{}</div>
        <div>Continue Button Below</div>
        <div><button onClick={() => { toCheckOutPage() }}>Continue</button></div>
    </div>
  )
}