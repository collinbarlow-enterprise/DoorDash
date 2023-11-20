import React, { useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as restaurantsAPI from '../../utilities/restaurants-api'
import * as ordersAPI from '../../utilities/orders-api'

export default function RestaurantPageComponent({}) {
  
  const [restaurant, setRestaurant] = useState([])
  const [cart, setCart] = useState(null)
  const [showQty, setShowQty] = useState(null)
  const { id } = useParams();

  async function getRestaurant(restaurantID) {
    // console.log(restaurantID, 'getRestaurant in Restaurant Page Component')
    try {
      const restaurantData = await restaurantsAPI.getOneRestaurant(restaurantID);
      setRestaurant(restaurantData);
      // console.log(restaurant,'restaurant in restaurantPageComponent')
    } catch (error) {
      console.error(error, 'error for getRestaurant in RestaurantPageComponent')
    }
  }

  async function getCart() {
    const cart = await ordersAPI.getCart();
    setCart(cart);
  }

  async function changeShowQty() {
    if (showQty == null) {
      setShowQty == true;
    }
  } ;
 
  async function handleCheckout() {
    await ordersAPI.checkout();
    // navigate to where?
    navigate('/home');
  }

  async function handleAddToOrder(itemId, index, restaurant) {
    console.log(itemId, 'itemID in restaurantPageComponent')
    console.log(restaurant, 'restaurant in restaurantPageComponent')
    console.log(index, 'index in restaurantPageComponent')
    try {
      const updatedCart = await ordersAPI.addToCart(itemId)
      setCart(updatedCart)
    } catch (error) {
      console.error(error);
    }
  }

  async function handleChangeQty(itemId, newQty) {
    const updatedCart = await ordersAPI.setItem(itemId, newQty);
    setCart(updatedCart)
  }

useEffect(() => {
  getRestaurant(id);
  getCart();
  // console.log(restaurant, 'restaurant in useEffect')
},[])

  return (
    <div className="container">
      <h6 className="text-center">Restaurant Page Component</h6>
      <div>{restaurant.name}</div>
      <div>{restaurant.cuisineType}</div>
      <div>
      <h6>Menu:</h6>
      <ul>
        {restaurant.menu?.map((menuItem, index) => (
          <li key={index}>
            <strong>{menuItem.dishName}</strong>: {menuItem.description} - ${menuItem.price.toFixed(2)} - <button onClick={() => handleAddToOrder(menuItem._id, index, restaurant)}> Add to Order</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}