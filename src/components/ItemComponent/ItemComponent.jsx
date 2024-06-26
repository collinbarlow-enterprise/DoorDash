import React, { useState, useEffect } from 'react'
import '../../../src/itemComponentStyle.css'

export default function ItemComponent({
  menuItem,
  cart,
  handleChangeQty,
  handleAddToOrderFromItemPage,
  navigateBackToRestaurant,
  id,
  menuId,
  itemQty }) {

  console.log(menuItem, 'menu item in itemComponent')
  console.log(cart, 'cart  in itemComponent')
  console.log(handleChangeQty, 'handleChange in itemComponent')
  console.log(handleAddToOrderFromItemPage, 'add to order item in itemComponent')
  console.log(itemQty, 'itemQty in itemComponent')
  console.log(typeof itemQty, 'itemQty in itemComponent')

  const [itemQuantity, setItemQuantity] = useState(null);

  const defaultImage = '/no-image.svg';
  const isItemInCart = cart?.lineItems?.some((item) => item.item === menuId) || false;

  useEffect(() => {
    setItemQuantity(itemQty)
  }, [handleChangeQty, handleAddToOrderFromItemPage])

  // i need a useEffect to cause a reload when the 
  // itemQty changes upon the handleChangeQty

  return (
    <div className = "itemPage" style={{ marginTop: '75px'}}>
      <div className="itemHeader">
        <div ><button onClick={() => navigateBackToRestaurant(id)}>X</button>
          <img src={defaultImage} alt='No Picture Loaded'></img>
        </div>
      </div>
      <br />
      <div className='itemInfo'>
        <div className='itemName'>{menuItem.dishName}</div>
        <br/>
        <div>{menuItem.description}</div>
        <div>Ingredients:<br/> {menuItem.ingredients?.join(', ')}</div>
        <br/>
      </div>

      {isItemInCart ? (
        <div className="cartControls">
          <button onClick={() => handleChangeQty(menuId, itemQty - 1)}>-</button>
          <div className='cartQty'>{itemQty ? `${itemQty} in your cart` : ("Not in Cart")}</div>
          <button onClick={() => handleChangeQty(menuId, itemQty + 1)}>+</button>
        </div>
      ) : (
        <div className="cartControls">
          <button onClick={() => handleAddToOrderFromItemPage()}>Add to Order {menuItem.price}</button>
        </div>


      )}
      <br />
    </div>
  )
}