import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../../src/cartPageComponentStyle.css'
export default function CartPageComponent({ cart, restaurant, toRestaurant }) {

  const navigate = useNavigate();
  //   console.log(cart, 'cart in CARTPAGECOMPONENT ')
  console.log(restaurant, 'restaurant in CARTPAGECOMPONENT ')



  if (restaurant === null || cart === null) {
    return <div>Loading...</div>
  }

  return (
    <div className='restaurantNameContainer'>
      <div className='restaurantName'>
        {restaurant.name}
      </div>
      <div className='restaurantBack'>
        <button onClick={() => { toRestaurant() }}>Back to Restaurant
        </button>
      </div>
    </div>
  )
}