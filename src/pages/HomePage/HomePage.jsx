import React, { useState, useEffect} from 'react'

import * as restaurantAPI from '../../utilities/restaurants-api'
import 


export default function HomePage() {
    const [restaurants, setRestaurants] = useState([])

async function getRestaurants() {
    try {
        const restaurantsData = await restaurantAPI.getRestaurant;
        setRestaurants(restaurantsData);
    } catch(error) {
        console.error(error, 'error for getRestaurant in Home Page')
    }
}

useEffect(function () {
    getRestaurants();
}, [])

const restaurantMap = restaurants.map((r, index) =>
    // <make some componenets
)

  return (
    <div>
        <h1>Still Under Construction</h1>
        <h1>Home Page</h1>
    </div>
  )
}