import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import * as ordersAPI from '../../utilities/orders-api'

import * as restaurantsAPI from '../../utilities/restaurants-api'

export default function CartComponent({cartItem, itemQty, cart, handleChangeQty}) {

  const [itemName, setItemName] = useState(null)
  const { id } = useParams();

  async function handleCheckout() {
    await ordersAPI.checkout();
    // navigate to where?
    navigate('/home');

  }

  async function handleAddToOrder(itemId) {
    try {
      const updatedCart = await ordersAPI.addToCart(itemId)
      setCart(updatedCart)
    } catch (error) {
      console.error(error);
    }
  }

  async function findCartItem(cartItem) {
    console.log(cartItem, 'item in findCartItem function')
    console.log(id, 'id in findCartItem function')
    // need to align the objects being sent to the cart
    // and what the api is expecting
    // the controller doesn't have access to req.body or params
    // and part of it console.logs to [object object]
    try {
      const dishName = await restaurantsAPI.getMenuItem(id, cartItem)
      console.log(dishName, 'dishName')
      // setItemName()
    } catch (error) {
      console.error(error, 'error for findCartItem in CartComponent')
    }
  }

  useEffect(() => {
    findCartItem(cartItem);
  }, [])
// need to get it so that the cartItem.item 's name is found and not just the id number
  return (
    <div className="container">
      <h6 className="text-center">Cart Component</h6>
      {/* need to have a get menuItem function that takes the cartItem.item value and returns the menuItem */}
      {/* need to add a remove and add button to the qty?  */}
      
      {/* need to debug the handleChangeQty - add and remove are multiplying the amount by 2 */}
      <div>Dish:{cartItem.item} Quantity: {itemQty}  <button onClick={() => handleChangeQty(cartItem.item, itemQty +1)}> Add </button>
            <button onClick={() => handleChangeQty(cartItem.item, itemQty -1)}> Remove </button></div>
    </div>
  )
}