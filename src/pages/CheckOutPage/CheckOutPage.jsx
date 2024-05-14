import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import '../../../src/checkOutPageStyle.css'

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
  const [showWarning, setShowWarning] = useState(true);
  const [clickedButton, setClickedButton] = useState(null);

  const [giftStatus, setGiftStatus] = useState(false)
  const [dropOffInstructions, setDropOffInstructions] = useState('')

  const [total, setTotal] = useState(null);
  const [dasherTip, setDasherTip] = useState(10);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [chaseSavings, setChaseSavings] = useState(null)

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
      // console.log(user.dropOffInstructions, 'drop off instructions')
      // userLocation();
    }
  };

  async function getCart() {
    const cart = await ordersAPI.getCart();
    // console.log(cart, 'CART IN GETCART FUNCTION ON HOMEPAGE COMPO BEFORE setting cart')
    setCart((prevState) => {
      console.log(cart, 'cart in getCart on CheckOut')
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
    setChaseSavings((prevState) => {
      let savings = parseFloat(-(cart.chaseSavings)).toFixed(2);
      // console.log(savings, 'savings')
      // parseFloat(savings).toFixed(2)
      setChaseSavings(savings)
    })
    // console.log(user.dropOffInstructions, 'user drop off in get cart')
    // console.log(user, 'user in get cart')
    // console.log(user.dropOffInstructions, 'user.drop off instructions')
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
    // console.log(giftStatus, 'giftStatus in changeGiftStatus');
    setGiftStatus(currentStatus => !currentStatus);
    // console.log(giftStatus, 'giftstatus after boolean switch')
    // cart.giftStatus = giftStatus;
    // console.log(cart.giftStatus, 'giftStatus in CART')
  }

  function resetWarning() {
    setShowWarning(false)
  };

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
    cart.dropOffInstructions = dropOffInstructions
    console.log(cart.dropOffInstructions, 'cart.drop off')
  }

  function navigateToOrderStatusPage() {
    console.log('made it inside order status navigation')
    navigate(`/orderstatus`)
  }
  function navigateToOtherTipPage() {
    navigate(`/otherTipPage`)
  }

  const formatToTwoDecimalPlaces = (value) => {
    return parseFloat(value).toFixed(2);
  };

  async function convertCartToPaidOrder() {
    console.log(cart, 'cart in convert function frontend');
    // console.log(cart.total, 'BEFORE frontend');
    // console.log(discount, 'discount BEFORE frontend');
    // console.log(dasherTip, 'dasherTip BEFORE frontend');
    if (!deliveryOption) {
      setShowWarning(true); // Show warning if no delivery option is selected
      setTimeout(() => setShowWarning(false), 3000); // Hide warning after 3 seconds
      return;
    }

    cart.total = parseFloat(cart.total)
    cart.total = parseFloat((cart.total + dasherTip - discount).toFixed(2))
    console.log(cart.total, 'AFTER cart.total')
    try {
      const submittedOrder = await paidOrdersAPI.convertOrderToPaidOrder(cart)

      if (submittedOrder.success) {
        navigateToOrderStatusPage();
      } else {
        console.log('didnt work')
      }
    }
    catch (error) {
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
    console.log(user, cart, 'user and cart')
    if (user && cart) {
      cart.dropOffInstructions = user.dropOffInstructions
      console.log(cart.dropOffInstructions, 'cart.drop off')
    }
  }, [user, cart])

  useEffect(() => {
    getRestaurant();
    // console.log(user, 'user in getRestaurant')
    // console.log(cart, 'cart in getRestaruatn')
    // cart.dropOffInstructions = user.dropOffInstructions
    // console.log(cart.dropOffInstructions, 'cart.dropOFF')
  }, [cart])

  useEffect(() => {
    console.log(giftStatus, 'giftStatus after boolean switch');
    if (cart) {
      cart.giftStatus = giftStatus;
      console.log(cart.giftStatus, 'giftstatus in CART');
    }
  }, [giftStatus])

  if (restaurant === null || cart === null) {
    return <div>Loading...</div>
  }

  return (
    <div className='container' style={{ marginTop: '75px'}}>
      <div>{restaurant.name}</div>

      <GoogleMapsContainerComponenet user={user} />
      <br />
      {/* <div>Delivery Options</div> */}
      <CheckOutPageDeliveryOptionsComponent deliveryOption={deliveryOption} setDeliveryOption={setDeliveryOption} selectedDate={selectedDate} setSelectedDate={setSelectedDate} resetWarning={resetWarning}
      />
      <br />
      <div className='checkout-container'>
        <div>Address: {user.address}</div>
        <div>Drop Off Instructions: {dropOffInstructions} </div>
        <div>
          <form onSubmit={handleDropOffInstructionsSubmit}>
            <div className="form-group">
              <label htmlFor="dropOffInstructions">Enter Drop Off Notes:</label>
              <input
                type='text'
                id="dropOffInstructions"
                placeholder={dropOffInstructions}
                value={dropOffInstructions}
                onChange={(e) => setDropOffInstructions(e.target.value)}
              />
            </div>
            <input type="submit" />
          </form>
        </div>
        <div>Phone Number: {user.phoneNumber}</div>
        <div>
          <button onClick={() => changeGiftStatus()}>Send as a gift</button>
        </div>
        {giftStatus ? <div style={{ textAlign: "center" }}>Sending this as a gift!</div> : <div></div>}
      </div>
      <br />
      <CheckOutPageCartComponent cart={cart} restaurant={restaurant} />
      <br />
      <div>
        <div className='container'>
          <div className="order-summary">Order Summary</div>
          <div>
            <input
              className="promo-code-input"
              type='text'
              placeholder='Enter Promo Code - try SAVE10'
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button onClick={applyPromoCode}>Apply Promo</button>
          </div>

          {discount ?
            (<div className="cost-item">Discount: <span>${discount}</span></div>) :
            (<div className="cost-item">No discount applied</div>)}

          <div className="cost-item">Subtotal: <span>${formatToTwoDecimalPlaces(cart.subTotal)}</span></div>
          <div className="cost-item">Delivery Fee: <span>${formatToTwoDecimalPlaces(cart.deliveryFee)}</span></div>
          <div className="cost-item">Fees and Estimated Tax: <span>${formatToTwoDecimalPlaces(cart.taxesAndFees)}</span></div>
          <div className="cost-item">Dasher Tip: <span>${formatToTwoDecimalPlaces(dasherTip)}</span></div>

          <div className="tip-buttons-container">
            <button className={`tip-button ${clickedButton === 'tip10' ? 'clicked' : ''}`}
              onClick={() => {
                setClickedButton('tip10');
                dasherTipAdjustment(10);
              }}>10%
            </button>
            <button className={`tip-button ${clickedButton === 'tip15' ? 'clicked' : ''}`}
              onClick={() => {
                setClickedButton('tip15');
                dasherTipAdjustment(15);
              }}>15%
            </button>
            <button className={`tip-button ${clickedButton === 'tip20' ? 'clicked' : ''}`}
              onClick={() => {
                setClickedButton('tip20');
                dasherTipAdjustment(20);
              }}>20%
            </button>
            {/* <button className="tip-button" onClick={() => navigateToOtherTipPage()}>Other</button> */}
          </div>

          <div className="cost-item total-cost-item">Total: <span>${formatToTwoDecimalPlaces(parseInt(cart.total) + dasherTip - discount)}</span></div>
        </div>
      </div>
      <br />
      <CheckOutPageCreditCard user={user} chaseSavings={chaseSavings} />

      {/* <div onClick={() => convertCartToPaidOrder()} ><button>PLACE THE ORDER</button></div> */}
      {showWarning && (
        <div style={{ color: 'red' }}>Please select a delivery option before placing the order.</div>
      )}
      <div onClick={convertCartToPaidOrder}>
        <button disabled={showWarning}>PLACE THE ORDER</button>
      </div>
    </div>

  )
}