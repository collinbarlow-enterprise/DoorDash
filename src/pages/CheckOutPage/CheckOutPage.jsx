import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


import * as restaurantAPI from '../../utilities/restaurants-api'
import * as ordersAPI from '../../utilities/orders-api'
import * as usersAPI from '../../utilities/users-service'

import CheckOutComponent from '../../components/CheckOutComponent/CheckOutComponent'


export default function CheckOutPage() {

  // google maps api code:
  const containerStyle = {
    width: '400px',
    height: '400px'
  };
  // this variable should be replaced with my user.location.coordinates value
 
  
  //   return isLoaded ? (
  //       <GoogleMap
  //         mapContainerStyle={containerStyle}
  //         center={center}
  //         zoom={10}
  //         onLoad={onLoad}
  //         onUnmount={onUnmount}
  //       >
  //         { /* Child components, such as markers, info windows, etc. */ }
  //         <></>
  //       </GoogleMap>
  //   ) : <></>
  // }
  
    
// state values:
// X user
// X cart
// X restaurant
// X total
// X map
// dasher tip

  const navigate = useNavigate();
  const [ user, setUser ] = useState(null)
  const [ cart, setCart ] = useState(null)
  const [ restaurant, setRestaurant ] = useState(null)
  const [ total, setTotal ] = useState(null)
  const [ dasherTip, setDasherTip ] = useState(null)
  const [map, setMap] = useState(null)

// API functions needed:
// X getUser, X getCart, X getRestaurant, X getTotal

async function getUser() {
  const user = await usersAPI.getUser();
  setUser((prevState) => {
    // console.log(prevState, 'prevState for user')
    console.log(user, 'user in setUser function on getUser')
    return user;
  });
  // userLocation();
}

async function getCart() {
  const cart = await ordersAPI.getCart();
  console.log(cart, 'CART IN GETCART FUNCTION ON HOMEPAGE COMPO BEFORE setting cart')
  setCart((prevState) => {
    // console.log(cart, 'cart in getCart on CartPage')
    return cart;
  })


  setCart(cart);
  console.log(cart, 'CART AFTER SETCART IS RAN IN GETCART')
}

// need to find a way to get the Restaurant id...from the cart or order? 
async function getRestaurant() {
  console.log('inside getrestaurant on checkout page')
  console.log(cart.restaurant, 'cart.restaurant in getrestaurant on checkout page')
  console.log(cart, 'cart in getrestaurant on checkout page')
  try {
    
      const restaurantData = await restaurantAPI.getOneRestaurant(cart.restaurant);
      console.log(restaurantData, 'restaurantsData in getRestaurants HomePage')
      setRestaurant(restaurantData);
  } catch(error) {
      console.error(error, 'error for getRestaurant in Home Page')
  }
}

// async function getRestaurant() {
//   console.log('inside getrestaurant on checkout page');

//   // Check if cart and cart.restaurant are not null
//   const hasCart = cart !== null;
//   const hasRestaurant = hasCart ? cart.restaurant !== null : false;

//   if (hasRestaurant) {
//     console.log(cart.restaurant, 'cart.restaurant in getrestaurant on checkout page');
//     console.log(cart, 'cart in getrestaurant on checkout page');

//     try {
//       const restaurantData = await restaurantAPI.getOneRestaurant(cart.restaurant);
//       console.log(restaurantData, 'restaurantsData in getRestaurants HomePage');
//       setRestaurant(restaurantData);
//     } catch (error) {
//       console.error(error, 'error for getRestaurant in Home Page');
//     }
//   } else {
//     console.log('Cart or cart.restaurant is null');
//   }
// }


async function getTotal() {
  try {
      const totalData = await ordersAPI.getTotal();
      // console.log(totalData, 'totalData in getRestaurants HomePage')
      // console.log(typeof totalData, 'totalData in getRestaurants HomePage')
      setTotal(totalData);
  } catch(error) {
      console.error(error, 'error for getTotal in Home Page')
  }
}

// other functions needed
// an onClick function that updates the setDasherTip 
// a function to determine the price of the dashertip options - how should the tip be generated? a hard coded value doesn't seem right, so maybe some percentage of the total? 

// a function for the google maps api that will use the user.address as the place
// does the google maps api give an ETA value? that would make delivery time interesting 
function userLocation() {
const center = {
  lat: user.location.coordinates[1],
  lng: user.location.coordinates[0]
};


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    // going to need get the key from .env - check user model page for example 
    googleMapsApiKey: `AIzaSyCX2bWFyZvH_rjXTpikoIC_8tO0KFcNQYI`
  })
  // const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // note that the 'center' are the coordinate positions, replace with my own users' values
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [center])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])}

