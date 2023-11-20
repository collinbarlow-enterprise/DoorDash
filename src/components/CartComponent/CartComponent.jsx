import React, { useState, useEffect} from 'react'
import * as ordersAPI from '../../utilities/orders-api'

export default function CartComponent({}) {

  const [cart, setCart] = useState(null)

  async function getCart() {
    const cart = await ordersAPI.getCart();
    setCart(cart);
  }

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

  async function handleChangeQty(itemId, newQty) {
    const updatedCart = await ordersAPI.setItem(itemId, newQty);
    setCart(updatedCart)
  }

  useEffect(function () {
    getCart();
  }, []);

  return (
    <div className="container">
      <h6 className="text-center">Cart Component</h6>
    </div>
  )
}