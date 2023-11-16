import React, { useState, useEffect} from 'react'

import * as restaurantAPI from '../../utilities/restaurants-api'
import RestaurantComponent from '../../components/RestaurantComponent/RestaurantComponent'


export default function HomePage() {
    const [restaurants, setRestaurants] = useState([]);

async function getRestaurants() {
    try {
        const restaurantsData = await restaurantAPI.getRestaurant();
        console.log(restaurantsData, 'restaurantsData in getRestaurants HomePage')
        setRestaurants(restaurantsData);
    } catch(error) {
        console.error(error, 'error for getRestaurant in Home Page')
    }
}

useEffect(() => {
    getRestaurants();
}, [])

const restaurantMap = restaurants.map((r, index) =>
   <RestaurantComponent
   key = {index}
   id = {r.id}
   name = {r.name}
   cuisine = {r.cuisine}
   menu = {r.menu}   
   />
);

  return (
    <div>
        <h1>Still Under Construction</h1>
        <h1>Home Page</h1>
        {restaurantMap}
    </div>
  )
}