// navigate functions to orders page

function navigateToOrderStatusPage() {
  navigate(`/orderstatus`)
}


// CheckOut Page
// restaurant name
// google maps api that shows the user's address
// delivery time 
// delivery options which will be 3, the premier one will add to the total(how would I accomplish that?), the middle will be the normal one which will just be a set time (should do a RNG with a specific range), and then third will be a scheduled order (goes to another page that has a time wheel, need to look into that more)

// a field for the address (if I want to get ambitious I can swap to a list of addresses that a user can add and delete in a drop down menu)
// a field for drop off instructions (looks like it has its own page, which would have two options and a form field, guess drop off instructions would be a field on the order?)
// phone number
// send as a gift (goes to a page that has a few fields, but actually I don't think this would be that hard, it would just need to change something about the order indicating it was for someone else? maybe another optional field on the order model which would be default to null, but would be orderRecipient, and then on the order summary I could conditionally render based on that value


// Cart Summary
// lists all menu items and ingredients

// Summary Field
// lot of reusable components in both the summary and cart summary - wonder how I could accomplish some sort of reusability, slight UI differences, and really wouldn't be a massive pain to code, but would be cool if I could do it

// total

// payment - going to store this information via the user credit card field 

// conditional rendering for being a chase sapphire member

// conditional rendering for if the order is being scheduled ahead of time, show that time selected 
// place order 


// useEffect(() => {
//   getUser();
//   getCart();
//   // getRestaurant();

// }, [])

// useEffect(() => {
//   getRestaurant();
//   getTotal();
//   // console.log(restaurant, 'restaurant in cart page');
//   // userLocation();
// },[cart])



useEffect(() => {
  async function fetchData() {
    await getUser();
    await getCart();
    await getRestaurant();
    await getTotal();
    await userLocation();
  }

  fetchData();
}, []);

// useEffect(() => {
//   userLocation();
// }, [user])

if (restaurant === null || cart === null) {
  return <div>Loading...</div>
}


  return (
    <div>
        <h1>Still Under Construction</h1>

        <CheckOutComponent />

        <h1>Check Out Page</h1>
        <div>Restaurant Name</div>
        <div>Google Maps API Section</div>
        {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
    ) : <>No map to be displayed</>}
        <div></div>
        <div>Delivery Time Section</div>
        <div>Delivery Options</div>
        <div>User Address</div>
        <div>Drop Off Instructions </div>
        <div>User Phone Number</div>
        <div>Send as a gift</div>

        <div>Cart Summary Section</div>
        {/* seems to be a 3 div container (Quantity x Item, Ingredients, Price), with bootstrap to align things correctly */}
        <div>cart items with price and ingredients </div>
        
        <div>Order Summary</div>
        <div>Add a Promo Field</div>
        <div>Subtotal (which would be order.price)</div>
        <div>Delivery Fee</div>
        <div>Fees and Estimated Tax</div>
        <div>Dasher Tip</div>
        <div>3 recommended options, and one which is 'other' that leads to another page and would update the order</div>
        <div>Total</div>
        <div>Payment</div>
        <div>Conditional Rendering based on Chase Sapphire</div>
        <div>Place Order Button</div>
        
    </div>
  )
}