import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../../../src/app.css'

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
    const [cuisines, setCuisines] = useState([]);
    const [showMore, setShowMore] = useState({});
    const navigate = useNavigate();



    async function getRestaurants() {
        try {
            const restaurantsData = await restaurantAPI.getRestaurant();
            console.log(restaurantsData, 'restaurantsData in getRestaurants HomePage')

            const groupedByCuisine = restaurantsData.reduce((acc, restaurant) => {
                const cuisine = restaurant.cuisineType;

                if (!acc[cuisine]) {
                    acc[cuisine] = [];
                }

                acc[cuisine].push(restaurant);

                return acc;
            }, {});
            console.log(groupedByCuisine, 'groupedByCuisine')
            setRestaurants(groupedByCuisine);


        } catch (error) {
            console.error(error, 'error for getRestaurant in Home Page')
        }
    }

    const handleCuisineSelect = selectedCuisine => {
        // Bring the selected cuisine to the front
        const reorderedRestaurants = {
            [selectedCuisine]: restaurants[selectedCuisine],
            ...restaurants
        };
        setRestaurants(reorderedRestaurants);
    };

    const toggleShowMore = (cuisine) => {
        setShowMore((prevShowMore) => ({
            ...prevShowMore,
            [cuisine]: !prevShowMore[cuisine],
        }));
    };


    useEffect(() => {
        getRestaurants();
        // getCart();
    }, [])

    useEffect(() => {
        if (restaurants) {
            const extractedCuisines = Object.keys(restaurants);
            setCuisines(extractedCuisines);
        }
    }, [restaurants])

    if (restaurants === null) {
        getRestaurants();
        return <div>Loading...</div>;

    }

    return (
        <div>
            <h1>Still Under Construction</h1>
            <h1>Home Page</h1>
            <div className="cuisine-buttons">
                {cuisines.map(cuisine => (
                    <button key={cuisine} onClick={() => handleCuisineSelect(cuisine)}>
                        {cuisine}
                    </button>
                ))}
                <div>
                    {Object.keys(restaurants).map((cuisine) => (
                        <div key={cuisine} className="cuisine-group">
                            <div> <h2 className="cuisine-title">{cuisine}</h2> </div>
                            <br />
                            {restaurants[cuisine].length > 4 ? (
                                <Slider dots={false} infinite={false} slidesToShow={4} slidesToScroll={4}>
                                    {restaurants[cuisine].map((restaurant, index) => (
                                        <div key={index}>
                                            <RestaurantHomePageComponent
                                                id={restaurant._id}
                                                name={restaurant.name}
                                                cuisine={restaurant.cuisineType}
                                                menu={restaurant.menu}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            ) : (
                                <div className="restaurants-container">
                                    {restaurants[cuisine].map((restaurant, index) => (
                                        <RestaurantHomePageComponent
                                            key={index}
                                            id={restaurant._id}
                                            name={restaurant.name}
                                            cuisine={restaurant.cuisineType}
                                            menu={restaurant.menu}
                                        />
                                    ))}
                                </div>
                            )}

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};