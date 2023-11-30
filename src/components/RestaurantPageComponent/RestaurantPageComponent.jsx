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
  const navigate = useNavigate();


  function toMenuItemPage(menuId) {
    console.log(menuId, 'id in toMenuItem function');
    navigate(`/itempage/${menuId}`)
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



  async function handleChangeQty(itemId, newQty) {
    console.log(cart, 'cart in handleChangeQty')
    console.log(itemId, 'item id in handleChangeQty on Cart Component')
    console.log(newQty, 'new Qty in handleChangeQty on Cart Component')
    const updatedCart = await ordersAPI.setItem(itemId, newQty);
    console.log(updatedCart, 'updatedCart in handleChangeQty')
    setCart(updatedCart)
  }

  const cartMap = cart.lineItems ? cart.lineItems.map((item) => 
  <CartComponent
  key = {item._id}
  cartItem = {item}
  itemQty = {item.quantity}
  cart = {cart}
  handleChangeQty = {handleChangeQty}
  
  />
  ) : [];

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
      {/* right now I have the name, description, price, and add to order...I think I really just want the name, image, price, and add to order...the description can be saved for the item page itself */}
      {/* the list item is underneath the map function, so I can include a onClick for the 'li' that would link to the item details page */}
      {/* if the li has the onClick, how do I organize it so the addToOrder button doesn't also send you to the page? maybe use a seperate div or inline block that would house the name and image, then another div for the add to order button...wouldn't be in the 'li' tag then */}
      <ul>
        {restaurant.menu?.map((menuItem, index) => (
          <li key={index}>
            <strong onClick={()=> {toMenuItemPage(menuItem._id)}}>{menuItem.dishName}</strong>: {menuItem.description} - ${menuItem.price.toFixed(2)} - <button onClick={() => handleAddToOrder(menuItem._id, index, restaurant)}> Add to Order</button>
            {/* need to destructure my cart object, then map it, and then do a ternary to determine if the menuItem is present in the cart then show the handleChangeQty */}

            {/* don't need to the add or remove here. I don't think... */}
            {/* another question is how would I select the cartItem.item in this instance where my cartItems are still in an array? They need to be mapped over, and maybe that's the answer, just a quick map? */}

            {/* <button onClick={() => handleChangeQty(cartItem.item, itemQty +1)}> Add </button>
            <button onClick={() => handleChangeQty(lineItem.item._id, lineItem.quantity -1)}> Remove </button> */}
         
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}