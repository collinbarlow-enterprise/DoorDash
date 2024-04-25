import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import * as restaurantAPI from '../../utilities/restaurants-api'
import * as ordersAPI from '../../utilities/orders-api'
import * as usersAPI from '../../utilities/users-service'
import * as usersAPI2 from '../../utilities/users-api'
import * as paidOrdersAPI from '../../utilities/paidOrders-api'


import GoogleMapsContainerComponenet from '../../components/GoogleMapsContainerComponent/GoogleMapsContainerComponent';
import CheckOutPageCreditCard from '../../components/CheckOutPageCreditCardComponent/CheckOutPageCreditCard';
import CheckOutPageCartComponent from '../../components/CheckOutPageCartComponent/CheckOutPageCartComponent';
import CheckOutPageDeliveryOptionsComponent from '../../components/CheckOutPageDeliveryOptionsComponent/CheckOutPageDeliveryOptionsComponent';

export default function CheckOutPage() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [restaurant, setRestaurant] = useState(null);

  const [deliveryOption, setDeliveryOption] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [giftStatus, setGiftStatus] = useState(null)
  const [dropOffInstructions, setDropOffInstructions] = useState('')

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
    }
    );
    if (user.dropOffInstructions != 'none') {
    setDropOffInstructions((prevState) => {
      setDropOffInstructions(user.dropOffInstructions)
    })
    console.log(user.dropOffInstructions, 'drop off instructions')
    // userLocation();
  }};

  async function getCart() {
    const cart = await ordersAPI.getCart();
    // console.log(cart, 'CART IN GETCART FUNCTION ON HOMEPAGE COMPO BEFORE setting cart')
    setCart((prevState) => {
      // console.log(cart, 'cart in getCart on CartPage')
      return cart;
    })
    setCart(cart);

    if (cart.deliveryOption) {
      // console.log(cart.deliveryOption, 'cart.deliveryOption in getCart')
      setDeliveryOption(cart.deliveryOption)
    }

    setGiftStatus((prevState) => {
      // console.log(cart.isGift, 'cart.isGift in setGiftStatus in getCart')
      setGiftStatus(cart.isGift)
    })
  }

  // need to find a way to get the Restaurant id...from the cart or order? 
  async function getRestaurant() {
    // console.log('inside getrestaurant on checkout page')
    // console.log(cart.restaurant, 'cart.restaurant in getrestaurant on checkout page')
    // console.log(cart, 'cart in getrestaurant on checkout page')

    if (cart) {
      try {
        const restaurantData = await restaurantAPI.getOneRestaurant(cart.restaurant);
        // console.log(restaurantData, 'restaurantsData in getRestaurants HomePage')
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
    // console.log(promoCode, 'promoCode in applyPromoCode')
    try {
      const promoCodeResponse = await ordersAPI.checkPromoCode(promoCode);
      // const promoCodeResponse.data = { isValid, discount: promoDiscount }
      // console.log(promoCodeResponse, 'promoCodeResponse')
      if (promoCodeResponse.success) {
        // setDiscount(promoDiscount)
        setDiscount((prevState) => {
          // console.log(promoCodeResponse, 'promoCodeResponse in applyPromoCode')
          // console.log(promoCodeResponse.promoCodeInfo.discount, 'promoCodeResponse in applyPromoCode')
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

  function changeGiftStatus() {
    console.log(giftStatus, 'giftStatus in changeGiftStatus');
    setGiftStatus(!giftStatus);
    console.log(giftStatus, 'giftstatus after boolean switch')
  }

  let temporaryInstructions = '';

  function changeDropOffInstructions(e) {
    console.log(e, 'e')
    inputValue = e.target.value;
    setDropOffInstructions(inputValue)
    // console.log(inputValue, 'input value in changeDropOff')
    // return temporaryInstructions = inputValue;
  }

  function handleSetInstructions() {
    setDropOffInstructions(temporaryInstructions);
  }

  async function handleDropOffInstructionsSubmit(event) {
    event.preventDefault();
    console.log('handle submit', dropOffInstructions);
    const updatedUser = await usersAPI2.changeDropOffInstructions(dropOffInstructions);
    console.log(updatedUser, 'updatedUser')
    const newDropOffInstructions = updatedUser.updatedUser.dropOffInstructions;
    console.log(newDropOffInstructions, 'newDropOffInstructions')
    setDropOffInstructions((prevState) => {
      console.log(newDropOffInstructions, 'newDropOff in setDropOff in handleDrop')
      console.log(user, 'user in setDropOff in handleDrop')
      return newDropOffInstructions;
    })
  }

  function navigateToOrderStatusPage() {
    console.log('made it inside order status navigation')
    navigate(`/orderstatus`)
  }
  function navigateToOtherTipPage() {
    navigate(`/otherTipPage`)
  }

  async function convertCartToPaidOrder() {
    console.log(cart, 'cart in convert function frontend');
    try {
      const submittedOrder = await paidOrdersAPI.convertOrderToPaidOrder(cart)

      if (submittedOrder.success) {
        navigateToOrderStatusPage();
      } else {
        console.log('didnt work')
      }
    }
    catch(error) {
      console.log(error, 'error')
    }
  }

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
    <div className='container'>
      <div>{restaurant.name}</div>

      <GoogleMapsContainerComponenet user={user} />

      <div>Delivery Options</div>
      <CheckOutPageDeliveryOptionsComponent deliveryOption={deliveryOption} setDeliveryOption={setDeliveryOption} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      <div>User Address: {user.address}</div>

      <div>Drop Off Instructions: {dropOffInstructions} </div>

      <div>
        <form onSubmit={handleDropOffInstructionsSubmit}>
          <label>Enter Drop Off Notes:
            <input
              type='text'
              placeholder={dropOffInstructions}
              value={dropOffInstructions}
              onChange={(e) => setDropOffInstructions(e.target.value)}
            />
          </label>
          <input type="submit" />
        </form>
      </div>

      <div>Phone Number: {user.phoneNumber}</div>

      <div>
        <button onClick={() => changeGiftStatus()} > Send as a gift</button>
      </div>

      {giftStatus ? <div>Sending this as a gift!</div> : <div></div>}

      <div>Cart Summary Section</div>

      <div>cart items with price and ingredients - another jsx component that maps over the array of the cart with something like this:  </div>
      <div>Item: { } | Quantity { } | Ingredients{ } | Price{ } </div>

      <CheckOutPageCartComponent cart={cart} restaurant={restaurant} />

      <div>Order Summary</div>

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
      </div>

      <div>3 recommended options, and one which is 'other' that leads to another page and would update the order, are the options hard-coded or a percentage of the total price? 10,15,20%? </div>

      <div>Total: {parseInt(cart.total) + dasherTip - discount} </div>

      <CheckOutPageCreditCard user={user} />

      <div>Conditional Rendering based on Chase Sapphire</div>
      {user.chaseMember ? (<div>You're a chase member!</div>) : (<div>Not a Chase Member</div>)}
      <div>Place Order Button</div>
      <div onClick={() => convertCartToPaidOrder()} ><button>PLACE THE ORDER</button></div>
    </div>

  )
}