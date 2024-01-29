import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


import * as restaurantAPI from '../../utilities/restaurants-api'
import * as ordersAPI from '../../utilities/orders-api'
import * as usersAPI from '../../utilities/users-service'

import CheckOutComponent from '../../components/CheckOutComponent/CheckOutComponent'
import GoogleMapsContainerComponenet from '../../components/GoogleMapsContainerComponent/GoogleMapsContainerComponent';
import CheckOutPageCreditCard from '../../components/CheckOutPageCreditCardComponent/CheckOutPageCreditCard';
import CheckOutPageCartComponent from '../../components/CheckOutPageCartComponent/CheckOutPageCartComponent';
// import order from '../../../models/order';

export default function CheckOutPage() {

  // state values:
  // X user
  // X cart
  // X restaurant
  // X total
  // X map
  // dasher tip

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [restaurant, setRestaurant] = useState(null);

  const [deliveryOption, setDeliveryOption] = useState(null)

  const [total, setTotal] = useState(null);
  const [dasherTip, setDasherTip] = useState(null);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  async function getUser() {
    const user = await usersAPI.getUser();
    setUser((prevState) => {
      // console.log(prevState, 'prevState for user')
      console.log(user, 'user in setUser function on getUser')
      return user;
    });
    // userLocation();
  }

  async function getCart() {
    const cart = await ordersAPI.getCart();
    console.log(cart, 'CART IN GETCART FUNCTION ON HOMEPAGE COMPO BEFORE setting cart')
    setCart((prevState) => {
      console.log(cart, 'cart in getCart on CartPage')
      return cart;
    })
    setCart(cart);

    if (cart.deliveryOption) {
      console.log(cart.deliveryOption, 'cart.deliveryOption in getCart')
      setDeliveryOption(cart.deliveryOption)
    }
    console.log(cart, 'CART AFTER SETCART IS RAN IN GETCART')
  }

  // need to find a way to get the Restaurant id...from the cart or order? 
  async function getRestaurant() {
    // console.log('inside getrestaurant on checkout page')
    // console.log(cart.restaurant, 'cart.restaurant in getrestaurant on checkout page')
    // console.log(cart, 'cart in getrestaurant on checkout page')

    if (cart) {
      try {
        const restaurantData = await restaurantAPI.getOneRestaurant(cart.restaurant);
        console.log(restaurantData, 'restaurantsData in getRestaurants HomePage')
        setRestaurant(restaurantData);
      } catch (error) {
        console.error(error, 'error for getRestaurant in Home Page')
      }
    }
  }

  async function getTotal() {
    try {
      const totalData = await ordersAPI.getTotal();
      // console.log(totalData, 'totalData in getRestaurants HomePage')
      // console.log(typeof totalData, 'totalData in getRestaurants HomePage')
      setTotal(totalData);
    } catch (error) {
      console.error(error, 'error for getTotal in Home Page')
    }
  }

  async function applyPromoCode() {
    console.log(promoCode, 'promoCode in applyPromoCode')
    try {
      const promoCodeResponse = await ordersAPI.checkPromoCode(promoCode);
      // const promoCodeResponse.data = { isValid, discount: promoDiscount }
      console.log(promoCodeResponse, 'promoCodeResponse')
      if (promoCodeResponse.success) {
        // setDiscount(promoDiscount)
        setDiscount((prevState) => {
          console.log(promoCodeResponse, 'promoCodeResponse in applyPromoCode')
          console.log(promoCodeResponse.promoCodeInfo.discount, 'promoCodeResponse in applyPromoCode')
          return promoCodeResponse.promoCodeInfo.discount;
        })
      } else {
        console.log(isValid, 'isValid is not corrct in promoCode')
      }
    }
    catch (error) {
      console.log(error, 'error for promoCode')

    }
  }

  function dasherTipAdjustment(x) {
    let dasherTipTotal = cart.total * (x / 100)
    dasherTipTotal = parseFloat(dasherTipTotal.toFixed(2));
    setDasherTip(dasherTipTotal)
  }
  // other functions needed

  // a function for the google maps api that will use the user.address as the place
  // does the google maps api give an ETA value? that would make delivery time interesting 

  // navigate functions to orders page
  function navigateToOrderStatusPage() {
    console.log('made it inside order status navigation')
    navigate(`/orderstatus`)
  }
  function navigateToOtherTipPage() {
    navigate(`/otherTipPage`)
  }

  // CheckOut Page
  // restaurant name
  // google maps api that shows the user's address
  // delivery time 

  // conditional rendering for being a chase sapphire member

  // conditional rendering for if the order is being scheduled ahead of time, show that time selected 
  // place order 

  useEffect(() => {
    async function fetchData() {
      await getUser();
      await getCart();
      await getTotal();
    }
    fetchData();
  }, []);

  useEffect(() => {
    getRestaurant();
  }, [cart])

  if (restaurant === null || cart === null) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Still Under Construction</h1>

      <CheckOutComponent />

      <h1>Check Out Page</h1>
      <div>Restaurant Name</div>
      <div>{restaurant.name}</div>
      <br />
      <div>Google Maps API Section</div>
      <GoogleMapsContainerComponenet user={user} />

      <div></div>
      <div>Delivery Time Section</div>

      {/* // delivery options which will be 3, the premier one will add to the total(how would I accomplish that?), the middle will be the normal one which will just be a set time (should do a RNG with a specific range), and then third will be a scheduled order (goes to another page that has a time wheel, need to look into that more) */}

      <div>Delivery Options</div>
      {/* // a field for drop off instructions (looks like it has its own page, which would have two options and a form field, guess drop off instructions would be a field on the order?) */}

      <div>User Address: {user.address}</div>
      {/* // a field for the address (if I want to get ambitious I can swap to a list of addresses that a user can add and delete in a drop down menu) */}
      <div></div>
      <div>Drop Off Instructions: is a field on the order model, not sure if its already there, should be added to the model upon the order being placed </div>

      <div>User Phone Number: will be - user.phoneNumber - but don't have that set up in my model yet </div>

      <div>Send as a gift</div>

      {/* // send as a gift (goes to a page that has a few fields, but actually I don't think this would be that hard, it would just need to change something about the order indicating it was for someone else? maybe another optional field on the order model which would be default to null, but would be orderRecipient, and then on the order summary I could conditionally render based on that value */}

      <div>Cart Summary Section</div>

      {/* // Cart Summary
  // lists all menu items and ingredients */}
      {/* seems to be a 3 div container (Quantity x Item, Ingredients, Price), with bootstrap to align things correctly */}

      <div>cart items with price and ingredients - another jsx component that maps over the array of the cart with something like this:  </div>
      <div>Item: { } | Quantity { } | Ingredients{ } | Price{ } </div>

      <CheckOutPageCartComponent cart={cart} restaurant={restaurant} />

      <div>Order Summary</div>
      {/* // Summary Field
  // lot of reusable components in both the summary and cart summary - wonder how I could accomplish some sort of reusability, slight UI differences, and really wouldn't be a massive pain to code, but would be cool if I could do it */}

      <div>Subtotal: {cart.subTotal} (which would be order.price)</div>

      <div>Add a Promo Field: if the promo field matches a hard coded list somewhere in the model? or database? then a discount is applied, but only one discount should be able to be applied at one time...is it a form with a field? Are there several fields for a single form that could be created here?</div>

      <div>
        <input
          type='text'
          placeholder='Enter Promo Code - try SAVE10'
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <button onClick={applyPromoCode}> Apply Promo </button>
      </div>
      {discount ? (<div>Discount: ${discount}</div>) : (<div>No discount applied</div>)}

      <div>Delivery Fee : {cart.deliveryFee}</div>

      <div>Fees and Estimated Tax : {cart.taxesAndFees} which field is the right part of the model? There needs to be a clearer labeling for the difference between taxesAndFees and feesAndTaxes</div>

      <div>Dasher Tip : {dasherTip}</div>
      <div>
        <div><button onClick={() => dasherTipAdjustment(10)}> 10%</button></div>
        <div><button onClick={() => dasherTipAdjustment(15)}> 15%</button></div>
        <div><button onClick={() => dasherTipAdjustment(20)}> 20%</button></div>
        <div><button onClick={() => navigateToOtherTipPage()}> Other</button></div>
        {/* if the tip is going to be accessed from more than one page than there needs to be a field in the model that will allow me to grab, and update the field, the state value can be defaulted to 0, grabbed and updated on the otherTipPage, updated on this field, and then when the place order button is clicked the value will be finalized  */}
      </div>

      <div>3 recommended options, and one which is 'other' that leads to another page and would update the order, are the options hard-coded or a percentage of the total price? 10,15,20%? </div>

      <div>Total: {parseInt(cart.total) + dasherTip - discount} </div>
      {/* right now the creditcard is set up as an array which makes sense if you have multiple credit cards, if there are more multiple credit cards you need to be able to select which one you want to use */}
      {/* if that is the case I need to map over the creditcards, and then select have that been a state value that is selected via a parent component where the child component has the user data passed down via props */}

      <CheckOutPageCreditCard user={user} />

      <div>Conditional Rendering based on Chase Sapphire</div>
      {user.chaseMember ? (<div>You're a chase member!</div>) : (<div>Not a Chase Member</div>)}

      <div>Place Order Button</div>
      <div onClick={() => navigateToOrderStatusPage()} ><button>PLACE THE ORDER</button></div>
      {/* the navigateToOrderStatusPage should be nested inside another function that flips the order status from cart to placed order */}

    </div>

  )
}