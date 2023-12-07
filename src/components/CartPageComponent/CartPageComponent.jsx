import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export default function CartPageComponent({cart, restaurant, toRestaurant}) {

    const navigate = useNavigate();
  console.log(cart, 'cart in CARTPAGECOMPONENT ')
  console.log(restaurant, 'restaurant in CARTPAGECOMPONENT ')
  


  if (restaurant === null || cart === null) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      <h6 className="text-center">Cart Page Component</h6>
    <div>{restaurant.name} <strong><button onClick={() => { toRestaurant() }}>Back To {restaurant.name}</button></strong></div>
    
    
    </div>
  )
}