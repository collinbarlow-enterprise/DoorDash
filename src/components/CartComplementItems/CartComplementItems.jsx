import React from 'react'
import * as ordersAPI from '../../utilities/orders-api'
import '../../../src/cartComplementItemStyle.css'

export default function CartComplementItems({menuItem, restaurantId, cart, setCart}) {
// console.log(menuItem, 'menuItem in COMPLEMENTITEMS')



    async function handleAddToOrderFromCartPage() {
        // console.log(id, 'restaurantId in add to order')
        // console.log(menuId, 'menuId in add to order')
    
        const itemId = menuItem._id;
        
    
        try {
          const updatedCart = await ordersAPI.addToCartFromItemPage(itemId, restaurantId);
          setCart((prevCart) => {
            // console.log(updatedCart, 'UPDATED CART IN ADDTO ORDER, should be cart that returns from json');
            // console.log(prevCart, 'PREVIOUS CART STATE');
            return updatedCart;
          });
        } catch (error) {
          console.error(error);
        }
      }


// if (restaurantMenu === null) {
//     return <div>Loading...</div>
// }

  return (
    <div className='containerCartComplement'>
    <div className="cart-complement-item">
      <div className="complement-details">
        <div className="dish-details">
          <div className="dish-name">{menuItem.dishName}</div>
          <div className="dish-price">${menuItem.price}</div>
        </div>
        <button className="add-to-order-button" onClick={() => handleAddToOrderFromCartPage()}>+</button>
      </div>
    </div>
    </div>
  );
};