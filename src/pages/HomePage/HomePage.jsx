import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import * as restaurantAPI from '../../utilities/restaurants-api'
import * as ordersAPI from '../../utilities/orders-api'
import RestaurantHomePageComponent from '../../components/RestaurantHomePageComponent/RestaurantHomePageComponent'


export default function HomePage() {
    const [restaurants, setRestaurants] = useState(null);
    const [cart, setCart] = useState()
// the way i had showCheckout working in fish-market was through a useState turning on and off
// I didn't like that before, and I think it would be better if I use a navigate to the either the cart page or the checkout page
// i think the flow is for the user to go home where they can see the restaurants, then click on a restaurant and be navigated to the restaurant page where they can see the menu items, use the cart functionality on the menu items page, then have a button in the top right and bottom of the screen that navigates to the cart, and then the cart page navigates to the checkout page where a user can complete the order
    const [showCheckout, setShowCheckout] = useState(null);
    const navigate = useNavigate();



async function getRestaurants() {
    try {
        const restaurantsData = await restaurantAPI.getRestaurant();
        // console.log(restaurantsData, 'restaurantsData in getRestaurants HomePage')
        setRestaurants(restaurantsData);
    } catch(error) {
        console.error(error, 'error for getRestaurant in Home Page')
    }
}

// async function getCart() {
//     const cart = await ordersAPI.getCart();
//     setCart(cart);
//     };
    
// async function handleCheckout() {
//     await ordersAPI.checkout();
//     navigate('/orders');
//     };

// async function handleAddToOrder(itemId) {
//     try {
//     const updatedCart = await ordersAPI.addToCart(itemId)
//     setCart(updatedCart)
//     } catch (error) {
//       console.error(error);
//     }};
    
// async function handleChangeQty(itemId, newQty) {
//     const updatedCart = await ordersAPI.setItem(itemId, newQty);
//     setCart(updatedCart)
//     };
    
// function handleShow(setShowCheckout) {
//     setShowCheckout((current) => !current)
//     };


useEffect(() => {
    getRestaurants();
    // getCart();
}, [])


if (restaurants === null) {
    return <div>Loading...</div>
}

const restaurantMap = restaurants.map((r, index) =>
   <RestaurantHomePageComponent
   key = {index}
   id = {r._id}
   name = {r.name}
   cuisine = {r.cuisineType}
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