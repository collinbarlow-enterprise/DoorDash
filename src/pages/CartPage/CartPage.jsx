import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import * as restaurantAPI from '../../utilities/restaurants-api'
import * as ordersAPI from '../../utilities/orders-api'
import * as usersAPI from '../../utilities/users-service'
import CartPageComponent from '../../components/CartPageComponent/CartPageComponent'
import CartMapComponent from '../../components/CartMapComponent/CartMapComponent'
import CartRestaurantMenuMap from '../../components/CartRestaurantMenuMap/CartRestaurantMenuMap'
import CartPageSummaryComponent from '../../components/CartPageSummaryComponent/CartPageSummaryComponent'
import ChaseSapphireComponent from '../../components/ChaseSapphireComponent/ChaseSapphireComponent'

export default function CartPage() {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState(null)
  const [restaurant, setRestaurant] = useState(null)
  const [order, setOrder] = useState(null)
  const [total, setTotal] = useState(null)
  const navigate = useNavigate();

  async function getUser() {
    const user = await usersAPI.getUser();
    setUser((prevState) => {
      console.log(prevState, 'prevState for user')
      console.log(user, 'user in setUser function on getUser')
      return user;
    })
  }

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

  async function getRestaurant() {
    try {
      const restaurantData = await restaurantAPI.getOneRestaurant(cart.restaurant);
      console.log(restaurantData, 'restaurantsData in getRestaurants HomePage')
      setRestaurant(restaurantData);
    } catch (error) {
      console.error(error, 'error for getRestaurant in Home Page')
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
    getUser();
    getCart();
  }, [])

  useEffect(() => {
    getRestaurant();
    getTotal();
    console.log(restaurant, 'restaurant in cart page')
  }, [cart])


  if (restaurant === null || cart === null || user === null || total === null) {
    return <div>Cart Is Empty</div>;
  }

  return (
    <div>
      {/* <div><button onClick={() => navigateBackToHome()}>Back Home</button></div> */}
      <div className='container' style={{ marginTop: '75px'}}>
        <div>
          <CartPageComponent cart={cart} restaurant={restaurant} toRestaurant={toRestaurant} />
        </div>
        <div>
          <div>
            <CartMapComponent cart={cart} restaurant={restaurant} setCart={setCart} />
          </div>

          <div style={{ marginTop: '10px' }}>
            <button onClick={() => { toRestaurant() }}>Add More Items</button>
          </div>

        </div>
      </div>
<br/>
      <div className='complementCart'>
        {/* <div>Complement You Cart Below</div> */}
        <div><CartRestaurantMenuMap cart={cart} setCart={setCart} restaurant={restaurant} /></div>
      </div>

      {/* <div>Summary Section Below</div> */}
      <br/>
      <div><CartPageSummaryComponent cart={cart} /></div>
      <br/>
      {/* <div>Chase Saphire Section Below</div> */}
      {user.chaseMember ? (<ChaseSapphireComponent cart={cart} />) : (<div>Not a Chase Member</div>)}
      <br/>
      {/* <div>Continue Button Below</div> */}
      <div><button onClick={() => { toCheckOutPage() }}>Continue</button></div>
    </div>
  )
}