import React from 'react'
import CartComplementItems from '../CartComplementItems/CartComplementItems'

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../src/cartComplementItemStyle.css'


export default function CartRestaurantMenuMap({cart, restaurant, setCart}) {

// console.log(cart, 'cart in CartMENUMAP')
// console.log(restaurant, 'restaurant in cart map')

const restaurantId = restaurant._id

const restaurantMenu = restaurant.menu
// console.log(restaurantMenu)

const menuItemsNotInCart = restaurantMenu.filter((menuItem) => !cart.lineItems.some((cartItem) => cartItem.item === menuItem._id))

const settings = {
  dots: false,
  infinite: menuItemsNotInCart.length > 2, // Only enable infinite scrolling if there are more than 2 items
  slidesToShow: 2,
  // Math.min(2, menuItemsNotInCart.length),
  slidesToScroll: 1,
  swipeToSlide: true,
  arrows: menuItemsNotInCart.length > 2,
};

if (restaurantMenu === null) {
    return <div>Loading...</div>
}

  return (
    <div className="container">
    {/* <h6 className="text-left">CartRestaurantMenuMap Component</h6> */}
    <div className="text-left">Complement Your Cart Below</div>
    <Slider {...settings}>
      {menuItemsNotInCart.map((menuItem) => (
        <div key={menuItem._id} className="cart-complement-item">
          <CartComplementItems
            menuItem={menuItem}
            restaurantId={restaurantId}
            cart={cart}
            setCart={setCart}
          />
        </div>
      ))}
    </Slider>
  </div>
);
}; 
//     <div className="container">
//       <h6 className="text-center">CartRestaurantMenuMap Component</h6>
//       <div>
//       {menuItemsNotInCart.map((menuItem) => (
//     <CartComplementItems key={menuItem._id} menuItem={menuItem} restaurantId={restaurantId} cart = {cart} setCart = {setCart}/>
//   ))}

//       </div>
//     </div>
//   )
// }