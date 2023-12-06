import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export default function CartPageComponent({cart, restaurant}) {

    const navigate = useNavigate();
  console.log(cart, 'cart in CARTPAGECOMPONENT ')
  console.log(restaurant, 'restaurant in CARTPAGECOMPONENT ')
  
  function toRestaurant() {
    navigate(`/restaurant/${restaurant._id}`)
  }

  if (restaurant === null) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      <h6 className="text-center">Cart Page Component</h6>
    <div>{restaurant.name} <strong><button onClick={() => { toRestaurant() }}>Forward</button></strong></div>
    
    
    </div>
  )
}