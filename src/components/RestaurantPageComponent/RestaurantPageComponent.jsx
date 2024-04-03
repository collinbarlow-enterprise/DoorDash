import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as restaurantsAPI from '../../utilities/restaurants-api'
import * as ordersAPI from '../../utilities/orders-api'
import CartComponent from '../CartComponent/CartComponent'
import '../../../src/app.css/'
import '../../../src/menuStyle.css'


export default function RestaurantPageComponent({ }) {

  const [restaurant, setRestaurant] = useState(null)
  const [cart, setCart] = useState({})
  const [showQty, setShowQty] = useState(null)
  const { id } = useParams();
  const navigate = useNavigate();


  function toMenuItemPage(id, menuId) {
    try {
      console.log(id, 'restaurant ID in toMenuItem function');
      console.log(menuId, 'menuId in toMenuItem function');
      navigate(`/restaurant/${id}/itempage/${menuId}`)
    } catch (error) {
      console.error('Navgiation error:', error)
    }
  }

  function navigateBackToHome() {
    navigate(`/`)
  }

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
    // console.log(cart, 'CART IN GETCART FUNCTION ON HOMEPAGE COMPO BEFORE setting cart')
    setCart(cart);
    // console.log(cart, 'CART AFTER SETCART IS RAN IN GETCART')
  }

  async function changeShowQty() {
    if (showQty == null) {
      setShowQty == true;
    }
  };

  async function handleCheckout() {
    await ordersAPI.checkout();
    navigate('/home');
  }

  async function handleAddToOrder(itemId, index, restaurant) {
    try {
      const updatedCart = await ordersAPI.addToCart(itemId, index, restaurant);
      setCart((prevCart) => {
        // console.log(updatedCart, 'UPDATED CART IN ADDTO ORDER, should be cart that returns from json');
        // console.log(prevCart, 'PREVIOUS CART STATE');
        return updatedCart;
      });
    } catch (error) {
      console.error(error);
    }
  }



  async function handleChangeQty(itemId, newQty) {
    // console.log(cart, 'cart in handleChangeQty')
    console.log(itemId, 'item id in handleChangeQty on Cart Component')
    console.log(newQty, 'new Qty in handleChangeQty on Cart Component')
    const updatedCart = await ordersAPI.setItem(itemId, newQty);
    // console.log(updatedCart, 'updatedCart in handleChangeQty')
    setCart(updatedCart)
  }

  const cartMap = cart.lineItems ? cart.lineItems.map((item) =>
    <CartComponent
      key={item._id}
      cartItem={item}
      itemQty={item.quantity}
      cart={cart}
      handleChangeQty={handleChangeQty}

    />
  ) : [];

  useEffect(() => {
    getRestaurant(id);
    getCart();
    // console.log(restaurant, 'restaurant in useEffect')
  }, [])

  const defaultImage = '/no-image.svg';
  const maxLength = 180;

  if (restaurant === null) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      <div><button onClick={() => navigateBackToHome()}>Back To Home</button></div>
      {/* <h6 className="text-center">Restaurant Page Component</h6> */}
      <img src={defaultImage}></img>
      <div className='restaurant-name'><h2>{restaurant.name}</h2>
      </div>

      <div className='cart'>
  {cartMap ? (
    <>
      <span style={{fontSize: '1em'}}>Your cart from {restaurant.name}:</span> {cartMap}
    </>
  ) : null}
</div>

      <div className='menu-container'>

        <h6>Menu:</h6>
        {restaurant.menu?.map((menuItem, index) => (
          <div key={index} className="menu-item">
            <strong onClick={() => { toMenuItemPage(id, menuItem._id) }}>{menuItem.dishName}</strong>: {menuItem.description.length > maxLength ? menuItem.description.substring(0, maxLength): menuItem.description} - ${menuItem.price.toFixed(2)} - <button onClick={() => handleAddToOrder(menuItem._id, index, restaurant)}> +</button>
          </div>
        ))}
      </div>
    </div>
  )
}