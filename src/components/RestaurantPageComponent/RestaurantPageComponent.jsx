import React, { useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as restaurantsAPI from '../../utilities/restaurants-api'
import * as ordersAPI from '../../utilities/orders-api'
import CartComponent from '../CartComponent/CartComponent'

export default function RestaurantPageComponent({}) {
  
  const [restaurant, setRestaurant] = useState([])
  const [cart, setCart] = useState({})
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
    console.log(cart, 'CART IN GETCART FUNCTION ON HOMEPAGE COMPO BEFORE setting cart')
    setCart(cart);
    console.log(cart, 'CART AFTER SETCART IS RAN IN GETCART')
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

  // async function handleAddToOrder(itemId, index, restaurant) {
  //   console.log(itemId, 'itemID in restaurantPageComponent')
  //   console.log(restaurant, 'restaurant in restaurantPageComponent')
  //   console.log(index, 'index in restaurantPageComponent')
  //   try {
  //     const updatedCart = await ordersAPI.addToCart(itemId, index, restaurant)
  //     console.log(updatedCart, 'UPDATED CART IN ADDTO ORDER, should be cart that returns from json')
  //     setCart(updatedCart)
  //     console.log(cart, 'cart in HANDLEADD TOO ORDER AFTER IT RETURNS')
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async function handleAddToOrder(itemId, index, restaurant) {
    try {
      const updatedCart = await ordersAPI.addToCart(itemId, index, restaurant);
      setCart((prevCart) => {
        console.log(updatedCart, 'UPDATED CART IN ADDTO ORDER, should be cart that returns from json');
        console.log(prevCart, 'PREVIOUS CART STATE');
        return updatedCart;
      });
    } catch (error) {
      console.error(error);
    }
  }

  const cartMap = cart.lineItems ? cart.lineItems.map((item) => 
  <CartComponent
  key = {item._id}
  cartItem = {item}
  itemQty = {item.quantity}
  />
  ) : [];

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
        {cartMap}
      
      </div>

      <div>
        
      <h6>Menu:</h6>
      <ul>
        {restaurant.menu?.map((menuItem, index) => (
          <li key={index}>
            <strong>{menuItem.dishName}</strong>: {menuItem.description} - ${menuItem.price.toFixed(2)} - <button onClick={() => handleAddToOrder(menuItem._id, index, restaurant)}> Add to Order</button>
            {/* need to destructure my cart object, then map it, and then do a ternary to determine if the menuItem is present in the cart then show the handleChangeQty */}
            <button onClick={() => handleChangeQty(lineItem.item._id, lineItem.quantity +1)}> Add </button>
            <button onClick={() => handleChangeQty(lineItem.item._id, lineItem.quantity -1)}> Remove </button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}