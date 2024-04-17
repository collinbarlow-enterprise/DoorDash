import React from 'react'
import CartComplementItems from '../CartComplementItems/CartComplementItems'

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function CartRestaurantMenuMap({cart, restaurant, setCart}) {

// console.log(cart, 'cart in CartMENUMAP')
// console.log(restaurant, 'restaurant in cart map')

const restaurantId = restaurant._id

const restaurantMenu = restaurant.menu
// console.log(restaurantMenu)

const menuItemsNotInCart = restaurantMenu.filter((menuItem) => !cart.lineItems.some((cartItem) => cartItem.item === menuItem._id))


if (restaurantMenu === null) {
    return <div>Loading...</div>
}

  return (
    <div className="container">
      <h6 className="text-center">CartRestaurantMenuMap Component</h6>
      <div>
      {menuItemsNotInCart.map((menuItem) => (
    <CartComplementItems key={menuItem._id} menuItem={menuItem} restaurantId={restaurantId} cart = {cart} setCart = {setCart}/>
  ))}

      </div>
    </div>
  )
}