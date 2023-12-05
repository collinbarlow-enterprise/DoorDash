import React from 'react'

export default function ItemComponent({
  menuItem,
  cart,
  handleChangeQty,
  handleAddToOrderFromItemPage,
  navigateBack,
  id,
  menuId,
  itemQty }) {

  console.log(menuItem, 'menu item in itemComponent')
  console.log(cart, 'cart  in itemComponent')
  console.log(handleChangeQty, 'handleChange in itemComponent')
  console.log(handleAddToOrderFromItemPage, 'add to order item in itemComponent')
  console.log(itemQty, 'itemQty in itemComponent')
  console.log(typeof itemQty, 'itemQty in itemComponent')

  const isItemInCart = cart?.lineItems?.some((item) => item.item === menuId) || false;

  return (
    <div className="container">
      <div><button onClick={() => navigateBack(id)}>X</button></div>

      <h6 className="text-center">Item Component Component</h6>
      <div>{itemQty ? (itemQty) : ("Not in Cart")}</div>
      {/* Render buttons based on whether item is in the cart */}
      {isItemInCart ? (
        <div>
          <button onClick={() => handleChangeQty(menuId, -1)}>-</button>
          <button onClick={() => handleChangeQty(menuId, 1)}>+</button>

        </div>
      ) : (
        <div>
          <button onClick={() => handleAddToOrderFromItemPage()}>Add to Order</button>
        </div>
      )}

      <div>{menuItem.dishName} {menuItem.price}</div>
      <div>{menuItem.description}</div>
      <div><strong>Ingredients:</strong>
      <ul>
        {menuItem.ingredients?.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul></div>
      <br />
      <br />
      <br />
    </div>
  )
}