import React, { useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ItemComponent from '../../components/ItemComponent/ItemComponent'
import * as restaurantsAPI from '../../utilities/restaurants-api'
import * as ordersAPI from '../../utilities/orders-api'

export default function ItemPage() {

  const [menuItem, setMenuItem] = useState(null)
  const [cart, setCart] = useState(null)
  const [itemQty, setItemQty] = useState(null)
  const { id, menuId } = useParams();
  const navigate = useNavigate();

  function navigateBackToRestaurant() {
    // navigate back to the restaurant page
    // console.log(id, 'id in navigateBack')
    navigate(`/restaurant/${id}`)
  }

  async function getMenuitem() {
    // console.log(id, 'id in getMenuItem function')
    // console.log(menuId, 'menuId in getMenuItem function')
    try {
      const menuItemData = await restaurantsAPI.getMenuItem(id, menuId);
      // console.log(menuItemData, 'menuItemData')
      setMenuItem((prevState) => {
        // console.log(menuItemData, 'menuitemData inside setFunction');
        return menuItemData;
         });
    } catch(error) {
      console.error(error, 'error for getMenuItem in ItemPage')}
  }

  async function getCart() {
    const cart = await ordersAPI.getCart();
    // console.log(cart, 'CART IN GETCART FUNCTION ON HOMEPAGE COMPO BEFORE setting cart')
    setCart(cart);
    console.log(cart, 'CART AFTER SETCART IS RAN IN GETCART')
  }

  async function getItemQuantity() {
    const item = await cart?.lineItems?.find((item) => item.item === menuId)
    console.log(item, "item in getItemQuantity");
    
    if (item) {
    setItemQty((prevQty) => {
      return item.quantity
    })}
  }

  async function handleChangeQty(menuId, newQty) {
    console.log(cart, 'cart in handleChangeQty')
    console.log(menuId, 'menuId in handleChangeQty on Cart Component')
    console.log(newQty, 'new Qty in handleChangeQty on Cart Component')
    const updatedCart = await ordersAPI.setItem(menuId, newQty);
    console.log(updatedCart, 'updatedCart in handleChangeQty')
    // setCart(updatedCart)
    setCart((prevCart) => {
      console.log(updatedCart, 'UPDATED CART IN ADDTO ORDER, should be cart that returns from json');
      console.log(prevCart, 'PREVIOUS CART STATE');
      return updatedCart;
    });
  }

  async function handleAddToOrderFromItemPage() {
    // console.log(id, 'restaurantId in add to order')
    // console.log(menuId, 'menuId in add to order')

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

  // const isItemInCart = cart?.lineItems?.some((item) => item.item === menuId) || false;


  useEffect(() => {
    getMenuitem(id);
    getCart();
    // getItemQuantity();
  },[])

  useEffect(() => {
    getItemQuantity();
  }, [cart])


  if (menuItem === null || cart === null ) {
    return <div>Loading...</div>
  }

  return (
    <div>
        <h1>Still Under Construction</h1>
        <h1>Item Page</h1>
        <div><ItemComponent
         menuItem = {menuItem}
          cart = {cart} 
          handleChangeQty={handleChangeQty} handleAddToOrderFromItemPage = {handleAddToOrderFromItemPage}
          navigateBackToRestaurant = {navigateBackToRestaurant}
          id = {id}
          menuId = {menuId}
          itemQty = {itemQty}
          /> </div>

    </div>
  )
}