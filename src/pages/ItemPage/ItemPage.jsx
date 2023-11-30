import React, { useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ItemComponent from '../../components/ItemComponent/ItemComponent'
import * as restaurantsAPI from '../../utilities/restaurants-api'
import * as ordersAPI from '../../utilities/orders-api'

export default function ItemPage() {

  const [menuItem, setMenuItem] = useState({})
  const [cart, setCart] = useState({})
  const { id } = useParams();
  const navigate = useNavigate();

  async function getMenuitem(id) {
    try {
      const menuItemData = await restaurantsAPI.getMenuItem(id);
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

  useEffect(() => {
    getMenuitem(id);
    getCart();
  },[])

  return (
    <div>
        <h1>Still Under Construction</h1>
        <h1>Item Page</h1>
    </div>
  )
}