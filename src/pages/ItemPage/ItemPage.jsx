import React, { useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ItemComponent from '../../components/ItemComponent/ItemComponent'
import * as restaurantsAPI from '../../utilities/restaurants-api'
import * as ordersAPI from '../../utilities/orders-api'

export default function ItemPage() {

  const [menuItem, setMenuItem] = useState({})
  const [cart, setCart] = useState({})
  const { id, menuId } = useParams();
  const navigate = useNavigate();

  async function getMenuitem() {
    console.log(id, 'id in getMenuItem function')
    console.log(menuId, 'menuId in getMenuItem function')
    try {
      const menuItemData = await restaurantsAPI.getMenuItem(id, menuId);
      console.log(menuItemData, 'menuItemData')
      setMenuItem((prevState) => {
        console.log(menuItemData, 'menuitemData inside setFunction');
        return menuItemData;
      });
    } catch(error) {
      console.error(error, 'error for getMenuItem in ItemPage')}
  }

  async function getCart() {
    const cart = await ordersAPI.getCart();
    console.log(cart, 'CART IN GETCART FUNCTION ON HOMEPAGE COMPO BEFORE setting cart')
    setCart(cart);
    console.log(cart, 'CART AFTER SETCART IS RAN IN GETCART')
  }

  async function handleChangeQty(itemId, newQty) {
    console.log(cart, 'cart in handleChangeQty')
    console.log(itemId, 'item id in handleChangeQty on Cart Component')
    console.log(newQty, 'new Qty in handleChangeQty on Cart Component')
    const updatedCart = await ordersAPI.setItem(itemId, newQty);
    console.log(updatedCart, 'updatedCart in handleChangeQty')
    setCart(updatedCart)
  }

  async function handleAddToOrderFromItemPage() {
    console.log(id, 'restaurantId in add to order')
    console.log(menuId, 'menuId in add to order')

    const itemId = menuId;
    const restaurantId = id;

    try {
      const updatedCart = await ordersAPI.addToCartFromItemPage(itemId, restaurantId);
      setCart((prevCart) => {
        console.log(updatedCart, 'UPDATED CART IN ADDTO ORDER, should be cart that returns from json');
        console.log(prevCart, 'PREVIOUS CART STATE');
        return updatedCart;
      });
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    getMenuitem(id);
    getCart();
  },[])

  return (
    <div>
        <h1>Still Under Construction</h1>
        <h1>Item Page</h1>
        <div>{menuItem.dishName}</div>
        {/* need to add the add to order button, can create a new function that takes ids and then uses that to find and populate the card...there was an issue with what the current functions were expecting and what I was giving them in this page, so may just need to do it differently  */}
        <div><button onClick = {() => handleAddToOrderFromItemPage()}> Add to Order </button></div>
        <div>{menuItem.description}</div>
        <div>{menuItem.price}</div>
        <div><strong>Ingredients:</strong>
      <ul>
        {menuItem.ingredients?.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
    </div>
  )
}