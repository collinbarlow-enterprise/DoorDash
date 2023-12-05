import React from 'react'

export default function ItemComponent({menuItem, cart, handleChangeQty, handleAddToOrderFromItemPage, navigateBack, id, itemQty}) {

  console.log(menuItem, 'menu item in itemComponent')
  console.log(cart, 'cart  in itemComponent')
  console.log(handleChangeQty, 'handleChange in itemComponent')
  console.log(handleAddToOrderFromItemPage, 'add to order item in itemComponent')
  console.log(itemQty, 'itemQty in itemComponent')
  console.log(typeof itemQty, 'itemQty in itemComponent')

  return (
    <div className="container">
       <div><button onClick={() => navigateBack(id)}>X</button></div>

      <h6 className="text-center">Item Component Component</h6>
      <div>{itemQty ? (itemQty) : ("Not in Cart")}</div>
      <div>{menuItem.dishName}</div>
      <div>{menuItem.description}</div>
      <div>{menuItem.price}</div>
    </div>
  )
}