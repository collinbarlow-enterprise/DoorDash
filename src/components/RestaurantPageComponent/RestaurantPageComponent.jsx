import React, { useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as restaurantsAPI from '../../utilities/restaurants-api'

export default function RestaurantPageComponent({}) {
  
  const [restaurant, setRestaurant] = useState([])
  const { id } = useParams();

  async function getRestaurant(restaurantID) {
    console.log(restaurantID, 'getRestaurant in Restaurant Page Component')
    try {
      const restaurantData = await restaurantsAPI.getOneRestaurant(restaurantID);
      setRestaurant(restaurantData);
    } catch (error) {
      console.error(error, 'error for getRestaurant in RestaurantPageComponent')
    }
  }

useEffect(() => {
  getRestaurant(id);
},[])

  return (
    <div className="container">
      <h6 className="text-center">Restaurant Page Component</h6>
    </div>
  )
}